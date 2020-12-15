import fs from 'fs';

function main() {
    const number_array = fs.readFileSync("data/input_day15_test.txt").toString("ascii").trim().split(",").map(Number);


    console.log(find_number(number_array, 2020));
    console.log(find_number(number_array, 30000000));

}

function find_number(starting_numbers: number[], max_turns: number) {
    const map = new Map<number, [number, number]>();
    let turn = 1;
    let num = starting_numbers[0];

    for (let i = 1; i < starting_numbers.length; i++) {
        map.set(num, [turn, 0]);
        num = starting_numbers[i];
        turn++;
    }

    while (turn < max_turns) {
        if(map.has(num)) {
            const [n,] = map.get(num) as [number, number];
            map.set(num, [turn, n]);
            num = turn - n;
        } else {
            map.set(num, [turn, 0]);
            num = 0;

            if (!map.has(0)) {
                turn++;
                map.set(0, [turn, 0]);
            }
        }

        turn++;
    }

    return num;
}

main();
