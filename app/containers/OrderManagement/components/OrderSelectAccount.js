import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Filter } from 'components/customers';
import { TableSelectAccount } from 'components/orders';
import { calculateValCallback } from 'utils/utils';
import { selectAccountId } from 'containers/App/actions';

class OrderSelectAccount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      accounts: [],
      page: props.page,
      size: props.size,
    };
    this.filter = props.filter;
  }
  componentDidMount() {
    const { page, size } = this.state;
    this.props.selectAccountId(
      {
        page,
        size,
        filter: this.filter,
      },
      data => {
        const accounts = calculateValCallback(data);
        this.setState({ accounts });
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    const { page, size, filter } = this.props;
    if (
      page !== nextProps.page ||
      size !== nextProps.size ||
      filter !== nextProps.filter
    ) {
      this.props.selectAccountId(
        {
          page: nextProps.page,
          size: nextProps.size,
          filter: nextProps.filter,
        },
        data => {
          const accounts = calculateValCallback(data);
          this.setState({
            isSearching: false,
            page: nextProps.page,
            size: nextProps.size,
            accounts,
          });
        },
      );
      this.filter = nextProps.filter;
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    const { page, size } = this.state;
    this.props.selectAccountId(
      {
        page,
        size,
        filter,
      },
      data => {
        const accounts = calculateValCallback(data);
        this.setState({
          isSearching: false,
          page,
          size,
          accounts,
        });
      },
    );
    this.filter = filter;
    this.props.getInfoAccount('filterAccount', filter);
  };

  handlePage = pageOffset => {
    const { page, size } = this.state;

    this.setState({ page: page + pageOffset });
    this.props.selectAccountId(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
      },
      data => {
        const accounts = calculateValCallback(data);
        this.setState({ accounts });
      },
    );
    this.props.getInfoAccount('pageAccount', page + pageOffset);
  };

  handleSize = size => {
    this.setState({ size, page: 1 });
    this.props.selectAccountId(
      {
        page: 1,
        size,
        filter: this.filter,
      },
      data => {
        const accounts = calculateValCallback(data);
        this.setState({ accounts });
      },
    );
    this.props.getInfoAccount('sizeAccount', size);
  };

  render() {
    const { isSearching, page, size, accounts } = this.state;
    const { aSelectedId, onSelectAccount } = this.props;
    return (
      <div className="global-page order-select-account">
        <Row>
          <Col md={12}>
            <h3 className="bold-text">Accounts</h3>
            <Filter
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
            />
          </Col>
        </Row>
        <Row>
          <TableSelectAccount
            data={accounts}
            page={page}
            size={size}
            handlePage={this.handlePage}
            handleSize={this.handleSize}
            itemSelected={aSelectedId}
            onSelect={onSelectAccount}
          />
        </Row>
      </div>
    );
  }
}
OrderSelectAccount.propTypes = {
  selectAccountId: PropTypes.func,
  aSelectedId: PropTypes.string,
  onSelectAccount: PropTypes.func,
  page: PropTypes.number,
  size: PropTypes.number,
  filter: PropTypes.object,
  getInfoAccount: PropTypes.func,
};

export default connect(
  null,
  {
    selectAccountId,
  },
)(OrderSelectAccount);
