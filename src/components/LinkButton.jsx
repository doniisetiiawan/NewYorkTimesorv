import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import Button from './Button';

const styles = StyleSheet.create({
  button: {
    borderWidth: 0,
  },
});

const LinkButton = ({ style, children, ...rest }) => (
  <Button {...rest} style={[styles.button, style]}>
    {children}
  </Button>
);

export default LinkButton;

LinkButton.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

LinkButton.defaultProps = {
  children: null,
  style: {},
};
