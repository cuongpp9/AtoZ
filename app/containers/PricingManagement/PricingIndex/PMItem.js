import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { RouteManager } from 'constantsApp';
import { TableItems, SearchFilterItems } from 'components/pricingmanagement';
import { PageAbstract } from 'components/commons';
import ItemSort from 'constantsApp/pricingManager/ItemSort';
import {
  makeGetListItems,
  makePageItemParams,
  makeErrorMessage,
} from '../selectors';
import { searchItems, setParamsItems } from '../actions';

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
    this.props.searchItems({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listItems !== nextProps.listItems) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listItems.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchItems(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsItems({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsItems({ size, page: page + pageOffset });
    this.props.searchItems({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsItems({ size, page: 1 });
    this.props.searchItems({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortItems = (key, value) => {
    this.props.searchItems(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: ItemSort[key][value],
      },
      () => {
        this.props.setParamsItems({ page: 1, size: 20 });
      },
    );
    this.sort = ItemSort[key][value];
  };

  render() {
    const {
      listItems,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <PageAbstract>
        <Row>
          <Col md={12}>
            <Link
              to={RouteManager.pricingManagement.item.create}
              className="btn btn-success btn-create"
            >
              <i className="fa fa-plus" />&nbsp; Create New Item
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="bold-text">Items</h3>
            <SearchFilterItems
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
            />
          </Col>
        </Row>
        <Row>
          <TableItems
            data={listItems}
            handleSortItems={this.handleSortItems}
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
  listItems: PropTypes.array,
  params: PropTypes.object,
  setParamsItems: PropTypes.func,
  searchItems: PropTypes.func,
  errorMessage: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  listItems: makeGetListItems() || [],
  params: makePageItemParams() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  { searchItems, setParamsItems },
)(PMItems);
