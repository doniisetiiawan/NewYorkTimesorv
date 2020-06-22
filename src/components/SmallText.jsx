import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import AppText from './AppText';

const styles = StyleSheet.create({
  small: {
    fontSize: 11,
  },
});

const SmallText = ({ children, style, ...rest }) => (
  <AppText style={[styles.small, style]} {...rest}>
    {children}
  </AppText>
);

export default SmallText;

SmallText.propTypes = {
  children: PropTypes.node,
  style: Text.propTypes.style,
};

SmallText.defaultProps = {
  children: null,
  style: {},
};
