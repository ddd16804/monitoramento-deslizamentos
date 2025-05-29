import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function RiskChart({ data }) {
  // Formata os dados para o gráfico
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString('pt-BR').slice(0,5)),
    datasets: [
      {
        data: data.map(item => item.humidity),
        color: (opacity = 1) => `rgba(46, 134, 193, ${opacity})`, // Azul para umidade
        strokeWidth: 2
      },
      {
        data: data.map(item => item.inclination),
        color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`, // Vermelho para inclinação
        strokeWidth: 2
      }
    ],
    legend: ["Umidade (%)", "Inclinação (°)"]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Variação Histórica</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ffffff"
          }
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E86C1'
  },
  chart: {
    borderRadius: 10
  }
});