describe('user that fills in a registration form', () => {

  describe('with valid information', () => {
    before(() => {
      // Step 2 INTERACT
      cy.visit('/')
      // Step 1 SETUP
      cy.get('form[id=registration]').within(() => {
        cy.get('input[id=name]').type('Thomas')
        cy.get('input[id=email]').type('thomas@agileventures.org')
        cy.get('input[id=submit-form]').click()
      })
    });

    // Step 3 - ASSERT
    it('is expected to see a confirmation message', () => {
      cy.get('[id=confirmation-message]')
        .should('contain.text', 'Thank you for signing up!')
    });

    it('is NOT expected to see the registration form', () => {
      cy.get('form[id=registration]')
        .should('not.be.visible')
    });

  });

  describe('with invalid information', () => {
    describe('missing "name"', () => {
      before(() => {
        // Step 2 INTERACT
        cy.visit('/')
        // Step 1 SETUP
        cy.get('form[id=registration]').within(() => {
          cy.get('input[id=email]').type('thomas@agileventures.org')
          cy.get('input[id=submit-form]').click()
        })
      });

      // Step 3 - ASSERT
      it('is expected to see a confirmation message', () => {
        cy.get('[id=confirmation-message]')
          .should('contain.text', 'You need to fill in your name!')
      });

      it('is expected to see the registration form', () => {
        cy.get('form[id=registration]')
          .should('be.visible')
      });
    });
  });

  describe('missing "email"', () => {
    before(() => {
      // Step 2 INTERACT
      cy.visit('/')
      // Step 1 SETUP
      cy.get('form[id=registration]').within(() => {
        cy.get('input[id=name]').type('Thomas')
        cy.get('input[id=submit-form]').click()
      })
    });

    // Step 3 - ASSERT
    it('is expected to see a confirmation message', () => {
      cy.get('[id=confirmation-message]')
        .should('contain.text', 'You need to fill in your email!')
    });

    it('is expected to see the registration form', () => {
      cy.get('form[id=registration]')
        .should('be.visible')
    });
  });
});

