import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'reactstrap';
import { SideBar } from 'components/orders';
import { PageAbstract, ButtonCustom } from 'components/commons';
import { FormAbstract } from 'components/form';
import { ModalValidate } from 'components/modals';
import { createOrderValidateMsg } from 'constantsApp';
import OrderSelectAccount from './OrderSelectAccount';
import OrderFormSubscription from './OrderFormSubscription';
class OrderCreateAbtract extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      msgValidate: '',
      showModalValidate: false,
      pageAccount: 1,
      sizeAccount: 10,
      filterAccount: {},
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  getInfoAccount = (name, val) => {
    this.setState({ [name]: val });
  };

  nextPage() {
    // this.setState({ page: this.state.page + 1 });
    const { page } = this.state;
    const { aSelectedId } = this.props;
    if (page === 1 && !aSelectedId) {
      this.setState({
        msgValidate: createOrderValidateMsg.selectAccount,
        showModalValidate: true,
      });
      return;
    }
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  handleDismissModal = () => {
    this.setState({ showModalValidate: false });
  };

  render() {
    const {
      page,
      showModalValidate,
      msgValidate,
      pageAccount,
      sizeAccount,
      filterAccount,
    } = this.state;
    const {
      onSubmit,
      isPosting,
      aSelectedId,
      selectAccount,
      subscription,
      serviceUnits,
      errorSubscription,
      errorServiceUnits,
      onChangeSelect,
      onChangeText,
      subscriptionReason,
      subscriptionStatus,
      renewalTermUnit,
      renewalTerm,
      isSuspend,
      isResume,
      isCancel,
      isRenew,
    } = this.props;
    const enableBtn =
      (isSuspend && subscriptionReason) ||
      isResume ||
      (isCancel && subscriptionReason) ||
      (isRenew && renewalTermUnit && renewalTerm);
    return (
      <div className="order-create-abstract">
        <SideBar isShowSidebarItem={false} />
        <PageAbstract>
          {page === 1 && (
            <OrderSelectAccount
              aSelectedId={aSelectedId}
              onSelectAccount={selectAccount}
              page={pageAccount}
              size={sizeAccount}
              filter={filterAccount}
              getInfoAccount={this.getInfoAccount}
            />
          )}

          <FormAbstract onSubmit={onSubmit}>
            {page === 2 && (
              <OrderFormSubscription
                aSelectedId={aSelectedId}
                subscription={subscription}
                serviceUnits={serviceUnits}
                errorSubscription={errorSubscription}
                errorServiceUnits={errorServiceUnits}
                onChangeSelect={onChangeSelect}
                onChangeText={onChangeText}
                subscriptionReason={subscriptionReason}
                subscriptionStatus={subscriptionStatus}
                renewalTermUnit={renewalTermUnit}
                renewalTerm={renewalTerm}
                isSuspend={isSuspend}
                isResume={isResume}
                isCancel={isCancel}
                isRenew={isRenew}
              />
            )}
            <ButtonToolbar className="form-create__btn">
              <div className="form-create__group-btn">
                <Button
                  color="primary"
                  type="button"
                  disabled={page === 1}
                  className="previous"
                  onClick={this.previousPage}
                >
                  Back
                </Button>
                <Button
                  color="primary"
                  type="button"
                  disabled={page === 2}
                  className={`next ${page === 2 ? 'btn-none' : ''}`}
                  onClick={this.nextPage}
                >
                  Next
                </Button>
                {page === 2 && (
                  <ButtonCustom
                    loading={isPosting}
                    className="btn btn-primary"
                    type="submit"
                    title="Create"
                    titleloading="Creating"
                    disabled={!enableBtn}
                  />
                )}
              </div>
            </ButtonToolbar>
          </FormAbstract>
        </PageAbstract>
        <ModalValidate
          visible={showModalValidate}
          handleDismissModal={this.handleDismissModal}
          msg={msgValidate}
        />
      </div>
    );
  }
}

OrderCreateAbtract.propsTypes = {
  onSubmit: PropTypes.func,
  aSelectedId: PropTypes.string,
  selectAccount: PropTypes.func,
  subscription: PropTypes.object,
  serviceUnits: PropTypes.array,
  errorSubscription: PropTypes.string,
  errorServiceUnits: PropTypes.string,
  isPosting: PropTypes.bool,
  isSuspend: PropTypes.bool,
  isResume: PropTypes.bool,
  isCancel: PropTypes.bool,
  isRenew: PropTypes.bool,
  onChangeSelect: PropTypes.func,
  onChangeText: PropTypes.func,
  subscriptionReason: PropTypes.object,
  subscriptionStatus: PropTypes.object,
  renewalTermUnit: PropTypes.object,
  renewalTerm: PropTypes.any,
};

export default OrderCreateAbtract;
