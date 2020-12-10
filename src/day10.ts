import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day10.txt").toString("ascii").trim().split("\n").map(Number);
    const number_array = [0, ...input.sort((a, b) => { return a - b; }), input[input.length - 1] + 3];
    const map = new Map<number, [number[], number]>();
    let count1 = 0;
    let count3 = 0;

    for (let i = 0; i < number_array.length; i++) {
        if (number_array[i + 1] - number_array[i] === 1) {
            count1++;
        } else if (number_array[i + 1] - number_array[i] === 3) {
            count3++;
        }

        const nodes: number[] = [];

        for (let j = i - 1; number_array[i] - number_array[j] <= 3; j--) {
            nodes.push(number_array[j]);
        }

        map.set(number_array[i], [nodes, 0]);
    }

    let result = 0;
    for (const [key, [nodes,]] of map) {
        if (nodes.length === 0) {
            result = 1;
        } else {
            result = 0;

            for (const n of nodes) {
                const t = map.get(n);
                if (t) {
                    const [, arrangements] = t;
                    result += arrangements;
                }
            }
        }

        map.set(key, [nodes, result]);
    }

    console.log(count1 * count3);
    console.log(result);
}

main();
