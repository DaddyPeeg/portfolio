import { IconType } from "react-icons";

type ChartDataTech = {
  name: string;
  logo: IconType;
  score: number;
};

export type ChartDataItem = {
  month: string;
  score: number;
  icon: IconType;
  x: number;
  y: number;
  tech: ChartDataTech[];
};
