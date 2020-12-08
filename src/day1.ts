import fs from 'fs';

function main() {
    const number_array = fs.readFileSync("data/input_day1.txt").toString("ascii").split("\n").map(Number);
    let f1 = false;
    let f2 = false;

    for (const n1 of number_array) {
        for (const n2 of number_array) {
            if (!f1 && n1 + n2 == 2020) {
                console.log(`${n1} * ${n2} = ${n1 * n2}`);
                f1 = true;
                if (f1 && f2) {
                    return;
                }
                break;
            } else if (!f2 && n1 + n2 < 2020) {
                for (const n3 of number_array) {
                    if (n1 + n2 + n3 == 2020) {
                        console.log(`${n1} * ${n2} * ${n3} = ${n1 * n2 * n3}`);
                        f2 = true;
                        if (f1 && f2) {
                            return;
                        }
                        break;
                    }
                }
            }
        }
    }
}

main();

