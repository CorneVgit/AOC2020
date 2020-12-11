import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day11.txt").toString("ascii").split("\n");
    let area = new Array<Array<string>>();

    area.push(new Array(input[0].length + 2).fill('.'));
    for (const s of input) {
        area.push(['.', ...s, '.']);
    }
    area.push(new Array(input[0].length + 2).fill('.'));

    let prev_area = new Array<Array<string>>(area.length).fill(Array<string>().fill('.'));
    while(!compare_area(area, prev_area)) {
        prev_area = area;
        area = run_rules(area);
    }

    console.log(count_occupied(area));
}

function run_rules(area: Array<Array<string>>) {
    const new_area = new Array<Array<string>>();

    for (let y = 0; y < area.length; y++) {
        new_area[y] = [];

        for (let x = 0; x < area[0].length; x++) {
            switch(area[y][x]) {
                case 'L':
                    if (check_neighbours(get_neighbours(area, y, x), '#') === 0) {
                        new_area[y][x] = '#';
                        break;
                    }

                    new_area[y][x] = area[y][x];
                    break;
                case '#':
                    if (check_neighbours(get_neighbours(area, y, x), '#') >= 4) {
                        new_area[y][x] = 'L';
                        break;
                    }

                    new_area[y][x] = area[y][x];
                    break;
                default:
                    new_area[y][x] = area[y][x];
                    break;
            }
        }
    }

    return new_area;
}

function get_neighbours(area: Array<Array<string>>, y_pos: number, x_pos: number) {
    const neighbours = new Array<Array<string>>();

    for (let y = y_pos - 1, ny = 0; y <= y_pos + 1; y++, ny++) {
        neighbours[ny] = [];
        for (let x = x_pos - 1; x <= x_pos + 1; x++) {
            neighbours[ny].push(area[y][x]);
        }
    }

    return neighbours;
}

function check_neighbours(area: Array<Array<string>>, target: string) {
    let target_count = 0;

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (area[y][x] === target && !(x === 1 && y === 1)) {
                target_count++;
            }
        }
    }

    return target_count;
}

function compare_area(area1: Array<Array<string>>, area2: Array<Array<string>>) {
    for (let y = 0; y < area1.length; y++) {
        for (let x = 0; x < area1[0].length; x++) {
            if (area1[y][x] !== area2[y][x]) {
                return false;
            }
        }
    }

    return true;
}

function count_occupied(area: Array<Array<string>>) {
    let occupied_count = 0;

    for (let y = 0; y < area.length; y++) {
        for (let x = 0; x < area[0].length; x++) {
            if (area[y][x] === '#') {
                occupied_count++;
            }
        }
    }

    return occupied_count;
}

main();
