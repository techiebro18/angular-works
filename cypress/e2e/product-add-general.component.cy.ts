Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Cookies.defaults({
  preserve: 'API_KEY'
});

context('Private Seller Product Upload - Step 1', { defaultCommandTimeout: 10000 }, () => {
  beforeEach(() => {
    cy.viewport(1440, 886);
  });

  context('Desktop layout', () => {
    it('go to the Home page', () => {
      cy.visit('http://localhost:4200');
    });

    it('should click on Sell an Item button', () => {
      cy.get('[id=sell_an_item_link]').first().click();
    });

    it('should be in the Sellers Login page', () => {
      cy.contains('JOIN TVB COMMUNITY');
      cy.url().should('include', '/sellers/login');
    });

    it('do the login', () => {
      cy.get('#returning_member_tab-link').first().click();
      cy.get('#email').first().type('romeropvtseller@tvb.com');
      cy.get('#password').first().type('123123');
      cy.get('#submit').first().click();
    });

    it('go to the Private Seller upload page', () => {
      cy.url().should('include', '/sellers/product-add/general');
      cy.contains('Sell with us');
    });

    it('select WHAT ARE YOU SELLING', () => {
      cy.get('#CLOTHING').first().click();
    });

    it('select a DESIGNER', () => {
      cy.get('#brand_input').first().click();
      cy.get('span.ng-option-label').contains('Dior').first().click();
    });

    it('select SUBCATEGORY', () => {
      cy.get('#subcategories_input').first().click();
      cy.get('span.ng-option-label').contains('Outerwear').first().click();
    });

    it('select MATERIAL', () => {
      cy.get('#material_input').first().click();
      cy.get('span.ng-option-label').contains('Leather').first().click();
    });

    it('select a COLOR', () => {
      cy.get('#color_input').first().click();
      cy.get('span.ng-option-label').contains('Black').first().click();
    });

    it('inform the SERIAL NUMBER', () => {
      cy.get('#serial_number_input').first().type('sample-serial-123');
    });

    it('select MATERIAL', () => {
      cy.get('#measurements_input').first().click();
      cy.get('span.ng-option-label').contains('M').first().click();
    });

    it('select a CONDITION', () => {
      cy.get('#condition_excellent').first().check('2');
    });

    it('inform WIDTH, HEIGHT, DEPTH', () => {
      cy.get('[formcontrolname=measurement_width]').first().type('7');
      cy.get('[formcontrolname=measurement_height]').first().type('8');
      cy.get('[formcontrolname=measurement_depth]').first().type('9');
    });

    it('inform PRICE', () => {
      cy.get('#price_input').first().type('100');
    });


    it('inform DESCRIPTION', () => {
      cy.get('#description_input').first().type('This is a description written with Cypress');
    });

    it('SUBMIT the form', () => {
      cy.get('#submit_button').first().click();
    });
  });
});
