import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Isim', count: 10, fill: '#1d4ed8' }, // Blue
  { name: 'Harf Jar', count: 4, fill: '#be123c' }, // Rose
  { name: 'Vocab', count: 15, fill: '#059669' }, // Green
];

export const StatsChart: React.FC = () => {
  return (
    <div className="h-48 w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Statistik Pemahaman</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="count"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0 }} />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};