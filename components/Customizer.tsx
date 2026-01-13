
import React from 'react';
import { CarConfig, CarBodyType } from '../types';
import { COLORS, NEON_COLORS } from '../constants';
import { Settings, Palette, Zap, Box, Car } from 'lucide-react';

interface CustomizerProps {
  config: CarConfig;
  onChange: (newConfig: CarConfig) => void;
  onAnalyze: () => void;
  onGenerate: () => void;
  loading: boolean;
}

const Customizer: React.FC<CustomizerProps> = ({ config, onChange, onAnalyze, onGenerate, loading }) => {
  const updateConfig = (key: keyof CarConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const bodyTypes: { id: CarBodyType; label: string }[] = [
    { id: 'sedan', label: 'Executive' },
    { id: 'sport', label: 'Velocity' },
    { id: 'truck', label: 'Colossus' },
    { id: 'cyber', label: 'Epoch' },
  ];

  return (
    <div className="flex flex-col h-full glass-panel p-6 overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Car size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">DESIGN STUDIO</h2>
          <p className="text-xs text-gray-400">APEX CUSTOMS v2.0</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Brand/Model */}
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Settings size={14} /> Identity
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              value={config.brandName}
              onChange={(e) => updateConfig('brandName', e.target.value)}
              placeholder="Brand"
              className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <input 
              type="text" 
              value={config.modelName}
              onChange={(e) => updateConfig('modelName', e.target.value)}
              placeholder="Model"
              className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </section>

        {/* Body Type */}
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Box size={14} /> Chassis
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {bodyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => updateConfig('bodyType', type.id)}
                className={`px-3 py-2 rounded text-sm transition-all border ${
                  config.bodyType === type.id 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </section>

        {/* Paint Colors */}
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Palette size={14} /> Finish
          </h3>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((color) => (
              <button
                key={color.hex}
                onClick={() => updateConfig('bodyColor', color.hex)}
                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                  config.bodyColor === color.hex ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </section>

        {/* Underglow */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} /> Underglow
            </h3>
            <button 
              onClick={() => updateConfig('neonUnderglow', !config.neonUnderglow)}
              className={`w-12 h-6 rounded-full transition-colors relative ${config.neonUnderglow ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.neonUnderglow ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          {config.neonUnderglow && (
            <div className="flex flex-wrap gap-2">
              {NEON_COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => updateConfig('neonColor', color.hex)}
                  className={`w-8 h-8 rounded-md border-2 ${
                    config.neonColor === color.hex ? 'border-white' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Aerodynamics */}
        <section>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={config.spoiler}
              onChange={(e) => updateConfig('spoiler', e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Racing Rear Wing</span>
          </label>
        </section>

        {/* Actions */}
        <div className="pt-6 space-y-3">
          <button
            onClick={onAnalyze}
            disabled={loading}
            className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'ANALYZING...' : 'AI DESIGN REVIEW'}
          </button>
          <button
            onClick={onGenerate}
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
             GENERATE RENDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customizer;
