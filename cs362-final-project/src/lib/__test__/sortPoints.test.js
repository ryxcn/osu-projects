const sortPoints = require('../sortPoints.js');

test("Sort inputs by ascending x value with whole numbers", function() {
    var input = [
        { x: 2, y: 7 },
        { x: 3, y: 9 },
        { x: 1, y: 2 },
    ];
    var output = sortPoints(input);
    expect(output).toEqual([
        { x: 1, y: 2 },
        { x: 2, y: 7 },
        { x: 3, y: 9 }
    ]);
});

test("Sort inputs by ascending x value with floats", function() {
    var input = [
        { x: 2.9, y: 7 },
        { x: 2.3, y: 9 },
        { x: 1, y: 2 },
    ];
    var output = sortPoints(input);
    expect(output).toEqual([
        { x: 1, y: 2 },
        { x: 2.3, y: 9 },
        { x: 2.9, y: 7 }
    ]);
});

test("Sort values by ascending x value with negative values", function() {
    var input = [
        { x: -2, y: 7 },
        { x: 3, y: 9 },
        { x: 1, y: 2 },
    ];
    var output = sortPoints(input);
    expect(output).toEqual([
        { x: -2, y: 7 },
        { x: 1, y: 2 },
        { x: 3, y: 9 }
    ]);
});