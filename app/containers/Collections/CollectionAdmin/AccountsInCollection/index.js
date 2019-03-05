import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PageAbstract } from 'components/commons';
import { AccountsInCollectionTable } from 'components/collections';
import { accountSort, collectionsEnum } from 'constantsApp';
import {
  searchAccountsCollection,
  setParamsAccountsCollection,
  getCollectionAgentByType,
  reassignCollectionAgent,
} from '../../actions';
import {
  makePageAccountParams,
  makeGetListAccounts,
  makeErrorMessageAccounts,
} from '../../selectors';

class AccountsInCollection extends Component {
  constructor() {
    super();
    this.state = {
      isSearching: false,
      isActiveNext: false,
      collectionAgents: [],
      agentSelected: {},
      rowSelected: {},
    };

    this.filter = { userId: 'UserX002' };
    this.sort = 'firstName_ASC';
  }

  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchAccountsCollection({
      page,
      size,
      filter: { userId: 'UserX002' },
      sort: 'firstName_ASC',
    });
    this.getCollectionAgentByType();
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

  getCollectionAgentByType = () => {
    this.props.getCollectionAgentByType(
      {
        type: collectionsEnum.type.collectionAgents,
      },
      response => {
        if (
          response.getCollectionAgentByType &&
          response.getCollectionAgentByType.length
        ) {
          // eslint-disable-next-line prefer-destructuring
          const collectionAgents =
            response.getCollectionAgentByType[0].collectionAgents;
          this.setState({
            collectionAgents: _.unionBy(collectionAgents, 'userId'),
          });
        }
      },
    );
  };

  onHandleSearch = filter => {
    this.setState({ isSearching: true, rowSelected: {} });
    // eslint-disable-next-line no-param-reassign
    if (!filter.userId) filter.userId = 'UserX002';
    if (!this.sort) this.sort = 'firstName_ASC';
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
    this.setState({ rowSelected: {} });
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
    this.setState({ rowSelected: {} });
    this.props.setParamsAccountsCollection({ size, page: 1 });
    this.props.searchAccountsCollection({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSort = (key, value) => {
    this.setState({ rowSelected: {} });
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

  onSelectedAgent = val => {
    if (!val) this.setState({ agentSelected: {} });
    else {
      const { collectionAgents } = this.state;
      const agentSelected =
        collectionAgents.find(el => el.userId === val.value) || {};
      this.setState({ agentSelected });
    }
  };

  onSelectedRow = newR => {
    if (newR.index !== this.state.rowSelected.index) {
      this.setState({ rowSelected: newR });
    } else {
      this.setState({ rowSelected: {} });
    }
  };

  callbackHandleButtonReassign = () => {
    const {
      params: { page, size },
    } = this.props;

    this.setState({ rowSelected: {}, agentSelected: {} });
    this.props.searchAccountsCollection({
      page,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  render() {
    const {
      listAccounts,
      errorMessage,
      params: { page, size },
    } = this.props;
    const {
      isSearching,
      isActiveNext,
      collectionAgents,
      agentSelected,
      rowSelected,
    } = this.state;

    return (
      <div className="global-page customer-page">
        <PageAbstract>
          <div className="form-accounts-in-collection">
            <div className="form-header">
              <Row>
                <Col md={12}>
                  <h3 className="bold-text">Accounts</h3>
                </Col>
              </Row>
            </div>
            <Row>
              <AccountsInCollectionTable
                data={listAccounts}
                handleSort={this.handleSort}
                hanldeSearch={this.onHandleSearch}
                page={page}
                size={size}
                handlePage={this.handlePage}
                isActiveNext={isActiveNext}
                isSearching={isSearching}
                handleSize={this.handleSize}
                errorMessage={errorMessage}
                agentSelected={agentSelected}
                userIds={collectionAgents.map(el => ({
                  value: el.userId,
                  label: el.userId,
                }))}
                onSelectedAgent={this.onSelectedAgent}
                reassignCollectionAgent={this.props.reassignCollectionAgent}
                rowSelected={rowSelected}
                onSelectedRow={this.onSelectedRow}
                callbackHandleButtonReassign={this.callbackHandleButtonReassign}
              />
            </Row>
          </div>
        </PageAbstract>
      </div>
    );
  }
}

AccountsInCollection.propTypes = {
  searchAccountsCollection: PropTypes.func,
  listAccounts: PropTypes.array,
  params: PropTypes.object,
  errorMessage: PropTypes.string,
  setParamsAccountsCollection: PropTypes.func,
  getCollectionAgentByType: PropTypes.func,
  reassignCollectionAgent: PropTypes.func,
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
    getCollectionAgentByType,
    reassignCollectionAgent,
  },
)(AccountsInCollection);
