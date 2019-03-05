import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { PageAbstract } from 'components/commons';
import { historySort } from 'constantsApp';
import {
  TableCollectionHistory,
  SearchFilterHistory,
} from 'components/collections';
import {
  makePageHistoryParam,
  makeGetListHistory,
  makeErrorMessageHistory,
} from '../selectors';
import {
  searchCollectionHistory,
  setParamsCollectionHistory,
} from '../actions';

class CollectionHistory extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isActiveNext: true,
      isSearching: false,
    };
    this.filter = { userId: 'UserX001' };
    this.sort = '';
  }

  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchCollectionHistory({
      page,
      size,
      filter: { userId: 'UserX001' },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listHistorys !== nextProps.listHistorys) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listHistorys.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsCollectionHistory({ size, page: page + pageOffset });
    this.props.searchCollectionHistory({
      page: page + pageOffset,
      size,
      filter: this.filter,
    });
  };

  handleSize = size => {
    this.props.setParamsCollectionHistory({ size, page: 1 });
    this.props.searchCollectionHistory({
      page: 1,
      size,
      filter: this.filter,
    });
  };

  handleSortHistory = (key, value) => {
    this.props.searchCollectionHistory(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: historySort[key][value],
      },
      () => {
        this.props.setParamsCollectionHistory({ page: 1, size: 20 });
      },
    );

    this.sort = historySort[key][value];
  };

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchCollectionHistory(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsCollectionHistory({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  render() {
    const {
      listHistorys,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;

    return (
      <div className="global-page customer-page">
        <PageAbstract>
          <Row>
            <Col md={12}>
              <h3 className="bold-text">Collection History</h3>
              <SearchFilterHistory
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </Row>
          <Row>
            <TableCollectionHistory
              data={listHistorys || []}
              page={page}
              size={size}
              handlePage={this.handlePage}
              handleSortHistory={this.handleSortHistory}
              isActiveNext={this.state.isActiveNext}
              handleSize={this.handleSize}
              errorMessage={errorMessage}
            />
          </Row>
        </PageAbstract>
      </div>
    );
  }
}
CollectionHistory.propTypes = {
  listHistorys: PropTypes.array,
  searchCollectionHistory: PropTypes.func,
  params: PropTypes.object,
  setParamsCollectionHistory: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listHistorys: makeGetListHistory() || [],
  params: makePageHistoryParam() || {},
  errorMessage: makeErrorMessageHistory() || '',
});

export default connect(
  mapStateToProps,
  {
    searchCollectionHistory,
    setParamsCollectionHistory,
  },
)(CollectionHistory);
