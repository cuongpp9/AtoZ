export function getAccountId() {
  return localStorage.getItem('accountId') || '';
}

export function setAccountId(accountId) {
  localStorage.setItem('accountId', accountId);
}
