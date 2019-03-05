import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Row, Col, ButtonToolbar } from 'reactstrap';
import NumberFormat from 'react-number-format';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import DatePicker from 'react-datepicker';
import { arOpsSelect, arOpsEnum } from 'constantsApp';
import { calculateValCallback, roundFloat } from 'utils/utils';
import { selectItemsId, selectInvoiceId } from 'containers/App/actions';
import { ModalSelectItem, ModalSelectInvoiceUnit } from 'components/modals';
import { PageAbstract, ButtonCustom, InputValidate } from 'components/commons';
import { FormAbstract, FormGroup, SelectField } from 'components/form';
import { processAdjustment } from '../actions';

class AdjustmentApply extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isApplying: false,
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
      type: null,
      taxRule: null,
      arType: null,
      source: {
        value: arOpsEnum.source.agentCare,
        label: arOpsEnum.source.agentCare,
      },
      reason: null,
      accountId: '',
      percent: '',
      amount: '',
      numberOfTransactions: '',
      notes: '',
      startDate: moment(),
    };

    this.filterIV = {};
    this.filterI = {};
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

  onBlurRoundFloat = evt => {
    this.setState({
      [evt.target.name]: roundFloat(evt.target.value, 2),
    });
  };

  onHandleProcess = evt => {
    evt.preventDefault();
    this.setState({ isApplying: true });
    const {
      type,
      taxRule,
      arType,
      reason,
      accountId,
      percent,
      amount,
      numberOfTransactions,
      notes,
      startDate,
      endDate,
      itemId,
      invoiceId,
      source,
    } = this.state;

    const dataProcess = {
      type: type ? type.value : null,
      userId: 'USER-001',
      taxRule: taxRule ? taxRule.value : null,
      arType: arType ? arType.value : null,
      reason: reason ? reason.value : null,
      source: source.value,
      accountId: accountId || null,
      percent: percent || null,
      amount: amount || null,
      numberOfTransactions: numberOfTransactions || null,
      notes: notes || null,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      itemId: itemId || null,
      invoiceId: invoiceId || null,
    };

    this.props.processAdjustment(dataProcess, () => {
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
      arType,
      source,
      reason,
      percent,
      amount,
      numberOfTransactions,
      notes,
      startDate,
      itemId,
      invoiceId,
    } = this.state;

    return (
      <PageAbstract>
        <div className="form-apply">
          <div className="form-apply__header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">Apply Adjustment</h3>
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
                  <FormGroup title="CR DR Type">
                    <SelectField
                      name="arType"
                      options={arOpsSelect.arType}
                      placeholder="CR DR Type"
                      className="form__form-group-select"
                      valueSelected={arType}
                      onChange={val => this.onChangeSelect('arType', val)}
                      required
                      isClearable
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Tax Rule">
                    <SelectField
                      name="taxRule"
                      options={arOpsSelect.taxRule}
                      placeholder="Tax Rule"
                      className="form__form-group-select"
                      valueSelected={taxRule}
                      onChange={val => this.onChangeSelect('taxRule', val)}
                      required
                      isClearable
                    />
                  </FormGroup>
                </Col>
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
                <Col md={6}>
                  <FormGroup title="Amount">
                    <NumberFormat
                      value={amount}
                      thousandSeparator
                      placeholder="0.00"
                      prefix="$ "
                      onValueChange={values => {
                        const { value } = values;
                        this.setState({ amount: value });
                      }}
                      onBlur={() => {
                        this.setState({ amount: roundFloat(amount, 2) });
                      }}
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
                  <FormGroup title="Percent">
                    <input
                      name="percent"
                      type="number"
                      placeholder="Percent"
                      value={percent}
                      onChange={this.onChangeText}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Account Id">
                    <InputValidate
                      name="accountId"
                      type="text"
                      placeholder="Account Id"
                      value={accountId}
                      onChange={this.onChangeAccountId}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Number of Transactions">
                    <input
                      name="numberOfTransactions"
                      type="number"
                      placeholder="Number of Transactions"
                      value={numberOfTransactions}
                      onChange={this.onChangeText}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Invoice Id">
                    <input
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
                  <FormGroup title="Reason">
                    <SelectField
                      name="reason"
                      options={arOpsSelect.reason}
                      placeholder="Adjustment Reason"
                      className="form__form-group-select"
                      valueSelected={reason}
                      onChange={val => this.onChangeSelect('reason', val)}
                      required
                      isClearable
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Start Date">
                    <div className="date-picker">
                      <DatePicker
                        name="startDate"
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
                        selected={startDate}
                        onChange={date => this.onChangeDate('startDate', date)}
                        className="form__form-group-datepicker"
                        isClearable
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

AdjustmentApply.propTypes = {
  selectItemsId: PropTypes.func,
  selectInvoiceId: PropTypes.func,
  processAdjustment: PropTypes.func,
};

export default connect(
  null,
  {
    selectItemsId,
    selectInvoiceId,
    processAdjustment,
  },
)(AdjustmentApply);
