#!/bin/bash
echo "🧘 YTT Flashcards — Setup"
echo "Installing base dependencies..."
npm install
echo "Installing Expo SDK 54..."
npx expo install expo@54
echo "Installing all required packages..."
npx expo install expo-asset expo-splash-screen expo-font expo-linear-gradient expo-haptics babel-preset-expo @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated @react-native-async-storage/async-storage react-native-svg
echo "Fixing all package versions for SDK 54..."
npx expo install --fix
echo ""
echo "✓ Done! Now run: npx expo start"
