Cypress.config({ defaultCommandTimeout: 10000 });

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

Cypress.Cookies.defaults({
  preserve: 'access_token',
});

context('My Offers - Received Offers', () => {
  beforeEach(() => {
    cy.viewport(1440, 886);
  });

  it('go to the Home page', () => {
    cy.visit('http://localhost:4200');
  });

  it('should click on Sign In button', () => {
    cy.get('[id=sign_in_link]').first().click();
  });

  it('do the login', () => {
    cy.get('#email').first().type('romeroadmin@tvb.com');
    cy.get('#password').first().type('123123');
    cy.get('#submit').first().click();
  });

  it('go to My Details page', () => {
    cy.get('#account_details_link').first().click();
    cy.url().should('include', '/account/account-details');
  });

  it('go to "Your Offers" page', () => {
    cy.get('#your_offers_link').first().click();
    cy.url().should('include', '/account/my-offers/your-offers');
    cy.contains('Your Offers');
  });
});
