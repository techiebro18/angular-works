const BASE_URL = 'http://localhost:4200/elk';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

Cypress.Cookies.defaults({
  preserve: 'access_token',
});

context('ELK PLP Shop', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  // GIVEN I access /shop
  // WHEN the page loads
  //   THEN no checkboxes should be checked
  it.only('SPEC-01', () => {
    cy.visit(BASE_URL + '/shop');

    cy.url().should('eq', BASE_URL + '/shop');
    cy.get('input[type=checkbox]').each((item, index, list) => {
      cy.wrap(item).should('not.be.checked');
    });
  });

  // GIVEN I access /shop
  // WHEN I click on the “cat1” Category
  //   THEN the “cat1” checkbox must be checked
  //   AND the URL must be equals to BASE_URL/elk/shop/cat1?category=cat1
  it('SPEC-02', () => {
    cy.visit(BASE_URL + '/shop');
    cy.get('#category_1').check();
    cy.get('#category_1')
      .invoke('prop', 'value')
      .then(val => {
        cy.get('#category_1').should('have.value', val);
        cy.url().should('eq', BASE_URL + '/shop/' + val + '?category=' + val);
      });
  });

  // GIVEN I access /shop/cat1
  // WHEN the page loads
  //   THEN the “cat1” checkbox in “Categories” section must be checked
  it('SPEC-03', () => {
    const cat1 = 'bags';

    cy.visit(BASE_URL + '/shop/' + cat1);
    cy.get('#category_1').should('be.checked');
  });

  // GIVEN I access /shop/cat1
  // WHEN I check the “cat2” category
  //   THEN the URL must be equals to BASE_URL/elk/shop/cat1?category=cat1&category=cat2
  it('SPEC-04', () => {
    cy.visit(BASE_URL + '/shop/bags');
    cy.get('#category_2').check();
    cy.get('#category_2').should('be.checked');
    cy.get('#category_1')
      .invoke('prop', 'value')
      .then(cat1Value => {
        cy.get('#category_2')
          .invoke('prop', 'value')
          .then(cat2Value => {
            cy.get('#category_2').should('have.value', cat2Value);
            cy.url().should(
              'eq',
              BASE_URL + '/shop/' + cat1Value + '?category=' + cat1Value  + '&category=' + cat2Value
            );
          });
      });

  });

  // GIVEN I access BASE_URL/elk/shop
  // WHEN the page loads
  //   THEN the "cat1" category checkbox is checked
  // WHEN I check the “cat2” category
  //   THEN the "cat2" category checkbox is checked
  // WHEN I uncheck the “cat2” category
  //   THEN the "cat2" category checkbox is unchecked
  //   AND the URL must be equals to BASE_URL/elk/shop/cat1?category=cat1
  it('SPEC-05', () => {
    cy.visit(BASE_URL + '/shop');
    cy.get('#category_1').check();
    cy.get('#category_1').should('be.checked');
    cy.get('#category_2').check();
    cy.get('#category_2').should('be.checked');
    cy.get('#category_2').uncheck();
    cy.get('#category_2').should('not.be.checked');
    cy.get('#category_1')
      .invoke('prop', 'value')
      .then(cat1Value => {
        cy.url().should('eq', BASE_URL + '/shop/' + cat1Value + '?category=' + cat1Value);
      });
  });

  // GIVEN I access BASE_URL/elk/shop/cat1
  // WHEN the page loads
  //   THEN the "cat1" category checkbox is checked
  // WHEN I check the “cat2” category
  //   THEN the "cat2" category checkbox is checked
  // WHEN I uncheck the “cat1” category
  //   THEN the "cat1" category checkbox is unchecked
  //   AND the URL must be equals to BASE_URL/elk/shop/cat2?category=cat2
  it('SPEC-06', () => {
    cy.visit(BASE_URL + '/shop/bags');
    cy.get('#category_1').should('have.value', 'bags');

    cy.get('#category_1').should('be.checked');
    cy.get('#category_2').check();
    cy.get('#category_2').should('be.checked');
    cy.get('#category_1').click();
    cy.get('#category_1').should('not.be.checked');
    cy.get('#category_2')
      .invoke('prop', 'value')
      .then(cat2Value => {
        cy.get('#category_2').should('have.value', cat2Value);
        cy.url().should('eq', BASE_URL + '/shop/' + cat2Value + '?category=' + cat2Value);
      });
  });

  // GIVEN I access BASE_URL/elk/shop/cat1
  // WHEN the page loads
  //   THEN the "cat1" category checkbox is checked
  // WHEN I check the “cat2” category
  //   THEN the "cat2" category checkbox is checked
  // WHEN I check the “cat3” category
  //   THEN the "cat3" category checkbox is checked
  //   AND the URL must be equals to BASE_URL/elk/shop/cat1?category=cat1&category=cat2&category=cat3
  it('SPEC-07', () => {
    cy.visit(BASE_URL + '/shop/bags');
    cy.get('#category_1').should('be.checked');
    cy.get('#category_2').check();
    cy.get('#category_2').should('be.checked');
    cy.get('#category_1')
      .invoke('prop', 'value')
      .then(cat1Value => {
        cy.get('#category_2')
          .invoke('prop', 'value')
          .then(cat2Value => {
            cy.get('#category_2').should('have.value', cat2Value);
            cy.get('#category_3')
              .invoke('prop', 'value')
              .then(cat3Value => {
                cy.get('#category_3').should('have.value', cat3Value);
                cy.get('#category_3').check();
                cy.get('#category_3').should('be.checked');

                cy.url().should(
                  'include',
                  BASE_URL + '/shop/' + cat1Value + '?category=' + cat1Value
                    + '&category=' + cat2Value + '&category=' + cat3Value
                );
              });
          });
      });
  });

  // WHEN I access BASE_URL/elk/shop/cat1
  //   THEN the "cat1" category checkbox is checked
  // WHEN I check the “cat2” category
  //   THEN the "cat2" category checkbox is checked
  // WHEN I check the “cat3” category
  //   THEN the "cat3" category checkbox is checked
  // WHEN I uncheck the “cat1” category
  //   THEN the "cat3" category checkbox is checked
  //   AND the URL must be equals to BASE_URL/elk/shop/cat2?category=cat2&category=cat3
  it('SPEC-08', () => {
    cy.visit(BASE_URL + '/shop/bags');
    cy.get('#category_1').should('be.checked');
    cy.get('#category_2').check();
    cy.get('#category_2').should('be.checked');
    cy.get('#category_3').check();
    cy.get('#category_3').should('be.checked');
    cy.get('#category_1').uncheck();
    cy.get('#category_1').should('not.be.checked');
    cy.get('#category_2')
      .invoke('prop', 'value')
      .then(cat2Value => {
        cy.get('#category_2').should('have.value', cat2Value);
        cy.get('#category_3')
          .invoke('prop', 'value')
          .then(cat3Value => {
            cy.get('#category_3').should('have.value', cat3Value);
            cy.url().should(
              'eq',
              BASE_URL + '/shop/' + cat2Value + '?category=' + cat2Value + '&category=' + cat3Value
            );
          });
      });
  });

  // GIVEN I access BASE_URL/elk/shop/cat1
  // WHEN the page loads
  //   THEN the "cat1" category checkbox is checked
  // WHEN I check the “cat2” category
  //   THEN the "cat2" category checkbox is checked
  // WHEN I check the “cat3” category
  //   THEN the "cat3" category checkbox is checked
  // WHEN I uncheck the “cat1” category
  //   THEN the "cat3" category checkbox is checked
  // WHEN I check the “cat4” category
  //   THEN the "cat4" category checkbox is checked
  //   AND the URL must be equals to BASE_URL/elk/shop/cat2?category=cat2&category=cat3&category=cat4
  it('SPEC-09', () => {
    cy.visit(BASE_URL + '/shop/bags');
    cy.get('#category_1').should('be.checked');
    cy.get('#category_2').check();
    cy.get('#category_2').should('be.checked');
    cy.get('#category_3').check();
    cy.get('#category_3').should('be.checked');
    cy.get('#category_1').uncheck();
    cy.get('#category_1').should('not.be.checked');
    cy.get('#category_4').check();
    cy.get('#category_4').should('be.checked');
    cy.get('#category_2')
      .invoke('prop', 'value')
      .then(cat2Value => {
        cy.get('#category_2').should('have.value', cat2Value);
        cy.get('#category_3')
          .invoke('prop', 'value')
          .then(cat3Value => {
            cy.get('#category_3').should('have.value', cat3Value);
            cy.get('#category_4')
              .invoke('prop', 'value')
              .then(cat4Value => {
                cy.get('#category_4').should('have.value', cat4Value);
                cy.url().should(
                  'eq',
                  BASE_URL + '/shop/' + cat2Value + '?category=' + cat2Value
                    + '&category=' + cat3Value + '&category=' + cat4Value
                );
              });
          });
      });
  });

  // GIVEN I access BASE_URL/elk/shop/cat1
  // WHEN the page loads
  //   THEN the "cat1" category checkbox is checked
  // WHEN I check the “cat2” category
  //   THEN the "cat2" category checkbox is checked
  // WHEN I check the “cat3” category
  //   THEN the "cat3" category checkbox is checked
  // WHEN I uncheck the “cat1” category
  //   THEN the "cat1" category checkbox is unchecked
  // WHEN I uncheck the “cat2” category
  //   THEN the "cat2" category checkbox is unchecked
  //   AND the URL must be equals to BASE_URL/elk/shop/cat3?&category=cat3
  it('SPEC-10', () => {
    cy.visit(BASE_URL + '/shop/bags');
    cy.get('#category_1').should('be.checked');
    cy.get('#category_2').check();
    cy.get('#category_2').should('be.checked');
    cy.get('#category_3').check();
    cy.get('#category_3').should('be.checked');
    cy.get('#category_1').uncheck();
    cy.get('#category_1').should('not.be.checked');
    cy.get('#category_2').uncheck();
    cy.get('#category_2').should('not.be.checked');
    cy.get('#category_2')
      .invoke('prop', 'value')
      .then(cat2Value => {
        cy.get('#category_3')
          .invoke('prop', 'value')
          .then(cat3Value => {
            cy.url().should(
              'eq',
              BASE_URL + '/shop/' + cat3Value + '?category=' + cat3Value
            );
          });
      });
  });

  // GIVEN I access BASE_URL/elk/shop/cat1
  // WHEN the page loads
  //   THEN the "cat1" category checkbox is checked
  // WHEN I check the “cat2” category
  //   THEN the "cat2" category checkbox is checked
  // WHEN I check the “cat3” category
  //   THEN the "cat3" category checkbox is checked
  // WHEN I uncheck the “cat1” category
  //   THEN the "cat1" category checkbox is unchecked
  // WHEN I uncheck the “cat2” category
  //   THEN the "cat2" category checkbox is unchecked
  // WHEN I uncheck the “cat3” category
  //   THEN the "cat3" category checkbox is unchecked
  //   AND the URL must be BASE_URL/elk/shop
  //   AND no checkboxes must be checked
  it('SPEC-11', () => {
    cy.visit(BASE_URL + '/shop/bags');
    cy.get('#category_1').should('be.checked');
    cy.get('#category_2').check();
    cy.get('#category_2').should('be.checked');
    cy.get('#category_3').check();
    cy.get('#category_3').should('be.checked');
    cy.get('#category_1').uncheck();
    cy.get('#category_1').should('not.be.checked');
    cy.get('#category_2').uncheck();
    cy.get('#category_2').should('not.be.checked');
    cy.get('#category_3').uncheck();
    cy.get('#category_3').should('not.be.checked');
    cy.url().should('eq', BASE_URL + '/shop');
  });


  // GIVEN I access BASE_URL/elk/shop/cat1
  // WHEN the page loads
  //   THEN the "cat1" category checkbox is checked
  // WHEN I check the “cat2” category
  //   THEN the "cat2" category checkbox is checked
  // WHEN I check the “cat3” category
  //   THEN the "cat3" category checkbox is checked
  // WHEN I uncheck the “cat1” category
  //   THEN the "cat1" category checkbox is unchecked
  // WHEN I uncheck the “cat2” category
  //   THEN the "cat2" category checkbox is unchecked
  // WHEN I uncheck the “cat3” category
  //   THEN the "cat3" category checkbox is unchecked
  // WHEN I check the “cat1” category
  //   THEN the URL be BASE_URL/shop/cat1?category=cat1
  it('SPEC-12', () => {
    cy.visit(BASE_URL + '/shop/bags');
    cy.get('#category_1').should('be.checked');
    cy.get('#category_2').check();
    cy.get('#category_2').should('be.checked');
    cy.get('#category_3').check();
    cy.get('#category_3').should('be.checked');
    cy.get('#category_1').uncheck();
    cy.get('#category_1').should('not.be.checked');
    cy.get('#category_2').uncheck();
    cy.get('#category_2').should('not.be.checked');
    cy.get('#category_3').uncheck();
    cy.get('#category_3').should('not.be.checked');
    cy.get('#category_1').check();
    cy.get('#category_1').should('be.checked');
    cy.get('#category_1')
      .invoke('prop', 'value')
      .then(cat1Value => {
        cy.url().should(
          'eq',
          BASE_URL + '/shop/' + cat1Value + '?category=' + cat1Value
        );
      });
  });
});
