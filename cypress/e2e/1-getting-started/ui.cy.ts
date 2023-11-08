/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('renders a navbar', () => {
    cy.get('nav a').should('have.length', 2)
  })
})
