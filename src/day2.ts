import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day2.txt").toString("ascii").trim().split("\n");
    let valid_count1 = 0;
    let valid_count2 = 0;

    input.forEach((x) => {
        const split = x.split(" ");
        const bounds = split[0].split("-").map(Number);
        const character = split[1][0];
        const search_string = split[2];

        let count = 0;
        for (const c of search_string) {
            if (c === character) {
                count++;
            }
        }

        if (count >= bounds[0] && count <= bounds[1]) {
            valid_count1++;
        }

        const c1 = search_string[bounds[0] - 1];
        const c2 = search_string[bounds[1] - 1];

        if ((c1 === character || c2 === character) && c1 !== c2) {
            valid_count2++;
        }
    });

    console.log(valid_count1);
    console.log(valid_count2);
}

main();
