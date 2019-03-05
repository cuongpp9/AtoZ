export default {
  accountStatus: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    CLOSED: 'CLOSED',
  },
  paymentConfig: {
    PAYMENT_TERMS: 'PAYMENT_TERMS',
    PAYMENT_MERCHANTS: 'PAYMENT_MERCHANTS',
    PAYMENT_METHODS: 'PAYMENT_METHODS',
  },
  paymentMethod: {
    CHECK: 'CHECK',
    CREDIT_CARD: 'CREDIT_CARD',
  },
  paymentTerm: {
    NET_30: 'NET_30',
    NET_45: 'NET_45',
    NET_60: 'NET_60',
    NET_75: 'NET_75',
    NET_90: 'NET_90',
  },
  status: {
    open: 'OPEN',
    closed: 'CLOSED',
    reversed: 'REVERSED',
  },
  paymentReversalReason: {
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    WRONG_ALLOCATION: 'WRONG_ALLOCATION',
    CUSTOMER_REQUEST: 'CUSTOMER_REQUEST',
    WRONG_ACCOUNT: 'WRONG_ACCOUNT',
    WRONG_INVOICE: 'WRONG_INVOICE',
  },
  paymentWorkingDay: {
    NEXT_WORKING_DAYL: 'NEXT_WORKING_DAY',
    LAST_WORKING_DAY: 'LAST_WORKING_DAY',
  },
  paymentType: {
    creditCard: 'CREDIT_CARD',
    invoice: 'CHECK',
  },
};
