
'use client';
import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ReportsByCategoryChartProps {
    data: any[];
}

const chartConfig = {
    total: {
        label: "Total",
        color: "hsl(var(--primary))",
    },
};

export function ReportsByCategoryChart({ data }: ReportsByCategoryChartProps) {
    const chartData = useMemo(() => {
        const categoryCounts = data.reduce((acc, report) => {
            const category = report.analysis?.suggestedCategory || report.category || 'Outros';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryCounts).map(([name, total]) => ({ name, total }));
    }, [data]);

    if (!chartData || chartData.length === 0) {
        return <div className="flex items-center justify-center h-[350px] text-muted-foreground">Sem dados para exibir</div>;
    }

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
             <BarChart accessibilityLayer data={chartData}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  cursor={{fill: 'hsl(var(--muted))'}}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar 
                    dataKey="total" 
                    fill="var(--color-total)" 
                    radius={[4, 4, 0, 0]}
                 />
            </BarChart>
        </ChartContainer>
    );
}
