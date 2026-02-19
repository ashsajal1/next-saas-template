describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });

  it("should display the sign-in page", () => {
    cy.url().should("include", "/sign-in");
    cy.contains(/sign in/i).should("be.visible");
  });

  it("should have email and password inputs", () => {
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
  });

  it("should have a submit button", () => {
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should show error for invalid credentials", () => {
    cy.get('input[type="email"]').type("invalid@example.com");
    cy.get('input[type="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    
    // Wait for error message - adjust selector based on your UI
    cy.get("body", { timeout: 5000 }).should("contain", /invalid|error|wrong/i);
  });

  it("should navigate to sign-up page", () => {
    cy.contains(/sign up|create account/i).click({ force: true });
    cy.url().should("include", "/sign-up");
  });

  describe("Protected Routes", () => {
    it("should redirect unauthenticated users to sign-in", () => {
      cy.visit("/dashboard");
      cy.url().should("include", "/sign-in");
    });

    it("should redirect unauthenticated users to sign-in for admin routes", () => {
      cy.visit("/admin");
      cy.url().should("include", "/sign-in");
    });
  });
});
