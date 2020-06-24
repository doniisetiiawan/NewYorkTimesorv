import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './Button';
import LinkButton from './LinkButton';
import { LIGHT_OVERLAY_COLOR } from '../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 20,
    position: 'absolute',
    backgroundColor: LIGHT_OVERLAY_COLOR,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const OnboardingButtons = ({
  totalItems,
  currentIndex,
  movePrevious,
  moveNext,
}) => (
  <View style={styles.container}>
    <LinkButton
      onPress={movePrevious}
      active={currentIndex > 0}
    >
      Previous
    </LinkButton>
    <Button
      onPress={moveNext}
      active={currentIndex < totalItems - 1}
    >
      Next
    </Button>
  </View>
);

export default OnboardingButtons;

OnboardingButtons.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  moveNext: PropTypes.func.isRequired,
  movePrevious: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};
