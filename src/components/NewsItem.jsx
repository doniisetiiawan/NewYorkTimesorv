import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActionSheetIOS,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
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

NewsItem.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  index: PropTypes.number.isRequired,
  item: PropTypes.object,
  location: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
};

NewsItem.defaultProps = {
  description: '',
  imageUrl: '',
  item: {},
  location: '',
  style: {},
};
