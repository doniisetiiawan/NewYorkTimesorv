import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  hidden: { height: 0, flex: 0 },
});

const CollapsibleView = ({ children, style, hide }) => (
  <View
    style={[styles.container, hide ? styles.hidden : {}]}
  >
    <View style={[styles.absoluteContainer, style]}>
      {children}
    </View>
  </View>
);

export default CollapsibleView;

CollapsibleView.propTypes = {
  children: PropTypes.node,
  hide: PropTypes.bool.isRequired,
  style: ViewPropTypes.style,
};

CollapsibleView.defaultProps = {
  children: null,
  style: {},
};
