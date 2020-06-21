import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActionSheetIOS,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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

export default class NewsItem extends Component {
  onLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Bookmark', 'Cancel'],
        cancelButtonIndex: 1,
        title: this.props.title,
      },
      (buttonIndex) => console.log('Button selected', buttonIndex),
    );
  };

  render() {
    const {
      style,
      imageUrl,
      title,
      author,
      date,
      location,
      description,
      onPress,
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

NewsItem.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};
