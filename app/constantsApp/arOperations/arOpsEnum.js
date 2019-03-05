export default {
  type: {
    billAdjustment: 'BILL_ADJUSTMENT',
    transactionAdjustment: 'TRANSACTION_ADJUSTMENT',
    billDispute: 'BILL_DISPUTE',
    transactionDispute: 'TRANSACTION_DISPUTE',
    billSettlement: 'BILL_SETTLEMENT',
    transactionSettlement: 'TRANSACTION_SETTLEMENT',
    writeOff: 'WRITE_OFF',
    writeOffReversal: 'WRITE_OFF_REVERSAL',
    payment: 'PAYMENT',
    paymentReversal: 'PAYMENT_REVERSAL',
    refund: 'REFUND',
    chargeback: 'CHARGEBACK',
  },
  arType: {
    credit: 'CREDIT',
    debit: 'DEBIT',
  },
  source: {
    external: 'EXTERNAL',
    selfCare: 'SELF_CARE',
    agentCare: 'AGENT_CARE',
    rerating: 'RERATING',
    payments: 'PAYMENTS',
    paymentSuspense: 'PAYMENT_SUSPENSE',
  },
  reason: {
    smallBalanceWriteOff: 'SMALL_BALANCE_WRITE_OFF',
    badDebtWriteOff: 'BAD_DEBT_WRITE_OFF',
    customerSatisFaction: 'CUSTOMER_SATISFACTION',
    rerating: 'RERATING',
    qualityOfService: 'QUALITY_OF_SERVICE',
    dataError: 'DATA_ERROR',
    setupError: 'SETUP_ERROR',
    pricingError: 'PRICING_ERROR',
  },
  taxRule: {
    withTax: 'WITH_TAX',
    withoutTax: 'WITHOUT_TAX',
    taxOnly: 'TAX_ONLY',
  },
  disputeStatus: {
    open: 'OPEN',
    closed: 'CLOSED',
  },
  writeOffStatus: {
    writeoff: 'WRITTEN_OFF',
    closed: 'CLOSED',
  },
  revenueRecognitionType: {
    mmediate: 'MMEDIATE',
    deferred: 'DEFERRED',
    revenueOnDeferralAuto: 'REVENUE_ON_DEFERRAL_AUTO',
    revenueOnDeferralManual: 'REVENUE_ON_DEFERRAL_MANUAL',
    dailyStraightLineAMortization: 'DAILY_STRAIGHT_LINE_AMORTIZATION',
    monthlyStraightLineAmortization: 'MONTHLY_STRAIGHT_LINE_AMORTIZATION',
    trueUp: 'TRUE_UP',
  },
};
