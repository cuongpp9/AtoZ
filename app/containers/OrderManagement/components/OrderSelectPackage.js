import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchFilterPackages } from 'components/bundlemanagement';
import { TableSelectPackage } from 'components/orders';
import { calculateValCallback } from 'utils/utils';
import { selectPackageId } from 'containers/App/actions';

class OrderSelectPackage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isSearching: false,
      packages: [],
      page: 1,
      size: 20,
    };
    this.filter = {};
  }
  componentDidMount() {
    this.props.selectPackageId(
      {
        page: 1,
        size: 20,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({ packages });
      },
    );
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.selectPackageId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({
          isSearching: false,
          page: 1,
          size: 20,
          packages,
        });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const { page, size } = this.state;

    this.setState({ page: page + pageOffset });
    this.props.selectPackageId(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({ packages });
      },
    );
  };

  handleSize = size => {
    this.setState({ size, page: 1 });
    this.props.selectPackageId(
      {
        page: 1,
        size,
        filter: this.filter,
      },
      data => {
        const packages = calculateValCallback(data);
        this.setState({ packages });
      },
    );
  };

  render() {
    const { isSearching, page, size, packages } = this.state;
    const { pSelectedId, onSelectPackage } = this.props;
    return (
      <div className="global-page order-select-package">
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
          <TableSelectPackage
            data={packages}
            page={page}
            size={size}
            handlePage={this.handlePage}
            handleSize={this.handleSize}
            itemSelected={pSelectedId}
            onSelect={onSelectPackage}
          />
        </Row>
      </div>
    );
  }
}
OrderSelectPackage.propTypes = {
  selectPackageId: PropTypes.func,
  pSelectedId: PropTypes.object,
  onSelectPackage: PropTypes.func,
};

export default connect(
  null,
  {
    selectPackageId,
  },
)(OrderSelectPackage);
