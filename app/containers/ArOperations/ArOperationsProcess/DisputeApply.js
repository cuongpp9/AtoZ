import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Row, Col, ButtonToolbar } from 'reactstrap';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import DatePicker from 'react-datepicker';
import { arOpsSelect, arOpsEnum } from 'constantsApp';
import { calculateValCallback, roundFloat } from 'utils/utils';
import { selectItemsId, selectInvoiceId } from 'containers/App/actions';
import { ModalSelectItem, ModalSelectInvoiceUnit } from 'components/modals';
import NumberFormat from 'react-number-format';
import { PageAbstract, ButtonCustom, InputValidate } from 'components/commons';
import { FormAbstract, FormGroup, SelectField } from 'components/form';
import { processDispute } from '../actions';

class DisputeAppy extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isApplying: false,
      type: null,
      status: {
        value: arOpsEnum.disputeStatus.open,
        label: arOpsEnum.disputeStatus.open,
      },
      taxRule: {
        value: arOpsEnum.taxRule.withTax,
        label: arOpsEnum.taxRule.withTax,
      },
      items: [],
      openModalI: false,
      pageI: 1,
      sizeI: 20,
      isSearchingI: false,
      invoices: [],
      openModalIV: false,
      pageIV: 1,
      sizeIV: 20,
      isSearchingIV: false,
      itemId: '',
      invoiceId: '',
      source: {
        value: arOpsEnum.source.agentCare,
        label: arOpsEnum.source.agentCare,
      },
      reason: null,
      accountId: '',
      percent: '',
      amount: '',
      notes: '',
      date: moment(),
    };

    this.filterI = {};
    this.filterIV = {};
  }

  componentDidMount() {
    this.props.selectItemsId({ page: 1, size: 20 }, data => {
      const items = calculateValCallback(data);
      this.setState({ items });
    });
  }

  onToggleModalI = () => {
    this.setState(preState => ({ openModalI: !preState.openModalI }));
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

  onSelectItem = itemId => {
    this.setState({ itemId });
  };

  unSelectItem = () => {
    this.setState({ openModalI: false, itemId: '' });
  };

  onSelectInvoice = invoiceId => {
    this.setState({ invoiceId });
  };

  unSelectInvoice = () => {
    this.setState({ openModalIV: false, invoiceId: '' });
  };

  handlePageI = pageOffset => {
    const { pageI, sizeI } = this.state;

    this.setState({ pageI: pageI + pageOffset });
    this.props.selectItemsId(
      {
        page: pageI + pageOffset,
        size: sizeI,
        filter: this.filterI,
      },
      data => {
        const items = calculateValCallback(data);
        this.setState({ items });
      },
    );
  };

  handleSizeI = sizeI => {
    this.setState({ sizeI, pageI: 1 });
    this.props.selectItemsId(
      {
        page: 1,
        size: sizeI,
        filter: this.filterI,
      },
      data => {
        const items = calculateValCallback(data);
        this.setState({ items });
      },
    );
  };

  onHandleSearchI = filter => {
    this.setState({ isSearchingI: true });
    this.props.selectItemsId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const items = calculateValCallback(data);
        this.setState({
          isSearchingI: false,
          pageI: 1,
          sizeI: 20,
          items,
        });
      },
    );
    this.filterI = filter;
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

  onHandleSearchIV = filter => {
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

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeAccountId = evt => {
    this.setState({ accountId: evt.target.value, invoiceId: '' });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onChangeDate = (name, date) => {
    this.setState({
      [name]: date,
    });
  };

  onBlurAmount = () => {
    const { amount } = this.state;
    this.setState({ amount: amount ? roundFloat(amount, 2) : '' });
  };

  onBlurPercent = evt => {
    this.setState({
      percent: evt.target.value ? roundFloat(evt.target.value, 2) : '',
    });
  };

  onChangeAmount = values => {
    const { value } = values;

    if (value) {
      this.setState({ amount: value, percent: '' });
    } else {
      this.setState({ amount: value });
    }
  };

  onChangePercent = evt => {
    if (evt.target.value) {
      this.setState({ amount: '', percent: evt.target.value });
    } else {
      this.setState({ percent: '' });
    }
  };

  onHandleProcess = evt => {
    evt.preventDefault();
    const {
      type,
      status,
      taxRule,
      amount,
      percent,
      source,
      itemId,
      accountId,
      invoiceId,
      date,
      reason,
      notes,
    } = this.state;

    if (!type || !accountId || !reason) {
      return;
    }

    if (!amount && !percent) {
      return;
    }

    const dataProcess = {
      type: type ? type.value : null,
      status: status.value,
      taxRule: taxRule ? taxRule.value : null,
      amount: amount || null,
      percent: percent || null,
      reason: reason ? reason.value : null,
      source: source ? source.value : null,
      itemId: itemId || null,
      accountId: accountId || null,
      invoiceId: invoiceId || null,
      userId: 'USER-002',
      date: date ? moment(date).format('YYYY-MM-DD') : null,
      notes: notes || null,
    };

    this.setState({ isApplying: true });
    this.props.processDispute(dataProcess, () => {
      this.setState({ isApplying: false });
    });
  };

  render() {
    const {
      isApplying,
      openModalI,
      openModalIV,
      pageI,
      pageIV,
      sizeI,
      sizeIV,
      isSearchingI,
      isSearchingIV,
      invoices,
      items,
      accountId,
      type,
      taxRule,
      source,
      reason,
      percent,
      amount,
      notes,
      date,
      itemId,
      invoiceId,
      status,
    } = this.state;

    return (
      <PageAbstract>
        <div className="form-apply">
          <div className="form-apply__header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">Apply Dispute</h3>
              </Col>
            </Row>
          </div>
          <div className="form-apply__body">
            <FormAbstract onSubmit={this.onHandleProcess}>
              <Row>
                <Col md={6}>
                  <FormGroup title="AR Type">
                    <SelectField
                      name="type"
                      options={arOpsSelect.type}
                      placeholder="AR Type"
                      className="form__form-group-select"
                      valueSelected={type}
                      onChange={val => this.onChangeSelect('type', val)}
                      required
                      isClearable
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Item Id">
                    <input
                      name="itemId"
                      type="text"
                      placeholder="Item Id"
                      value={itemId}
                      onChange={() => {}}
                      onClick={this.onToggleModalI}
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Dispute Status">
                    <SelectField
                      options={arOpsSelect.disputeStatus}
                      className="form__form-group-select"
                      valueSelected={status}
                      onChange={val => this.onChangeSelect('status', val)}
                      required
                      isClearable={false}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Account Number">
                    <InputValidate
                      name="accountId"
                      type="text"
                      placeholder="Account Number"
                      value={accountId}
                      onChange={this.onChangeAccountId}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Tax Rule">
                    <SelectField
                      options={arOpsSelect.taxRule}
                      className="form__form-group-select"
                      valueSelected={taxRule}
                      onChange={val => this.onChangeSelect('taxRule', val)}
                      required
                      isClearable={false}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Invoice Id">
                    <InputValidate
                      name="invoiceId"
                      type="text"
                      placeholder="Invoice Id"
                      value={invoiceId}
                      onChange={() => {}}
                      onClick={this.onToggleModalIV}
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Amount">
                    <NumberFormat
                      value={amount}
                      thousandSeparator
                      placeholder="0.00"
                      prefix="$ "
                      onValueChange={this.onChangeAmount}
                      onBlur={this.onBlurAmount}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Start Date">
                    <div className="date-picker">
                      <DatePicker
                        name="date"
                        placeholderText="YYYY-MM-DD"
                        dateFormat="YYYY-MM-DD"
                        popperPlacement="bottom-start"
                        popperModifiers={{
                          flip: {
                            enabled: false,
                          },
                          preventOverflow: {
                            enabled: true,
                            escapeWithReference: false,
                          },
                        }}
                        selected={date}
                        onChange={d => this.onChangeDate('date', d)}
                        className="form__form-group-datepicker"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="form__form-group-icon">
                      <CalendarBlankIcon />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Percent">
                    <input
                      name="percent"
                      type="number"
                      placeholder="0.00"
                      value={percent}
                      onChange={this.onChangePercent}
                      onBlur={this.onBlurPercent}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Reason">
                    <SelectField
                      name="reason"
                      options={arOpsSelect.reason}
                      placeholder="Dispute Reason"
                      className="form__form-group-select"
                      valueSelected={reason}
                      onChange={val => this.onChangeSelect('reason', val)}
                      required
                      isClearable
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Source">
                    <SelectField
                      name="source"
                      options={arOpsSelect.source}
                      placeholder="Source"
                      className="form__form-group-select"
                      valueSelected={source}
                      onChange={val => this.onChangeSelect('source', val)}
                      isDisabled
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup title="Notes" className="input-textarea">
                    <textarea
                      name="notes"
                      type="text"
                      placeholder="Notes"
                      value={notes}
                      onChange={this.onChangeText}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <ButtonToolbar className="form-create__btn">
                <ButtonCustom
                  loading={isApplying}
                  className="btn btn-primary m-r"
                  type="submit"
                  title="Apply"
                  titleloading="Applying"
                />
              </ButtonToolbar>
            </FormAbstract>
          </div>
        </div>
        <ModalSelectItem
          openModal={openModalI}
          toggleModal={this.onToggleModalI}
          items={items}
          onSelectItem={this.onSelectItem}
          idSelected={itemId}
          unSelectItem={this.unSelectItem}
          page={pageI}
          size={sizeI}
          isSearching={isSearchingI}
          handlePage={this.handlePageI}
          handleSize={this.handleSizeI}
          onHandleSearch={this.onHandleSearchI}
          modalTitle="Choose item"
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
      </PageAbstract>
    );
  }
}

DisputeAppy.propTypes = {
  selectItemsId: PropTypes.func,
  selectInvoiceId: PropTypes.func,
  processDispute: PropTypes.func,
};

export default connect(
  null,
  {
    selectItemsId,
    selectInvoiceId,
    processDispute,
  },
)(DisputeAppy);
