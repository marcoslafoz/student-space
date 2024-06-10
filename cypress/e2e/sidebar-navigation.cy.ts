const sidebarPaths: string[] = [
   '/dashboard',
   '/courses',
   '/tasks',
   '/documents',
   '/scores',
   '/events',
   '/',
]

describe('PATHS NAVIGATE', () => {

  beforeEach(() => {
    cy.login()
  })
  
  it('OK - Paths navigation', () => {
    sidebarPaths.forEach(path => {
      cy.get(`[data-test-id="sidebar${path}"]`).click()
      cy.url().should('include',path)
    })
  })

})