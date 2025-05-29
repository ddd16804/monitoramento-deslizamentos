export interface ChartDataPoint {
  date: string;
  humidity: number;
  inclination: number;
  riskLevel: 'baixo' | 'médio' | 'alto';
}

export interface ChartProps {
  data: ChartDataPoint[];
}