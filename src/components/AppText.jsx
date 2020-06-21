import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import * as globalStyles from '../styles/global';

const AppText = ({ children, style, ...rest }) => (
  <Text
    style={[globalStyles.COMMON_STYLES.text, style]}
    {...rest}
  >
    {children}
  </Text>
);

export default AppText;

AppText.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};
