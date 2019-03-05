import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Row, Col, ButtonToolbar } from 'reactstrap';
import NumberFormat from 'react-number-format';
import { PageAbstract, ButtonCustom } from 'components/commons';
import { FormAbstract, FormGroup } from 'components/form';
import { roundFloat } from 'utils/utils';
import { processWriteoffReversal } from '../actions';
class ReverseWriteOff extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isApplying: false,
      amount: '',
      percent: '',
      notes: '',
    };
  }

  componentDidMount() {
    if (
      !this.props.location.state ||
      !this.props.location.state.writeOffItemSelected
    ) {
      this.props.history.push('/ar-operations/write-offs');
    }
  }

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onBlurRoundFloat = evt => {
    this.setState({
      [evt.target.name]: roundFloat(evt.target.value, 2),
    });
  };

  onHandleProcess = evt => {
    evt.preventDefault();
    const { writeOffItemSelected } = this.props.location.state;
    const { amount, percent, notes } = this.state;
    if (!amount && !percent) {
      return;
    }

    const dataProcess = {
      id: writeOffItemSelected.id,
      amount: amount || null,
      percent: percent || null,
      notes: notes || null,
    };

    this.setState({ isApplying: true });
    this.props.processWriteoffReversal(dataProcess, () => {
      this.setState({ isApplying: false });
    });
  };

  render() {
    const { isApplying, amount, percent, notes } = this.state;
    const { location } = this.props;
    const writeOffItemSelected = location.state
      ? location.state.writeOffItemSelected
      : {};
    const enableAmount =
      writeOffItemSelected.amount ||
      (!writeOffItemSelected.amount && !writeOffItemSelected.percent);
    return (
      <PageAbstract>
        <div className="form-apply">
          <div className="form-apply__header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">Write-off Reversal</h3>
              </Col>
            </Row>
          </div>
          <div className="form-apply__body">
            <FormAbstract onSubmit={this.onHandleProcess}>
              <Row>
                <Col md={6}>
                  <FormGroup
                    title="Amount"
                    iconLabel={
                      !enableAmount ? (
                        <i className="fa fa-lock" aria-hidden="true" />
                      ) : null
                    }
                  >
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
                      disabled={!enableAmount}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Write-off Amount">
                    <NumberFormat
                      value={writeOffItemSelected.amount || '0'}
                      thousandSeparator
                      prefix="$ "
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup
                    title="Percent"
                    iconLabel={
                      enableAmount ? (
                        <i className="fa fa-lock" aria-hidden="true" />
                      ) : null
                    }
                  >
                    <input
                      name="percent"
                      type="number"
                      value={percent}
                      onChange={this.onChangeText}
                      onBlur={this.onBlurRoundFloat}
                      disabled={enableAmount}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup title="Write-off Percent">
                    <input
                      type="text"
                      value={writeOffItemSelected.percent || '0'}
                      readOnly
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
      </PageAbstract>
    );
  }
}

ReverseWriteOff.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  processWriteoffReversal: PropTypes.func,
};

export default connect(
  null,
  {
    processWriteoffReversal,
  },
)(withRouter(ReverseWriteOff));
