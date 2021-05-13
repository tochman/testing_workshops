

Cypress.Commands.add('fetchMetamaskWalletAddress', () => {
  cy.task('fetchMetamaskWalletAddress').then(address => {
    return address;
  });
});

Cypress.Commands.add(
  'setupMetamask',
  (secretWords, network, password = 'Tester@1234') => {
    return cy.task('setupMetamask', { secretWords, network, password });
  },
);