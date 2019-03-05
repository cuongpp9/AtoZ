import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { PageAbstract } from 'components/commons';
import { AccountSortCustomer } from 'constantsApp';
import { TableSearchAccounts, SearchFilterAccounts } from 'components/payments';
import { getAccountId, setAccountId } from 'asynStorage/accountStorage';
import {
  makeGetListAccounts,
  makePageAccountParams,
  makeErrorMessageAccounts,
} from '../../selectors';
import { searchAccounts, setParamsAccounts } from '../../actions';

class SearchAccounts extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isActiveNext: true,
      isSearching: false,
    };
    this.filter = {};
    this.sort = '';
  }

  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchAccounts({
      filter: {},
      sort: '',
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
    this.props.searchAccounts(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsAccounts({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsAccounts({ size, page: page + pageOffset });
    this.props.searchAccounts({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsAccounts({ size, page: 1 });
    this.props.searchAccounts({
      page: 1,
      size,
      filter: this.filter,
    });
  };

  handleSortAccount = (key, value) => {
    this.props.searchAccounts(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: AccountSortCustomer[key][value],
      },
      () => {
        this.props.setParamsAccounts({ page: 1, size: 20 });
      },
    );
    this.sort = AccountSortCustomer[key][value];
  };

  handleSelectAccountId = async id => {
    // const { accountSelectedId } = this.state;
    if (getAccountId() === id) {
      this.props.history.push('/payments/payment-agent/one-off-payment');
    } else {
      // this.setState({ accountSelectedId: id });
      await setAccountId(id);
      this.props.history.push('/payments/payment-agent/one-off-payment');
    }
  };

  render() {
    const {
      listAccounts,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
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
            handleSelectAccountId={this.handleSelectAccountId}
            // accountSelectedId={accountSelectedId}
          />
        </Row>
      </PageAbstract>
    );
  }
}

SearchAccounts.propTypes = {
  history: PropTypes.object,
  listAccounts: PropTypes.array,
  searchAccounts: PropTypes.func,
  params: PropTypes.object,
  setParamsAccounts: PropTypes.func,
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
    searchAccounts,
    setParamsAccounts,
  },
)(SearchAccounts);
