import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { FormGroup } from 'components/form';
import { orderSelect } from 'constantsApp';

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.line.startDate || null,
      endDate: props.line.endDate || null,
      priceOverride: props.line.priceOverride || '',
      priceOffset: props.line.priceOffset || '',
      discountPercent: props.line.discountPercent || '',
      reason: props.line.reason || '',
      quantity: props.line.quantity || '',
      relativeStart: props.line.relativeStart || '',
      relativeStartUnit: props.line.relativeStartUnit
        ? {
            value: props.line.relativeStartUnit,
            label: props.line.relativeStartUnit,
          }
        : null,
      relativeEnd: props.line.relativeEnd || '',
      relativeEndUnit: props.line.relativeEndUnit
        ? {
            value: props.line.relativeEndUnit,
            label: props.line.relativeEndUnit,
          }
        : null,
    };
  }

  onChangePriceOverride = async evt => {
    this.setState({
      priceOverride: evt.target.value,
      priceOffset: '',
      discountPercent: '',
    });

    const { changeLines, parentName, serviceId, line } = this.props;
    await changeLines(
      parentName,
      serviceId,
      line.id,
      'priceOverride',
      evt.target.value,
    );
    await changeLines(parentName, serviceId, line.id, 'priceOffset', null);
    await changeLines(parentName, serviceId, line.id, 'discountPercent', null);
  };

  onChangePriceOffset = async evt => {
    this.setState({
      priceOverride: '',
      priceOffset: evt.target.value,
      discountPercent: '',
    });

    const { changeLines, parentName, serviceId, line } = this.props;
    await changeLines(
      parentName,
      serviceId,
      line.id,
      'priceOffset',
      evt.target.value,
    );
    await changeLines(parentName, serviceId, line.id, 'priceOverride', null);
    await changeLines(parentName, serviceId, line.id, 'discountPercent', null);
  };

  onChangeDiscountPercent = async evt => {
    this.setState({
      priceOverride: '',
      priceOffset: '',
      discountPercent: evt.target.value,
    });

    const { changeLines, parentName, serviceId, line } = this.props;
    await changeLines(
      parentName,
      serviceId,
      line.id,
      'discountPercent',
      evt.target.value,
    );

    await changeLines(parentName, serviceId, line.id, 'priceOverride', null);
    await changeLines(parentName, serviceId, line.id, 'priceOffset', null);
  };

  onChangeDate = (name, date) => {
    const { changeLines, parentName, serviceId, line } = this.props;
    this.setState({ [name]: date });

    changeLines(parentName, serviceId, line.id, name, date);
  };

  onChangeSelect = (name, select) => {
    const { changeLines, parentName, serviceId, line } = this.props;
    this.setState({ [name]: select });

    changeLines(parentName, serviceId, line.id, name, select.value);
  };

  onChangeText = evt => {
    const { changeLines, parentName, serviceId, line } = this.props;
    this.setState({ [evt.target.name]: evt.target.value });
    changeLines(
      parentName,
      serviceId,
      line.id,
      evt.target.name,
      evt.target.value,
    );
  };

  render() {
    const { line } = this.props;

    const {
      startDate,
      endDate,
      priceOverride,
      priceOffset,
      discountPercent,
      reason,
      quantity,
      relativeStart,
      relativeStartUnit,
      relativeEnd,
      relativeEndUnit,
    } = this.state;

    return (
      <tr>
        <td className="center">{line.action}</td>
        <td className="center">{line.status}</td>
        <td>
          <FormGroup title="">
            <input
              name="reason"
              type="text"
              value={reason}
              onChange={this.onChangeText}
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="quantity"
              type="number"
              value={quantity}
              onChange={this.onChangeText}
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="priceOverride"
              type="number"
              min={0}
              value={priceOverride}
              onChange={this.onChangePriceOverride}
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="priceOffset"
              min={0}
              type="number"
              value={priceOffset}
              onChange={this.onChangePriceOffset}
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="discountPercent"
              type="number"
              min={0}
              value={discountPercent}
              onChange={this.onChangeDiscountPercent}
            />
          </FormGroup>
        </td>
        <td className="center">{line.priceOfferId || line.id}</td>
        <td>{line.discountOfferId || ''}</td>
        <td>
          <FormGroup title="">
            <div className="date-picker">
              <DatePicker
                name="startDate"
                dateFormat="YYYY-MM-DD"
                popperPlacement="bottom-start"
                placeholderText="YYYY-MM-DD"
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
                autoComplete="off"
                isClearable
              />
            </div>
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <div className="date-picker">
              <DatePicker
                name="endDate"
                dateFormat="YYYY-MM-DD"
                placeholderText="YYYY-MM-DD"
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
                selected={endDate}
                onChange={date => this.onChangeDate('endDate', date)}
                className="form__form-group-datepicker"
                autoComplete="off"
                isClearable
              />
            </div>
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="relativeStart"
              type="number"
              value={relativeStart}
              onChange={this.onChangeText}
            />
          </FormGroup>
        </td>
        <td>
          <Select
            name="relativeStartUnit"
            options={orderSelect.relativeStartUnit}
            className="form__form-group-select"
            value={relativeStartUnit}
            onChange={select =>
              this.onChangeSelect('relativeStartUnit', select)
            }
          />
        </td>
        <td>
          <FormGroup title="">
            <input
              name="relativeEnd"
              type="number"
              value={relativeEnd}
              onChange={this.onChangeText}
            />
          </FormGroup>
        </td>
        <td>
          <Select
            name="relativeEndUnit"
            options={orderSelect.relativeEndUnit}
            className="form__form-group-select"
            value={relativeEndUnit}
            onChange={select => this.onChangeSelect('relativeEndUnit', select)}
          />
        </td>
      </tr>
    );
  }
}

Line.propTypes = {
  parentName: PropTypes.string,
  serviceId: PropTypes.string,
  changeLines: PropTypes.func,
  line: PropTypes.object,
};

export default Line;
