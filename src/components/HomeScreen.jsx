import React, { Component } from 'react';
import {
  Alert,
  StatusBar,
  Vibration,
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NewsFeedContainer from '../containers/NewsFeedContainer';
import SearchContainer from '../containers/SearchContainer';
import * as globalStyles from '../styles/global';
import AppText from './AppText';
import BookmarksContainer from '../containers/BookmarksContainer';

// Set the status bar for iOS to light
StatusBar.setBarStyle('light-content');

function Bookmarks() {
  function showBookmarkAlert() {
    Vibration.vibrate();
    Alert.alert(
      'Coming Soon!',
      "We're hard at work on this feature, check back in the near future.",
      [
        {
          text: 'OK',
          onPress: () => console.log('User pressed OK'),
        },
      ],
    );
  }

  showBookmarkAlert();
  return (
    <View style={globalStyles.COMMON_STYLES.pageContainer}>
      <AppText>Bookmarks</AppText>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default class HomeScreen extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'NewsFeed') {
              iconName = focused
                ? 'ios-navigate'
                : 'ios-navigate';
            }
            if (route.name === 'Search') {
              iconName = focused
                ? 'ios-search'
                : 'ios-search';
            }
            if (route.name === 'Bookmarks') {
              iconName = focused
                ? 'ios-bookmarks'
                : 'ios-bookmarks';
            }

            // You can return any component that you like here!
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: globalStyles.LINK_COLOR,
          inactiveTintColor: globalStyles.BAR_COLOR,
        }}
      >
        <Tab.Screen
          name="NewsFeed"
          component={NewsFeedContainer}
        />
        <Tab.Screen
          name="Search"
          component={SearchContainer}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksContainer}
        />
      </Tab.Navigator>
    );
  }
}
