import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day13.txt").toString("ascii").trim().split("\n");
    const busses = input[1].split(",");

    const highest_id = Math.max(...busses.filter(x => x !== 'x').map(Number));
    const timestamp_difference = highest_id - Number(input[0]) % highest_id;


    let n = Number(busses[0]);
    let timestamp = 0;
    for (let i = 1; i < busses.length; i++) {
        if (busses[i] === 'x') continue;
        while ((timestamp + i) % Number(busses[i]) !== 0) {
            console.log(timestamp, n);
            timestamp += n;
        }
        n *= Number(busses[i]);
    }

    console.log(timestamp_difference * highest_id);
    console.log(timestamp);
}

main();
