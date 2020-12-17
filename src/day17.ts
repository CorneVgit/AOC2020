import fs from 'fs';
import ndarray from 'ndarray';
import { zeros } from 'ndarray-scratch';

function main() {
    const input = fs.readFileSync("data/input_day17.txt").toString("ascii").trim().split("\n");

    let m = init(input);

    for (let c = 0; c < 6; c++) {
        m = cycle(m);
    }

    count(m);
}

function init(input: string[]): ndarray<number> {
    const m = zeros([1, 1, input.length, input.length]);

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input.length; x++) {
            switch (input[y][x]) {
                case '#':
                    m.set(0, 0, y, x, 1);
                    break;
                case '.':
                    m.set(0, 0, y, x, 0);
                    break;
            }
        }
    }

    return m;
}

function cycle(m: ndarray<number>): ndarray<number> {
    const t = expand(m);
    const r = ndarray([...t.data], t.shape);

    for (let w = 0; w < t.shape[0]; w++) {
        for (let z = 0; z < t.shape[1]; z++) {
            for (let y = 0; y < t.shape[2]; y++) {
                for (let x = 0; x < t.shape[3]; x++) {
                    const count = count_neighbours(w, z, y, x, t);
                    switch (t.get(w, z, y, x)) {
                        case 0:
                            if (count === 3) r.set(w, z, y, x, 1);
                            break;
                        case 1:
                            if (!(count === 3 || count === 4)) r.set(w, z, y, x, 0);
                            break;
                    }
                }
            }
        }
    }

    return r;
}

function expand(m: ndarray<number>): ndarray<number> {
    const t = zeros([...m.shape.map(x => x + 2)]);

    for (let w = 0; w < m.shape[0]; w++) {
        for (let z = 0; z < m.shape[1]; z++) {
            for (let y = 0; y < m.shape[2]; y++) {
                for (let x = 0; x < m.shape[3]; x++) {
                    t.set(w + 1, z + 1, y + 1, x + 1, m.get(w, z, y, x));
                }
            }
        }
    }

    return t;
}

function count_neighbours(wollah: number, layer: number, row: number, column: number, m: ndarray<number>): number {
    let count = 0;

    for (let w = wollah - 1; w <= wollah + 1; w++) {
        for (let z = layer - 1; z <= layer + 1; z++) {
            for (let y = row - 1; y <= row + 1; y++) {
                for (let x = column - 1; x <= column + 1; x++) {
                    if (m.get(w, z, y, x) === 1) count++;
                }
            }
        }
    }

    return count;
}

function count(m: ndarray<number>) {
    const count = [0, 0];
    for (let w = 0; w < m.shape[0]; w++) {
        for (let z = 0; z < m.shape[1]; z++) {
            for (let y = 0; y < m.shape[2]; y++) {
                for (let x = 0; x < m.shape[3]; x++) {
                    count[m.get(w, z, y, x)]++;
                }
            }
        }
    }

    console.log(`inactive : ${count[0]}`);
    console.log(`active   : ${count[1]}`);
}

function pretty_print(m: ndarray<number>) {
    console.log("shape:", m.shape);

    for (let w = 0; w < m.shape[0]; w++) {
        for (let z = 0; z < m.shape[1]; z++) {
            for (let y = 0; y < m.shape[2]; y++) {
                const a = [];
                for (let x = 0; x < m.shape[3]; x++) {
                    a.push(m.get(w, z, y, x));
                }

                console.log(a);
            }

            console.log();
        }
        console.log();
    }
}

main();
