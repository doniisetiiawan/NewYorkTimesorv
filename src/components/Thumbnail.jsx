import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Title from './Title';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderStyle: 'solid',
  },
  image: {
    height: 100,
    justifyContent: 'flex-end',
  },
  title: {
    padding: 5,
  },
});

const Thumbnail = ({
  style,
  titleText,
  accentColor,
  url,
}) => {
  const imageStyle = {
    backgroundColor: `${accentColor}77`, // adds some transparency to the color
  };
  const TitleComponent = (
    <Title style={styles.title}>{titleText}</Title>
  );

  return (
    <View
      style={[
        styles.container,
        { borderColor: accentColor },
        style,
      ]}
    >
      {url.length > 0 ? (
        <Image
          style={[styles.image, imageStyle]}
          source={{
            uri: url,
          }}
        >
          {TitleComponent}
        </Image>
      ) : (
        <View style={[styles.image, imageStyle]}>
          {TitleComponent}
        </View>
      )}
    </View>
  );
};

export default Thumbnail;

Thumbnail.propTypes = {
  accentColor: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  titleText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
