import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day6.txt").toString("ascii").split("\n");

    let set = new Set<string>();
    let count = 0;

    let intersection = " ";
    let intersect_count = 0;

    for (const s of input) {
        if (s === "") {
            count += set.size;
            set.clear();

            intersect_count += intersection.length;
            intersection = " ";
            continue;
        }

        intersection = intersection.includes(" ") ? s : [...intersection].filter(value => s.includes(value)).join("");
        set = new Set([...s, ...set]);
    }

    console.log(count);
    console.log(intersect_count);
}

main();
