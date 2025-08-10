it("test line chart image generation", function () {
    cy.visit("/")
    cy.findByRole("link", {name: "Line"}).click()
    const chartName = "Some name"
    const xlabel = "X Label"
    const ylabel = "Y Label"
    cy.findAllByLabelText("X label").type(xlabel)
    cy.findAllByLabelText("Y label").type(ylabel)
    const xVals = [1,2,3,4]
    const yVals = [1,4,9,16]
    const valLength = 4
    const addMoreInputs = cy.findByRole("button", {name: "+"})
    for( let i = 0; i < valLength; i++){
        cy.findAllByLabelText("X").eq(i).type(xVals[i])
        cy.findAllByLabelText("Y").eq(i).type(yVals[i])
        addMoreInputs.click()
    }
    cy.findByRole("button", {name: "Generate chart"}).click()
    cy.findAllByRole("img").should("be.visible")
})

it("test data is saved across pages", function () {
    cy.visit("/")
    cy.findByRole("link", {name: "Line"}).click()
    const chartName = "Some name"
    const xlabel = "X Label"
    const ylabel = "Y Label"
    cy.findAllByLabelText("X label").type(xlabel)
    cy.findAllByLabelText("Y label").type(ylabel)
    const xVals = [1,2,3,4]
    const yVals = [1,4,9,16]
    const valsLength = 4
    cy.inputValues(xVals, yVals, valsLength)
    cy.findByRole("link", {name: "Scatter"}).click()
    cy.url().should("include", "/scatter")
    for( let i = 0; i < valsLength; i++){
        cy.findAllByLabelText("X").eq(i).should("have.value", xVals[i])
        cy.findAllByLabelText("Y").eq(i).should("have.value", yVals[i])
    }
    cy.findByRole("link", {name: "Bar"}).click()
    cy.url().should("include", "/bar")
    for( let i = 0; i < valsLength; i++){
        cy.findAllByLabelText("X").eq(i).should("have.value", xVals[i])
        cy.findAllByLabelText("Y").eq(i).should("have.value", yVals[i])
    }
})

it("test chart saving", function () {
    cy.visit("/")
    const title = "Saved Title"
    const type = "Line"
    const xVals = [1,2,3,4]
    const yVals = [1,4,9,16]
    const valsLength = 4
    cy.makeChart(title, type, xVals, yVals, valsLength)
    cy.findByRole("button", {name: "Save chart"}).click()
    cy.findByRole("link", {name: "Gallery"}).click()
    cy.document().its("body").should("contain", "Gallery")
    cy.document().its("body").should("contain", title)
})

it("test gallery chart reopening", function () {
    cy.visit("/")
    const title = "Saved Title"
    const type = "Bar"
    const xVals = [1,2,3,4]
    const yVals = [1,4,9,16]
    const valsLength = 4
    cy.makeChartAndSave(title, type,xVals, yVals, valsLength)
    cy.findByText(title).click()
    cy.url().should("include", type.toLowerCase())
    cy.findAllByRole("img").should("be.visible")
    cy.checkValuesPresent(xVals,yVals,valsLength)
})
