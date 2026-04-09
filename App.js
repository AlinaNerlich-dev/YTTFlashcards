import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import {
  CormorantGaramond_300Light,
  CormorantGaramond_500Medium_Italic,
  CormorantGaramond_600SemiBold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Jost_300Light,
  Jost_400Regular,
  Jost_500Medium,
} from '@expo-google-fonts/jost';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './src/screens/HomeScreen';
import StudyScreen from './src/screens/StudyScreen';
import CompleteScreen from './src/screens/CompleteScreen';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

function AppNavigator() {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Study" component={StudyScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="Complete" component={CompleteScreen} options={{ animation: 'slide_from_bottom' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    CormorantGaramond_300Light,
    CormorantGaramond_500Medium_Italic,
    CormorantGaramond_600SemiBold,
    Jost_300Light,
    Jost_400Regular,
    Jost_500Medium,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) await SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AppNavigator />
      </View>
    </ThemeProvider>
  );
}
