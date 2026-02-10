
import { createComplianceGraph } from "@/lib/compliance-agent";
import type { AgentMessage } from "@/lib/compliance-agent";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const graph = createComplianceGraph();
    const result = await graph.invoke({ messages });
    const resultMessages = result.messages as AgentMessage[];
    
    if (!resultMessages.length) return Response.json({ role: "assistant", content: "{}" });
    
    return Response.json({ role: "assistant", content: resultMessages[resultMessages.length-1].content });
  } catch (e) {
    return Response.json({ error: "Error" }, { status: 500 });
  }
}