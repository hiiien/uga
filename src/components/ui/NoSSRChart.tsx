"use client"
import { PieChart, Pie, Cell, Tooltip } from "recharts"

const recommendedData = [
  { name: "Protein", value: 30 },
  { name: "Carbs", value: 50 },
  { name: "Fat", value: 20 },
];

const userData = [
  { name: "Protein", value: 25 },
  { name: "Carbs", value: 55 },
  { name: "Fat", value: 20 },
];

const customColors = {
  Protein: 'hsl(0, 77%, 84%)', // Replace with your custom color
  Carbs: 'hsl(170.57, 76.92%, 64.31%)',   // Replace with your custom color
  Fat: 'hsl(var(--chart-3))',     // Replace with your custom color
};

interface NoSSRChartProps {
  recommendedData: { name: string; value: number }[]
  userData: { name: string; value: number }[]
  COLORS: { [key: string]: string }
}

export default function App() {
  return (
    <NoSSRChart
      recommendedData={recommendedData}
      userData={userData}
      COLORS={customColors}
    />
  );
}

function NoSSRChart({ recommendedData, userData, COLORS }: NoSSRChartProps) {
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
            return [`${value}%`, props?.payload?.name || name]
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
  )
}
