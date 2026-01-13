
import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Customizer from './components/Customizer';
import { INITIAL_CONFIG } from './constants';
import { CarConfig, DesignReview } from './types';
import { getDesignReview, generateCarRender } from './services/gemini';
import { X, AlertTriangle, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<CarConfig>(INITIAL_CONFIG);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<DesignReview | null>(null);
  const [renderUrl, setRenderUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setReview(null);
    setError(null);
    try {
      const result = await getDesignReview(config);
      setReview(result);
    } catch (err) {
      console.error(err);
      setError("Failed to get AI review. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setRenderUrl(null);
    setError(null);
    try {
      const url = await generateCarRender(config);
      if (url) {
        setRenderUrl(url);
      } else {
        setError("Failed to generate render.");
      }
    } catch (err) {
      console.error(err);
      setError("AI generation failed. The model might be busy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col md:flex-row bg-[#050505] text-white overflow-hidden">
      {/* 3D Scene */}
      <div className="flex-1 relative order-2 md:order-1 h-1/2 md:h-full overflow-hidden">
        <Viewer3D config={config} />
        
        {/* HUD Info */}
        <div className="absolute top-6 left-6 pointer-events-none select-none">
          <h1 className="text-4xl font-black italic tracking-tighter opacity-20">APEX</h1>
          <div className="mt-4 flex gap-4">
             <div className="glass-panel px-3 py-1 rounded-sm text-[10px] uppercase tracking-widest text-blue-400">RTX: ON</div>
             <div className="glass-panel px-3 py-1 rounded-sm text-[10px] uppercase tracking-widest text-green-400">STABLE: 60FPS</div>
          </div>
        </div>

        {/* AI Review Overlay */}
        {review && (
          <div className="absolute top-6 right-6 w-80 glass-panel p-6 rounded-xl animate-in fade-in slide-in-from-right-4 z-20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Sparkles size={18} className="text-blue-400" /> AI REVIEW
              </h3>
              <button onClick={() => setReview(null)} className="text-gray-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-black text-blue-500">{review.rating}</span>
              <div className="text-xs text-gray-400 uppercase leading-none">
                Design<br/>Score
              </div>
              <div className="ml-auto px-2 py-1 bg-white/10 rounded text-[10px] uppercase">
                {review.marketSegment}
              </div>
            </div>
            <p className="text-sm text-gray-300 italic mb-4">"{review.critique}"</p>
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Suggestions</p>
              {review.suggestedEnhancements.map((s, i) => (
                <div key={i} className="text-xs bg-black/40 border border-white/5 p-2 rounded flex gap-2">
                  <span className="text-blue-500">→</span> {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Render Result Overlay */}
        {renderUrl && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-12 animate-in zoom-in-95 bg-black/90">
            <div className="relative max-w-5xl w-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={renderUrl} alt="AI Generated Render" className="w-full aspect-video object-cover" />
              <div className="p-6 flex justify-between items-center glass-panel border-0 rounded-none">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">{config.brandName} {config.modelName}</h3>
                  <p className="text-sm text-gray-400">Ultra-Realistic Photometric Render (8K)</p>
                </div>
                <button 
                  onClick={() => setRenderUrl(null)}
                  className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  CLOSE
                </button>
              </div>
              <button 
                onClick={() => setRenderUrl(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors z-10"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-600/90 text-white text-xs rounded-full flex items-center gap-2 z-30">
            <AlertTriangle size={14} /> {error}
          </div>
        )}
      </div>

      {/* Sidebar Controls */}
      <div className="w-full md:w-96 md:h-full order-1 md:order-2 shrink-0">
        <Customizer 
          config={config} 
          onChange={setConfig} 
          onAnalyze={handleAnalyze} 
          onGenerate={handleGenerate}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default App;
=Array