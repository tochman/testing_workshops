describe('User can load page', () => {

  before(() => {
    cy.setupMetamask();
    cy.changeMetamaskNetwork('localhost')
    cy.fetchMetamaskWalletAddress().then(address => cy.log("Address" + address))
    cy.switchToMetamaskWindow()
    cy.changeAccount()
    cy.switchToCypressWindow()
    cy.reload()
    cy.visit('/', {
      onLoad(win) {
        // win.ethereum.enable()
        // win.location.reload()
      },
    })
  });

  it('is expected to display the local wallet address', () => {
    cy.get('[data-cy=title]').should('contain.text', 'Purchase Contract')
    cy.get('[data-cy=address').should('contain.text', '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
  });

  context('deploying a contract', () => {
    before(() => {
      cy.get('[data-cy=buyer-address]').type('0x70997970c51812dc3a010c7d01b50e0d17dc79c8')
      cy.get('[data-cy=deploy-contract]').click()
      cy.confirmMetamaskTransaction()
    });
    it('is expected to display success message with address', () => {
      cy.get('[data-cy=status-message]').should('contain.text', 'You contract was deployed.')
    });
  });
})
