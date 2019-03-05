import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  TableAdjustments,
  SearchFilterAdjustments,
} from 'components/arOperations';
import { PageAbstract } from 'components/commons';
import { adjustmentSort } from 'constantsApp';
import {
  makeGetListAdjustments,
  makePageAdjustmentParams,
  makeErrorMessageAdjustments,
} from '../selectors';
import { searchAdjustments, setParamsAdjustments } from '../actions';

class AdjustmentsIndex extends React.PureComponent {
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
    this.props.searchAdjustments({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listAdjustments !== nextProps.listAdjustments) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listAdjustments.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchAdjustments(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsAdjustments({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsAdjustments({ size, page: page + pageOffset });
    this.props.searchAdjustments({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsAdjustments({ size, page: 1 });
    this.props.searchAdjustments({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortAdjustments = (key, value) => {
    this.props.searchAdjustments(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: adjustmentSort[key][value],
      },
      () => {
        this.props.setParamsAdjustments({ page: 1, size: 20 });
      },
    );
    this.sort = adjustmentSort[key][value];
  };

  render() {
    const {
      listAdjustments,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <PageAbstract>
        <Row>
          <Col md={12}>
            <Link
              to="/ar-operations/adjustments/apply"
              className="btn btn-success btn-create"
            >
              <i className="fa fa-plus" />&nbsp; Apply Adjustment
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="bold-text">Adjustments</h3>
            <SearchFilterAdjustments
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
            />
          </Col>
        </Row>
        <Row>
          <TableAdjustments
            data={listAdjustments}
            handleSortAdjustments={this.handleSortAdjustments}
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

AdjustmentsIndex.propTypes = {
  listAdjustments: PropTypes.array,
  params: PropTypes.object,
  setParamsAdjustments: PropTypes.func,
  searchAdjustments: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listAdjustments: makeGetListAdjustments() || [],
  params: makePageAdjustmentParams() || {},
  errorMessage: makeErrorMessageAdjustments() || '',
});

export default connect(
  mapStateToProps,
  { searchAdjustments, setParamsAdjustments },
)(AdjustmentsIndex);
