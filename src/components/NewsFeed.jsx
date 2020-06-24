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
import NetInfo from '@react-native-community/netinfo';
import * as Linking from 'expo-linking';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import NewsItem from './NewsItem';
import SmallText from './SmallText';
import * as globalStyles from '../styles/global';
import AppText from './AppText';

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: globalStyles.BG_COLOR,
  },
  modalButtons: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
      connected: true,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = () => {
    NetInfo.addEventListener((state) => {
      this.handleConnectivityChange(state.isConnected);
    });
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

  handleConnectivityChange = (isConnected) => {
    this.setState({
      connected: isConnected,
    });
    if (isConnected) {
      this.refresh();
    }
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
        <View style={styles.modalButtons}>
          <TouchableOpacity
            onPress={this.onModalClose}
            style={styles.closeButton}
          >
            <SmallText>Close</SmallText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(this.state.modalUrl);
            }}
            style={styles.closeButton}
          >
            <SmallText>Open in Browser</SmallText>
          </TouchableOpacity>
        </View>
        <WebView
          scalesPageToFit
          source={{ uri: this.state.modalUrl }}
        />
      </View>
    </Modal>
  );

  renderRow = (rowData) => (
    <ActionSheetProvider>
      <NewsItem
        onPress={() => this.onModalOpen(rowData.item.url)}
        onBookmark={() => this.props.addBookmark(rowData.item.url)}
        style={styles.newsItem}
        index={rowData.index}
        {...rowData.item}
      />
    </ActionSheetProvider>
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

    if (!this.state.connected) {
      return (
        <View
          style={[
            globalStyles.COMMON_STYLES.pageContainer,
            styles.loadingContainer,
          ]}
        >
          <AppText>No Connection</AppText>
        </View>
      );
    }

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
  addBookmark: PropTypes.func.isRequired,
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
