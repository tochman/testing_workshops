/* eslint-disable no-undef */

describe("User can load page", () => {
  let contractAddress;
  before(() => {
    cy.setupMetamask();
    cy.changeMetamaskNetwork("localhost");
    cy.changeAccount(1);
    cy.visit("/");
  });

  it("is expected to display the local wallet address", () => {
    cy.get("[data-cy=title]").should("contain.text", "Purchase Contract");
    cy.get("[data-cy=address]").should(
      "contain.text",
      "Your address is: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    );
  });

  context("deploying a contract", () => {
    before(() => {
      cy.get("[data-cy=buyer-address]").type(
        "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
      );
      cy.get("[data-cy=deploy-contract]").click();
      cy.confirmMetamaskTransaction();
    });
    it("is expected to display success message with address", () => {
      cy.get("[data-cy=status-message]").should(
        "contain.text",
        "You contract was deployed."
      );
      cy.get("[data-cy=contract-address]").then(($span) => {
        contractAddress = $span.text();
      });
    });
  });

  context("fetching a contract", () => {
    before(() => {
      cy.importMetaMaskWalletUsingPrivateKey(
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
      );
      cy.changeAccount(2);
      cy.get("[data-cy=fetch-contract-address]").type(contractAddress);
      cy.get("[data-cy=fetch-contract]").click();
    });
    it("is expected to display contract address", () => {
      cy.get("[data-cy=fetched-contract-address]").should(
        "contain.text",
        contractAddress
      );
    });

    it("is expected to display contract status", () => {
      cy.get("[data-cy=fetched-contract-status]").should(
        "contain.text",
        "Deployed"
      );
    });
  });
});
