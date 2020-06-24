import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { bookmarkedNewsSelector } from '../selectors/newsSelectors';
import {
  addBookmark,
  loadBookmarks,
} from '../actions/bookmarkActions';
import NewsFeed from '../components/NewsFeed';

const mapStateToProps = (state) => ({
  news: bookmarkedNewsSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    loadBookmarks,
    addBookmark,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsFeed);
