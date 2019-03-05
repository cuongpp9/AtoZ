import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { PageAbstract } from 'components/commons';
import { rolesSort } from 'constantsApp';
import { RolesTable, RolesSearchFilter } from 'components/UserManagement';
import {
  makeGetlistRoles,
  makePageRolesParams,
  errorMessageRoles,
} from '../../selectors';
import { searchRoles, setParamsRoles } from '../../actions';

class RolesIndex extends React.PureComponent {
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
    this.props.searchRoles({
      page,
      size,
      sort: this.sort,
      filter: this.filter,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listRoles !== nextProps.listRoles) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listRoles.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });

    this.props.searchRoles(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false, selectedRow: null });
        this.props.setParamsRoles({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsRoles({ size, page: page + pageOffset });
    this.props.searchRoles(
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
    this.props.setParamsRoles({ size, page: 1 });
    this.props.searchRoles(
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
    this.props.searchRoles(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: rolesSort[key][value],
      },
      () => {
        this.props.setParamsRoles({ page: 1, size: 20 });
        this.setState({ selectedRow: null });
      },
    );
    this.sort = rolesSort[key][value];
  };
  handleClickRow = row => {
    this.setState({
      selectedRow: row,
    });
  };
  render() {
    const {
      listRoles,
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
                to="/user-management/new-roles/detail"
                className="btn btn-success btn-create"
              >
                <i className="fa fa-plus" />&nbsp; Create a New Role
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h3 className="bold-text">Roles</h3>
              <RolesSearchFilter
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </Row>
          <Row>
            <RolesTable
              data={listRoles}
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
RolesIndex.propTypes = {
  listRoles: PropTypes.array,
  params: PropTypes.object,
  searchRoles: PropTypes.func,
  setParamsRoles: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listRoles: makeGetlistRoles() || [],
  params: makePageRolesParams() || {},
  errorMessage: errorMessageRoles() || '',
});

export default connect(
  mapStateToProps,
  { searchRoles, setParamsRoles },
)(RolesIndex);
