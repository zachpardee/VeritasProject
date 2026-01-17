import React, { useState } from 'react';
import {
  Clipboard, ShieldCheck, FileText, History, Layout,
  Search, Zap, ShieldAlert, Info, Upload, ChevronRight
} from 'lucide-react';

const VeritasDashboard = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeTab, setActiveTab] = useState('scan');

  // --- Animation & Logic ---
  const startScan = () => {
    setIsScanning(true);
    setScanResult(null);
   
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        score: 84,
        label: 'Likely AI',
        detail: 'Pattern matches GPT-4o linguistic markers.',
        color: 'text-red-500',
        bg: 'bg-red-50'
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans max-w-md mx-auto border-x border-slate-200 shadow-2xl overflow-hidden">
     
      {/* HEADER */}
      <header className="px-6 py-5 bg-white border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-slate-800">Veritas AI</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v1.0 Pro</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <Info className="w-4 h-4" />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
       
        {!isScanning && !scanResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* HERO CARD */}
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <Zap className="absolute -right-6 -top-6 w-32 h-32 opacity-10 rotate-12" />
              <h2 className="text-2xl font-bold mb-2">New Analysis</h2>
              <p className="text-indigo-100 text-sm mb-8 leading-relaxed">Scan text, documents, or URLs for hidden AI signatures.</p>
             
              <button
                onClick={startScan}
                className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all shadow-md"
              >
                <Clipboard className="w-5 h-5" /> Paste & Analyze
              </button>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-col items-center text-center gap-3 shadow-sm hover:border-indigo-200 transition-colors">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center"><Upload className="w-6 h-6" /></div>
                <span className="font-bold text-xs text-slate-600 uppercase">Files</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-col items-center text-center gap-3 shadow-sm hover:border-indigo-200 transition-colors">
                <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center"><Search className="w-6 h-6" /></div>
                <span className="font-bold text-xs text-slate-600 uppercase">URL Scan</span>
              </div>
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {isScanning && (
          <div className="flex flex-col items-center justify-center h-full py-12 space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-[6px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
              <ShieldAlert className="absolute inset-0 m-auto w-8 h-8 text-indigo-600 animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-800 text-lg">Neural Mapping...</h3>
              <p className="text-slate-400 text-sm">Checking semantic burstiness</p>
            </div>
          </div>
        )}

        {/* RESULT STATE */}
        {scanResult && !isScanning && (
          <div className="space-y-4 animate-in zoom-in-95 duration-300">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm text-center relative overflow-hidden">
              <div className={`text-6xl font-black mb-2 ${scanResult.color}`}>{scanResult.score}%</div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">AI Probability</p>
              <div className={`inline-block px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider ${scanResult.bg} ${scanResult.color}`}>
                {scanResult.label}
              </div>
              <p className="mt-6 text-slate-500 text-sm italic">"{scanResult.detail}"</p>
            </div>
           
            <button
              onClick={() => setScanResult(null)}
              className="w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-indigo-600 transition-colors"
            >
              ← Back to Scanner
            </button>
          </div>
        )}
      </main>

      {/* BOTTOM NAV */}
      <nav className="bg-white border-t border-slate-100 px-10 py-5 flex justify-between items-center">
        <NavIcon icon={<Layout />} label="Scan" active={activeTab === 'scan'} onClick={() => setActiveTab('scan')} />
        <NavIcon icon={<History />} label="History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
        <NavIcon icon={<Search />} label="Browse" active={activeTab === 'browse'} onClick={() => setActiveTab('browse')} />
      </nav>
    </div>
  );
};

// Sub-component for Navigation
const NavIcon = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-indigo-600 scale-110' : 'text-slate-300'}`}>
    {React.cloneElement(icon, { className: 'w-6 h-6' })}
    <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);

export default VeritasDashboard;