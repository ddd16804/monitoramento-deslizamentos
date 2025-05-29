import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import DataInputScreen from './src/screens/DataInputScreen';
import RiskViewScreen from './src/screens/RiskViewScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import MitigationScreen from './src/screens/MitigationScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E86C1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DataInput" 
          component={DataInputScreen} 
          options={{ title: 'Inserir Dados' }} 
        />
        <Stack.Screen 
          name="RiskView" 
          component={RiskViewScreen} 
          options={{ title: 'Visualização de Risco' }} 
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'Histórico' }} 
        />
        <Stack.Screen 
          name="Mitigation" 
          component={MitigationScreen} 
          options={{ title: 'Ações Preventivas' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}