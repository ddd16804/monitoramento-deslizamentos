// Versão final com todos os sensores integrados
export const calculateRisk = (
  humidity: number,
  inclination: number,
  rain: number,
  vibration: number
): 'baixo' | 'médio' | 'alto' => {
  
  // Valores críticos (ajuste conforme necessidade)
  const LIMITES = {
    HUMIDADE_ALTA: 90,
    INCLINACAO_ALTA: 45,
    CHUVA_ALERTA: 30,
    VIBRACAO_ALERTA: 5
  };

  // Lógica hierárquica
  if (
    humidity > LIMITES.HUMIDADE_ALTA || 
    inclination > LIMITES.INCLINACAO_ALTA ||
    rain > LIMITES.CHUVA_ALERTA ||
    vibration > LIMITES.VIBRACAO_ALERTA
  ) {
    return 'alto';
  }

  if (
    humidity > 80 || 
    inclination > 30 ||
    rain > 15
  ) {
    return 'médio';
  }

  return 'baixo';
};