import user from '../fixtures/test_user.json'
import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown()

describe('item order', () => {
  beforeEach(() => {
    cy.visit('https://www.youngliving.com/us/en')
    cy.viewport(1500, 1000)
  });

  it('should be able to complete checkout', () => {

    cy.get('[data-testid="qa-myaccount"]').contains('Sign In').click()

    // alternative to make sure the "sign in" button is accessible in mobile view also (hidden within pancake menu)
    // Only useful if the viewport is not forced to desktop view like it is done above
    /*
    cy.get("body").then($body => {
      if ($body.find('[data-testid="qa-myaccount"]').length > 0) {
        cy.get('[data-testid="qa-myaccount"]').then($header => {
          if ($header.is(':visible')){
            cy.get('[data-testid="qa-myaccount"]').contains('Sign In').click()
          } else {
            cy.get('#menuToggle').click()
            cy.get('[class*="mobilemenu-signin"]').click()
          }
        })
      }
    })
     */
    cy.get('[id="loginUsername"]').type(user.email)
    cy.get('[id="continue-btn"]').click()
    cy.get('[id="loginPassword"]').type(user.password)
    cy.get('[id="login-btn"]').click()

  // add an item into shopping cart
    cy.get('[data-testid="qa-search-input"]').type('snack{enter}')
    cy.get('[data-testid="qa-figcaption"]').contains('Organic Dried Wolfberries').click()
    cy.get('[data-testid="qa-addcart"]').click()
    cy.get('[data-testid="qa-product-name"]').should('include.text', user.item_name)

  // match item price with order summary price  at viewcart page
    cy.get('[data-testid="qa-cartcheckout"]').click({force: true})
    cy.get('[data-testid="qa-product-sale-price"]').invoke('text').then((item_price) => {
      cy.get('[data-testid="qa-estimated-total-value"]').invoke('text').then((summary_price) => {

        expect(item_price).to.include(summary_price)
      })
    })

  // match item price with order summary price at checkout page
    cy.get('[data-testid="qa-cart-checkout"]').click()
    cy.get('[data-testid="qa-product-sale-price"]').invoke('text').then((item_price) => {
      cy.get('[data-testid="qa-estimated-total-value"]').invoke('text').then((summary_price) => {

        expect(item_price).to.include(summary_price)
      })
    })

 // add shipping address
    cy.get('[data-testid="qa-referral-code-continue"]').click()
    cy.get('[data-testid="qa-confirm-yes"]').click()
    cy.get('[data-testid="qa-first-name"]').type(user.first_name)
    cy.get('[data-testid="qa-last-name"]').type(user.last_name)
    cy.get('[data-testid="qa-address1"]').type(user.address)
    cy.get('[data-testid="qa-city"]').type(user.city)
    cy.get('[data-testid="qa-state"]').should('be.visible').select(user.state)
    cy.get('[data-testid="qa-country"]').should('be.visible').select(user.country)
    cy.get('[data-testid="qa-code"]').type(user.zipcode)
    cy.get('[data-testid="qa-ship-continue"]').click()
    cy.contains('Address provided is invalid').should("not.exist")

    cy.get("body").then($body => {
      if ($body.find('[data-testid="qa-address-suggestion-overlay"]').length > 0) {
        cy.get('[data-testid="qa-suggestion-save"]').click()
        cy.get('[data-testid="qa-ship-continue"]').click()
      }
    })

  // add payment method
    cy.get('[data-testid="qa-ship-methods-continue"]').click()
    cy.get('[data-testid="qa-saved-card"]').should('be.visible').select(user.payment_method)
    cy.get('[data-testid="qa-card-first-name"]').type(user.first_name)
    cy.get('[data-testid="qa-card-last-name"]').type(user.last_name)
    cy.get('[data-testid="qa-pay-card"]').type(user.card_number)
    cy.get('[data-testid="qa-pay-month"]').type(user.exp_month)
    cy.get('[data-testid="qa-pay-year"]').type(user.exp_year)
    cy.get('[data-testid="qa-pay-code"]').type(user.card_code)
    //cy.get('[data-testid="qa-pay-continue"]').click()
    //cy.contains('Payment Processing Error').should("not.exist")
  })
})
