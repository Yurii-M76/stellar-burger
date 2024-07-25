describe('Modal window test', () => {
  beforeEach('Перехват запросов', () => {
    cy.viewport(1300, 800);
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.visit('http://localhost:4000');
  });

  it('Открытие / закрытие', () => {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=closeModal]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
