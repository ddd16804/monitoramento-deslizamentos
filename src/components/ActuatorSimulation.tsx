import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function ActuatorSimulation({ riskLevel }: { riskLevel: string }) {
  const blinkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (riskLevel === 'alto') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
          }),
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
          })
        ])
      ).start();
    }
  }, [riskLevel]);

  if (riskLevel !== 'alto') return null;

  return (
    <Animated.View style={[
      styles.container,
      { opacity: blinkAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1]
        }) 
      }
    ]}>
      <Text style={styles.text}>🔴 SIRENE DE ALERTA ATIVADA</Text>
      <Text style={styles.text}>🚧 BARRERIA DE CONTENÇÃO ACIONADA</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FDEDED',
    borderRadius: 8,
    marginVertical: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#E74C3C'
  },
  text: {
    color: '#D32F2F',
    fontWeight: 'bold',
    marginVertical: 3,
    fontSize: 15
  }
});