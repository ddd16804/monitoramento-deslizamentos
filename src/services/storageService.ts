import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@monitoramento_deslizamentos:readings';

export const saveReading = async (newReading) => {
  try {
    const currentData = await getReadings();
    const updatedData = [...currentData, newReading];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    console.log('Dado salvo com sucesso:', newReading); // Debug
    return true;
  } catch (e) {
    console.error('Erro ao salvar:', e);
    return false;
  }
};

export const getReadings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('Dados recuperados:', jsonValue); // Debug
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao ler:', e);
    return [];
  }
};

export const clearReadings = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Erro ao limpar:', e);
    return false;
  }
};
