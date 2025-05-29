import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/alerta.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Alerta Deslizamentos</Text>
      <Text style={styles.subtitle}>Monitoramento inteligente de áreas de risco</Text>
      
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
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  logo: { 
    width: 150, 
    height: 150, 
    marginBottom: 30 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#2E86C1'
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 40, 
    textAlign: 'center' 
  },
  button: {
    backgroundColor: '#2E86C1',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});