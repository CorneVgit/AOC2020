import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day14.txt").toString("ascii").split("\n");

    const masks = get_masks(input);

    console.log(get_sum(decode1(masks)));
    console.log(get_sum(decode2(masks)));
}

function get_masks(input: string[]) {
    const masks = new Map<string, Map<string, string>>();
    const memory_map = new Map<string, string>();
    let mask = undefined;

    for (const s of input) {
        let result = /mask = (?<mask>(?:X|0|1){36})/.exec(s);
        if (result && result.groups?.mask) {
            mask = result.groups?.mask;
            memory_map.clear();
        } else if (mask) {
            result = /mem\[(?<location>\d+)\] = (?<value>\d+)/.exec(s);
            if (result && result.groups?.location && result.groups?.value) {
                memory_map.set(Number(result.groups?.location).toString(2).padStart(36, '0'), Number(result.groups?.value).toString(2).padStart(36, '0'));
                masks.set(mask, new Map(memory_map));
            }
        }
    }

    return masks;
}

function decode1(masks: Map<string, Map<string, string>>) {
    const locations = new Map<string, number>();

    for (const [mask, memory_map] of masks) {
        for (const m of memory_map) {
            const address = m[0];
            const v = [...m[1]];

            for (let i = 0; i < v.length; i++) {
                switch (mask[i]) {
                    case '0':
                        v[i] = '0';
                        break;
                    case '1':
                        v[i] = '1';
                        break;
                }
            }

            locations.set(address, parseInt(v.join(""), 2));
        }
    }

    return locations;
}

function decode2(masks: Map<string, Map<string, string>>) {
    const locations = new Map<string, number>();

    for (const [mask, memory_map] of masks) {
        for (const m of memory_map) {
            const address = [...m[0]];
            const v = m[1];

            for (let i = 0; i < address.length; i++) {
                switch (mask[i]) {
                    case 'X':
                        address[i] = 'X';
                        break;
                    case '1':
                        address[i] = '1';
                        break;
                }
            }

            for (const a of get_combinations(address.join(''))) locations.set(a, parseInt(v, 2));
        }
    }

    return locations;
}

function get_sum(locations: Map<string, number>) {
    let sum = 0;

    for (const [, v] of locations) {
        sum += v;
    }

    return sum;
}

function get_combinations(address: string, addresses: string[] = []) {
    for (let i = 0; i < address.length; i++) {
        if (address[i] === 'X') {
            addresses.concat(get_combinations(address.replace('X', '0'), addresses));
            addresses.concat(get_combinations(address.replace('X', '1'), addresses));
            return addresses;
        }
    }

    addresses.push(address);

    return addresses;
}

main();
