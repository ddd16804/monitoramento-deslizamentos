import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveReading } from '../services/storageService';
import { calculateRisk } from '../utils/riskCalculator';

export default function DataInputScreen() {
  const navigation = useNavigation();
  const [humidity, setHumidity] = useState('');
  const [inclination, setInclination] = useState('');
  const [rain, setRain] = useState('');
  const [vibration, setVibration] = useState('');

  // Simulação automática de sensores
  const simulateSensors = () => {
    setHumidity((Math.random() * 100).toFixed(1));
    setInclination((Math.random() * 45).toFixed(1));
    setRain((Math.random() * 50).toFixed(1));
    setVibration((Math.random() * 10).toFixed(1));
  };

  const handleSubmit = async () => {
    // Validação mínima
    if (!humidity || !inclination) {
      Alert.alert('Erro', 'Preencha pelo menos umidade e inclinação');
      return;
    }

    const reading = {
      humidity: Number(humidity),
      inclination: Number(inclination),
      rain: Number(rain || 0),
      vibration: Number(vibration || 0),
      date: new Date().toISOString(),
      riskLevel: calculateRisk(
        Number(humidity),
        Number(inclination),
        Number(rain || 0),
        Number(vibration || 0)
      )
    };

    await saveReading(reading);
    navigation.navigate('RiskView', reading);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Umidade do Solo (%)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 65"
        value={humidity}
        onChangeText={setHumidity}
      />

      <Text style={styles.label}>Inclinação (graus)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 12"
        value={inclination}
        onChangeText={setInclination}
      />

      <Text style={styles.label}>Chuva (mm/h)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 20"
        value={rain}
        onChangeText={setRain}
      />

      <Text style={styles.label}>Vibração (Hz)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 5"
        value={vibration}
        onChangeText={setVibration}
      />

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={simulateSensors}
      >
        <Text style={styles.secondaryButtonText}>Simular Sensores</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, (!humidity || !inclination) && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!humidity || !inclination}
      >
        <Text style={styles.buttonText}>Calcular Risco</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.secondaryButtonText}>Ver Histórico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: '#2E86C1',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center'
  },
  disabledButton: {
    backgroundColor: '#aaa'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  secondaryButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E86C1'
  },
  secondaryButtonText: {
    color: '#2E86C1',
    fontWeight: 'bold',
    fontSize: 16
  }
});