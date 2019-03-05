import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form/immutable';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { paymentSelect } from 'constantsApp';
import { selectAccountId, selectInvoiceId } from 'containers/App/actions';
import { ModalSelectAccount, ModalSelectInvoiceUnit } from 'components/modals';
// import { ModalSelectInvoiceUnit } from 'components/modals';
import { calculateValCallback } from 'utils/utils';
import { RenderSelectField, RenderField, RenderDatePickerField } from '../form';

import { ButtonCustom } from '../commons';
class SearchFilter extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      accounts: [],
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
  componentDidMount() {
    this.props.selectAccountId({ page: 1, size: 20 }, data => {
      const accounts = calculateValCallback(data);
      this.setState({ accounts });
    });
  }
  onHandleSearch = values => {
    const result = values.toJS();
    const { invoiceUnitId, paymentDate, status } = result;
    const { accountId } = this.state;
    const filter = {
      accountId: accountId || null,
      invoiceUnitId: invoiceUnitId || null,
      status: status ? status.value : null,
      paymentDate: paymentDate
        ? moment(paymentDate).format('YYYY-MM-DD')
        : null,
    };
    this.props.onHandleSearch(filter);
  };

  onToggleModalAccount = () => {
    this.setState(preState => ({
      openModalAccount: !preState.openModalAccount,
    }));
  };

  onSelectItem = accountId => {
    this.setState({ accountId });
  };

  unSelectItem = () => {
    this.setState({ openModalAccount: false, accountId: '' });
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
    const { openModalIV } = this.state;
    if (!openModalIV) {
      const { accountId } = this.state;
      if (!accountId) {
        this.setState({ openModalIV: true });
      } else {
        this.props.selectInvoiceId(
          { page: 1, size: 20, filter: { accountId } },
          data => {
            const invoices = calculateValCallback(data);
            this.setState({ invoices, openModalIV: true });
          },
        );
      }
    } else {
      this.setState({ openModalIV: false });
    }
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
  render() {
    const { handleSubmit, isSearching } = this.props;
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
    return (
      <div className="search-filter">
        <Col md={12} lg={12} xl={12}>
          <form className="form" onSubmit={handleSubmit(this.onHandleSearch)}>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <input
                  name="accountId"
                  value={accountId}
                  placeholder="Account Id"
                  onChange={() => {}}
                  onClick={this.onToggleModalAccount}
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="paymentDate"
                  component={RenderDatePickerField}
                  placeholder="Payments After this date"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </div>
            </div>

            <div className="form__form-group">
              <div className="form__form-group-field">
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
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={RenderSelectField}
                  options={paymentSelect.status}
                  placeholder="Payment Status"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="paymentId"
                  component={RenderField}
                  placeholder="Payment Txn Id"
                />
              </div>
            </div>
            <ButtonToolbar className="form__button-toolbar">
              <ButtonCustom
                loading={isSearching}
                className="btn btn-primary"
                type="submit"
                title="Search"
                titleloading="Searching"
              />
            </ButtonToolbar>
          </form>
        </Col>
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
          accountId={this.props.accountId}
        />
      </div>
    );
  }
}

SearchFilter.propTypes = {
  handleSubmit: PropTypes.func,
  onHandleSearch: PropTypes.func,
  selectAccountId: PropTypes.func,
  selectInvoiceId: PropTypes.func,
  isSearching: PropTypes.bool,
  accountId: PropTypes.string,
};

const withConnect = connect(
  null,
  {
    selectAccountId,
    selectInvoiceId,
  },
);

const withReduxForm = reduxForm({
  form: 'SearchFilterPayment', // a unique identifier for this form
});

export default compose(
  withConnect,
  withReduxForm,
)(SearchFilter);
