import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paymentSelect, paymentEnum } from 'constantsApp';
import Select from 'react-select';
import { calculateValCallback } from 'utils/utils';
import { ModalSelectAccount } from 'components/modals';
import { selectAccountId } from 'containers/App/actions';

class OneOffSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      openModalAccount: false,
      pageAccount: 1,
      sizeAccount: 20,
      isSearchingAccount: false,
      paymentType: {
        value: paymentEnum.paymentType.invoice,
        label: paymentEnum.paymentType.invoice,
      },
    };
  }

  componentDidMount() {
    this.props.selectAccountId({ page: 1, size: 20 }, data => {
      const accounts = calculateValCallback(data);
      this.setState({ accounts });
    });
  }

  onToggleModalAccount = () => {
    this.setState(preState => ({
      openModalAccount: !preState.openModalAccount,
    }));
  };

  onSelectItem = accountId => {
    this.props.setAccountId(accountId);
  };

  unSelectItem = () => {
    this.setState({ openModalAccount: false });
    this.props.setAccountId('');
  };

  handlePageAccount = pageOffset => {
    const { pageAccount, sizeAccount } = this.state;

    this.setState({ pageAccount: pageAccount + pageOffset });
    this.props.selectAccountId(
      {
        page: pageAccount + pageOffset,
        size: sizeAccount,
        filter: this.filterAccount,
      },
      data => {
        const accounts = calculateValCallback(data);
        this.setState({ accounts });
      },
    );
  };

  handleSizeAccount = sizeAccount => {
    this.setState({ sizeAccount, pageAccount: 1 });
    this.props.selectAccountId(
      {
        page: 1,
        size: sizeAccount,
        filter: this.filterAccount,
      },
      data => {
        const accounts = calculateValCallback(data);
        this.setState({ accounts });
      },
    );
  };

  onHandleSearchAccount = filter => {
    this.setState({ isSearchingAccount: true });
    this.props.selectAccountId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const accounts = calculateValCallback(data);
        this.setState({
          isSearchingAccount: false,
          pageAccount: 1,
          sizeAccount: 20,
          accounts,
        });
      },
    );
    this.filterAccount = filter;
  };

  onHandleSelectPaymentType = value => {
    this.setState({ paymentType: value });
    this.props.onHandleSelectPaymentType(value.value);
  };

  render() {
    const {
      pageAccount,
      sizeAccount,
      openModalAccount,
      isSearchingAccount,
      paymentType,
      accounts,
    } = this.state;

    return (
      <div className="search-filter mt-3">
        <Row>
          <Col md={4} lg={2}>
            <Select
              value={paymentType}
              options={paymentSelect.paymentType}
              isClearable={false}
              onChange={this.onHandleSelectPaymentType}
              className="form__form-group-select"
            />
          </Col>
          <div className="form__form-group">
            <div className="form__form-group-field">
              <button
                className="btn btn-success"
                onClick={this.onToggleModalAccount}
              >
                Account Id
              </button>
            </div>
          </div>
        </Row>
        <ModalSelectAccount
          openModal={openModalAccount}
          toggleModal={this.onToggleModalAccount}
          items={accounts}
          onSelectItem={this.onSelectItem}
          itemSelected={this.props.accountId}
          unSelectItem={this.unSelectItem}
          page={pageAccount}
          size={sizeAccount}
          isSearching={isSearchingAccount}
          handlePage={this.handlePageAccount}
          handleSize={this.handleSizeAccount}
          onHandleSearch={this.onHandleSearchAccount}
        />
      </div>
    );
  }
}

OneOffSelect.propTypes = {
  onHandleSelectPaymentType: PropTypes.func,
  selectAccountId: PropTypes.func,
  setAccountId: PropTypes.func,
  accountId: PropTypes.string,
};

export default connect(
  null,
  {
    selectAccountId,
  },
)(OneOffSelect);
