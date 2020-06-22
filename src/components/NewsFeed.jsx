import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import { WebView } from 'react-native-webview';
import NewsItem from './NewsItem';
import SmallText from './SmallText';
import * as globalStyles from '../styles/global';

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: globalStyles.BG_COLOR,
  },
  closeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});

export default class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.news,
      modalVisible: false,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = () => {
    this.refresh();
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this.setState({
      dataSource: nextProps.news,
    });
  };

  onModalClose = () => {
    this.setState({
      modalVisible: false,
      modalUrl: undefined,
    });
  };

  onModalOpen = (url) => {
    this.setState({
      modalVisible: true,
      modalUrl: url,
    });
  };

  refresh = () => {
    if (this.props.loadNews) {
      this.props.loadNews();
    }
  };

  renderModal = () => (
    <Modal
      animationType="slide"
      visible={this.state.modalVisible}
      onRequestClose={this.onModalClose}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity
          onPress={this.onModalClose}
          style={styles.closeButton}
        >
          <SmallText>Close</SmallText>
        </TouchableOpacity>
        <WebView
          scalesPageToFit
          source={{ uri: this.state.modalUrl }}
        />
      </View>
    </Modal>
  );

  renderRow = (rowData, ...rest) => (
    <NewsItem
      onPress={() => this.onModalOpen(rowData.item.url)}
      style={styles.newsItem}
      index={rowData.index}
      {...rowData.item}
    />
  );

  render() {
    return (
      <View
        style={globalStyles.COMMON_STYLES.pageContainer}
      >
        <FlatList
          ListEmptyComponent
          data={this.state.dataSource}
          renderItem={this.renderRow}
          style={this.props.listStyles}
          keyExtractor={(item, index) => index.toString()}
        />
        {this.renderModal()}
      </View>
    );
  }
}

NewsFeed.propTypes = {
  listStyles: ViewPropTypes.style,
  loadNews: PropTypes.func,
  news: PropTypes.arrayOf(PropTypes.object),
};

NewsFeed.defaultProps = {
  listStyles: {},
  loadNews: () => {},
  news: [
    {
      id: 1,
      title: 'React Native',
      imageUrl:
        'https://github.com/StevenBarquet/gecko-page-2/blob/30e401e711cd86e88b4c981f9ac90e6d576175d0/src/images/home/tech/react.png?raw=true',
      description:
        'Build Native Mobile Apps using JavaScript and React',
      date: new Date(),
      author: 'Facebook',
      location: 'Menlo Park, California',
      url: 'https://facebook.github.io/react-native',
    },
    {
      id: 2,
      title: 'Packt Publishing',
      imageUrl:
        'https://www.packtpub.com/media/logo/stores/1/logo.png',
      description: 'Stay Relevant',
      date: new Date(),
      author: 'Packt Publishing',
      location: 'Birmingham, UK',
      url: 'https://www.packtpub.com/',
    },
  ],
};
