import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day3.txt").toString("ascii").split("\n");
    const slopes = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 2 }];

    let count = 1;
    for (const slope of slopes) {
        count *= count_trees(slope, input);
    }

    console.log(count);
}

function count_trees(slope: {x: number, y: number}, input: string[]) {
    let count = 0;

    for (let x = 0, y = 0; y < input.length; x = (x + slope.x) % input[0].length, y += slope.y) {
        count += input[y][x] === '#' ? 1 : 0;
    }

    console.log(`Trees found: ${count}, with a slope of x: ${slope.x}, y: ${slope.y}`);

    return count;
}

main();
