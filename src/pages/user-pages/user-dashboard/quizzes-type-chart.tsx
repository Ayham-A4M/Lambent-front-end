
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {ChartConfig} from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A mixed bar chart"

const chartData = [
  { type: "math", number: 275, fill: "var(--color-math)" },
  { type: "physics", number: 200, fill: "var(--color-physics)" },
  { type: "logic", number: 187, fill: "var(--color-logic)" },
  { type: "programming", number: 173, fill: "var(--color-programming)" },
  { type: "language", number: 90, fill: "var(--color-language)" },
  { type: "chemistry", number: 110, fill: "var(--color-chemistry)" },
]

const chartConfig = {
  number: {
    label: "Number",
  },
  math: {
    label: "Math",
    color: "var(--chart-1)",
  },
  physics: {
    label: "Physics",
    color: "var(--chart-2)",
  },
  logic: {
    label: "Logic",
    color: "var(--chart-3)",
  },
  programming: {
    label: "coding",
    color: "var(--chart-4)",
  },
  language: {
    label: "language",
    color: "var(--chart-5)",
  },
  chemistry: {
    label: "chemistry",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig

export function QuizzesChart() {
  return (
    <Card className="max-h-96 w-full max-w-96 ">
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="number" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="number" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}


