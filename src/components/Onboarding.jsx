import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import OnboardingButtons from './OnboardingButtons';
import OnboardingPanel from './OnboardingPanel';
import onboardingContent from '../config/onboarding';
import CollapsibleView from './CollapsibleView';
import AppText from './AppText';
import { ACCENT_COLORS } from '../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panelContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  doneContainer: {
    overflow: 'hidden',
    backgroundColor: ACCENT_COLORS[0],
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    fontSize: 20,
  },
});

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      isDone: false,
    };
  }

  movePrevious = () => {
    this.transitionToNextPanel(this.state.currentIndex - 1);
  };

  moveNext = () => {
    this.transitionToNextPanel(this.state.currentIndex + 1);
  };

  transitionToNextPanel = (nextIndex) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut,
    );
    this.setState({
      currentIndex: nextIndex,
    });
  };

  moveFinal = () => {
    LayoutAnimation.configureNext({
      duration: 1250,
      update: {
        springDamping: 0.4,
        type: LayoutAnimation.Types.spring,
      },
    });
    this.setState({ isDone: true });
    setTimeout(() => {
      this.props.navigation.push('Home');
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <CollapsibleView
            style={[styles.container]}
            hide={this.state.isDone}
          >
            <View style={styles.panelContainer}>
              <OnboardingPanel
                {...onboardingContent[
                  this.state.currentIndex
                ]}
              />
            </View>
            <OnboardingButtons
              totalItems={onboardingContent.length}
              currentIndex={this.state.currentIndex}
              movePrevious={this.movePrevious}
              moveNext={this.moveNext}
              moveFinal={this.moveFinal}
            />
          </CollapsibleView>
          <CollapsibleView
            hide={!this.state.isDone}
            style={styles.doneContainer}
          >
            <AppText style={styles.doneText}>
              Let s read the news!
            </AppText>
          </CollapsibleView>
        </View>
      </View>
    );
  }
}

Onboarding.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
