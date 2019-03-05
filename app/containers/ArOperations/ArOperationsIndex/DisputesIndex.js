import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { TableDisputes, SearchFilterDisputes } from 'components/arOperations';
import { PageAbstract } from 'components/commons';
import { disputesSort, arOpsSelect } from 'constantsApp';
import {
  makeGetListDisputes,
  makePageDisputeParams,
  makeErrorMessageDisputes,
} from '../selectors';
import { searchDisputes, setParamsDisputes } from '../actions';

class DisputesIndex extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isActiveNext: true,
      isSearching: false,
      disputeSelected: null,
    };
    this.filter = {};
    this.sort = '';
  }
  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchDisputes({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listDisputes !== nextProps.listDisputes) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listDisputes.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchDisputes(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false, disputeSelected: null });
        this.props.setParamsDisputes({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsDisputes({ size, page: page + pageOffset });
    this.props.searchDisputes(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        this.setState({ disputeSelected: null });
      },
    );
  };

  handleSize = size => {
    this.props.setParamsDisputes({ size, page: 1 });
    this.props.searchDisputes(
      {
        page: 1,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        this.setState({ disputeSelected: null });
      },
    );
  };

  handleSortDisputes = (key, value) => {
    this.props.searchDisputes(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: disputesSort[key][value],
      },
      () => {
        this.props.setParamsDisputes({ page: 1, size: 20 });
        this.setState({ disputeSelected: null });
      },
    );
    this.sort = disputesSort[key][value];
  };

  onSelectedDispute = disputeSelected => {
    this.setState({ disputeSelected });
  };

  render() {
    const {
      listDisputes,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching, disputeSelected } = this.state;

    return (
      <PageAbstract>
        <Row>
          <Col md={12}>
            <Link
              to="/ar-operations/disputes/apply"
              className="btn btn-success btn-create"
            >
              <i className="fa fa-plus" />&nbsp; Open a Dispute
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="bold-text">Disputes</h3>
            <SearchFilterDisputes
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
              statusOptions={arOpsSelect.disputeStatus}
            />
          </Col>
        </Row>
        <Row>
          <TableDisputes
            data={listDisputes}
            handleSortDisputes={this.handleSortDisputes}
            page={page}
            size={size}
            handlePage={this.handlePage}
            isActiveNext={this.state.isActiveNext}
            handleSize={this.handleSize}
            errorMessage={errorMessage}
            disputeSelected={disputeSelected}
            onSelectedDispute={this.onSelectedDispute}
          />
        </Row>
      </PageAbstract>
    );
  }
}

DisputesIndex.propTypes = {
  listDisputes: PropTypes.array,
  params: PropTypes.object,
  setParamsDisputes: PropTypes.func,
  searchDisputes: PropTypes.func,
  errorMessage: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  listDisputes: makeGetListDisputes() || [],
  params: makePageDisputeParams() || {},
  errorMessage: makeErrorMessageDisputes() || '',
});
export default connect(
  mapStateToProps,
  { searchDisputes, setParamsDisputes },
)(DisputesIndex);
