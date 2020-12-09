import fs from 'fs';

function main() {
    const number_array = fs.readFileSync("data/input_day9.txt").toString("ascii").trim().split("\n").map(Number);

    for (let i = 25; i < number_array.length; i++) {
        const [found, target] = find_sum(number_array.slice(i - 25, i), number_array[i]);

        if (!found) {
            console.log(target);

            const [found, min, max] = find_contiguous_range(number_array, target);

            if (found) {
                console.log(min + max);
            }
            
            break;
        }
    }
}

function find_sum(number_array: number[], target: number): [boolean, number] {
    let found = false;

    for (let i = 0; i < number_array.length; i++) {
        for (let j = i + 1; j < number_array.length; j++) {
            if (number_array[i] + number_array[j] === target) {
                found = true;
            }
        }
    }

    return [found, target];
}

function find_contiguous_range(number_array: number[], target: number): [boolean, number, number] {
    for (let i = 0; i < number_array.length; i++) {
        const contiguous_range: number[] = [];

        for (let j = i, sum = 0; sum <= target; j++) {
            sum += number_array[j];
            contiguous_range.push(number_array[j]);

            if (sum === target && number_array[j] !== target) {
                return [true, Math.min(...contiguous_range), Math.max(...contiguous_range)];
            }
        }
    }

    return [false, 0, 0];
}

main();
