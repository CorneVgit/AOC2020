import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day6.txt").toString("ascii").split("\n");

    let set1 = new Set();
    let set2 = new Set(" ");
    let count1 = 0;
    let count2 = 0;

    for (const str of input) {
        if (str === "") {
            count1 += set1.size;
            set1 = new Set();

            count2 += set2.size;
            set2 = new Set(" ");
            continue;
        }

        set1 = new Set([...str, ...set1]);
        set2 = set2.has(" ") ? new Set(str) : new Set([...set2].filter(v => str.includes(v)));
    }

    console.log(count1, count2);
}

main();
