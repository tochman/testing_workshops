describe('User can load page', () => {
  
  before(() => {
    cy.setupMetamask();
    cy.visit('/', {
      onLoad(win) {
        win.ethereum.enable()
        win.location.reload()
      },
    })
  });
  
  it('is expected to display app title', () => {
    cy.changeMetamaskNetwork('localhost')
    cy.fetchMetamaskWalletAddress().then(address => cy.log("Address" + address))
    cy.switchToMetamaskWindow()
    cy.changeAccount()
    // cy.get('.identicon__address-wrapper').click()
    // cy.get('.account-menu__accounts-container').within(()=> {
    //   cy.get('div').contains('Account 2').click
    // })
    // cy.switchToCypressWindow()
    // cy.reload()
    cy.get('[data-cy=title]').should('contain.text', 'Purchase Contract')
    cy.get('[data-cy=address').should('contain.text', '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
  });
})
