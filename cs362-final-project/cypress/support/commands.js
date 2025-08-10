// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require("@testing-library/cypress/")
require("@testing-library/cypress/add-commands")
Cypress.Commands.add("inputValues", function(xVals, yVals, length){
    const addMoreInputs = cy.findByRole("button", {name: "+"})
    for( let i = 0; i < length; i++){
        cy.findAllByLabelText("X").eq(i).type(xVals[i])
        cy.findAllByLabelText("Y").eq(i).type(yVals[i])
        addMoreInputs.click()
    }
})
Cypress.Commands.add("makeChart", function(chartTitle, type,xVals, yVals, valsLength){
    cy.visit("/")
    cy.findByRole("link", {name: type}).click()
    cy.findByLabelText("Chart title").type(chartTitle)
    const xlabel = "X Label"
    const ylabel = "Y Label"
    cy.findAllByLabelText("X label").type(xlabel)
    cy.findAllByLabelText("Y label").type(ylabel)
    cy.inputValues(xVals, yVals, valsLength)
    cy.findByRole("button", {name: "Generate chart"}).click()
})
Cypress.Commands.add("makeChartAndSave", function(chartTitle, type, xVals, yVals, valsLength){
    cy.visit("/")
    cy.makeChart(chartTitle, type, xVals, yVals, valsLength)
    cy.findByRole("button", {name: "Save chart"}).click()
    cy.findByRole("link", {name: "Gallery"}).click()
})
Cypress.Commands.add("checkValuesPresent", function(xVals, yVals, valsLength){
    for( let i = 0; i < valsLength; i++){
        cy.findAllByLabelText("X").eq(i).should("have.value", xVals[i])
        cy.findAllByLabelText("Y").eq(i).should("have.value", yVals[i])
    }
})
