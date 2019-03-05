import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { TableWriteOffs, SearchFilterDisputes } from 'components/arOperations';
import { PageAbstract } from 'components/commons';
import { writeOffsSort, arOpsSelect } from 'constantsApp';
import {
  makeGetListWriteOffs,
  makePageWriteOffParams,
  makeErrorMessageWriteOffs,
} from '../selectors';
import { searchWriteOffs, setParamsWriteOffs } from '../actions';

class WriteOffsIndex extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isActiveNext: true,
      isSearching: false,
      writeOffItemSelected: null,
    };
    this.filter = {};
    this.sort = '';
  }
  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchWriteOffs({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listWriteOffs !== nextProps.listWriteOffs) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listWriteOffs.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchWriteOffs(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsWriteOffs({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };
  onSelectTableRow = writeOffItem => {
    this.setState({ writeOffItemSelected: writeOffItem });
  };
  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsWriteOffs({ size, page: page + pageOffset });
    this.props.searchWriteOffs({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsWriteOffs({ size, page: 1 });
    this.props.searchWriteOffs({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };
  handleClickReverse = () => {
    this.props.history.push({
      pathname: '/ar-operations/reverse-write-offs/apply',
      state: { writeOffItemSelected: this.state.writeOffItemSelected },
    });
  };
  handleSortWriteOffs = (key, value) => {
    this.props.searchWriteOffs(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: writeOffsSort[key][value],
      },
      () => {
        this.props.setParamsWriteOffs({ page: 1, size: 20 });
      },
    );
    this.sort = writeOffsSort[key][value];
  };

  render() {
    const {
      listWriteOffs,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching, writeOffItemSelected } = this.state;
    return (
      <PageAbstract>
        <Row>
          <Col md={12}>
            <Link
              to="/ar-operations/write-offs/apply"
              className="btn btn-success btn-create"
            >
              <i className="fa fa-plus" />&nbsp; Apply Write-off
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="bold-text">Write Offs</h3>
            <SearchFilterDisputes
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
              statusOptions={arOpsSelect.writeOffStatus}
            />
          </Col>
        </Row>
        <Row>
          <TableWriteOffs
            data={listWriteOffs}
            handleSortWriteOffs={this.handleSortWriteOffs}
            page={page}
            size={size}
            handlePage={this.handlePage}
            isActiveNext={this.state.isActiveNext}
            onSelectTableRow={this.onSelectTableRow}
            writeOffItemSelected={writeOffItemSelected}
            handleSize={this.handleSize}
            errorMessage={errorMessage}
            handleClickReverse={this.handleClickReverse}
          />
        </Row>
      </PageAbstract>
    );
  }
}

WriteOffsIndex.propTypes = {
  listWriteOffs: PropTypes.array,
  params: PropTypes.object,
  history: PropTypes.object,
  setParamsWriteOffs: PropTypes.func,
  searchWriteOffs: PropTypes.func,
  errorMessage: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  listWriteOffs: makeGetListWriteOffs() || [],
  params: makePageWriteOffParams() || {},
  errorMessage: makeErrorMessageWriteOffs() || '',
});
export default connect(
  mapStateToProps,
  { searchWriteOffs, setParamsWriteOffs },
)(withRouter(WriteOffsIndex));
