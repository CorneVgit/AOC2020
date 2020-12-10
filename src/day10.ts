import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day10.txt").toString("ascii").trim().split("\n").map(Number);
    const number_array = [0, ...input.sort((a, b) => { return a - b; }), input[input.length - 1] + 3];
    const map = new Map<number, [number[], number]>();
    let count1 = 0;
    let count3 = 0;
    let result = 1;

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

        if (nodes.length) {
            result = 0;

            for (const n of nodes) {
                const node = map.get(n);
                if (node) {
                    const [, arrangements] = node;
                    result += arrangements;
                }
            }
        }

        map.set(number_array[i], [nodes, result]);
    }

    console.log(count1 * count3);
    console.log(result);
}

main();
