describe('User can load page', () => {
  let contractAddress
  before(() => {
    cy.setupMetamask();
    cy.changeMetamaskNetwork('localhost')
    // cy.fetchMetamaskWalletAddress().then(address => cy.log("Address" + address))
    cy.switchToMetamaskWindow()
    cy.changeAccount()
    // cy.importMetaMaskWalletUsingPrivateKey('0xdd2fd4581271e230360230f9337d5c0430bf44c0')
    cy.switchToCypressWindow()
    cy.reload()
    cy.visit('/', {
      // onLoad(win) {
      //   win.ethereum.enable()
      //   win.location.reload()
      // },
    })
  });

  it('is expected to display the local wallet address', () => {
    cy.get('[data-cy=title]').should('contain.text', 'Purchase Contract')
    cy.get('[data-cy=address').should('contain.text', '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199')
  });

  context('deploying a contract', () => {
    before(() => {
      cy.get('[data-cy=buyer-address]').type('0x70997970c51812dc3a010c7d01b50e0d17dc79c8')
      cy.get('[data-cy=deploy-contract]').click()
      cy.confirmMetamaskTransaction()
    });
    it('is expected to display success message with address', () => {
      cy.get('[data-cy=status-message]').should('contain.text', 'You contract was deployed.')
      cy.get('[data-cy=contract-address]').then($span => {
        contractAddress = $span.text()
      })
    });
  });

  context('fetching a contract', () => {

    before(() => {
      cy.get('[data-cy=fetch-contract-address]').type(contractAddress)
      cy.get('[data-cy=fetch-contract]').click()
    });
    it('is expected to display contract address', () => {
      cy.get('[data-cy=fetched-contract-address]').should('contain.text', contractAddress)  
    });

    it('is expected to display contract status', () => {
      cy.get('[data-cy=fetched-contract-status]').should('contain.text', "Deployed")  
    });
  });
})
