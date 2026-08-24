import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';

import DashboardScreen from './src/screens/DashboardScreen';
import AddBetScreen from './src/screens/AddBetScreen';
import BetHistoryScreen from './src/screens/BetHistoryScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: 'Betpawa Tracker' }}
      />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="History" 
        component={BetHistoryScreen}
        options={{ title: 'Bet History' }}
      />
    </Stack.Navigator>
  );
}

function StatisticsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Stats" 
        component={StatisticsScreen}
        options={{ title: 'Statistics' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'DashboardTab') {
                iconName = 'home';
              } else if (route.name === 'AddBetTab') {
                iconName = 'plus-circle';
              } else if (route.name === 'HistoryTab') {
                iconName = 'history';
              } else if (route.name === 'StatsTab') {
                iconName = 'chart-line';
              } else if (route.name === 'SettingsTab') {
                iconName = 'cog';
              }
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="DashboardTab" component={DashboardStack} options={{ title: 'Home' }} />
          <Tab.Screen name="AddBetTab" component={AddBetScreen} options={{ title: 'Add Bet' }} />
          <Tab.Screen name="HistoryTab" component={HistoryStack} options={{ title: 'History' }} />
          <Tab.Screen name="StatsTab" component={StatisticsStack} options={{ title: 'Stats' }} />
          <Tab.Screen name="SettingsTab" component={SettingsStack} options={{ title: 'Settings' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
