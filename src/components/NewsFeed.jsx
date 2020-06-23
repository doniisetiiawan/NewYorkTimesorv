import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
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
  container: {
    flex: 1,
  },
  loadingContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
      initialLoading: true,
      modalVisible: false,
      refreshing: false,
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
      initialLoading: false,
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

  renderRow = (rowData) => (
    <NewsItem
      onPress={() => this.onModalOpen(rowData.item.url)}
      style={styles.newsItem}
      index={rowData.index}
      {...rowData.item}
    />
  );

  render() {
    const {
      listStyles = globalStyles.COMMON_STYLES.pageContainer,
      showLoadingSpinner,
    } = this.props;
    const {
      initialLoading,
      refreshing,
      dataSource,
    } = this.state;

    return initialLoading && showLoadingSpinner ? (
      <View style={[listStyles, styles.loadingContainer]}>
        <ActivityIndicator
          animating
          size="small"
          {...this.props}
        />
      </View>
    ) : (
      <View
        style={globalStyles.COMMON_STYLES.pageContainer}
      >
        {dataSource.length > 0 ? (
          <FlatList
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.refresh}
              />
            )}
            ListEmptyComponent
            data={dataSource}
            renderItem={this.renderRow}
            style={this.props.listStyles}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
        {this.renderModal()}
      </View>
    );
  }
}

NewsFeed.propTypes = {
  listStyles: ViewPropTypes.style,
  loadNews: PropTypes.func,
  news: PropTypes.arrayOf(PropTypes.object),
  showLoadingSpinner: PropTypes.bool,
};

NewsFeed.defaultProps = {
  listStyles: {},
  loadNews: () => {},
  news: [],
  showLoadingSpinner: true,
};
