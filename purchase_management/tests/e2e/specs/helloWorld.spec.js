describe('Display page', () => {
  it('is expected to show "Hello World', () => {
    cy.visit('/')
    cy.get('body').should('contain.text', "Hello world")
  });
});