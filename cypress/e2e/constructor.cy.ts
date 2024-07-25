describe('Test constructor', () => {
  beforeEach('Перехват запросов', () => {
    cy.viewport(1300, 800);
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.visit('http://localhost:4000');
  });

  it('Добавить булку в конструктор', () => {
    cy.get('[data-cy=buns]').contains('Добавить').click();

    cy.get('[data-cy=bunTop]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy=bunBottom]').should('contain', 'Краторная булка N-200i');
  });

  it('Добавить начинку в конструктор', () => {
    cy.get('[data-cy=mains]').contains('Добавить').click();

    cy.get('[data-cy=ingredientItem]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Добавить соус в конструктор', () => {
    cy.get('[data-cy=sauces]').contains('Добавить').click();

    cy.get('[data-cy=ingredientItem]').should('contain', 'Соус Spicy-X');
  });
});
