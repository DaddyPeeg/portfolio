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
import {
  DiAtom,
  DiCode,
  DiFirebase,
  DiJava,
  DiJavascript1,
  DiNginx,
  DiPostgresql,
} from "react-icons/di";
import {
  FaAws,
  FaBootstrap,
  FaCss3Alt,
  FaDocker,
  FaGithub,
  FaGithubSquare,
  FaGitlab,
  FaGitSquare,
  FaHtml5,
  FaJava,
  FaJira,
  FaNode,
  FaPhp,
  FaPython,
  FaReact,
  FaTrello,
  FaUserLock,
} from "react-icons/fa";
import {
  SiApachemaven,
  SiClickup,
  SiCplusplus,
  SiDrizzle,
  SiExpress,
  SiFastapi,
  SiGithubactions,
  SiGooglecloud,
  SiLeetcode,
  SiMongodb,
  SiMysql,
  SiPrisma,
  SiShadcnui,
  SiThealgorithms,
  SiTypescript,
  SiVite,
  SiWebpack,
} from "react-icons/si";
import { GrGraphQl } from "react-icons/gr";
import SkillsSlider from "./SkillCard/SkillsSlider";
import { ChartDataItem } from "@/types";
import { IoLogoFigma, IoLogoFirebase, IoLogoJavascript } from "react-icons/io5";
import {
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { TbApi } from "react-icons/tb";

export const chartData: ChartDataItem[] = [
  {
    month: "Frontend Development",
    score: 88.6,
    icon: DiAtom,
    x: 14,
    y: 30,
    tech: [
      { name: "HTML", logo: FaHtml5, score: 9 },
      { name: "CSS/SASS", logo: FaCss3Alt, score: 8 },
      { name: "JavaScript (ES6+)", logo: IoLogoJavascript, score: 9.5 },
      { name: "React", logo: FaReact, score: 9 },
      { name: "Bootstrap", logo: FaBootstrap, score: 8 },
      { name: "Tailwind CSS", logo: RiTailwindCssFill, score: 9 },
      { name: "TypeScript", logo: SiTypescript, score: 9 },
      { name: "Figma", logo: IoLogoFigma, score: 9 },
      { name: "Shadcn", logo: SiShadcnui, score: 10 },
      { name: "Webpack", logo: SiWebpack, score: 8 },
      { name: "Vite", logo: SiVite, score: 9 },
    ],
  },
  {
    month: "Backend Development",
    score: 88,
    icon: DiCode,
    x: -5,
    y: 20,
    tech: [
      { name: "Node.js", logo: FaNode, score: 9.5 },
      { name: "PHP", logo: FaPhp, score: 8 },
      { name: "Python", logo: FaPython, score: 8.5 },
      { name: "Java", logo: FaJava, score: 7.5 },
      { name: "Express.js", logo: SiExpress, score: 9 },
      { name: "NextJS", logo: RiNextjsFill, score: 10 },
      { name: "FastAPI", logo: SiFastapi, score: 9 },
      { name: "GraphQL", logo: GrGraphQl, score: 8.5 },
      { name: "REST API", logo: TbApi, score: 9 },
      {
        name: "Authentication",
        logo: FaUserLock,
        score: 9.0,
      },
    ],
  },
  {
    month: "Database Management",
    score: 81.4,
    icon: DiFirebase,
    x: -2,
    y: 5,
    tech: [
      { name: "MySQL", logo: SiMysql, score: 9 },
      { name: "PostgreSQL", logo: DiPostgresql, score: 9 },
      { name: "MongoDB", logo: SiMongodb, score: 9 },
      {
        name: "Firebase",
        logo: IoLogoFirebase,
        score: 8.5,
      },
      { name: "Supabase", logo: RiSupabaseFill, score: 7.5 },

      { name: "Prisma", logo: SiPrisma, score: 8 },
      { name: "Drizzle", logo: SiDrizzle, score: 6 },
    ],
  },
  {
    month: "DevOps/Deployment",
    score: 68.3,
    icon: FaDocker,
    x: 10,
    y: 0,
    tech: [
      { name: "AWS", logo: FaAws, score: 6 },
      { name: "Google Cloud", logo: SiGooglecloud, score: 7.5 },
      { name: "GitHub Actions", logo: SiGithubactions, score: 8 },
      { name: "Docker", logo: FaDocker, score: 7 },
      { name: "Nginx", logo: DiNginx, score: 6.5 },
      { name: "Apache", logo: SiApachemaven, score: 6 },
    ],
  },
  {
    month: "Version Control & Collaboration",
    score: 89.2,
    icon: FaGithubSquare,
    x: 30,
    y: 3,
    tech: [
      { name: "Git", logo: FaGitSquare, score: 9 },
      { name: "GitHub", logo: FaGithub, score: 9 },
      { name: "GitLab", logo: FaGitlab, score: 8 },
      { name: "Jira", logo: FaJira, score: 10 },
      { name: "Trello", logo: FaTrello, score: 9 },
      { name: "ClickUp", logo: SiClickup, score: 8.5 },
    ],
  },
  {
    month: "Problem Solving & Algorithms",
    score: 70.5,
    icon: SiThealgorithms,
    x: 30,
    y: 20,
    tech: [
      { name: "Python", logo: FaPython, score: 8 },
      { name: "JavaScript", logo: DiJavascript1, score: 9.5 },
      { name: "Java", logo: DiJava, score: 7 },
      { name: "C++", logo: SiCplusplus, score: 6 },
      { name: "LeetCode", logo: SiLeetcode, score: 7 },
    ],
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
  const [activeLabel, setActiveLabel] = useState<string | null>(
    chartData[0].month
  );
  const [activeData, setActiveData] = useState<ChartDataItem>(chartData[0]);

  const handleLabelClick = useCallback(
    (label: string) => {
      const indexOfLabel = chartData.findIndex((data) => data.month === label);
      selectSkill(indexOfLabel);
      setActiveLabel(label === activeLabel ? null : label);
      setActiveData(
        label === activeLabel ? activeData : chartData[indexOfLabel]
      );
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
    setActiveData(
      e.activeLabel === activeLabel ? activeData : chartData[indexOfLabel]
    );
  }, []);

  return (
    <div className="w-full flex flex-col max-w-[32rem] items-center">
      <div className="w-full max-w-[17rem] aspect-square">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-full"
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
                    y={props.y - y + 5}
                    size={20}
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
              dataKey="score"
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
      <SkillsSlider chartData={activeData} />
    </div>
  );
}
