import Page from '../pages/page'

const page = new Page()

let metaMaskWalletAddress

describe('Display page', () => {
  before(async () => {
    let wallet = await page.getMetamaskWalletAddress()
    metaMaskWalletAddress = wallet.address

    page.visit()
  });

  it.only(`should login with success`, () => {
    page.connectMetamaskWallet();
    page.acceptMetamaskAccessRequest();
    page.waitUntilLoggedIn();
    page.getLoggedInWalletAddress().then((exchangeWalletAddress) => {
      const formattedMetamaskWalletAddress =
        metaMaskWalletAddress.slice(0, 5) + '...' + metaMaskWalletAddress.slice(-5);
      expect(exchangeWalletAddress).to.equal(formattedMetamaskWalletAddress.toLowerCase());
    });
  });

  it('is expected to show "Purchase Contract', () => {
    cy.get('body').should('contain.text', "Purchase Contract")
  });
});