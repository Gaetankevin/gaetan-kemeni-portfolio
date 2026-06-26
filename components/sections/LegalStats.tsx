"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", rate: 72 },
  { month: "Feb", rate: 77 },
  { month: "Mar", rate: 84 },
  { month: "Apr", rate: 81 },
  { month: "May", rate: 89 },
  { month: "Jun", rate: 93 },
];

export function LegalStats() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_0_80px_rgba(124,58,237,0.16)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">Resolution rate</p>
          <h3 className="text-lg font-medium text-white">Outcome confidence</h3>
        </div>
        <div className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-200">
          +18% this quarter
        </div>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis hide domain={[60, 100]} />
            <Tooltip
              contentStyle={{
                background: "rgba(9, 9, 11, 0.9)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
              }}
              labelStyle={{ color: "#f4f4f5" }}
            />
            <Area type="monotone" dataKey="rate" stroke="#c4b5fd" strokeWidth={2.4} fill="url(#colorRate)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
