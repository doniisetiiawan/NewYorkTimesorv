import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from './AppText';
import * as globalStyles from '../styles/global';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: globalStyles.HEADER_TEXT_COLOR,
    backgroundColor: `${globalStyles.BG_COLOR}99`,
  },
});

const Title = ({ style, children }) => (
  <AppText style={[styles.title, style]}>
    {children}
  </AppText>
);

export default Title;

Title.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};

Title.defaultProps = {
  children: null,
  style: null,
};
