"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import Papa from "papaparse"
import { getNutrientRequirements } from "@/utils/nutrientRequirements"
import { get } from "http"

const chartData = [
  { month: "January", recommended: 186, current: 80 },
  { month: "February", recommended: 305, current: 200 },
  { month: "March", recommended: 237, current: 120 },
  { month: "April", recommended: 73, current: 190 },
  { month: "May", recommended: 209, current: 130 },
  { month: "June", recommended: 214, current: 140 },
]

const chartConfig = {
  current: {
    label: "Current",
    color: "hsl(var(--chart-3))",
  },
  recommended: {
    label: "Recommended",
    color: "hsl(0, 73.90%, 52.00%)",
  },
} satisfies ChartConfig

export default function Component() {
  const [data, setData] = useState<any[]>([]);
  const [jsonData, setJsonData] = useState<any>(null);

  useEffect(() => {
    async function fetchFilteredFiles() {
      try {
        // Define query parameters
        const queries = [
          "queries=id:2052391306",
          "queries=type:core"
        ];

        // Convert queries to a URL query string
        const queryString = queries.join("&");
        const url = `http://localhost:8080/filter_files?${queryString}`;

        const response = await fetch(url, {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("Filtered Files:", jsonData);

        // Save fetched data to state
        setJsonData(jsonData);

      } catch (error) {
        console.error("Error fetching filtered files:", error);
      }
    }

    fetchFilteredFiles();
  }, []);

  // Use jsonData if available as an argument for getNutrientRequirements,
  // adjust extraction as needed based on your jsonData structure.
  const nutrientRequirements = jsonData
    ? getNutrientRequirements("Males", jsonData.age)
    : null;

  return (
    <Card className="w-full max-w-lg border-none shadow-none">
      <CardHeader>
        <CardTitle>Nutrient Deficiencies</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="current" stackId="a" fill="hsl(var(--chart-3))" radius={[0, 0, 4, 4]} />
            <Bar dataKey="recommended" stackId="a" fill="hsl(0, 73.90%, 52.00%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Showing Patient Nutrient Deficiencies</div>
      </CardFooter>
      <div>
        {nutrientRequirements
          ? <div>Nutrient Requirements: {JSON.stringify(nutrientRequirements)}</div>
          : <div>Loading nutrient data...</div>
        }
      </div>
    </Card>
  )
}