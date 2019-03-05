import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { PageAbstract } from 'components/commons';
import { Table, Filter, SideBar } from 'components/customers';
import AccountSort from 'constantsApp/customer/AccountSort';
import { DEFAULT_SIZE_FETCH } from 'constantsApp';
import {
  makeGetListCustomers,
  makePageCusomterParams,
  makeErrorMessage,
} from '../selectors';
import { getCustomers, setParams } from '../actions';

class CustomerPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { isActiveNext: true, isSearching: false };
    this.filter = {};
    this.sort = '';
  }
  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;

    this.props.getCustomers({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listCustomers !== nextProps.listCustomers) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listCustomers.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.getCustomers(
      {
        page: 1,
        size: DEFAULT_SIZE_FETCH,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParams({ page: 1, size: DEFAULT_SIZE_FETCH });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParams({ size, page: page + pageOffset });
    this.props.getCustomers({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParams({ size, page: 1 });
    this.props.getCustomers({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortAccounts = (key, value) => {
    this.props.getCustomers(
      {
        page: 1,
        size: DEFAULT_SIZE_FETCH,
        filter: this.filter,
        sort: AccountSort[key][value],
      },
      () => {
        this.props.setParams({ page: 1, size: DEFAULT_SIZE_FETCH });
      },
    );
    this.sort = AccountSort[key][value];
  };

  render() {
    const {
      listCustomers,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <div className="global-page customer-page">
        <SideBar isShowSidebarItem={false} />
        <PageAbstract>
          <Row>
            <Col md={12}>
              <Link
                to="/customers/create/info"
                className="btn btn-success btn-create"
              >
                <i className="fa fa-plus" />&nbsp; Create New Account
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h3 className="bold-text">Accounts</h3>
              <Filter
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </Row>
          <Row>
            <Table
              data={listCustomers}
              handleSortAccounts={this.handleSortAccounts}
              page={page}
              size={size}
              handlePage={this.handlePage}
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
CustomerPage.propTypes = {
  listCustomers: PropTypes.array,
  getCustomers: PropTypes.func,
  params: PropTypes.object,
  setParams: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listCustomers: makeGetListCustomers() || [],
  params: makePageCusomterParams() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  {
    getCustomers,
    setParams,
  },
)(CustomerPage);
