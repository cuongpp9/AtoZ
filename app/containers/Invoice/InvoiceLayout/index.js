import React, { Component } from 'react';
import jsreport from 'jsreport-browser-client-dist';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { ButtonToolbar, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenReport } from 'config/token';
import serverReport from 'config/serverReport';
import { getInvoiceById } from '../actions';
import { makeErrorMessage } from '../selectors';

class InvoiceLayout extends Component {
  constructor() {
    super();
    this.state = {
      contentReportUrl: null,
      buttonActive: 0,
    };
    this.dataInvoice = null;
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.props.getInvoiceById(id, data => {
      this.dataInvoice = data;
      this.handleRunReport(data, 'html');
    });
  }

  handleClickButton = index => {
    const { buttonActive } = this.state;
    if (index !== buttonActive) {
      this.setState({ buttonActive: index });
      if (!index) {
        this.handleRunReport(this.dataInvoice, 'html');
      } else {
        this.handleRunReport(this.dataInvoice, 'phantom-pdf');
      }
    }
  };

  handleRunReport = (data, recipe) => {
    jsreport.serverUrl = serverReport;
    jsreport.headers.Authorization = tokenReport;

    const request = {
      template: {
        name: 'invoice',
        engine: 'handlebars',
        recipe,
      },
      data,
    };
    jsreport.renderAsync(request).then(res => {
      this.setState({ contentReportUrl: res.toDataURI() });
    });
  };

  render() {
    const { errorMessage } = this.props;

    if (errorMessage) {
      return (
        <div className="m-t">
          <p className="txt-error">{errorMessage}</p>
        </div>
      );
    }

    const { buttonActive } = this.state;
    return (
      <div>
        <div className="m-t">
          <ButtonToolbar className="form__button-toolbar">
            <Button
              className={classNames('btn', {
                'btn-primary': !buttonActive,
                'btn-default': buttonActive,
              })}
              onClick={() => this.handleClickButton(0)}
            >
              HTML
            </Button>
            <Button
              className={classNames('btn', {
                'btn-primary': buttonActive,
                'btn-default': !buttonActive,
              })}
              onClick={() => this.handleClickButton(1)}
            >
              PDF
            </Button>
          </ButtonToolbar>
        </div>
        <iframe
          type="application/pdf"
          src={this.state.contentReportUrl}
          title="report_view"
          style={{ width: '85%', minHeight: '640px' }}
        />
      </div>
    );
  }
}

InvoiceLayout.propTypes = {
  match: PropTypes.object,
  getInvoiceById: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  {
    getInvoiceById,
  },
)(InvoiceLayout);
