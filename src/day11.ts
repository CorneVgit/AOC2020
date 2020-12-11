import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day11.txt").toString("ascii").split("\n");
    const area = new Array<Array<string>>();

    area.push(new Array(input[0].length + 2).fill('.'));
    for (const s of input) {
        area.push(['.', ...s, '.']);
    }
    area.push(new Array(input[0].length + 2).fill('.'));

    console.log(count_occupied(iterate_rules(area, rules1)));
    console.log(count_occupied(iterate_rules(area, rules2)));
}

function rules1(area: string[][]) {
    const new_area = new Array<Array<string>>();

    for (let y = 0; y < area.length; y++) {
        new_area[y] = [];

        for (let x = 0; x < area[0].length; x++) {
            switch(area[y][x]) {
                case 'L':
                    if (count_neighbours(check_neighbours(area, y, x, '#', 1)) === 0) {
                        new_area[y][x] = '#';
                        break;
                    }

                    new_area[y][x] = area[y][x];
                    break;
                case '#':
                    if (count_neighbours(check_neighbours(area, y, x, '#', 1)) >= 4) {
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

function rules2(area: string[][]) {
    const new_area = new Array<Array<string>>();

    for (let y = 0; y < area.length; y++) {
        new_area[y] = [];

        for (let x = 0; x < area[0].length; x++) {
            switch(area[y][x]) {
                case 'L':
                    if (count_neighbours(check_neighbours(area, y, x, '#')) === 0) {
                        new_area[y][x] = '#';
                        break;
                    }

                    new_area[y][x] = area[y][x];
                    break;
                case '#':
                    if (count_neighbours(check_neighbours(area, y, x, '#')) >= 5) {
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

function iterate_rules(area: string[][], rules: (area: string[][]) => string[][]) {
    let prev_area = new Array<Array<string>>(area.length).fill(Array<string>().fill('.'));
    while(!compare_area(area, prev_area)) {
        prev_area = area;
        area = rules(area);
    }

    return area;
}

function check_neighbours(area: string[][], y_pos: number, x_pos: number, target: string, max_range = area[0].length, range = 1) {
    let directions = new Array<boolean>(9).fill(false);

    if (range < max_range) directions = check_neighbours(area, y_pos, x_pos, target, max_range, range + 1);

    let count = 0;
    for (let y = y_pos - range; y <= y_pos + range; y += range) {
        for (let x = x_pos - range; x <= x_pos + range; x += range, count++) {
            if (area[y] && area[y][x] === target && !(x === x_pos && y === y_pos)) {
                directions[count] = true;
            } else if (area[y] && area[y][x] === 'L' && !(x === x_pos && y === y_pos)) {
                directions[count] = false;
            }
        }
    }

    return directions;
}

function count_neighbours(directions: boolean[]) {
    let target_count = 0;

    directions.forEach((d) => {
        if (d) target_count++;
    });

    return target_count;
}

function compare_area(area1: string[][], area2: string[][]) {
    for (let y = 0; y < area1.length; y++) {
        for (let x = 0; x < area1[0].length; x++) {
            if (area1[y][x] !== area2[y][x]) {
                return false;
            }
        }
    }

    return true;
}

function count_occupied(area: string[][]) {
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
