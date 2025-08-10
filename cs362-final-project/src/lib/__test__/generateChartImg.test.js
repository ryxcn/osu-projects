const http = require("msw").http
const HttpResponse = require("msw").HttpResponse
const setupServer = require("msw/node").setupServer
const fs = require('fs');
const path = require('path');

const img = fs.readFileSync(path.resolve(__dirname, 'sampeChart.png'));
const generateChartImg = require('../generateChartImg.js');


const server = setupServer(
    http.post(
        "https://quickchart.io/chart",
        function() {
            return new HttpResponse(img, {
                headers: { "Content-Type": "image/png" },
            })
        }
    )
)


beforeAll(() => server.listen());

afterAll(() => server.close());

describe('generateChartImg', () => {
    it('generates chart image URL', async() => {
        const type = 'line';
        const data = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }];
        const xLabel = 'X Axis';
        const yLabel = 'Y Axis';
        const title = 'Sample Chart';
        const color = '#ff0000';

        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color);
        expect(imgUrl).toMatch(/^blob:/);
    });
});