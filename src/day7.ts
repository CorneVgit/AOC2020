import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day7_test.txt").toString("ascii").split("\n");
    const bags = new Map<string, Map<string, number>>();
    let count = 0;

    for (const s of input) {
        let bag = "";
        const contain = new Map<string, number>();
        for (const m of s.matchAll(/(?<bag>[\w]* [\w]*?)?(?: )(?:bags contain)?(?: )?(?<amount>[\d]+)? (?<contain>[\w]* [\w]*)?/g)) {
            if (m.groups?.bag) bag = m.groups?.bag;
            if (m.groups?.contain && m.groups?.amount) {
                contain.set(m.groups.contain, Number(m.groups.amount));
            }
        }
        if (bag !== "") bags.set(bag, contain);
    }

    for (const bag of bags.keys()) {
        if (check_bag(bags, bag) > 0) count++;
    }

    console.log(count);
}

function check_bag(bags: Map<string, Map<string, number>>, bag: string, count = 0) {
    const current_bag = bags.get(bag);

    if (current_bag !== undefined) {
        if (current_bag.has("shiny gold")) {
            count++;
        } else if (current_bag.size !== 0) {
            for (const b of current_bag.keys()) {
                count += check_bag(bags, b, count);
            }
        }
    }

    return count;
}

main();
