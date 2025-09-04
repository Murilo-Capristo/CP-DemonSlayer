import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CharacterListScreen from './src/screens/CharacterListScreen';
import CharacterDetailsScreen from './src/screens/CharacterDetailsScreen';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CharacterListScreen">
          <Stack.Screen 
            name="CharacterListScreen" 
            component={CharacterListScreen} 
            options={{ title: 'Personagens' }}
          />
          <Stack.Screen 
            name="CharacterDetailsScreen" 
            component={CharacterDetailsScreen} 
            options={{ title: 'Detalhes do Personagem' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
