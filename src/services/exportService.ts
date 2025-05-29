import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const exportToCSV = async (data) => {
  let csv = 'Data,Umidade (%),Inclinação (°),Risco\n';
  
  data.forEach(item => {
    csv += `${item.date},${item.humidity},${item.inclination},${item.riskLevel}\n`;
  });

  const fileUri = FileSystem.documentDirectory + 'dados_risco.csv';
  await FileSystem.writeAsStringAsync(fileUri, csv);
  
  await Sharing.shareAsync(fileUri, {
    mimeType: 'text/csv',
    dialogTitle: 'Exportar Dados'
  });
};