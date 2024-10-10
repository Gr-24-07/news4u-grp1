"use client";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend,
} from "recharts";

type NewSubsChartProps = {
    data: Record<string, string | number>[];
    config: ChartConfig;
};

export default function NewSubsChart({ data, config }: NewSubsChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300} className="mt-4">
            <ChartContainer config={config} className="min-h-[200px] w-full">
                <LineChart
                    accessibilityLayer
                    data={data}
                    margin={{ right: 30 }}
                >
                    <CartesianGrid />
                    <XAxis tickMargin={10} dataKey="date"></XAxis>
                    <YAxis></YAxis>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />
                    <Line
                        dataKey={"12 Months"}
                        type="monotone"
                        stroke="var(--color-twelve)"
                        strokeWidth={4}
                        dot={false}
                    ></Line>
                    <Line
                        dataKey={"1 Month"}
                        type="monotone"
                        stroke="var(--color-one)"
                        strokeWidth={4}
                        dot={false}
                    ></Line>
                    <Legend />
                </LineChart>
            </ChartContainer>
        </ResponsiveContainer>
    );
}
