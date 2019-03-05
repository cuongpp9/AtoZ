import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { PageAbstract } from 'components/commons';
import { roleGroupsSort } from 'constantsApp';
import {
  RoleGroupsTable,
  RoleGroupsSearchFilter,
} from 'components/UserManagement';
import {
  makeGetlistRoleGroups,
  makePageRoleGroupsParams,
  errorMessageRoleGroups,
} from '../../selectors';
import { searchRoleGroups, setParamsRoleGroups } from '../../actions';

class RoleGroupsIndex extends React.PureComponent {
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
    this.props.searchRoleGroups({
      page,
      size,
      sort: this.sort,
      filter: this.filter,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listRoleGroups !== nextProps.listRoleGroups) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listRoleGroups.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });

    this.props.searchRoleGroups(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false, selectedRow: null });
        this.props.setParamsRoleGroups({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsRoleGroups({ size, page: page + pageOffset });
    this.props.searchRoleGroups(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        this.setState({ selectedRow: null });
      },
    );
  };

  handleSize = size => {
    this.props.setParamsRoleGroups({ size, page: 1 });
    this.props.searchRoleGroups(
      {
        page: 1,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        this.setState({ selectedRow: null });
      },
    );
  };

  handleSort = (key, value) => {
    this.props.searchRoleGroups(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: roleGroupsSort[key][value],
      },
      () => {
        this.props.setParamsRoleGroups({ page: 1, size: 20 });
        this.setState({ selectedRow: null });
      },
    );
    this.sort = roleGroupsSort[key][value];
  };
  handleClickRow = row => {
    this.setState({
      selectedRow: row,
    });
  };
  render() {
    const { isSearching, selectedRow } = this.state;
    const {
      listRoleGroups,
      params: { page, size },
      errorMessage,
    } = this.props;
    return (
      <div className="global-page customer-page">
        <PageAbstract>
          <Row>
            <Col md={12}>
              <Link
                to="/user-management/new-role-groups/detail"
                className="btn btn-success btn-create"
              >
                <i className="fa fa-plus" />&nbsp; Create a New Role Group
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h3 className="bold-text">Role Groups</h3>
              <RoleGroupsSearchFilter
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </Row>
          <Row>
            <RoleGroupsTable
              data={listRoleGroups}
              handleSort={this.handleSort}
              page={page}
              size={size}
              handlePage={this.handlePage}
              isActiveNext={this.state.isActiveNext}
              handleSize={this.handleSize}
              errorMessage={errorMessage}
              selectedRow={selectedRow}
              handleClickRow={this.handleClickRow}
            />
          </Row>
        </PageAbstract>
      </div>
    );
  }
}
RoleGroupsIndex.propTypes = {
  listRoleGroups: PropTypes.array,
  params: PropTypes.object,
  searchRoleGroups: PropTypes.func,
  setParamsRoleGroups: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listRoleGroups: makeGetlistRoleGroups() || [],
  params: makePageRoleGroupsParams() || {},
  errorMessage: errorMessageRoleGroups() || '',
});

export default connect(
  mapStateToProps,
  { searchRoleGroups, setParamsRoleGroups },
)(RoleGroupsIndex);
