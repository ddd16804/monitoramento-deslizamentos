import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getRiskColor = (level: string) => {
  switch(level) {
    case 'alto': return '#E74C3C'; // Vermelho
    case 'médio': return '#F39C12'; // Laranja
    default: return '#2ECC71'; // Verde
  }
};

export default function RiskIndicator({ level }: { level: string }) {
  return (
    <View style={[
      styles.container,
      { backgroundColor: getRiskColor(level) }
    ]}>
      <Text style={styles.text}>NÍVEL DE RISCO: {level.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1
  }
});