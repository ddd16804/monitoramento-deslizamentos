import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/alerta.png')} // Verifique o caminho
        style={styles.logo}
      />
      <Text style={styles.title}>Alerta Deslizamentos</Text>
      <Text style={styles.subtitle}>Monitoramento inteligente</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('DataInput')}
      >
        <Text style={styles.buttonText}>Iniciar Monitoramento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f8f9fa'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86C1',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40
  },
  button: {
    backgroundColor: '#2E86C1',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});