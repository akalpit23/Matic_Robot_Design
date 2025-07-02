export interface TabData {
  id: string;
  label: string;
  title: string;
  description: string;
  specifications: string[];
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface BarChartData {
  name: string;
  value: number;
  color: string;
}

export interface CalculationData {
  id: string;
  title: string;
  content: string;
}