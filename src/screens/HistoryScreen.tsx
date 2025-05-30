import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { getReadings, clearReadings } from '../services/storageService';
import { AntDesign } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

export default function HistoryScreen() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistoryData = async () => {
    try {
      setRefreshing(true);
      const data = await getReadings();
      setReadings(data.reverse());
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      Alert.alert('Erro', 'Não foi possível carregar o histórico');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearReadings();
      setReadings([]);
      Alert.alert('Sucesso', 'Histórico limpo com sucesso');
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
      Alert.alert('Erro', 'Não foi possível limpar o histórico');
    }
  };

  const prepareChartData = () => {
    const orderedReadings = [...readings].reverse();
    return {
      labels: orderedReadings.map(item => 
        new Date(item.date).toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit' 
        })
      ),
      datasets: [
        {
          data: orderedReadings.map(item => item.humidity),
          color: (opacity = 1) => `rgba(46, 134, 193, ${opacity})`,
          label: "Umidade (%)",
          strokeWidth: 2
        },
        {
          data: orderedReadings.map(item => item.inclination),
          color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
          label: "Inclinação (°)",
          strokeWidth: 2
        }
      ]
    };
  };

  useEffect(() => {
    loadHistoryData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E86C1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico de Monitoramento</Text>
        {readings.length > 0 && (
          <TouchableOpacity onPress={handleClearHistory}>
            <AntDesign name="delete" size={24} color="#E74C3C" />
          </TouchableOpacity>
        )}
      </View>

      {readings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AntDesign name="inbox" size={50} color="#bbb" />
          <Text style={styles.emptyText}>Nenhum dado registrado ainda</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Variação Histórica</Text>
            <LineChart
              data={prepareChartData()}
              width={Dimensions.get('window').width - 40}
              height={240}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#f8f9fa",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#ffffff"
                },
                fillShadowGradient: (dataPoint, index) => {
                  const risk = readings.reverse()[index]?.riskLevel;
                  return risk === 'alto' ? 'rgba(231, 76, 60, 0.3)' : 
                         risk === 'médio' ? 'rgba(243, 156, 18, 0.3)' : 
                         'rgba(46, 204, 113, 0.3)';
                }
              }}
              bezier
              style={styles.chartStyle}
              fromZero={true}
              verticalLabelRotation={30}
            />
          </View>

          <FlatList
            data={readings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.item, {
                borderLeftColor: item.riskLevel === 'alto' ? '#E74C3C' :
                                 item.riskLevel === 'médio' ? '#F39C12' : '#2ECC71'
              }]}>
                <Text style={styles.itemDate}>
                  {new Date(item.date).toLocaleDateString('pt-BR')} às{' '}
                  {new Date(item.date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
                
                <View style={styles.itemRow}>
                  <Text style={styles.itemText}>Umidade: {item.humidity}%</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemText}>Inclinação: {item.inclination}°</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={[
                    styles.itemText,
                    {
                      color: item.riskLevel === 'alto' ? '#E74C3C' :
                             item.riskLevel === 'médio' ? '#F39C12' : '#2ECC71'
                    }
                  ]}>
                    Risco: {item.riskLevel.toUpperCase()}
                  </Text>
                </View>
              </View>
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E86C1'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 2
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E86C1'
  },
  chartStyle: {
    borderRadius: 10
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
    borderLeftWidth: 5,
    elevation: 2
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  itemRow: {
    marginVertical: 2
  },
  itemText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left'
  },
  listContent: {
    paddingBottom: 20
  }
});
