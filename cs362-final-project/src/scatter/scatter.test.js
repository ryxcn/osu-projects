/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

beforeEach(() => {
    window.localStorage.clear()
  })

const fs = require("fs")
const generateChartImg = require("../lib/generateChartImg")
function initDomFromFiles(htmlPath, jsPath){
    const html = fs.readFileSync(htmlPath, "utf8")
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}

test("Successfully loads application into DOM for scatter page", function () {
    initDomFromFiles(
        __dirname + "/scatter.html",
        __dirname + "/scatter.js"
    )
})

test("Adding values in the chart builder", async function () {
    initDomFromFiles(
        __dirname + "/scatter.html",
        __dirname + "/scatter.js"
    )
    const button = domTesting.getByText(document, "+")
    const user = userEvent.setup()

    let xInput = domTesting.getAllByLabelText(document, "X")
    let yInput = domTesting.getAllByLabelText(document, "Y")

    let xInputLabel = domTesting.getAllByLabelText(document, "X label")
    let yInputLabel = domTesting.getAllByLabelText(document, "Y label")

    await user.type(xInputLabel[0], 'Apples')
    await user.type(yInputLabel[0], 'Oranges')

    expect(xInput.length).toBe(1)
    expect(yInput.length).toBe(1)

    await user.type(xInput[0], '10')
    await user.type(yInput[0], '20')

    await user.click(button)
    
    xInput = domTesting.getAllByLabelText(document, "X");
    yInput = domTesting.getAllByLabelText(document, "Y");

    expect(xInput[0].value).toBe('10')
    expect(yInput[0].value).toBe('20')

    expect(xInput.length).toBe(2)
    expect(yInput.length).toBe(2)

    await user.click(button)

    xInput = domTesting.getAllByLabelText(document, "X");
    yInput = domTesting.getAllByLabelText(document, "Y");

    expect(xInput[1].value).toBe('')
    expect(yInput[1].value).toBe('')

    expect(xInput.length).toBe(3)
    expect(yInput.length).toBe(3)
})

test("Alerts displayed for missing chart data", async function () {
    initDomFromFiles(
        __dirname + "/scatter.html",
        __dirname + "/scatter.js"
    )
    const button = domTesting.getByText(document, "Generate chart")
    const user = userEvent.setup()

    let xInput = domTesting.getAllByLabelText(document, "X")
    let yInput = domTesting.getAllByLabelText(document, "Y")

    let xInputLabel = domTesting.getAllByLabelText(document, "X label")
    let yInputLabel = domTesting.getAllByLabelText(document, "Y label")

    await user.type(xInputLabel[0], 'Apples')
    await user.type(yInputLabel[0], 'Oranges')

    expect(xInput.length).toBe(1)
    expect(yInput.length).toBe(1)
    
    expect(xInputLabel.length).toBe(1)
    expect(yInputLabel.length).toBe(1)

    expect(xInput[0].value).toBe('')
    expect(yInput[0].value).toBe('')

    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {})
    await user.click(button)
    expect(window.alert).toHaveBeenCalledWith('Error: No data specified!')
    alert.mockRestore()
})

test("Alerts displayed for missing chart labels", async function () {
    initDomFromFiles(
        __dirname + "/scatter.html",
        __dirname + "/scatter.js"
    )
    const button = domTesting.getByText(document, "Generate chart")
    const user = userEvent.setup()

    let xInput = domTesting.getAllByLabelText(document, "X")
    let yInput = domTesting.getAllByLabelText(document, "Y")

    let xInputLabel = domTesting.getAllByLabelText(document, "X label")
    let yInputLabel = domTesting.getAllByLabelText(document, "Y label")

    await user.type(xInput[0], '7')
    await user.type(yInput[0], '7')

    expect(xInput.length).toBe(1)
    expect(yInput.length).toBe(1)
    
    expect(xInputLabel.length).toBe(1)
    expect(yInputLabel.length).toBe(1)

    expect(xInputLabel[0].value).toBe('')
    expect(yInputLabel[0].value).toBe('')

    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {})
    await user.click(button)
    expect(window.alert).toHaveBeenCalledWith('Error: Must specify a label for both X and Y!')
    alert.mockRestore()
})

test("Adding values in the chart builder", async function () {
    initDomFromFiles(
        __dirname + "/scatter.html",
        __dirname + "/scatter.js"
    )
    const button1 = domTesting.getByText(document, "+")
    const button2 = domTesting.getByText(document, "Clear chart data")
    const user = userEvent.setup()

    let xInput = domTesting.getAllByLabelText(document, "X")
    let yInput = domTesting.getAllByLabelText(document, "Y")

    let xInputLabel = domTesting.getAllByLabelText(document, "X label")
    let yInputLabel = domTesting.getAllByLabelText(document, "Y label")

    await user.type(xInputLabel[0], 'Apples')
    await user.type(yInputLabel[0], 'Oranges')

    expect(xInput.length).toBe(1)
    expect(yInput.length).toBe(1)

    await user.type(xInput[0], '54')
    await user.type(yInput[0], '23')

    await user.click(button1)
    
    xInput = domTesting.getAllByLabelText(document, "X")
    yInput = domTesting.getAllByLabelText(document, "Y")

    expect(xInput[0].value).toBe('54')
    expect(yInput[0].value).toBe('23')

    expect(xInput.length).toBe(2)
    expect(yInput.length).toBe(2)

    await user.click(button1)

    xInput = domTesting.getAllByLabelText(document, "X")
    yInput = domTesting.getAllByLabelText(document, "Y")

    expect(xInput[1].value).toBe('')
    expect(yInput[1].value).toBe('')

    expect(xInput.length).toBe(3)
    expect(yInput.length).toBe(3)

    await user.click(button2)

    xInput = domTesting.getAllByLabelText(document, "X")
    yInput = domTesting.getAllByLabelText(document, "Y")

    expect(xInput.length).toBe(1)
    expect(yInput.length).toBe(1)

    expect(xInput[0].value).toBe('')
    expect(yInput[0].value).toBe('')

    expect(xInputLabel[0].value).toBe('')
    expect(yInputLabel[0].value).toBe('')
})

jest.mock('../lib/generateChartImg');

test("Data correctly sent to chart generation function", async () => {
    initDomFromFiles(
        __dirname + "/scatter.html",
        __dirname + "/scatter.js"
    );

    const user = userEvent.setup();

    generateChartImg.mockImplementation(() => 'http://placekitten.com/480/480');

    let title = domTesting.getAllByLabelText(document, "Chart title");
    let xInputLabel = domTesting.getAllByLabelText(document, "X label");
    let yInputLabel = domTesting.getAllByLabelText(document, "Y label");
    let xInput = domTesting.getAllByLabelText(document, "X");
    let yInput = domTesting.getAllByLabelText(document, "Y");

    await user.type(title[0], 'Kirans Chart')
    await user.type(xInputLabel[0], 'Apples');
    await user.type(yInputLabel[0], 'Oranges');
    await user.type(xInput[0], '10');
    await user.type(yInput[0], '20');

    const button = domTesting.getByText(document, "Generate chart");
    await user.click(button);

    expect(generateChartImg).toHaveBeenCalledWith(
        "scatter", // chart type
        [{ x: "10", y: "20" }], // data point
        "Apples", // x label
        "Oranges", // y label
        "Kirans Chart", // title
        "#ff4500" // color
    );
    
    generateChartImg.mockRestore();
});