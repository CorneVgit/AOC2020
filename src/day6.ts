import fs from 'fs';

function main() {
    const input: Set<string>[] = [];

    fs.readFileSync("data/input_day6.txt").toString("ascii").split("\n").forEach(str => input.push(new Set(str)));

    let set1 = new Set();
    let set2 = new Set(" ");
    let count1 = 0;
    let count2 = 0;

    for (const s of input) {
        if (s.size === 0) {
            count1 += set1.size;
            set1 = new Set();

            count2 += set2.size;
            set2 = new Set(" ");
            continue;
        }

        set1 = new Set([...s, ...set1]);
        set2 = set2.has(" ") ? s : new Set([...set2].filter(v => s.has(v)));
    }

    console.log(count1, count2);
}

main();
