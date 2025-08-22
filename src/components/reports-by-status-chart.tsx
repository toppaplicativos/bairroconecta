
"use client"
import { useMemo } from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { ChartTooltipContent } from '@/components/ui/chart';

interface ReportsByStatusChartProps {
    data: any[];
}

const COLORS: Record<string, string> = {
    'Aberta': 'hsl(var(--destructive))',
    'Em andamento': 'hsl(var(--secondary-foreground))',
    'Resolvido': 'hsl(var(--primary))',
};

export function ReportsByStatusChart({ data }: ReportsByStatusChartProps) {
    const chartData = useMemo(() => {
        const statusCounts = data.reduce((acc, report) => {
            const status = report.status || 'Aberta';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

    }, [data]);

     if (!chartData || chartData.length === 0) {
        return <div className="flex items-center justify-center h-full text-muted-foreground">Sem dados para exibir</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Tooltip
                    cursor={{fill: 'hsl(var(--muted))'}}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                {`${(percent * 100).toFixed(0)}%`}
                            </text>
                        );
                    }}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}
