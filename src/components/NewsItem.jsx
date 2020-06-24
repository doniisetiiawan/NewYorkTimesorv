import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import Byline from './Byline';
import AppText from './AppText';
import Thumbnail from './Thumbnail';
import * as globalStyles from '../styles/global';

const styles = StyleSheet.create({
  thumbnail: {
    marginBottom: 5,
  },
  content: {
    paddingHorizontal: 5,
  },
});

class NewsItem extends Component {
  onLongPress = () => {
    console.log(this.props);
    this.props.showActionSheetWithOptions(
      {
        options: ['Bookmark', 'Cancel'],
        cancelButtonIndex: 1,
        title: this.props.title,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.props.onBookmark();
        }
      },
    );
  };

  render() {
    const { style, onPress } = this.props;
    const {
      author,
      date,
      description,
      imageUrl,
      location,
      title,
    } = this.props;

    const accentColor = globalStyles.ACCENT_COLORS[
      this.props.index % globalStyles.ACCENT_COLORS.length
    ];

    return (
      <TouchableOpacity
        style={style}
        onLongPress={this.onLongPress}
        onPress={onPress}
      >
        <View>
          <Thumbnail
            url={imageUrl}
            titleText={title}
            accentColor={accentColor}
            style={styles.thumbnail}
          />
          <View style={styles.content}>
            <Byline
              author={author}
              date={date}
              location={location}
            />
            <AppText>{description}</AppText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const ConnectedApp = connectActionSheet(NewsItem);

export default ConnectedApp;

NewsItem.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  index: PropTypes.number.isRequired,
  location: PropTypes.string,
  onBookmark: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  showActionSheetWithOptions: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
};

NewsItem.defaultProps = {
  description: '',
  imageUrl: '',
  location: '',
  style: {},
};
