import React from 'react';
import { reduxForm, formValueSelector, change } from 'redux-form/immutable';
import { arrayPush, arrayRemoveAll } from 'redux-form';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ButtonToolbar, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PageAbstract, ButtonCustom, Switch } from 'components/commons';
import { SideBar } from 'components/customers';
import { btnCollapse, DataEnum, DEFAULT_SIZE_FETCH } from 'constantsApp';
import { FormCollapse, FormAbstract, FormGroup } from 'components/form';
import { ModalSelectAccount } from 'components/modals';
import { selectAccountId } from 'containers/App/actions';
import { calculateValCallback } from 'utils/utils';
import listCurrency from 'constantsApp/currency.json';
import { createAccount } from '../actions';
import CreateAccountInfo from './CreateAccountInfo';
import CreateContact from './CreateContact';
import CreateAddress from './CreateAddress';
import CreatePaymentProfile from './CreatePaymentProfile';
import CreateBillingProfile from './CreateBillingProfile';

class CreateAccountIndex extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      activeTab: { name: btnCollapse.createAccount[0].state, isActive: true },
      isPosting: false,
      isNonPaying: false,
      accounts: [],
      parentAccount: {},
      openModalAccount: false,
      pageAccount: 1,
      sizeAccount: DEFAULT_SIZE_FETCH,
      isSearchingAccount: false,
    };

    this.countryValue = {};
    this.stateValue = {};
    this.cityValue = {};
    this.postalCodeValue = {};
    this.codeValue = {};
    this.filterAccount = { fetchParentOnly: true };
    this.referenceContactsFromParent = false;
    this.referenceAddressesFromParent = false;
  }

  componentDidMount() {
    this.props.selectAccountId({ page: 1, size: DEFAULT_SIZE_FETCH, filter: this.filterAccount }, data => {
      const accounts = calculateValCallback(data);
      this.setState({ accounts });
    });
    // this.props.initialize({
    //   contacts: [{}],
    //   addresses: [{}],
    //   billingProfiles: [{}],
    //   paymentProfiles: [{}],
    // });
  }

  // componentDidUpdate(prevProps) {
  //   const { paymentProfiles } = this.props;
  //   const { paymentProfiles: prePaymentProfiles } = prevProps;
  //   const paymentProfilesArr = paymentProfiles.toJS();
  //   const prePaymentProfilesArr = prePaymentProfiles.toJS();
  //   console.log('componentDidUpdate', paymentProfilesArr, prePaymentProfilesArr);
  //   if (paymentProfilesArr[0].paymentMethod !== prePaymentProfilesArr[0].paymentMethod) {
  //     if (!paymentProfilesArr[0].paymentMethod || paymentProfilesArr[0].paymentMethod.value !== 'CREDIT_CARD') {
  //       this.props.dispatch(arrayRemoveAll('form_create_account', 'paymentProfiles[0].creditCards'))
  //     } else {
  //       this.props.dispatch(change('form_create_account', 'paymentProfiles[0].creditCards', [{}]))
  //       this.props.dispatch(change('form_create_account', 'paymentProfiles[0].creditCards[0].initValue', 'test'))
  //       // this.props.dispatch(change('form_create_account', 'paymentProfiles[0].creditCards[0].cardExpiry', ''))
  //       // this.props.dispatch(change('form_create_account', 'paymentProfiles[0].creditCards[0].last4CC', ''))
  //       // this.props.dispatch(change('form_create_account', 'paymentProfiles[0].creditCards[0].merchant', ''))
  //     }
  //   }
  // }

  onSelectCountry = (id, value) => {
    this.countryValue[id] = value;
  };

  onSelectState = (id, value) => {
    this.stateValue[id] = value;
  };

  unSelectState = id => {
    delete this.stateValue[id];
  };

  onSelectCity = (id, value) => {
    this.cityValue[id] = value;
  };

  unSelectCity = id => {
    delete this.cityValue[id];
  };

  onSelectPostalCode = (id, value) => {
    this.postalCodeValue[id] = value;
  };

  unSelectPostalCode = id => {
    delete this.postalCodeValue[id];
  };

  onSelectCode = (id, value) => {
    this.codeValue[id] = value;
  };

  unSelectCode = id => {
    delete this.codeValue[id];
  };

  onToggleTab = activeTabName => {
    const { activeTab } = this.state;
    if (activeTab.name === activeTabName) {
      this.setState({
        activeTab: { name: activeTabName, isActive: !activeTab.isActive },
      });
    } else {
      this.setState({ activeTab: { name: activeTabName, isActive: true } });
    }
  };

  onChangeNonPaying = () => {
    const { isNonPaying, parentAccount } = this.state;
    this.setState({ isNonPaying: !isNonPaying });
    if (!isNonPaying) {
      // this.initValueFromParent(parentAccount, true)
      const {
        customerSegment,
        type,
        subType,
        salesChannel,
        marketSegment,
        sellingCompany,
        lineOfBusiness,
        legalEntity,
        currency,
        effectiveDate,
      } = this.initAccountInfoFromParent(parentAccount);
      const {
        parentId,
        billingDom,
        billingSegment,
        billingFrequency,
        invoiceType,
        invoiceDelivery,
        paymentProfileId,
      } = this.initBillingProfilesFromParent(parentAccount.billingProfiles)[0];
      const { paymentMethod, paymentTerm } = this.initPaymentProfilesFromParent(parentAccount.paymentProfiles, true)[0];

      this.props.dispatch(change('form_create_account', 'customerSegment', customerSegment));
      this.props.dispatch(change('form_create_account', 'type', type));
      this.props.dispatch(change('form_create_account', 'subType', subType));
      this.props.dispatch(change('form_create_account', 'salesChannel', salesChannel));
      this.props.dispatch(change('form_create_account', 'marketSegment', marketSegment));
      this.props.dispatch(change('form_create_account', 'sellingCompany', sellingCompany));
      this.props.dispatch(change('form_create_account', 'lineOfBusiness', lineOfBusiness));
      this.props.dispatch(change('form_create_account', 'legalEntity', legalEntity));
      this.props.dispatch(change('form_create_account', 'currency', currency));
      this.props.dispatch(change('form_create_account', 'effectiveDate', effectiveDate));
      this.props.dispatch(change('form_create_account', 'billingProfiles[0].parentId', parentId));
      this.props.dispatch(change('form_create_account', 'billingProfiles[0].billingDom', billingDom));
      this.props.dispatch(change('form_create_account', 'billingProfiles[0].billingSegment', billingSegment));
      this.props.dispatch(change('form_create_account', 'billingProfiles[0].billingFrequency', billingFrequency));
      this.props.dispatch(change('form_create_account', 'billingProfiles[0].invoiceType', invoiceType));
      this.props.dispatch(change('form_create_account', 'billingProfiles[0].invoiceDelivery', invoiceDelivery));
      this.props.dispatch(change('form_create_account', 'billingProfiles[0].paymentProfileId', paymentProfileId));
      this.props.dispatch(change('form_create_account', 'paymentProfiles[0].paymentMethod', paymentMethod));
      this.props.dispatch(change('form_create_account', 'paymentProfiles[0].paymentTerm', paymentTerm));
    }
  };

  onToggleModalAccount = () => {
    this.setState(preState => ({
      openModalAccount: !preState.openModalAccount,
    }));
  };

  onSelectItem = parentId => {
    const { accounts, parentAccount } = this.state;
    if (parentId !== parentAccount.id) {
      const newParentAccount = accounts.find(el => el.id === parentId) || {};
      this.setState({ parentAccount: newParentAccount, isNonPaying: false });
      this.initValueFromParent(newParentAccount);
    }
  };

  initValueFromParent(parent) {
    const {
      contacts,
      addresses,
      billingProfiles,
      paymentProfiles,
    } = parent;

    const {
      customerSegment,
      type,
      subType,
      salesChannel,
      marketSegment,
      sellingCompany,
      lineOfBusiness,
      legalEntity,
      currency,
      effectiveDate,
    } = this.initAccountInfoFromParent(parent);

    const values = {
      customerSegment,
      type,
      subType,
      salesChannel,
      marketSegment,
      sellingCompany,
      lineOfBusiness,
      legalEntity,
      currency,
      effectiveDate,
      contacts: this.initContactsFromParent(contacts),
      addresses: this.initAddressesFromParent(addresses),
      billingProfiles: this.initBillingProfilesFromParent(billingProfiles),
      paymentProfiles: this.initPaymentProfilesFromParent(paymentProfiles, false),
    };
    this.props.initialize(values);
  }

  initAccountInfoFromParent(parent) {
    const {
      customerSegment,
      type,
      subType,
      salesChannel,
      marketSegment,
      sellingCompany,
      lineOfBusiness,
      legalEntity,
      currency,
      effectiveDate,
    } = parent;
    const currencyRes = currency
        ? listCurrency.currencies.find(item => item.code === currency)
        : null;
    return {
      customerSegment: customerSegment
          ? { value: customerSegment, label: customerSegment }
          : null,
      type: type ? { value: type, label: type } : null,
      subType: subType ? { value: subType, label: subType } : null,
      salesChannel: salesChannel
        ? { value: salesChannel, label: salesChannel }
        : null,
      marketSegment: marketSegment
        ? { value: marketSegment, label: marketSegment }
        : null,
      sellingCompany: sellingCompany || null,
      lineOfBusiness: lineOfBusiness || null,
      legalEntity: legalEntity || null,
      currency: currencyRes ? {
        label: `${currencyRes.name} (${currencyRes.code})`,
        value: currencyRes.code,
      } : null,
      effectiveDate: effectiveDate ? moment(effectiveDate) : null,
    }
  }

  initContactsFromParent(contacts) {
    return contacts.map(ct => ({
      salutation: ct.salutation || '',
      firstName: ct.firstName || '',
      middleName: ct.middleName || '',
      lastName: ct.lastName || '',
      position: ct.position || '',
      organization: ct.organization || '',
      email: ct.email,
      createdDate: ct.createdDate ? moment(ct.createdDate) : null,
      phones: ct.phones.map(phone => ({
        type: phone.type ? { value: phone.type, label: phone.type } : null,
        number: phone.number || null,
      })),
      billing: ct.roles.some(role => role === 'BILLING'),
      sold_to: ct.roles.some(role => role === 'SOLD_TO'),
      payment:ct.roles.some(role => role === 'PAYMENT'),
      service: ct.roles.some(role => role === 'SERVICE'),
    }));
  }

  initAddressesFromParent(addresses) {
    return addresses.map(ad => ({
      street: ad.street || '',
      extraLine: ad.extraLine || '',
      landmark: ad.landmark || '',
      billing: ad.roles.some(role => role === 'BILLING'),
      sold_to: ad.roles.some(role => role === 'SOLD_TO'),
      payment:ad.roles.some(role => role === 'PAYMENT'),
      service: ad.roles.some(role => role === 'SERVICE'),
      createdDate: ad.createdDate ? moment(ad.createdDate) : null,
      valuesInit: {
        country: ad.country,
        state: ad.state,
        city: ad.city,
        postalCode: ad.postalCode,
        code: ad.code,
      },
    }))
  }

  initPaymentProfilesFromParent(paymentProfiles, isNonPaying) {
    if (isNonPaying) {
      return paymentProfiles.map(payment => ({
        paymentMethod: { value: DataEnum.paymentMethod.nonPaying, label: DataEnum.paymentMethod.nonPaying },
        paymentTerm: payment.paymentTerm ? { value: payment.paymentTerm, label: payment.paymentTerm } : null,
      }))
    }

    return paymentProfiles.map(payment => ({
      paymentMethod: payment.paymentMethod ? { value: payment.paymentMethod, label: payment.paymentMethod } : null,
      paymentTerm: payment.paymentTerm ? { value: payment.paymentTerm, label: payment.paymentTerm } : null,
      creditCards: payment.creditCards.map(card => ({
        cardToken: card.cardToken,
        cardExpiry: card.cardExpiry,
        last4CC: card.last4CC,
        merchant: card.merchant,
      })),
    }))
  }

  initBillingProfilesFromParent(billingProfiles) {
    return billingProfiles.map(bill =>({
      parentId: bill.parentId || '',
      billingDom: bill.billingDom || '',
      billingSegment: bill.billingSegment || '',
      billingFrequency: bill.billingFrequency
        ? { value: bill.billingFrequency, label: bill.billingFrequency }
        : null,
      invoiceType: bill.invoiceType ? { value: bill.invoiceType, label: bill.invoiceType } : null,
      invoiceDelivery: bill.invoiceDelivery ? { value: bill.invoiceDelivery, label: bill.invoiceDelivery } : null,
      paymentProfileId: bill.paymentProfileId || '',
    }));
  }

  unSelectItem = () => {
    this.setState({ openModalAccount: false, parentAccount: {}, isNonPaying: false });
    this.props.initialize({
      contacts: [{}],
      addresses: [{}],
      billingProfiles: [{}],
      paymentProfiles: [{}],
    });
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
    filter.fetchParentOnly = true;
    this.setState({ isSearchingAccount: true });
    this.props.selectAccountId(
      {
        page: 1,
        size: DEFAULT_SIZE_FETCH,
        filter,
      },
      data => {
        const accounts = calculateValCallback(data);
        this.setState({
          isSearchingAccount: false,
          pageAccount: 1,
          sizeAccount: DEFAULT_SIZE_FETCH,
          accounts,
        });
      },
    );
    this.filterAccount = filter;
  };

  onChangeReferenceContact = async (value) => {
    this.referenceContactsFromParent = value;
    if (value) {
      const { parentAccount } = this.state;
      const contactsTmp = this.initContactsFromParent(parentAccount.contacts);

      await this.props.dispatch(arrayRemoveAll('form_create_account', 'contacts'))
      contactsTmp.forEach((element, index) => {
        const {
          salutation,
          firstName,
          middleName,
          lastName,
          position,
          organization,
          email,
          createdDate,
          phones,
          billing,
          sold_to,
          payment,
          service,
        } = element
        this.props.dispatch(change('form_create_account', `contacts[${index}].salutation`, salutation));
        this.props.dispatch(change('form_create_account', `contacts[${index}].firstName`, firstName));
        this.props.dispatch(change('form_create_account', `contacts[${index}].middleName`, middleName));
        this.props.dispatch(change('form_create_account', `contacts[${index}].lastName`, lastName));
        this.props.dispatch(change('form_create_account', `contacts[${index}].position`, position));
        this.props.dispatch(change('form_create_account', `contacts[${index}].organization`, organization));
        this.props.dispatch(change('form_create_account', `contacts[${index}].email`, email));
        this.props.dispatch(change('form_create_account', `contacts[${index}].createdDate`, createdDate));
        this.props.dispatch(change('form_create_account', `contacts[${index}].billing`, billing));
        this.props.dispatch(change('form_create_account', `contacts[${index}].sold_to`, sold_to));
        this.props.dispatch(change('form_create_account', `contacts[${index}].payment`, payment));
        this.props.dispatch(change('form_create_account', `contacts[${index}].service`, service));
        phones.forEach((phone, idx) => {
          const { type, number } = phone;
          this.props.dispatch(change('form_create_account', `contacts[${index}].phones[${idx}].type`, type));
          this.props.dispatch(change('form_create_account', `contacts[${index}].phones[${idx}].number`, number));
        })
      });
    }
  }

  onChangeReferenceAddress = async (value) => {
    this.referenceAddressesFromParent = value;
    if (value) {
      const { parentAccount } = this.state;
      const addressesTmp = this.initAddressesFromParent(parentAccount.addresses);
      await this.props.dispatch(arrayRemoveAll('form_create_account', 'addresses'))

      addressesTmp.forEach((element, index) => {
        const {
          street,
          extraLine,
          landmark,
          billing,
          sold_to,
          payment,
          service,
          createdDate,
          valuesInit,
        } = element;
        this.props.dispatch(change('form_create_account', `addresses[${index}].street`, street));
        this.props.dispatch(change('form_create_account', `addresses[${index}].extraLine`, extraLine));
        this.props.dispatch(change('form_create_account', `addresses[${index}].landmark`, landmark));
        this.props.dispatch(change('form_create_account', `addresses[${index}].billing`, billing));
        this.props.dispatch(change('form_create_account', `addresses[${index}].sold_to`, sold_to));
        this.props.dispatch(change('form_create_account', `addresses[${index}].payment`, payment));
        this.props.dispatch(change('form_create_account', `addresses[${index}].service`, service));
        this.props.dispatch(change('form_create_account', `addresses[${index}].createdDate`, createdDate));
        this.props.dispatch(change('form_create_account', `addresses[${index}].valuesInit`, valuesInit));
      })
    }
  }

  renderItem(id) {
    const { isNonPaying, parentAccount = {} } = this.state;
    const { addresses, paymentProfiles } = this.props;
    switch (id) {
      case 1:
        return <CreateAccountInfo isNonPaying={isNonPaying} />;
      case 2:
        return (
          <CreateContact
            isDisplayReference={!!parentAccount.id}
            onChangeReferenceContact={this.onChangeReferenceContact}
          />
        );
      case 3:
        return (
          <CreateAddress
            isDisplayReference={!!parentAccount.id}
            onSelectCountry={this.onSelectCountry}
            onSelectState={this.onSelectState}
            unSelectState={this.unSelectState}
            onSelectCity={this.onSelectCity}
            unSelectCity={this.unSelectCity}
            onSelectPostalCode={this.onSelectPostalCode}
            unSelectPostalCode={this.unSelectPostalCode}
            onSelectCode={this.onSelectCode}
            unSelectCode={this.unSelectCode}
            onChangeReferenceAddress={this.onChangeReferenceAddress}
            addresses={addresses || {}}
          />
        );
      case 4:
        return (
          <CreatePaymentProfile
            isNonPaying={isNonPaying}
            paymentProfiles={paymentProfiles}
          />
        );
      default:
        return <CreateBillingProfile isNonPaying={isNonPaying} />;
    }
  }

  formatRoles(item) {
    const roles = [];
    if (item.billing) {
      roles.push('BILLING');
    }
    if (item.sold_to) {
      roles.push('SOLD_TO');
    }
    if (item.payment) {
      roles.push('PAYMENT');
    }
    if (item.service) {
      roles.push('SERVICE');
    }
    return roles;
  }

  parsePhone(phones) {
    const dataPhones = phones.map(item => ({
      type: item.type ? item.type.value : null,
      number: item.number || null,
    }));
    return dataPhones;
  }

  parseContacts(contacts) {
    const dataContacts = contacts.map((item, index) => ({
      id: `CONTACT${index}`,
      organization: item.organization ? item.organization : null,
      salutation: item.salutation || null,
      firstName: item.firstName || null,
      middleName: item.middleName || null,
      lastName: item.lastName || null,
      roles: this.formatRoles(item) || null,
      email: item.email || null,
      position: item.position || null,
      phones: item.phones ? this.parsePhone(item.phones) : null,
      createdDate: item.createdDate
        ? moment(item.createdDate).format('YYYY-MM-DD')
        : null,
    }));
    return dataContacts;
  }

  parseAddresses(addresses) {
    const dataAddresses = addresses.map((item, id) => ({
      id: `ADDRESS${id}`,
      street: item.street || null,
      country: this.countryValue[id] || null,
      state: this.stateValue[id] || null,
      city: this.cityValue[id] || null,
      postalCode: this.postalCodeValue[id] || null,
      code: this.codeValue[id] || null,
      extraLine: item.extraLine || null,
      landmark: item.landmark || null,
      roles: this.formatRoles(item) || null,
      createdDate: item.createdDate
        ? moment(item.createdDate).format('YYYY-MM-DD')
        : null,
    }));
    return dataAddresses;
  }

  parseCreditCards(creditCards) {
    if (!creditCards) return []
    return creditCards.map(card => ({
      cardToken: card.cardToken,
      cardExpiry: card.cardExpiry,
      last4CC: card.last4CC,
      merchant: card.merchant,
    }));
  }

  parsePaymentProfles(paymentProfiles) {
    console.log('parsePaymentProfles', paymentProfiles)
    const { isNonPaying, parentAccount = {} } = this.state;
    if (!!parentAccount.id && isNonPaying) {
      return paymentProfiles.map(item => ({
        paymentMethod: DataEnum.paymentMethod.nonPaying || null,
        id: 'PRIMARY',
      }));
    } 

    return paymentProfiles.map(item => ({
      id: 'PRIMARY',
      paymentMethod: item.paymentMethod.value || null,
      paymentTerm: item.paymentTerm.value || null,
      creditCards: item.paymentMethod && item.paymentMethod.value === 'CREDIT_CARD' ? this.parseCreditCards(item.creditCards) : [],
    }));
  }

  parseBillingProfiles(billingProfiles) {
    const dataBillingProfiles = billingProfiles.map(item => ({
      id: 'PRIMARY',
      parentId: item.parentId,
      billingDom: item.billingDom || null,
      billingSegment: item.billingSegment || null,
      billingFrequency: item.billingFrequency
        ? item.billingFrequency.value
        : null,
      invoiceType: item.invoiceType ? item.invoiceType.value : null,
      invoiceDelivery: item.invoiceDelivery ? item.invoiceDelivery.value : null,
      paymentProfileId: item.paymentProfileId,
    }));
    return dataBillingProfiles;
  }

  onHandleCreateAccount = value => {
    this.setState({ isPosting: true });
    const result = value.toJS();
    const {
      customerSegment,
      type,
      subType,
      salesChannel,
      marketSegment,
      sellingCompany,
      lineOfBusiness,
      legalEntity,
      currency,
      effectiveDate,
      contacts,
      addresses,
      billingProfiles,
      paymentProfiles,
    } = result;

    const { parentAccount = {}, isNonPaying } = this.state;
    const notSendContact = !!parentAccount.id && this.referenceContactsFromParent;
    const notSendAddress = !!parentAccount.id && this.referenceAddressesFromParent;
    const notSendBilling = !!parentAccount.id && isNonPaying;

    const dataCreate = {
      parentId: parentAccount.id || null,
      currency: currency ? currency.value : null,
      type: type ? type.value : null,
      subType: subType ? subType.value : null,
      salesChannel: salesChannel ? salesChannel.value : null,
      sellingCompany: sellingCompany || null,
      lineOfBusiness: lineOfBusiness || null,
      legalEntity: legalEntity || null,
      customerSegment: customerSegment ? customerSegment.value : null,
      marketSegment: marketSegment ? marketSegment.value : null,
      effectiveDate: effectiveDate
        ? moment(effectiveDate).format('YYYY-MM-DD')
        : null,
      billingProfiles: notSendBilling ? [] : this.parseBillingProfiles(billingProfiles),
      paymentProfiles: this.parsePaymentProfles(paymentProfiles),
      contacts: notSendContact ? [] : this.parseContacts(contacts),
      addresses: notSendAddress ? [] : this.parseAddresses(addresses),
    };

    this.props.createAccount(dataCreate, () => {
      this.setState({ isPosting: false });
    });
  };

  renderIsNonPaying() {
    const { isNonPaying } = this.state;

    return (
      <Col md={6}>
        <FormGroup title="Create Non-Paying:">
          <Switch
            idForm="is_non_paying"
            checked={isNonPaying}
            onChangeToggle={this.onChangeNonPaying}
          />
        </FormGroup>
      </Col>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const {
      activeTab,
      isPosting,
      parentAccount = {},
      accounts,
      openModalAccount,
      pageAccount,
      sizeAccount,
      isSearchingAccount,
    } = this.state;

    return (
      <div className="global-page customer-page">
        <SideBar isShowSidebarItem />
        <PageAbstract>
          <FormAbstract onSubmit={handleSubmit(this.onHandleCreateAccount)}>
            <Row className="mb-3">
              <Col md={6}>
                <FormGroup title="Parent Id:">
                  <input
                    name="parentId"
                    onClick={() => this.onToggleModalAccount()}
                    type="text"
                    placeholder="Parent Id"
                    value={parentAccount.id || ''}
                    onChange={() => {}}
                  />
                </FormGroup>
              </Col>
              {parentAccount.id && this.renderIsNonPaying()}
            </Row>
            {btnCollapse.createAccount.map(item => (
              <FormCollapse
                key={item.id}
                title={item.title}
                isActive={item.state === activeTab.name && activeTab.isActive}
                onToggleTab={this.onToggleTab}
                state={item.state}
              >
                {this.renderItem(item.id)}
              </FormCollapse>
            ))}
            <ButtonToolbar className="form-create__btn">
              <ButtonCustom
                loading={isPosting}
                className="btn btn-primary"
                type="submit"
                title="Create Account"
                titleloading="Creating"
              />
            </ButtonToolbar>
          </FormAbstract>
        </PageAbstract>
        <ModalSelectAccount
          openModal={openModalAccount}
          toggleModal={this.onToggleModalAccount}
          items={accounts}
          onSelectItem={this.onSelectItem}
          itemSelected={parentAccount.id || ''}
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
CreateAccountIndex.propTypes = {
  initialize: PropTypes.func,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  createAccount: PropTypes.func,
  selectAccountId: PropTypes.func,
  addresses: PropTypes.any,
  paymentProfiles: PropTypes.any,
};

const selector = formValueSelector('form_create_account');

const withConnect = connect(
  (state) => {
    const addresses = selector(state, 'addresses');
    const paymentProfiles = selector(state, 'paymentProfiles');
    return {
      addresses,
      paymentProfiles,
    }
  },
  {
    createAccount,
    selectAccountId,
  },
);

const withReduxForm = reduxForm({
  form: 'form_create_account',
  // initialized: true,
  initialValues: {
    contacts: [{}],
    addresses: [{}],
    billingProfiles: [{}],
    paymentProfiles: [{}],
  },
  destroyOnUnmount: false,
  // forceUnregisterOnUnmount: true,
  // enableReinitialize: true,
});
export default compose(
  withReduxForm,
  withConnect,
)(CreateAccountIndex);
