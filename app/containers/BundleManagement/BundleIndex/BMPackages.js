import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  TablePackages,
  SearchFilterPackages,
} from 'components/bundlemanagement';
import { PageAbstract } from 'components/commons';
import { RouteManager } from 'constantsApp';
import PackageSort from 'constantsApp/pricingManager/bundleSort';
import {
  makeGetListPackages,
  makePagePackageParams,
  makeErrorMessage,
} from '../selectors';
import { searchPackages, setParamsPackages } from '../actions';

class BMPackage extends React.PureComponent {
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
    this.props.searchPackages({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listPackages !== nextProps.listPackages) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listPackages.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchPackages(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsPackages({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsPackages({ size, page: page + pageOffset });
    this.props.searchPackages({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsPackages({ size, page: 1 });
    this.props.searchPackages({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortPackages = (key, value) => {
    this.props.searchPackages(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: PackageSort[key][value],
      },
      () => {
        this.props.setParamsPackages({ page: 1, size: 20 });
      },
    );
    this.sort = PackageSort[key][value];
  };

  render() {
    const {
      listPackages,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <PageAbstract>
        <Row>
          <Col md={12}>
            <Link
              to={RouteManager.bundleManagement.package.create}
              className="btn btn-success btn-create"
            >
              <i className="fa fa-plus" />&nbsp; Create New Package
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="bold-text">Packages</h3>
            <SearchFilterPackages
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
            />
          </Col>
        </Row>
        <Row>
          <TablePackages
            data={listPackages}
            handleSortPackages={this.handleSortPackages}
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

BMPackage.propTypes = {
  listPackages: PropTypes.array,
  params: PropTypes.object,
  setParamsPackages: PropTypes.func,
  searchPackages: PropTypes.func,
  errorMessage: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  listPackages: makeGetListPackages() || [],
  params: makePagePackageParams() || {},
  errorMessage: makeErrorMessage() || {},
});
export default connect(
  mapStateToProps,
  { searchPackages, setParamsPackages },
)(BMPackage);
