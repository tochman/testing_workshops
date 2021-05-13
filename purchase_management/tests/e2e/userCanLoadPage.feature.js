describe('User can load page', () => {
  
  before(() => {
    cy.visit('/')
  });

  it('is expected to display app title', () => {
    cy.get('[data-cy=title]').should('contain.text', 'Purchase Contract')
  });
})
