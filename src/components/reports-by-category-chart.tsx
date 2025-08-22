
'use client';
import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartTooltipContent } from '@/components/ui/chart';

interface ReportsByCategoryChartProps {
    data: any[];
}

export function ReportsByCategoryChart({ data }: ReportsByCategoryChartProps) {
    const chartData = useMemo(() => {
        const categoryCounts = data.reduce((acc, report) => {
            const category = report.analysis?.suggestedCategory || report.category || 'Outros';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryCounts).map(([name, total]) => ({ name, total }));
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
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
                <Tooltip
                  cursor={{fill: 'hsl(var(--muted))'}}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar 
                    dataKey="total" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                 />
            </BarChart>
        </ResponsiveContainer>
    );
}
