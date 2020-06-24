import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';

const BORDER_COLOR = '#fff';
const BG_COLOR = 'transparent';
const TEXT_COLOR = '#fff';
const DISABLED_COLOR = `${TEXT_COLOR}5`;

const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid',
    borderColor: BORDER_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: BG_COLOR,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  disabledButton: {
    borderColor: DISABLED_COLOR,
  },
  text: {
    color: TEXT_COLOR,
    fontWeight: 'bold',
  },
  disabledText: {
    color: DISABLED_COLOR,
  },
});

const Button = ({
  style,
  active,
  onPress,
  children,
  ...rest
}) => (
  <TouchableOpacity
    activeOpacity={active ? 0.7 : 1}
    onPress={active ? onPress : null}
    {...rest}
    style={[
      styles.button,
      style,
      !active ? styles.disabledButton : {},
    ]}
  >
    <Text
      style={[
        styles.text,
        !active ? styles.disabledText : {},
      ]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

export default Button;

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
};

Button.defaultProps = {
  active: true,
  children: null,
  onPress: () => {},
  style: {},
};
