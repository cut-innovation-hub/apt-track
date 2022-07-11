import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import tailwind from 'twrnc';

const HomeScreen = () => {
  return (
    <View style={tailwind`flex-1 items-center justify-center`}>
      <Text>HomeScreen</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default HomeScreen