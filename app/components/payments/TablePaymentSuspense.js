import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { SortType } from 'constantsApp';
import { selectAccountId, selectInvoiceId } from 'containers/App/actions';
import { ModalSelectAccount, ModalSelectInvoiceUnit } from 'components/modals';
import { calculateValCallback } from 'utils/utils';
import { Pagination, Sizing, HeaderTableSort } from '../commons';

const heads = [
  {
    key: 'accountId',
    name: 'Account Id',
    sortName: 'accountId',
  },
  {
    key: 'invoiceUnitId',
    name: 'Invoice Id',
    sortName: 'invoiceUnitId',
  },
  {
    key: 'paymentDate',
    name: 'Payment Date',
    sortName: 'paymentDate',
  },
  {
    key: 'reason',
    name: 'Suspense Reason',
    sortName: 'reason',
  },
  {
    key: 'amount',
    name: 'Payment Amount',
  },

  {
    key: 'method',
    name: 'Payment Method',
  },
  {
    key: 'id',
    name: 'Payment Txn Id',
    sortName: 'id',
  },
  {
    key: 'status',
    name: 'Suspense Status',
    sortName: 'status',
  },
];
class TablePaymentSuspense extends Component {
  constructor() {
    super();
    this.state = {
      keySort: '',
      valueSort: '',
      accounts: [],
      accountId: '',
      openModalAccount: false,
      pageAccount: 1,
      sizeAccount: 20,
      invoices: [],
      openModalIV: false,
      pageIV: 1,
      sizeIV: 20,
      isSearchingIV: false,
      invoiceId: '',
    };
  }
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (
      this.props.selectedPayment !== nextProps.selectedPayment &&
      nextProps.selectedPayment
    ) {
      const { accountId } = this.state;
      if (accountId !== nextProps.selectedPayment.accountId) {
        this.setState({ accountId: nextProps.selectedPayment.accountId });
        this.props.selectInvoiceId(
          {
            page: 1,
            size: 20,
            filter: { accountId: nextProps.selectedPayment.accountId },
          },
          data => {
            const invoices = calculateValCallback(data);
            this.setState({
              invoices,
              pageIV: 1,
              sizeIV: 20,
              invoiceId: '',
            });
          },
        );
      }
    }
  }

  handleSort = sortName => {
    let { keySort, valueSort } = this.state;
    if (!keySort || keySort !== sortName) {
      keySort = sortName;
      valueSort = SortType.asc;
    } else {
      valueSort = valueSort === SortType.asc ? SortType.desc : SortType.asc;
    }
    this.setState({ keySort, valueSort });
    this.props.handleSortPayment(keySort, valueSort);
  };

  handleClickRow = payment => {
    this.props.onSelectedPayment(payment);
  };

  onToggleModalAccount = () => {
    const { openModalAccount, accounts, pageAccount, sizeAccount } = this.state;
    if (!openModalAccount && accounts && accounts.length === 0) {
      this.props.selectAccountId(
        { page: pageAccount, size: sizeAccount },
        data => {
          const accountsResult = calculateValCallback(data);
          this.setState({ accounts: accountsResult });
        },
      );
    }
    this.setState(preState => ({
      openModalAccount: !preState.openModalAccount,
    }));
  };

  onSelectItem = accountIdSelect => {
    const { accountId } = this.state;
    if (accountId !== accountIdSelect) {
      this.setState({ accountId: accountIdSelect });
      this.props.selectInvoiceId(
        { page: 1, size: 20, filter: { accountId: accountIdSelect } },
        data => {
          const invoices = calculateValCallback(data);
          this.setState({
            invoices,
            pageIV: 1,
            sizeIV: 20,
            invoiceId: '',
          });
        },
      );
    }
  };

  unSelectItem = () => {
    this.setState({ openModalAccount: false, accountId: '', invoiceId: '' });
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

  onToggleModalIV = () => {
    this.setState(pre => ({ openModalIV: !pre.openModalIV }));
  };

  handlePageIV = pageOffset => {
    const { pageIV, sizeIV } = this.state;

    this.setState({ pageIV: pageIV + pageOffset });
    this.props.selectInvoiceId(
      {
        page: pageIV + pageOffset,
        size: sizeIV,
        filter: this.filterIV,
      },
      data => {
        const invoices = calculateValCallback(data);
        this.setState({ invoices });
      },
    );
  };

  handleSizeIV = sizeIV => {
    this.setState({ sizeIV, pageIV: 1 });
    this.props.selectInvoiceId(
      {
        page: 1,
        size: sizeIV,
        filter: this.filterIV,
      },
      data => {
        const invoices = calculateValCallback(data);
        this.setState({ invoices });
      },
    );
  };

  onHandleSearchIV = (filter = {}) => {
    // eslint-disable-next-line no-param-reassign
    filter.accountId = this.state.accountId;
    this.setState({ isSearchingIV: true });
    this.props.selectInvoiceId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const invoices = calculateValCallback(data);
        this.setState({
          isSearchingIV: false,
          pageIV: 1,
          sizeIV: 20,
          invoices,
        });
      },
    );
    this.filterIV = filter;
  };

  onSelectInvoice = invoiceId => {
    this.setState({ invoiceId });
  };

  unSelectInvoice = () => {
    this.setState({ openModalIV: false, invoiceId: '' });
  };

  applyPaymentSuspense = () => {
    const { accountId, invoiceId } = this.state;
    const { selectedPayment } = this.props;
    const formData = {
      accountId,
      invoiceUnitId: invoiceId || null,
      id: selectedPayment.id,
    };

    this.props.applyPaymentSuspense(formData);
  };

  closePaymentSuspense = () => {
    const { selectedPayment } = this.props;
    const formData = {
      id: selectedPayment.id,
      status: 'CLOSED',
      closedDate: moment().format('YYYY-MM-DD'),
    };

    this.props.modifiedPaymentSuspense(formData);
  };

  renderRow = (row, id) => (
    <tr
      key={id}
      onClick={() => this.handleClickRow(row)}
      className={
        this.props.selectedPayment && this.props.selectedPayment.id === row.id
          ? 'column_active'
          : ''
      }
    >
      <td>{row.accountId}</td>
      <td>{row.invoiceUnitId}</td>
      <td>{row.paymentDate}</td>
      <td>{row.reason}</td>
      <td>{row.amount}</td>
      <td>{row.method}</td>
      <td>{row.id}</td>
      <td>{row.status}</td>
    </tr>
  );

  renderHeader = header => {
    const { keySort, valueSort } = this.state;
    if (header.sortName) {
      return (
        <HeaderTableSort
          key={header.key}
          headerName={header.name}
          sortName={header.sortName}
          keySort={keySort}
          valueSort={valueSort}
          handleSort={this.handleSort}
          className="sortable w-25 p-2"
        />
      );
    }

    return (
      <th key={header.key} scope="col" className=" w-25 p-2">
        {header.name}
      </th>
    );
  };

  renderBody() {
    const { data, errorMessage } = this.props;

    if (errorMessage) {
      return (
        <tbody>
          <tr>
            <td colSpan={8} className="txt-error">
              {errorMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data || !data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={8}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const {
      handlePage,
      page,
      isActiveNext,
      handleSize,
      size,
      selectedPayment,
    } = this.props;
    const {
      accountId,
      pageAccount,
      sizeAccount,
      openModalAccount,
      isSearchingAccount,
      accounts,
      invoices,
      invoiceId,
      openModalIV,
      pageIV,
      sizeIV,
      isSearchingIV,
    } = this.state;

    const enableBtnApply = !!(
      selectedPayment &&
      selectedPayment.id &&
      selectedPayment.status === 'OPEN'
    );

    const enableBtnClose =
      selectedPayment &&
      selectedPayment.id &&
      selectedPayment.status === 'OPEN';

    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="table-block">
            <CardBody>
              <table
                className="table table-hover table-bordered"
                style={{
                  borderTop: '4px solid rgb(132, 170, 79)',
                }}
              >
                <thead>
                  <tr>{heads.map(item => this.renderHeader(item))}</tr>
                </thead>
                {this.renderBody()}
              </table>
            </CardBody>
            <div className="table__action ml-3 mr-3">
              <Row className="ml-3">
                <div className="form__form-group-field form">
                  <input
                    name="accountId"
                    value={accountId}
                    placeholder="Account Id"
                    onChange={() => {}}
                    onClick={this.onToggleModalAccount}
                    style={
                      enableBtnApply && !accountId
                        ? styles.styleInputRequired
                        : {}
                    }
                  />
                </div>
                <div className=" ml-3 form__form-group-field form">
                  <input
                    name="invoiceId"
                    type="text"
                    placeholder="Invoice Id"
                    value={invoiceId}
                    onChange={() => {}}
                    onClick={this.onToggleModalIV}
                    autoComplete="off"
                  />
                </div>
              </Row>
              <Row className="mt-3 ml-5">
                <Col md={6}>
                  <Button
                    color="primary"
                    style={{ padding: '.375rem .75rem' }}
                    onClick={this.applyPaymentSuspense}
                    disabled={!enableBtnApply}
                  >
                    Apply Suspense
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    color="primary"
                    className="pull-right mr-5"
                    style={{ padding: '.375rem .75rem' }}
                    onClick={this.closePaymentSuspense}
                    disabled={!enableBtnClose}
                  >
                    Close Suspense
                  </Button>
                </Col>
              </Row>
              <Row className="mt-3 ml-3 mr-3">
                <Col md={6}>
                  <Pagination
                    page={page}
                    isActivePre={page !== 1}
                    isActiveNext={isActiveNext}
                    handlePage={handlePage} // implement handle page here
                  />
                </Col>
                <Col md={6}>
                  <Sizing handleSize={handleSize} size={size} />
                </Col>
              </Row>
            </div>
          </div>
        </Card>
        <ModalSelectAccount
          openModal={openModalAccount}
          toggleModal={this.onToggleModalAccount}
          items={accounts}
          onSelectItem={this.onSelectItem}
          itemSelected={accountId}
          unSelectItem={this.unSelectItem}
          page={pageAccount}
          size={sizeAccount}
          isSearching={isSearchingAccount}
          handlePage={this.handlePageAccount}
          handleSize={this.handleSizeAccount}
          onHandleSearch={this.onHandleSearchAccount}
        />
        <ModalSelectInvoiceUnit
          openModal={openModalIV}
          toggleModal={this.onToggleModalIV}
          items={invoices}
          onSelectItem={this.onSelectInvoice}
          itemSelected={invoiceId}
          unSelectItem={this.unSelectInvoice}
          page={pageIV}
          size={sizeIV}
          isSearching={isSearchingIV}
          handlePage={this.handlePageIV}
          handleSize={this.handleSizeIV}
          onHandleSearch={this.onHandleSearchIV}
          accountId={accountId}
        />
      </Col>
    );
  }
}

const styles = {
  styleInputRequired: {
    borderColor: '#ed1c24',
  },
};

TablePaymentSuspense.propTypes = {
  data: PropTypes.array,
  handleSortPayment: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  // history: PropTypes.object,
  errorMessage: PropTypes.string,
  selectedPayment: PropTypes.object,
  onSelectedPayment: PropTypes.func,
  selectInvoiceId: PropTypes.func,
  applyPaymentSuspense: PropTypes.func,
  selectAccountId: PropTypes.func,
  modifiedPaymentSuspense: PropTypes.func,
};

export default connect(
  null,
  {
    selectAccountId,
    selectInvoiceId,
  },
)(TablePaymentSuspense);
