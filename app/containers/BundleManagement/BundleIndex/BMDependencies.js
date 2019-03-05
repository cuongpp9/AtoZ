import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  TableDependencies,
  SearchFilterDependencies,
} from 'components/bundlemanagement';
import { PageAbstract } from 'components/commons';
import { RouteManager } from 'constantsApp';
import DependencySort from 'constantsApp/pricingManager/dependencySort';
import {
  makeGetListDependencies,
  makePageDependencyParams,
  makeErrorMessage,
} from '../selectors';
import { searchDependencies, setParamsDependencies } from '../actions';

class PMItems extends React.PureComponent {
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
    this.props.searchDependencies({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listDependencies !== nextProps.listDependencies) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listDependencies.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchDependencies(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsDependencies({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsDependencies({ size, page: page + pageOffset });
    this.props.searchDependencies({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsDependencies({ size, page: 1 });
    this.props.searchDependencies({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortDependencies = (key, value) => {
    this.props.searchDependencies(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: DependencySort[key][value],
      },
      () => {
        this.props.setParamsDependencies({ page: 1, size: 20 });
      },
    );
    this.sort = DependencySort[key][value];
  };

  render() {
    const {
      listDependencies,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <PageAbstract>
        <Row>
          <Col md={12}>
            <Link
              to={RouteManager.bundleManagement.dependency.create}
              className="btn btn-success btn-create"
            >
              <i className="fa fa-plus" />&nbsp; Create New Dependency
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="bold-text">Dependencies</h3>
            <SearchFilterDependencies
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
            />
          </Col>
        </Row>
        <Row>
          <TableDependencies
            data={listDependencies}
            handleSortDependencies={this.handleSortDependencies}
            page={page}
            size={size}
            handlePage={this.handlePage}
            isActiveNext={this.state.isActiveNext}
            handleSize={this.handleSize}
            errorMessage={errorMessage}
          />
        </Row>
      </PageAbstract>
    );
  }
}

PMItems.propTypes = {
  listDependencies: PropTypes.array,
  params: PropTypes.object,
  setParamsDependencies: PropTypes.func,
  searchDependencies: PropTypes.func,
  errorMessage: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  listDependencies: makeGetListDependencies() || [],
  params: makePageDependencyParams() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  { searchDependencies, setParamsDependencies },
)(PMItems);
