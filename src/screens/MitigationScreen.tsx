import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

export default function MitigationScreen() {
  const route = useRoute();
  const riskLevel = route.params?.riskLevel || 'baixo'; // Recebe o risco da tela anterior

  // Dicas por nível de risco
  const mitigationTips = {
    alto: [
      "🚨 Evacuar a área imediatamente",
      "📞 Acionar Defesa Civil (telefone 199)",
      "⚠️ Desligar energia e gás",
      "🚧 Evitar aproximação de encostas"
    ],
    médio: [
      "🔍 Monitorar a área diariamente",
      "🌧️ Ficar alerta em dias de chuva",
      "✂️ Podar árvores instáveis",
      "📱 Cadastrar-se no sistema de alertas da prefeitura"
    ],
    baixo: [
      "🌱 Plantar vegetação para fixar o solo",
      "🚿 Verificar vazamentos de água",
      "📊 Acompanhar relatórios meteorológicos",
      "🏠 Realizar vistorias mensais na propriedade"
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ações Preventivas ({riskLevel.toUpperCase()})</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {mitigationTips[riskLevel].map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.emergencyButton}
        onPress={() => Alert.alert('Defesa Civil', 'Ligue 199 ou 193 (Bombeiros)')}
      >
        <AntDesign name="phone" size={20} color="white" />
        <Text style={styles.emergencyButtonText}>EMERGÊNCIA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E86C1',
    marginBottom: 20,
    textAlign: 'center'
  },
  scrollContainer: {
    paddingBottom: 20
  },
  tipCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2E86C1',
    elevation: 2
  },
  tipText: {
    fontSize: 16,
    lineHeight: 24
  },
  emergencyButton: {
    flexDirection: 'row',
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  emergencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16
  }
});