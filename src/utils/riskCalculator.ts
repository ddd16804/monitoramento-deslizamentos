export const calculateRisk = (humidity: number, inclination: number) => {
  if (humidity > 85 && inclination > 20) return 'alto';
  if (humidity > 70 || inclination > 15) return 'médio';
  return 'baixo';
};

export const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'alto': return '#E74C3C';
    case 'médio': return '#F39C12';
    default: return '#2ECC71';
  }
};