"use client"
import React, { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"

// New data and color configuration
const RECOMMENDED_DATA = [
	{ name: "Carbs", value: 50 },
	{ name: "Fats", value: 30 },
	{ name: "Protein", value: 20 },
]
const USER_DATA = [
	{ name: "Carbs", value: 40 },
	{ name: "Fats", value: 35 },
	{ name: "Protein", value: 25 },
]
const COLORS = {
	Carbs: "hsl(var(--chart-1))",
	Fats: "hsl(var(--chart-2))",
	Protein: "hsl(var(--chart-3))",
}

export function NutritionChart() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

	return (
		<Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
			<CardHeader>
				<CardTitle className="text-lg">Nutrition Ratio</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Tooltip />
							<Pie
								data={RECOMMENDED_DATA}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								innerRadius={0}
								outerRadius={60}
								fill="#8884d8"
							>
								{RECOMMENDED_DATA.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
								))}
							</Pie>
							<Pie
								data={USER_DATA}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								innerRadius={70}
								outerRadius={90}
								fill="#82ca9d"
								label
							>
								{USER_DATA.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
								))}
							</Pie>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="mt-4 grid grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-2">Recommended Ratio</h4>
						<ul>
							{RECOMMENDED_DATA.map((item) => (
								<li key={item.name} className="flex items-center gap-2">
									<div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] }} />
									<span>
										{item.name}: {item.value}%
									</span>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-2">Your Ratio</h4>
						<ul>
							{USER_DATA.map((item) => (
								<li key={item.name} className="flex items-center gap-2">
									<div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] }} />
									<span>
										{item.name}: {item.value} %
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}