import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ImageScreen from './src/screens/ImageScreen';
import pexelsLogo from './assets/pexels-logo.jpg';

const Stack = createNativeStackNavigator();


export default function App() {

  const [openSearch, setOpenSearch] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen'
          options={{
            headerLeft: () => <Image source={pexelsLogo}
              style={styles.pexelLogo}
            />,
            headerRight: () => (
              <Text
                onPress={() => setOpenSearch(!openSearch)}
                style={styles.textSearch}
              >{(openSearch) ? 'Close' : 'Search...'}
              </Text>
            ),
            title: 'Pexels API',
            headerTintColor: "#FFFFFF",
            headerStyle: {
              backgroundColor: '#303546'
            }
          }}
        >
          {(props) => <HomeScreen {...props} openSearch={openSearch}  /> }
        </Stack.Screen>
        <Stack.Screen 
          name='ImageScreen' 
          component={ImageScreen} 
          options={{
            title: 'Pexels API',
            headerTintColor: "#FFFFFF",
            headerStyle: {
              backgroundColor: '#303546'
            }
          }}
        />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  pexelLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
    marginVertical: 5,
  },
  textSearch: {
    color: '#FFFFFF',
    fontSize: 20,

  }
})

