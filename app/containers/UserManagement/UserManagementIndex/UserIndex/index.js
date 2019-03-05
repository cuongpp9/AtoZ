import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { PageAbstract } from 'components/commons';
import { userSort } from 'constantsApp';
import { UserTable, UserSearchFilter } from 'components/UserManagement';
import { searchUsers, setParamsListUsers } from '../../actions';
import {
  makeGetListUsers,
  makePageSearchUsersParams,
  errorMessageUsers,
} from '../../selectors';

class UserIndex extends React.PureComponent {
  constructor() {
    super();
    this.state = { isActiveNext: true, isSearching: false, selectedRow: {} };
    this.filter = {};
    this.sort = '';
  }
  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchUsers({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listUsers !== nextProps.listUsers) {
      const {
        params: { size },
      } = nextProps;
      if (nextProps.listUsers.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });

    this.props.searchUsers(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false, selectedRow: null });
        this.props.setParamsListUsers({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsListUsers({ size, page: page + pageOffset });
    this.props.searchUsers({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsListUsers({ size, page: 1 });
    this.props.searchUsers({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSort = (key, value) => {
    this.props.searchUsers(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: userSort[key][value],
      },
      () => {
        this.props.setParamsListUsers({ page: 1, size: 20 });
        this.setState({ selectedRow: null });
      },
    );
    this.sort = userSort[key][value];
  };

  handleClickRow = row => {
    this.setState({
      selectedRow: row,
    });
  };
  render() {
    const {
      listUsers,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching, selectedRow } = this.state;
    return (
      <div className="global-page customer-page">
        <PageAbstract>
          <Row>
            <Col md={12}>
              <Link
                to="/user-management/new-user/detail"
                className="btn btn-success btn-create"
              >
                <i className="fa fa-plus" />&nbsp; Create a New User
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h3 className="bold-text">Users</h3>
              <UserSearchFilter
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </Row>
          <Row>
            <UserTable
              data={listUsers}
              handleSort={this.handleSort}
              page={page}
              size={size}
              selectedRow={selectedRow}
              handleClickRow={this.handleClickRow}
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
UserIndex.propTypes = {
  listUsers: PropTypes.array,
  searchUsers: PropTypes.func,
  params: PropTypes.object,
  setParamsListUsers: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listUsers: makeGetListUsers() || {},
  params: makePageSearchUsersParams() || {},
  errorMessage: errorMessageUsers() || '',
});

export default connect(
  mapStateToProps,
  {
    searchUsers,
    setParamsListUsers,
  },
)(UserIndex);
