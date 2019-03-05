import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { RouteManager } from 'constantsApp';
import { TableBundles, SearchFilterBundles } from 'components/bundlemanagement';
import { PageAbstract } from 'components/commons';
import BundleSort from 'constantsApp/bundle/bundleSort';
import {
  makeGetListBundles,
  makePageBundleParams,
  makeErrorMessage,
} from '../selectors';
import { searchBundles, setParamsBundles } from '../actions';

class BundleIndex extends React.PureComponent {
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
    this.props.searchBundles({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listBundles !== nextProps.listBundles) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listBundles.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchBundles(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsBundles({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsBundles({ size, page: page + pageOffset });
    this.props.searchBundles({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsBundles({ size, page: 1 });
    this.props.searchBundles({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortBundles = (key, value) => {
    this.props.searchBundles(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: BundleSort[key][value],
      },
      () => {
        this.props.setParamsBundles({ page: 1, size: 20 });
      },
    );
    this.sort = BundleSort[key][value];
  };

  render() {
    const {
      listBundles,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <PageAbstract>
        <Row>
          <Col md={12}>
            <Link
              to={RouteManager.bundleManagement.bundle.create}
              className="btn btn-success btn-create"
            >
              <i className="fa fa-plus" />&nbsp; Create New Bundle
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="bold-text">Bundles</h3>
            <SearchFilterBundles
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
            />
          </Col>
        </Row>
        <Row>
          <TableBundles
            data={listBundles}
            handleSortBundles={this.handleSortBundles}
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

BundleIndex.propTypes = {
  listBundles: PropTypes.array,
  params: PropTypes.object,
  setParamsBundles: PropTypes.func,
  searchBundles: PropTypes.func,
  errorMessage: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  listBundles: makeGetListBundles() || [],
  params: makePageBundleParams() || {},
  errorMessage: makeErrorMessage() || '',
});
export default connect(
  mapStateToProps,
  { searchBundles, setParamsBundles },
)(BundleIndex);
