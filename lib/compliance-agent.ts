
import { StateGraph, Annotation } from "@langchain/langgraph";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AgentMessage { role: string; content: string; }

const ComplianceState = Annotation.Root({
  messages: Annotation<AgentMessage[]>({ reducer: (x, y) => x.concat(y), default: () => [] }),
  riskLevel: Annotation<string>({ reducer: (x, y) => y ?? x, default: () => "low" })
});

const analyzerNode = async (state: typeof ComplianceState.State) => {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1];
    const textToAnalyze = lastMessage?.content || "";

    if (!process.env.GEMINI_API_KEY) {
        return { riskLevel: "unknown", messages: [{ role: "assistant", content: "Error: License Key Invalid (API)." }] };
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        You are a Senior EU AI Act Compliance Officer.
        Analyze the following AI System description: "${textToAnalyze}"
        
        Output a STRICT JSON object (no markdown) with this structure:
        {
            "risk_level": "Minimal" | "Limited" | "High" | "Unacceptable",
            "eu_article_ref": "e.g. Article 5(1) or Article 52",
            "reasoning": "Legal justification in 2 sentences.",
            "action_items": ["Step 1", "Step 2", "Step 3"]
        }
        `;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text();
        responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

        return { riskLevel: "processed", messages: [{ role: "assistant", content: responseText }] };
    } catch (error) {
        return { riskLevel: "error", messages: [{ role: "assistant", content: JSON.stringify({ error: "Audit Failed" }) }] };
    }
};

export const createComplianceGraph = () => {
    const builder = new StateGraph(ComplianceState);
    builder.addNode("analyze", analyzerNode);
    // FORCE-FIX: TypeScript zufriedenstellen
    builder.addEdge("__start__", "analyze" as any);
    return builder.compile();
};