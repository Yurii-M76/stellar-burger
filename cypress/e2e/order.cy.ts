describe('Checkout tests', () => {
  beforeEach('Перехват запросов', () => {
    cy.viewport(1300, 800);
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.visit('http://localhost:4000/login');
    cy.get('[name=email]').type('test5252@mail.ru');
    cy.get('[name=password]').type('Test12345');
    cy.get('button').contains('Войти').click();

    cy.intercept('POST', 'api/auth/login', { fixture: 'user.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.setCookie('accessToken', 'accessToken');
  });

  it('Оформление заказа', () => {
    cy.get('[data-cy=buns]').contains('Добавить').click();
    cy.get('[data-cy=mains]').contains('Добавить').click();
    cy.get('[data-cy=sauces]').contains('Добавить').click();

    cy.get('[data-cy=order]').click();
    cy.get('[data-cy=orderNumber]').should('be.visible');
    cy.get('[data-cy=orderId]').should('be.visible');
    cy.get('[data-cy=closeModal]').click();
  });
});
