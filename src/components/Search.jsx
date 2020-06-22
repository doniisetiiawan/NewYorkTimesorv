import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import * as globalStyles from '../styles/global';
import NewsFeed from './NewsFeed';

const styles = StyleSheet.create({
  input: {
    height: 35,
    color: globalStyles.TEXT_COLOR,
    paddingHorizontal: 5,
    flex: 1,
  },
  search: {
    borderColor: globalStyles.MUTED_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  searchNews = (text) => {
    this.setState({ searchText: text });
    this.props.searchNews(text);
  };

  render() {
    return (
      <View
        style={globalStyles.COMMON_STYLES.pageContainer}
      >
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.searchNews(text)}
            value={this.state.searchText}
            placeholder="Search"
            placeholderTextColor={globalStyles.MUTED_COLOR}
          />
        </View>
        {this.props.filteredNews.length > 0 ? (
          <NewsFeed
            news={this.props.filteredNews}
            listStyles={{}}
          />
        ) : null}
      </View>
    );
  }
}

Search.propTypes = {
  filteredNews: PropTypes.arrayOf(PropTypes.object),
  searchNews: PropTypes.func.isRequired,
};

Search.defaultProps = {
  filteredNews: [],
};
