import React from 'react';
import { Row, Col, ButtonToolbar } from 'reactstrap';
import { arOpsSelect, arOpsEnum } from 'constantsApp';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { calculateValCallback, roundFloat } from 'utils/utils';
import { PageAbstract, ButtonCustom, Switch } from 'components/commons';
import { FormAbstract, FormGroup, SelectField } from 'components/form';
import UnpaidBillsTable from 'components/arOperations/UnpaidBillsTable';
import { selectInvoiceId } from 'containers/App/actions';
import { processWriteoff } from '../actions';

class WriteOffsApply extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isApplying: false,
      pageIV: 1,
      sizeIV: 20,
      type: { value: arOpsEnum.type.writeOff, label: arOpsEnum.type.writeOff },
      amount: '',
      percent: '',
      reason: null,
      taxRule: null,
      source: {
        value: arOpsEnum.source.agentCare,
        label: arOpsEnum.source.agentCare,
      },
      userId: 'USR-0001',
      accountId: '',
      notes: '',
      accountWriteoff: false,
    };
    this.preAccountId = '';
  }

  componentDidMount() {
    // this.props.selectInvoiceId(
    //   { page: 1, size: 20, filter: { due: 0 } },
    //   data => {
    //     const invoices = calculateValCallback(data);
    //     this.setState({ invoices });
    //   },
    // );
  }

  onSelectInvoice = invoice1 => {
    const { invoice } = this.state;
    if (!invoice) {
      this.setState({ invoice: invoice1 });
    } else if (invoice1.id === invoice.id) {
      this.setState({ invoice: null });
    } else {
      this.setState({ invoice: invoice1 });
    }
  };

  onChangeAccWO = () => {
    this.setState(preState => ({ accountWriteoff: !preState.accountWriteoff }));
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onChangeAccount = evt => {
    const { accountId } = this.state;
    this.preAccountId = accountId;

    this.setState({ accountId: evt.target.value });
  };

  onBlurAccount = () => {
    const { accountId } = this.state;
    if (this.preAccountId !== accountId) {
      this.props.selectInvoiceId(
        { page: 1, size: 20, filter: { due: 0, accountId } },
        data => {
          const invoices = calculateValCallback(data);
          this.setState({ invoices });
        },
      );
    }
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
      this.setState({ percent: evt.target.value });
    }
  };

  handlePageIV = pageOffset => {
    const { pageIV, sizeIV, accountId } = this.state;

    this.setState({ pageIV: pageIV + pageOffset });
    this.props.selectInvoiceId(
      {
        page: pageIV + pageOffset,
        size: sizeIV,
        filter: { due: 0, accountId },
      },
      data => {
        const invoices = calculateValCallback(data);
        this.setState({ invoices });
      },
    );
  };

  handleSizeIV = sizeIV => {
    const { accountId } = this.state;
    this.setState({ sizeIV, pageIV: 1 });
    this.props.selectInvoiceId(
      {
        page: 1,
        size: sizeIV,
        filter: { due: 0, accountId },
      },
      data => {
        const invoices = calculateValCallback(data);
        this.setState({ invoices });
      },
    );
  };

  onHandleProcess = event => {
    event.preventDefault();
    const {
      accountWriteoff,
      amount,
      percent,
      reason,
      taxRule,
      accountId,
      userId,
      source,
      type,
      notes,
      invoice,
    } = this.state;

    if (accountWriteoff && !reason) {
      return;
    }

    if (
      (!reason || !taxRule || !accountId || !userId || !source || !type) &&
      !accountWriteoff &&
      !amount &&
      !percent
    ) {
      return;
    }

    let dataCreate = {};
    if (!accountWriteoff) {
      dataCreate = {
        accountWriteoff,
        amount: amount || null,
        percent: percent || null,
        reason: reason.value,
        taxRule: taxRule.value,
        notes,
        accountId,
        userId,
        source: source.value,
        type: type.value,
        invoiceId: invoice ? invoice.id : null,
      };
    } else {
      dataCreate = {
        accountWriteoff,
        reason: reason.value,
        amount: amount || null,
        percent: percent || null,
        notes,
        userId,
        source: source.value,
        type: type.value,
      };
    }

    this.setState({ isApplying: true });
    this.props.processWriteoff(dataCreate, () => {
      this.setState({ isApplying: false });
    });
  };

  render() {
    const {
      isApplying,
      invoices,
      invoice,
      pageIV,
      sizeIV,
      isSearchingIV,
      accountWriteoff,
      reason,
      taxRule,
      amount,
      accountId,
      percent,
      type,
      source,
      notes,
      userId,
    } = this.state;

    return (
      <PageAbstract>
        <div className="form-apply">
          <div className="form-apply__header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">Apply Write Off</h3>
              </Col>
            </Row>
          </div>
          <div
            className="form-apply__header"
            style={{ borderTop: '4px solid rgb(132, 171, 79)' }}
          >
            <Row>
              <Col md={12}>
                <h3 className="bold-text">Unpaid Bills</h3>
              </Col>
            </Row>
          </div>
          <Row>
            <UnpaidBillsTable
              items={invoices}
              onSelectItem={this.onSelectInvoice}
              itemSelected={invoice && invoice.id}
              page={pageIV}
              size={sizeIV}
              isSearching={isSearchingIV}
              handlePage={this.handlePageIV}
              handleSize={this.handleSizeIV}
              onHandleSearch={this.onHandleSearchIV}
              accountId={accountId}
            />
          </Row>

          <div className="form-apply__body">
            <FormAbstract onSubmit={this.onHandleProcess}>
              <Row>
                <Col md={6}>
                  <FormGroup title="Account Writeoff">
                    <Switch
                      idForm="belong_to_parent"
                      checked={accountWriteoff}
                      onChangeToggle={this.onChangeAccWO}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Account Number">
                    <input
                      type="text"
                      name="accountId"
                      value={accountId}
                      onChange={this.onChangeAccount}
                      disabled={accountWriteoff}
                      onBlur={this.onBlurAccount}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Write-off Amount">
                    <NumberFormat
                      value={amount}
                      thousandSeparator
                      prefix="$ "
                      placeholder="0.00"
                      onValueChange={this.onChangeAmount}
                      onBlur={this.onBlurAmount}
                      disabled={accountWriteoff}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="User Id">
                    <input type="text" value={userId} readOnly />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup title="Write-off Percent">
                    <input
                      type="text"
                      name="percent"
                      value={percent}
                      placeholder="0.00"
                      onChange={this.onChangePercent}
                      onBlur={this.onBlurPercent}
                      disabled={accountWriteoff}
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
                      isDisabled
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
                      placeholder="Write-off Reason"
                      className="form__form-group-select"
                      valueSelected={reason}
                      onChange={val => this.onChangeSelect('reason', val)}
                      required
                      isClearable
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="AR Type">
                    <SelectField
                      name="source"
                      options={arOpsSelect.source}
                      placeholder="Source"
                      className="form__form-group-select"
                      valueSelected={type}
                      isDisabled
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
                      placeholder="Tax Rule"
                      onChange={val => this.onChangeSelect('taxRule', val)}
                      required
                      isClearable={false}
                      isDisabled={accountWriteoff}
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
                      value={notes}
                      placeholder="type something"
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
      </PageAbstract>
    );
  }
}

WriteOffsApply.propTypes = {
  selectInvoiceId: PropTypes.func,
  processWriteoff: PropTypes.func,
};

export default connect(
  null,
  {
    selectInvoiceId,
    processWriteoff,
  },
)(withRouter(WriteOffsApply));
