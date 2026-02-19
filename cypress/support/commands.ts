export {};

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with email and password
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Custom command to check if user is authenticated
       * @example cy.isAuthenticated()
       */
      isAuthenticated(): Chainable<boolean>;

      /**
       * Custom command to logout
       * @example cy.logout()
       */
      logout(): Chainable<void>;

      /**
       * Custom command to visit a protected route
       * @example cy.visitProtected('/dashboard')
       */
      visitProtected(url: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit("/sign-in");
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/sign-in");
  });
});

Cypress.Commands.add("isAuthenticated", () => {
  return cy.getCookie("__session").then((cookie) => {
    return cy.wrap(!!cookie);
  });
});

Cypress.Commands.add("logout", () => {
  cy.visit("/");
  cy.get('button[role="menu"], [data-testid="user-button"]').click();
  cy.contains("Sign out").click();
  cy.url().should("include", "/sign-in");
});

Cypress.Commands.add("visitProtected", (url: string) => {
  cy.isAuthenticated().then((isAuth: boolean) => {
    if (!isAuth) {
      cy.url().should("include", "/sign-in");
      cy.url().should("contain", `redirect_url=${encodeURIComponent(url)}`);
    } else {
      cy.visit(url);
    }
  });
});
