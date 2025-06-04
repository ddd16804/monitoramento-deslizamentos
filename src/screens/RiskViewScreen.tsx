import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RiskIndicator from '../components/RiskIndicator';
import ActuatorSimulation from '../components/ActuatorSimulation';

type RiskViewParams = {
  riskLevel?: 'baixo' | 'médio' | 'alto';
  humidity?: number;
  inclination?: number;
  rain?: number;
  vibration?: number;
};

export default function RiskViewScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();

  // Fallback seguro com tipagem
  const {
    riskLevel = 'baixo',
    humidity = 0,
    inclination = 0,
    rain = 0,
    vibration = 0
  } = params as RiskViewParams || {};

  const getRiskDescription = () => {
    switch(riskLevel) {
      case 'alto': return '🚨 ÁREA COM RISCO ELEVADO! Evacue imediatamente.';
      case 'médio': return '⚠️ Risco moderado. Monitore constantemente.';
      default: return '✅ Área estável.';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RiskIndicator level={riskLevel} />

      <View style={styles.dataContainer}>
        <Text style={styles.dataTitle}>DADOS DOS SENSORES</Text>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Umidade:</Text>
          <Text style={styles.dataValue}>{humidity}%</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Inclinação:</Text>
          <Text style={styles.dataValue}>{inclination}°</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Chuva:</Text>
          <Text style={styles.dataValue}>{rain}mm/h</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Vibração:</Text>
          <Text style={styles.dataValue}>{vibration}Hz</Text>
        </View>
      </View>

      <Text style={styles.description}>{getRiskDescription()}</Text>

      <ActuatorSimulation riskLevel={riskLevel} />

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('DataInput')}
      >
        <Text style={styles.backButtonText}>Nova Análise</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  dataContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    elevation: 2
  },
  dataTitle: {
    fontWeight: 'bold',
    color: '#2E86C1',
    marginBottom: 10,
    fontSize: 16
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  dataLabel: {
    color: '#555',
    fontSize: 16
  },
  dataValue: {
    fontWeight: '600',
    color: '#333'
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 15,
    textAlign: 'center'
  },
  backButton: {
    backgroundColor: '#2E86C1',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});