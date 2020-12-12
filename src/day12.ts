import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day12.txt").toString("ascii").trim().split("\n");

    part1(input);
    part2(input);
}

function part1(input: string[]) {
    const position = [0, 0, 0, 0];
    let direction = 1;

    for (const s of input) {
        const action = s.substr(0, 1);
        let value = Number(s.substr(1));

        switch (action) {
            case "N":
                position[0] += value;
                break;
            case "E":
                position[1] += value;
                break;
            case "S":
                position[2] += value;
                break;
            case "W":
                position[3] += value;
                break;
            case "L":
                value %= 360;
                value /= 90;
                direction = direction - value;
                if (direction < 0) {
                    direction = 4 + direction;
                }
                break;
            case "R":
                value %= 360;
                value /= 90;
                direction = direction + value;
                if (direction > 3) {
                    direction = direction - 4;
                }
                break;
            case "F":
                position[direction] += value;
                break;
        }
    }

    console.log((Math.max(position[0], position[2]) - Math.min(position[0], position[2])) + (Math.max(position[1], position[3]) - Math.min(position[1], position[3])));
}

function part2(input: string[]) {
    let waypoint = [1, 10, 0, 0];
    const position = [0, 0, 0, 0];

    for (const s of input) {
        const action = s.substr(0, 1);
        let value = Number(s.substr(1));
        const new_waypoint = Array.from(waypoint);

        switch (action) {
            case "N":
                new_waypoint[0] += value;
                break;
            case "E":
                new_waypoint[1] += value;
                break;
            case "S":
                new_waypoint[2] += value;
                break;
            case "W":
                new_waypoint[3] += value;
                break;
            case "L":
                value %= 360;
                value /= 90;
                for (let i = 0; i < 4; i++) {
                    let move = i - value;
                    if (move < 0) {
                        move = 4 + move;
                    }
                    new_waypoint[move] = waypoint[i];
                }
                break;
            case "R":
                value %= 360;
                value /= 90;
                for (let i = 0; i < 4; i++) {
                    let move = i + value;
                    if (move > 3) {
                        move = move - 4;
                    }
                    new_waypoint[move] = waypoint[i];
                }
                break;
            case "F":
                for (let i = 0; i < 4; i++) {
                    position[i] += waypoint[i] * value;
                }
                break;
        }

        waypoint = new_waypoint;

        console.log(position, waypoint);
    }

    console.log((Math.max(position[0], position[2]) - Math.min(position[0], position[2])) + (Math.max(position[1], position[3]) - Math.min(position[1], position[3])));
}

main();
