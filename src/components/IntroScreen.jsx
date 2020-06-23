import PropTypes from 'prop-types';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Title from './Title';
import AppText from './AppText';
import * as globalStyles from '../styles/global';

StatusBar.setBarStyle('light-content');

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function IntroScreen(props) {
  return (
    <View
      style={[
        globalStyles.COMMON_STYLES.pageContainer,
        styles.container,
      ]}
    >
      <TouchableOpacity
        onPress={() => props.navigation.push('Home')}
      >
        <Title>React Native News Reader</Title>
        <AppText>Start Reading</AppText>
      </TouchableOpacity>
    </View>
  );
}

export default IntroScreen;

IntroScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
