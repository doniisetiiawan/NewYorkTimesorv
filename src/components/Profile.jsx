import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Title from './Title';
import AppText from './AppText';
import * as globalStyles from '../styles/global';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    color: globalStyles.HEADER_TEXT_COLOR,
    fontSize: 200,
  },
});

export default function Profile() {
  return (
    <View
      style={[
        globalStyles.COMMON_STYLES.pageContainer,
        styles.container,
      ]}
    >
      <Ionicons name="ios-person" style={styles.avatarIcon} />
      <Title>Username</Title>
      <AppText>Your Name</AppText>
    </View>
  );
}
