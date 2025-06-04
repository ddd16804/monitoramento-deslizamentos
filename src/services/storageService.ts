import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@monitoramento_deslizamentos:readings';

interface Reading {
  humidity: number;
  inclination: number;
  rain: number;
  vibration: number;
  date: string;
  riskLevel: 'baixo' | 'médio' | 'alto';
}

export const saveReading = async (newReading: Reading) => {
  try {
    const currentData = await getReadings();
    const updatedData = [...currentData, newReading];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (e) {
    console.error('Erro ao salvar dados:', e);
  }
};

export const getReadings = async (): Promise<Reading[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao carregar dados:', e);
    return [];
  }
};

export const clearReadings = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Erro ao limpar dados:', e);
  }
};
