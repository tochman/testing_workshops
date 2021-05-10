import Page from '../pages/page';

const page = new Page();

let metamaskWalletAddress;

describe('Wallet tests', () => {
	before(() => {
		page.getMetamaskWalletAddress().then((address) => {
			metamaskWalletAddress = address;
		});
		page.visit();
	});
	context('Connect metamask wallet', () => {
		it(`should login with success`, () => {
			page.connectMetamaskWallet();
			page.acceptMetamaskAccessRequest();
			page.waitUntilLoggedIn();
			page.getLoggedInWalletAddress().then((walletAddress) => {
				const formattedMetamaskWalletAddress =
					metamaskWalletAddress.slice(0, 5) + '...' + metamaskWalletAddress.slice(-5);
				expect(walletAddress).to.equal(formattedMetamaskWalletAddress.toLowerCase());
			});
		});
	});
});