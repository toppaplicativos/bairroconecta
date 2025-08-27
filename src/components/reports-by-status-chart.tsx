
"use client"
import { useMemo } from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ReportsByStatusChartProps {
    data: any[];
}

export function ReportsByStatusChart({ data }: ReportsByStatusChartProps) {
    const chartData = useMemo(() => {
        const statusCounts = data.reduce((acc, report) => {
            const status = report.status || 'Aberta';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(statusCounts).map(([name, value]) => ({ name, value, fill: `var(--color-${name.toLowerCase().replace(' ', '-')})` }));

    }, [data]);
    
    const chartConfig = useMemo(() => {
        const config: any = {};
        chartData.forEach(item => {
            config[item.name] = { label: item.name };
        });
         config['Aberta'] = { ...config['Aberta'], color: 'hsl(var(--destructive))'};
         config['Em andamento'] = { ...config['Em andamento'], color: 'hsl(var(--secondary))'};
         config['Resolvido'] = { ...config['Resolvido'], color: 'hsl(var(--primary))'};

        return config;
    }, [chartData]);


     if (!chartData || chartData.length === 0) {
        return <div className="flex items-center justify-center h-[350px] text-muted-foreground">Sem dados para exibir</div>;
    }

    return (
       <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="value" />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                if (percent < 0.05) return null; // Don't render label if too small
                return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold">
                        {`${(percent * 100).toFixed(0)}%`}
                    </text>
                );
            }}
          >
             {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    )
}
