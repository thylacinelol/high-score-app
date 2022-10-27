describe('high score app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('calculates score and submits to leaderboard', () => {
    cy.get('h1').first().should('have.text', 'Welcome to HighScoreApp!')
    cy.contains('Attempt').click()
    cy.contains('Attempt').click()
    cy.get('[data-cy="totalPoints"]').first().then(($totalPoints) => {
      const score = $totalPoints.text();
      cy.contains('Submit score').click()
      cy.get('input[name=name]').type(`Eimantas`)
      cy.contains('Submit').click()
      cy.get('tr[data-cy="Eimantas"] td').should('have.length', 4)
      cy.get('tr[data-cy="Eimantas"] td').eq(0).should('have.text', 'Eimantas')
      cy.get('tr[data-cy="Eimantas"] td').eq(1).should('have.text', '2')
      cy.get('tr[data-cy="Eimantas"] td').eq(2).should('have.text', score)
      cy.get('tr[data-cy="Eimantas"] td').eq(3).should('have.text', Number(score) / 2)
    })
  })
})