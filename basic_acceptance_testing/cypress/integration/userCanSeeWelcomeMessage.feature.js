describe('user that navigates to application page', () => {
  
  before(() => {
    cy.visit('/')
  });

  it('is expected to sdee welcome message', () => {
    cy.get('h1').should('contain.text', 'Hello User!')
  });

});