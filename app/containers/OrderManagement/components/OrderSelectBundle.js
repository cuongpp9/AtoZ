import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchFilterBundles } from 'components/bundlemanagement';
import { TableSelectBundle } from 'components/orders';
import { calculateValCallback } from 'utils/utils';
import { selectBundleId } from 'containers/App/actions';

class OrderSelectBundle extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isSearching: false,
      bundles: [],
      page: 1,
      size: 20,
    };
    this.filter = {};
  }
  componentDidMount() {
    this.props.selectBundleId(
      {
        page: 1,
        size: 20,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({ bundles });
      },
    );
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.selectBundleId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({
          isSearching: false,
          page: 1,
          size: 20,
          bundles,
        });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const { page, size } = this.state;

    this.setState({ page: page + pageOffset });
    this.props.selectBundleId(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({ bundles });
      },
    );
  };

  handleSize = size => {
    this.setState({ size, page: 1 });
    this.props.selectBundleId(
      {
        page: 1,
        size,
        filter: this.filter,
      },
      data => {
        const bundles = calculateValCallback(data);
        this.setState({ bundles });
      },
    );
  };

  render() {
    const { isSearching, page, size, bundles } = this.state;
    const { bSelectedId, onSelectBundle } = this.props;
    return (
      <div className="global-page order-select-package">
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
          <TableSelectBundle
            data={bundles}
            page={page}
            size={size}
            handlePage={this.handlePage}
            handleSize={this.handleSize}
            itemSelected={bSelectedId}
            onSelect={onSelectBundle}
          />
        </Row>
      </div>
    );
  }
}
OrderSelectBundle.propTypes = {
  selectBundleId: PropTypes.func,
  bSelectedId: PropTypes.array,
  onSelectBundle: PropTypes.func,
};

export default connect(
  null,
  {
    selectBundleId,
  },
)(OrderSelectBundle);
