"use client";

import { Dot, PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { useState, useCallback } from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { DiAtom, DiCode, DiFirebase } from "react-icons/di";
import { FaDocker, FaGithubSquare } from "react-icons/fa";
import { SiThealgorithms } from "react-icons/si";

const chartData = [
  { month: "Frontend Development", desktop: 100, icon: DiAtom, x: 14, y: 30 },
  {
    month: "Backend Development",
    desktop: 90,
    icon: DiCode,
    x: -5,
    y: 20,
  },
  { month: "Database Management", desktop: 70, icon: DiFirebase, x: -2, y: 5 },
  { month: "DevOps/Deployment", desktop: 75, icon: FaDocker, x: 10, y: 0 },
  {
    month: "Version Control & Collaboration",
    desktop: 95,
    icon: FaGithubSquare,
    x: 30,
    y: 3,
  },
  {
    month: "Problem Solving & Algorithms",
    desktop: 90,
    icon: SiThealgorithms,
    x: 30,
    y: 20,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RadarChartComp({
  selectSkill,
}: {
  selectSkill: (skillNumber: number) => void;
}) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const handleLabelClick = useCallback(
    (label: string) => {
      const indexOfLabel = chartData.findIndex((data) => data.month === label);
      selectSkill(indexOfLabel);
      setActiveLabel(label === activeLabel ? null : label);
    },
    [activeLabel]
  );

  const handleChartClick = useCallback((e: any) => {
    if (!e || !e.activeLabel) return;
    const indexOfLabel = chartData.findIndex(
      (data) => data.month === e.activeLabel
    );
    selectSkill(indexOfLabel);
    setActiveLabel(e.activeLabel);
  }, []);

  return (
    <div className="relative w-full max-w-[35rem]">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-full"
      >
        <RadarChart data={chartData} onClick={handleChartClick}>
          <ChartTooltip
            cursor={true}
            active={true}
            content={<ChartTooltipContent color="hsl(334 100% 50%)" />}
          />
          <defs>
            <radialGradient
              id="colorGradient"
              r="40%"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="5%"
                stopColor="hsl(233 100% 40%)"
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor="hsl(334 100% 50%)"
                stopOpacity={0.8}
              />
            </radialGradient>
          </defs>
          <PolarAngleAxis
            fontSize={16}
            dataKey="month"
            onClick={(e) => handleLabelClick(e.value)}
            tick={(props) => {
              const data = chartData.find(
                (item) => item.month === props.payload.value
              );
              const Icon = data?.icon;
              const x = data?.x as number;
              const y = data?.y as number;
              return Icon ? (
                <Icon
                  {...props}
                  x={props.x - x}
                  y={props.y - y}
                  size={28}
                  fill="white"
                />
              ) : (
                <></>
              );
            }}
            orientation="outer"
          />
          <PolarGrid radialLines={false} strokeWidth={0.3} />
          <Radar
            dataKey="desktop"
            fill="url(#colorGradient)"
            fillOpacity={0.6}
            stroke="url(#colorGradient)"
            strokeWidth={2}
            activeDot={false}
            dot={(props) => {
              const logic = activeLabel === props.payload.payload.month;
              const dotRadius = logic ? 7 : 5;
              const fillColor = logic ? "hsl(334 100% 50%)" : "black";
              return (
                <Dot
                  {...props}
                  r={dotRadius}
                  fill={fillColor}
                  className={cn("", {
                    "animate-pulse": logic,
                  })}
                  fillOpacity={1}
                />
              );
            }}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  );
}
