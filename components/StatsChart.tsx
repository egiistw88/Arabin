
import React from 'react';
import { motion as m } from 'framer-motion';

const motion = m as any;

// Native SVG Chart - Zero Dependencies, GPU Accelerated
const SimpleRadialBar = ({ 
  value, 
  max, 
  color, 
  label, 
  radius, 
  strokeWidth = 8 
}: { 
  value: number; 
  max: number; 
  color: string; 
  label: string; 
  radius: number; 
  strokeWidth?: number;
}) => {
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Track */}
          <circle
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Indicator */}
          <motion.circle
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-xs font-bold text-gray-700">{value}</span>
        </div>
      </div>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</span>
    </div>
  );
};

interface StatsChartProps {
  stats: {
    vocab: number;
    grammar: number; // Placeholder logic
    xp: number;
  }
}

export const StatsChart: React.FC<StatsChartProps> = ({ stats }) => {
  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        Statistik Kemajuan
      </h3>
      
      <div className="flex justify-around w-full gap-4">
        <SimpleRadialBar 
            value={stats.vocab} 
            max={500} 
            color="#059669" 
            label="Mufradat" 
            radius={36} 
        />
        <SimpleRadialBar 
            value={Math.min(stats.xp / 50, 100)} // Example logic for grammar/xp ratio
            max={100} 
            color="#1d4ed8" 
            label="Logika" 
            radius={36} 
        />
        <SimpleRadialBar 
            value={stats.xp % 500} // Current level progress
            max={500} 
            color="#be123c" 
            label="XP Level" 
            radius={36} 
        />
      </div>
    </div>
  );
};
