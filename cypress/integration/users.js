/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("user form", () => {
  it("check if render", () => {
    cy.visit("/");
    cy.get(":nth-child(1) > input").should("exist");
    cy.get(":nth-child(3) > input").should("exist");
    cy.get(":nth-child(2) > input").should("exist");
  });

  it("check if render", () => {
    cy.visit("/");
    cy.get(":nth-child(1) > input").type("name");
    cy.get(":nth-child(3) > input").type(`email${Math.random()}@test.com`);
    cy.get(":nth-child(2) > input").type("surname");
    cy.findByText(/submit/i).click();
    cy.get(":nth-child(1) > input").should("have.value", "");
    cy.get(":nth-child(3) > input").should("have.value", "");
    cy.get(":nth-child(2) > input").should("have.value", "");
  });
});
