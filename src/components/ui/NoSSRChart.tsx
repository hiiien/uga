"use client"
import { PieChart, Pie, Cell, Tooltip } from "recharts";



interface NoSSRChartProps {
  recommendedData: { name: string; value: number }[];
  userData: { name: string; value: number }[];
  COLORS: { [key: string]: string };
}

export default function NoSSRChart({ recommendedData, userData, COLORS }: NoSSRChartProps) {
  return (
    <div className="flex flex-col items-center">
      <PieChart width={200} height={200}>
        <Pie
          data={recommendedData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={50}
        >
          {recommendedData.map((entry, index) => (
            <Cell key={`cell-rec-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Pie
          data={userData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={70}
        >
          {userData.map((entry, index) => (
            <Cell key={`cell-user-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => {
            return [`${value}%`, props?.payload?.name || name];
          }}
        />
      </PieChart>
      <div className="flex gap-4 mt-4">
        {Object.entries(COLORS).map(([macro, color]) => (
          <div key={macro} className="flex items-center gap-1">
            <span className="w-4 h-4" style={{ backgroundColor: color }} />
            <span>{macro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
