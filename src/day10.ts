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

        const a: number[] = [];
        
        for (let j = i - 1; number_array[i] - number_array[j] <= 3; j--) {
            a.push(number_array[j]);
        }

        map.set(number_array[i], [a, 1]);
    }

    let result = 0;
    for (const [k, [a,]] of map) {
        result = 0;

        if (a.length === 0) continue;

        for (const n of a) {
            const t = map.get(n);
            if (t) {
                const [, v] = t;
                result += v;
            }
        }

        map.set(k, [a, result]);
    }

    console.log(count1 * count3);
    console.log(result);
}

main();
