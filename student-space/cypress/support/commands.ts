/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<unknown>
  }
}
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', () => {
  cy.visit(`http://localhost:${Cypress.env('portEnv')}`).then(() => {

    cy.get('[data-test-id="login-username-input"]').type(Cypress.env('usernameEnv'))
    cy.get('[data-test-id="login-username-btn"]').click()

    cy.get('[data-test-id="login-password-input"]').type(Cypress.env('passwordEnv'))
    cy.get('[data-test-id="login-password-btn"]').click()

    cy.url({ timeout: 10000 }).should('include', 'dashboard')
  })

})
