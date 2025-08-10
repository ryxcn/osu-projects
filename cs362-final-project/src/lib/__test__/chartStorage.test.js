/**
 * @jest-environment jsdom
 */
require('@testing-library/jest-dom');
const { saveChart, loadAllSavedCharts, loadSavedChart, updateCurrentChartData, loadCurrentChartData } = require('../chartStorage');

describe('Chart Storage Functions', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('saveChart should add a new chart if index is not provided', () => {
        const chart = { title: 'Chart 1', data: [1, 2, 3] };
        saveChart(chart);

        const storedCharts = JSON.parse(localStorage.getItem('savedCharts'));
        expect(storedCharts).toHaveLength(1);
        expect(storedCharts[0]).toEqual(chart);
    });

    test('saveChart should overwrite an existing chart if index is provided', () => {
        const chart1 = { title: 'Chart 1', data: [1, 2, 3] };
        const chart2 = { title: 'Chart 2', data: [4, 5, 6] };

        saveChart(chart1);
        saveChart(chart2, 0);

        const storedCharts = JSON.parse(localStorage.getItem('savedCharts'));
        expect(storedCharts).toHaveLength(1);
        expect(storedCharts[0]).toEqual(chart2);
    });

    test('loadAllSavedCharts should return all saved charts', () => {
        const charts = [{ title: 'Chart 1', data: [1, 2, 3] }];
        localStorage.setItem('savedCharts', JSON.stringify(charts));

        const loadedCharts = loadAllSavedCharts();
        expect(loadedCharts).toEqual(charts);
    });

    test('loadSavedChart should return a specific chart by index', () => {
        const charts = [{ title: 'Chart 1', data: [1, 2, 3] }, { title: 'Chart 2', data: [4, 5, 6] }];
        localStorage.setItem('savedCharts', JSON.stringify(charts));

        const loadedChart = loadSavedChart(1);
        expect(loadedChart).toEqual(charts[1]);
    });

    test('loadSavedChart should return an empty object if index is out of bounds', () => {
        const charts = [{ title: 'Chart 1', data: [1, 2, 3] }];
        localStorage.setItem('savedCharts', JSON.stringify(charts));

        const loadedChart = loadSavedChart(2);
        expect(loadedChart).toEqual({});
    });

    test('updateCurrentChartData should store the current chart data in localStorage', () => {
        const currentChartData = { title: 'Current Chart', data: [7, 8, 9] };
        updateCurrentChartData(currentChartData);

        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(currentChartData);
    });

    test('loadCurrentChartData should return the current chart data from localStorage', () => {
        const currentChartData = { title: 'Current Chart', data: [7, 8, 9] };
        localStorage.setItem('currentChartData', JSON.stringify(currentChartData));

        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(currentChartData);
    });

    test('loadCurrentChartData should return an empty object if no data is stored', () => {
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual({});
    });
});