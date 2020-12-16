import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day16.txt").toString("ascii").trim().split("\n");

    const fields = get_fields(input);
    const [your_ticket, nearby_tickets] = get_tickets(input);
    const [valid_tickets, error_rate] = get_valid_tickets(nearby_tickets, fields);
    const ticket_map = get_ticket_map(valid_tickets, fields);
    const potential_fields = get_potential_fields(ticket_map, fields);

    const ordered_fields = new Array<string>(fields.size);

    for (let i = 0; i < potential_fields.length; i++) {
        if (potential_fields[i].size === 1) {
            for (let j = 0; j < potential_fields.length; j++) {
                if (i !== j) potential_fields[i].forEach(x => {
                    potential_fields[j].delete(x);
                    ordered_fields[i] = x;
                });
            }

            potential_fields[i].clear();
            i = -1;
        }
    }

    const numbers = your_ticket.split(',').map(Number);

    let result = 1;
    for (let i = 0; i < numbers.length; i++) {
        if (ordered_fields[i].slice(0, 9) === "departure") {
            result *= numbers[i];
        }
    }

    console.log(error_rate);
    console.log(result);
}

function get_fields(input: string[]) {
    const fields = new Map<string, { range1: [number, number], range2: [number, number] }>();

    for (const s of input) {
        const result = /(?<field>[a-z ]+): (?<range1>\d+-\d+) or (?<range2>\d+-\d+)/.exec(s);

        if (!result) break;
        if (result.groups?.field && result.groups?.range1 && result.groups?.range2) {
            const field = result.groups?.field;
            const range1 = result.groups?.range1.split('-').map(Number) as [number, number];
            const range2 = result.groups?.range2.split('-').map(Number) as [number, number];

            fields.set(field, { range1, range2 });
        }

        input = input.slice(1);
    }

    return fields;
}

function get_tickets(input: string[]): [string, string[]] {
    let your_ticket = "";
    let nearby_tickets = Array<string>();

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "your ticket:") {
            your_ticket = input[i + 1];
        }
        if (input[i] === "nearby tickets:") {
            nearby_tickets = input.slice(i + 1);
            break;
        }
    }

    return [your_ticket, nearby_tickets];
}

function check_valid(n: number, range1: [number, number], range2: [number, number]) {
    if (((n >= range1[0] && n <= range1[1]) || (n >= range2[0] && n <= range2[1]))) {
        return true;
    }

    return false;
}

function get_valid_tickets(tickets: string[], fields: Map<string, { range1: [number, number], range2: [number, number] }>): [string[], number] {
    const valid_tickets = new Array<string>();
    let error_rate = 0;
    let i = 0;

    while (i < tickets.length) {
        const numbers = tickets[i].split(',').map(Number);
        let valid_ticket = true;

        for (const n of numbers) {
            let found = false;

            for (const [, r] of fields) {
                if (check_valid(n, r.range1, r.range2)) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                error_rate += n;
                valid_ticket = false;
            }
        }
        if (valid_ticket) {
            valid_tickets.push(tickets[i]);
        }

        i++;
    }

    return [valid_tickets, error_rate];
}

function get_ticket_map(valid_tickets: string[], fields: Map<string, { range1: [number, number], range2: [number, number] }>) {
    const ticket_map = new Map<string, Map<number, [number, string[]]>>();

    for (const ticket of valid_tickets) {
        const numbers = ticket.split(',').map(Number);
        const number_map = new Map<number, [number, string[]]>();

        let i = 0;
        for (const n of numbers) {
            const valid_fields = new Array<string>();

            for (const [f, r] of fields) {
                if (check_valid(n, r.range1, r.range2)) {
                    valid_fields.push(f);
                } else {
                    valid_fields.push("");
                }
            }

            number_map.set(i, [n, valid_fields]);
            i++;
        }

        ticket_map.set(ticket, number_map);
    }

    return ticket_map;
}

function get_potential_fields(ticket_map: Map<string, Map<number, [number, string[]]>>, fields: Map<string, { range1: [number, number], range2: [number, number] }>) {
    const potential_fields = new Array<Set<string>>(fields.size).fill(new Set(fields.keys()));

    for (const [, number_map] of ticket_map) {
        for (const [i, [, f]] of number_map) {
            potential_fields[i] = new Set(f.filter(x => potential_fields[i].has(x)));
        }
    }

    return potential_fields;
}

main();
