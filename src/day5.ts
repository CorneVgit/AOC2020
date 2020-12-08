import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day5.txt").toString("ascii").trim().split("\n");
    const seat_ids: number[] = [];
    let highest_seat_id = 0;

    for (const s of input) {
        let row_step = 64;
        let column_step = 4;
        let row_ub = 127;
        let column_ub = 7;

        for (const c of s) {
            switch (c) {
                case "F":
                    row_ub -= row_step;
                    row_step /= 2;
                    break;
                case "B":
                    row_step /= 2;
                    break;
                case "L":
                    column_ub -= column_step;
                    column_step /= 2;
                    break;
                case "R":
                    column_step /= 2;
                    break;
            }
        }

        const seat_id = 8 * row_ub + column_ub;
        seat_ids.push(seat_id);
        highest_seat_id = Math.max(seat_id, highest_seat_id);
    }

    console.log(`Highest seat ID: ${highest_seat_id}`);

    seat_ids.sort((a, b) => { return a - b; });

    for (let index = 1; index < seat_ids.length; index++) {
        if (seat_ids[index - 1] + 2 === seat_ids[index]) {
            console.log(`My seat ID: ${seat_ids[index - 1] + 1}`);
        }
    }
}

main();
