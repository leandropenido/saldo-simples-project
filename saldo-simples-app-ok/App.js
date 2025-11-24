import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/pages/HomePage';
import RegisterPage from './src/pages/RegisterPage';
import LoginScreen from './src/pages/LoginScreen';
import CadastroOrcamento from './src/pages/CadastroOrcamento';
import Despesas from './src/pages/Despesas';
import CadastroDeDespesasScreen from './src/pages/CadastroDespesa';
import CadastroEntrada from './src/pages/CadastroEntrada';
import BlankPage from './src/pages/BlankPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
         <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Orcamento" component={CadastroOrcamento} options={{ headerShown: false }} />
         <Stack.Screen name="Despesa" component={Despesas} options={{ headerShown: false }} />
         <Stack.Screen name="CadastroDespesa" component={CadastroDeDespesasScreen} options={{ headerShown: false }} />
         <Stack.Screen name="CadastroEntrada" component={CadastroEntrada} options={{ headerShown: false }} />
         <Stack.Screen name="BlankPage" component={BlankPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

