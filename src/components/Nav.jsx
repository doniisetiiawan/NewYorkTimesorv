import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from './IntroScreen';
import HomeScreen from './HomeScreen';
import * as globalStyles from '../styles/global';
import Onboarding from './Onboarding';

const Stack = createStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: globalStyles.MUTED_COLOR,
          },
        }}
      >
        <Stack.Screen
          name="Intro"
          options={{
            title: 'Welcome',
          }}
        >
          {(props) => <IntroScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          options={{
            title: 'RNNYT',
          }}
        >
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Onboarding"
          options={{
            title: 'Onboarding',
          }}
        >
          {(props) => <Onboarding {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
