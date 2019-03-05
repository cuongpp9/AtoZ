export default {
  type: {
    collectionAction: 'COLLECTION_ACTION',
    collectionAgents: 'COLLECTION_AGENTS',
    collectionSchedule: 'COLLECTION_SCHEDULE',
  },
  action: {
    failedPaymentEmail: 'FAILED_PAYMENT_EMAIL',
    firstReminderEmail: 'FIRST_REMINDER_EMAIL',
    secondReminerEmail: 'SECOND_REMINDER_EMAIL',
    thirdReminderEmail: 'THIRD_REMINDER_EMAIL',
    firstPaymentRetry: 'FIRST_PAYMENT_RETRY',
    secondPaymentRetry: 'SECOND_PAYMENT_RETRY',
    thirdPaymentRetry: 'THIRD_PAYMENT_RETRY',
    inactiveSubcription: 'INACTIVATE_SUBSCRIPTION',
    writeOffAcount: 'WRITEOFF_ACCOUNT',
    closeAccount: 'CLOSE_ACCOUNT',
  },
  status: {
    open: 'OPEN',
    close: 'CLOSED',
    customerContactInitiated: 'CUSTOMER_CONTACT_INITIATED',
    customerContactEstablished: 'CUSTOMER_CONTACT_ESTABLISHED',
    promiseToPay: 'PROMISE_TO_PAY',
    promiseBroken: 'PROMISE_BROKEN',
    suspend: 'SUSPEND',
    writeOff: 'WRITEOFF',
  },
};
