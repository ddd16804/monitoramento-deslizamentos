import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RiskIndicator from '../components/RiskIndicator';

export default function RiskViewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { riskLevel, humidity, inclination } = route.params;

  const getRiskDescription = () => {
    switch(riskLevel) {
      case 'alto':
        return 'Área com alto risco de deslizamento. Evacuação recomendada.';
      case 'médio':
        return 'Área com risco moderado. Monitoramento constante necessário.';
      default:
        return 'Área estável. Continue monitorando regularmente.';
    }
  };

  return (
    <View style={styles.container}>
      <RiskIndicator level={riskLevel} />
      
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Umidade: {humidity}%</Text>
        <Text style={styles.dataText}>Inclinação: {inclination}°</Text>
      </View>

      <Text style={styles.description}>{getRiskDescription()}</Text>

      <TouchableOpacity 
        style={styles.mitigationButton}
        onPress={() => navigation.navigate('Mitigation', { riskLevel: riskLevel })}
      >
        <Text>Ver Ações Preventivas</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('DataInput')}
      >
        <Text style={styles.backButtonText}>Nova Análise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  dataContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    elevation: 2
  },
  dataText: {
    fontSize: 16,
    marginVertical: 5
  },
  description: {
    fontSize: 16,
    marginVertical: 15,
    lineHeight: 24
  },
  mitigationButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  mitigationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  backButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E86C1'
  },
  backButtonText: {
    color: '#2E86C1',
    fontWeight: 'bold',
    fontSize: 16
  }
});