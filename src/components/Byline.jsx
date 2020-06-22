import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SmallText from './SmallText';
import * as globalStyles from '../styles/global';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  location: {
    color: globalStyles.MUTED_COLOR,
  },
});

const Byline = ({ date, author, location }) => (
  <View>
    <View style={styles.row}>
      <SmallText>{date}</SmallText>
      <SmallText>{author}</SmallText>
    </View>

    {location ? (
      <View style={styles.row}>
        <SmallText style={styles.location}>
          {location}
        </SmallText>
      </View>
    ) : null}
  </View>
);

export default Byline;

Byline.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string,
};

Byline.defaultProps = {
  location: '',
};
