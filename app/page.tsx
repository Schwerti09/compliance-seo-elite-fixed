
"use client";
import { useState } from "react";
import { Sparkles, ShieldCheck, AlertTriangle, FileText, Download, Globe, Search } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const runAudit = async () => {
    if(!input) return;
    setLoading(true);
    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ messages: [{ role: "user", content: input }] })
        });
        const data = await res.json();
        const parsed = JSON.parse(data.content);
        setReport(parsed);
    } catch(e) {
        alert("Audit Error. Please check API Key.");
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    const element = document.createElement("a");
    const file = new Blob([
        "OFFICIAL EU AI ACT AUDIT REPORT\n\n" +
        "RISK LEVEL: " + report.risk_level + "\n" +
        "LEGAL REF: " + report.eu_article_ref + "\n" +
        "REASONING: " + report.reasoning + "\n\n" +
        "ACTION ITEMS:\n" + report.action_items.map((i:string) => "- " + i).join("\n")
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Compliance_Certificate_" + Date.now() + ".txt";
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500/30">
      <JsonLd />
      
      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center font-bold text-black shadow-lg shadow-amber-500/20">C</div>
                <span className="font-bold tracking-tight text-lg">Compliance<span className="text-amber-500">Vault</span></span>
            </div>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
                <a href="#features" className="hover:text-white transition">Features</a>
                <a href="#pricing" className="hover:text-white transition">Pricing</a>
                <a href="#glossary" className="hover:text-white transition">AI Act Glossary</a>
            </nav>
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-bold transition">LOGIN</button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Intro */}
        <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-wider mb-6 animate-fade-in-up">
                #1 RATED AI COMPLIANCE TOOL
            </div>
            <h1 className="text-6xl font-black mb-6 tracking-tight leading-tight">
                Secure your AI <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Before Regulation Hits.</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-8">
                The only automated audit engine powered by Gemini 2.0. Generate valid 
                <span className="text-white font-semibold"> EU AI Act Certificates</span> in seconds.
            </p>
            
            {/* Trust Signals SEO */}
            <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition duration-500">
               {/* Mock Logos for Trust */}
               <div className="font-bold text-slate-500 flex items-center gap-1"><ShieldCheck className="w-4 h-4"/> GDPR Ready</div>
               <div className="font-bold text-slate-500 flex items-center gap-1"><Globe className="w-4 h-4"/> EU Compliant</div>
               <div className="font-bold text-slate-500 flex items-center gap-1"><Search className="w-4 h-4"/> ISO 42001</div>
            </div>
        </div>

        {/* Input Area */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-1 shadow-2xl mb-12 ring-1 ring-white/5">
            <div className="bg-slate-900/50 rounded-[1.4rem] p-8 relative overflow-hidden">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste your AI System Description here (e.g. 'A Resume Scanning Tool using LLMs to filter candidates...')"
                    className="w-full h-40 bg-transparent border-none text-lg text-slate-200 placeholder:text-slate-600 focus:ring-0 outline-none resize-none"
                />
                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        AI Auditor Ready
                    </p>
                    <button 
                        onClick={runAudit}
                        disabled={loading || !input}
                        className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {loading ? <Sparkles className="animate-spin w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                        {loading ? "Auditing..." : "Start Free Audit"}
                    </button>
                </div>
            </div>
        </div>

        {/* Report Card */}
        {report && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-10 shadow-[0_0_100px_rgba(245,158,11,0.15)] relative overflow-hidden">
                    
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <FileText className="text-amber-500 w-8 h-8" /> 
                            Audit Report
                        </h2>
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase border ${
                            report.risk_level === 'Minimal' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' :
                            report.risk_level === 'High' ? 'bg-red-500/10 border-red-500 text-red-400' : 
                            'bg-yellow-500/10 border-yellow-500 text-yellow-400'
                        }`}>
                            {report.risk_level} Risk
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-6">
                            <div>
                                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Legal Reference</div>
                                <div className="text-amber-200 font-mono bg-amber-950/30 p-3 rounded-lg border border-amber-900/50">
                                    {report.eu_article_ref}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Reasoning</div>
                                <p className="text-slate-300 leading-relaxed text-sm">{report.reasoning}</p>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Required Actions</div>
                            <ul className="space-y-3">
                                {report.action_items.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/5 hover:border-amber-500/20 transition-colors">
                                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/10 flex justify-between items-center relative z-10">
                        <div className="text-xs text-slate-600 font-mono">
                            SESSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </div>
                        <button onClick={downloadPDF} className="group bg-white text-black hover:bg-amber-50 px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
                            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            Download Official Certificate
                        </button>
                    </div>

                </div>
            </div>
        )}

        {/* Content Hub for SEO (Programmatic Placeholder) */}
        <section id="glossary" className="mt-24 pt-16 border-t border-white/5">
            <h3 className="text-2xl font-bold mb-8 text-center">AI Governance Knowledge Hub</h3>
            <div className="grid md:grid-cols-3 gap-6">
                {['High-Risk AI Definition', 'Article 5 Prohibited Practices', 'Transparency Obligations'].map((topic) => (
                    <div key={topic} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-amber-500/30 transition cursor-pointer group">
                        <h4 className="font-bold text-slate-200 group-hover:text-amber-400 transition">{topic}</h4>
                        <p className="text-sm text-slate-500 mt-2">Legal analysis and compliance requirements for {topic.toLowerCase()}.</p>
                        <div className="mt-4 text-xs font-bold text-amber-600 uppercase tracking-widest group-hover:underline">Read Analysis &rarr;</div>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}