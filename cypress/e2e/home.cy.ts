describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the home page", () => {
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should display the main heading", () => {
    cy.get("h1").should("be.visible");
  });

  it("should have navigation", () => {
    cy.get("nav, header").should("be.visible");
  });

  it("should be responsive", () => {
    // Mobile viewport
    cy.viewport(375, 667);
    cy.get("body").should("be.visible");

    // Tablet viewport
    cy.viewport(768, 1024);
    cy.get("body").should("be.visible");

    // Desktop viewport
    cy.viewport(1280, 720);
    cy.get("body").should("be.visible");
  });
});
