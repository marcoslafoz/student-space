describe('USER LOGIN', () => {

  beforeEach(() => {
    cy.visit(`http://localhost:${Cypress.env('portEnv') }`)
  })

  it('OK - Success login', () => {

    cy.get('[data-test-id="login-username-input"]').type(Cypress.env('usernameEnv'))
    cy.get('[data-test-id="login-username-btn"]').click()

    cy.get('[data-test-id="login-password-input"]').type(Cypress.env('passwordEnv'))
    cy.get('[data-test-id="login-password-btn"]').click()

    cy.url({ timeout: 10000 }).should('include', 'dashboard')

  })

  it('KO - Invalid username', () => {
    
    cy.get('[data-test-id="login-username-input"]').type('A1#')
    cy.get('[data-test-id="login-username-btn"]').click()
    cy.get('.username-input-error')
  })

  it('KO - Invalid password', () => {

    cy.get('[data-test-id="login-username-input"]').type(Cypress.env('usernameEnv'))
    cy.get('[data-test-id="login-username-btn"]').click()

    cy.get('[data-test-id="login-password-input"]').type('A1#')

    cy.get('[data-test-id="login-password-btn"]').click()
    cy.get('.password-input-error')
    cy.url().should('not.include', 'dashboard')

  })
})