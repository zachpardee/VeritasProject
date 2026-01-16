import React, { useState, useEffect } from "react";
import {
  Clipboard,
  ShieldCheck,
  FileText,
  History,
  Layout,
  AlertTriangle,
  CheckCircle,
  Info,
  Upload,
  Search,
} from "lucide-react";

import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const AIScanningHub = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [history, setHistory] = useState([
    {
      id: 1,
      title: 'Email from "HR"',
      score: 82,
      date: "2 mins ago",
      type: "Text",
    },
    {
      id: 2,
      title: "Project Proposal.pdf",
      score: 14,
      date: "1 hour ago",
      type: "PDF",
    },
    {
      id: 3,
      title: "LinkedIn Message",
      score: 95,
      date: "3 hours ago",
      type: "Text",
    },
  ]);

  const simulateScan = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate API Latency
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        overallScore: 24, // 24% Human
        label: "Likely AI Generated",
        color: "text-red-500",
        bgColor: "bg-red-50",
        sentences: [
          {
            text: "In today's fast-paced digital landscape, efficiency is paramount.",
            aiProb: 0.95,
          },
          {
            text: "We must leverage our core competencies to achieve synergy.",
            aiProb: 0.88,
          },
          {
            text: "I was thinking we should grab coffee on Tuesday.",
            aiProb: 0.12,
          },
          {
            text: "Furthermore, the implementation of sustainable initiatives remains a priority.",
            aiProb: 0.92,
          },
        ],
      });
    }, 2500);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 max-w-md mx-auto border-x border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-slate-800">
            Veritas AI
          </h1>
        </div>
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <History className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Main Action Area */}
        {!scanResult && !isScanning && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clipboard className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                Ready to Verify?
              </h2>
              <p className="text-slate-500 text-sm px-4">
                Paste any text or upload a document to check for AI footprints.
              </p>

              <button
                onClick={simulateScan}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Clipboard className="w-5 h-5" />
                Paste & Scan Content
              </button>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                  <Upload className="w-4 h-4" /> PDF/Doc
                </button>
                <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                  <FileText className="w-4 h-4" /> Image
                </button>
              </div>
            </div>

            {/* Recent Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Recent Scans</h3>
                <button className="text-indigo-600 text-sm font-semibold">
                  See all
                </button>
              </div>
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-indigo-200 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          item.score > 50
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {item.score > 50 ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {item.date} • {item.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          item.score > 50 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.score}%
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        Human
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scanning State */}
        {isScanning && (
          <div className="flex flex-col items-center justify-center h-64 space-y-6 py-12 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-8 h-8 text-indigo-600 animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800">
                Analyzing Patterns...
              </h2>
              <p className="text-slate-500 text-sm mt-1 italic font-serif">
                "Searching for linguistic burstiness"
              </p>
            </div>
          </div>
        )}

        {/* Results State */}
        {scanResult && !isScanning && (
          <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
            {/* Result Header */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h2 className={`text-3xl font-black ${scanResult.color}`}>
                    {scanResult.overallScore}%
                  </h2>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Human Score
                  </p>
                </div>
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${scanResult.bgColor} ${scanResult.color}`}
                >
                  {scanResult.label}
                </div>
              </div>

              {/* Score Bar */}
              <div className="mt-6 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    scanResult.overallScore > 50 ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${scanResult.overallScore}%` }}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-200/50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  activeTab === "overview"
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-slate-500"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("heatmap")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  activeTab === "heatmap"
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-slate-500"
                }`}
              >
                Detailed Heatmap
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                      Perplexity
                    </p>
                    <p className="text-xl font-bold text-slate-800">Low</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                      Burstiness
                    </p>
                    <p className="text-xl font-bold text-slate-800">Static</p>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex gap-3">
                  <Info className="w-5 h-5 text-indigo-600 shrink-0" />
                  <p className="text-sm text-indigo-900 leading-relaxed">
                    This text shows highly repetitive sentence structures and a
                    lack of creative vocabulary, common in large language
                    models.
                  </p>
                </div>
                <button
                  onClick={() => setScanResult(null)}
                  className="w-full py-3 text-slate-500 font-semibold text-sm hover:text-indigo-600 transition-colors"
                >
                  Start New Scan
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
                <div className="prose prose-slate max-w-none">
                  {scanResult.sentences.map((s, idx) => (
                    <span
                      key={idx}
                      className={`inline-block mr-1.5 px-1 py-0.5 rounded transition-colors cursor-help ${
                        s.aiProb > 0.7
                          ? "bg-red-100 text-red-900 border-b-2 border-red-400"
                          : s.aiProb > 0.4
                          ? "bg-yellow-100 text-yellow-900 border-b-2 border-yellow-400"
                          : "bg-green-50 text-green-900 border-b-2 border-green-400"
                      }`}
                      title={`AI Probability: ${Math.round(s.aiProb * 100)}%`}
                    >
                      {s.text}
                    </span>
                  ))}
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>{" "}
                    Human
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>{" "}
                    Uncertain
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>{" "}
                    AI-Generated
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav className="bg-white border-t border-slate-200 px-6 py-4 flex justify-around items-center">
        <button className="flex flex-col items-center gap-1 text-indigo-600">
          <Layout className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Scan
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-600 transition-colors">
          <FileText className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Files
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-600 transition-colors">
          <History className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Archive
          </span>
        </button>
      </nav>
    </div>
  );
};

export default AIScanningHub;
