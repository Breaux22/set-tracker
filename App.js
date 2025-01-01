import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import Settings from './components/Settings/Settings'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Daily from './pages/DailyViewPage';
import Weekly from './pages/WeeklyViewPage';
import Monthly from './pages/MonthlyViewPage';
import Case from './pages/CasePage';
import NewCase from './pages/NewCasePage';
import Camera from './pages/TakePicture';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Monthly View" component={Monthly} />
        <Stack.Screen name="Weekly View" component={Weekly} />
        <Stack.Screen name="Daily View" component={Daily} />
        <Stack.Screen name="Case Info" component={Case} />
        <Stack.Screen name="Create New Case" component={NewCase} />
        <Stack.Screen name="Take Picture" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
