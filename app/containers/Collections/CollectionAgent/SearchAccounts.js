import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { PageAbstract } from 'components/commons';
import { accountSort } from 'constantsApp';
import {
  TableSearchAccounts,
  SearchFilterAccounts,
} from 'components/collections';
import {
  makeGetListAccounts,
  makePageAccountParams,
  makeErrorMessageAccounts,
} from '../selectors';
import {
  searchAccountsCollection,
  setParamsAccountsCollection,
} from '../actions';

class SearchAccounts extends React.PureComponent {
  constructor() {
    super();
    this.state = { isActiveNext: true, isSearching: false };
    this.filter = { userId: 'UserX001' };
    this.sort = 'firstName_ASC';
  }

  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchAccountsCollection({
      filter: {
        userId: 'UserX001',
      },
      sort: 'firstName_ASC',
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listAccounts !== nextProps.listAccounts) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listAccounts.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchAccountsCollection(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsAccountsCollection({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsAccountsCollection({ size, page: page + pageOffset });
    this.props.searchAccountsCollection({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsAccountsCollection({ size, page: 1 });
    this.props.searchAccountsCollection({
      page: 1,
      size,
      filter: this.filter,
    });
  };

  handleSortAccount = (key, value) => {
    this.props.searchAccountsCollection(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: accountSort[key][value],
      },
      () => {
        this.props.setParamsAccountsCollection({ page: 1, size: 20 });
      },
    );
    this.sort = accountSort[key][value];
  };

  render() {
    const {
      listAccounts,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <div className="global-page customer-page">
        <PageAbstract>
          <Row>
            <Col md={12}>
              <h3 className="bold-text">Account</h3>
              <SearchFilterAccounts
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </Row>
          <Row>
            <TableSearchAccounts
              data={listAccounts}
              page={page}
              size={size}
              handlePage={this.handlePage}
              handleSortAccount={this.handleSortAccount}
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

SearchAccounts.propTypes = {
  listAccounts: PropTypes.array,
  searchAccountsCollection: PropTypes.func,
  params: PropTypes.object,
  setParamsAccountsCollection: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listAccounts: makeGetListAccounts() || [],
  params: makePageAccountParams() || {},
  errorMessage: makeErrorMessageAccounts() || '',
});

export default connect(
  mapStateToProps,
  {
    searchAccountsCollection,
    setParamsAccountsCollection,
  },
)(SearchAccounts);
