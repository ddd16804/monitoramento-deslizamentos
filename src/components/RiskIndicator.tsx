import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRiskColor } from '../utils/riskCalculator';

export default function RiskIndicator({ level }) {
  const color = getRiskColor(level);
  const textColor = level === 'baixo' ? '#333' : '#fff';
  
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={[styles.text, { color: textColor }]}>Nível de Risco: {level.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18
  }
});