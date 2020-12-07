import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day7.txt").toString("ascii").split("\n");
    const bags = new Map<string, Map<string, number>>();
    let count = 0;

    for (const s of input) {
        let bag = "";
        const contained = new Map<string, number>();
        for (const m of s.matchAll(/(?<bag>[\w]* [\w]*?)?(?: )(?:bags contain)?(?: )?(?<amount>[\d]+)? (?<contained>[\w]* [\w]*)?/g)) {
            if (m.groups?.bag) bag = m.groups?.bag;
            if (m.groups?.contained && m.groups?.amount) {
                contained.set(m.groups.contained, Number(m.groups.amount));
            }
        }
        if (bag !== "") bags.set(bag, contained);
    }

    for (const bag of bags.keys()) {
        if (check_bag(bags, bag) > 0) count++;
    }

    console.log(count);
    console.log(count_bags(bags, "shiny gold"));

}

function check_bag(bags: Map<string, Map<string, number>>, bag: string, count = 0) {
    const current_bag = bags.get(bag);

    if (current_bag) {
        if (current_bag.has("shiny gold")) {
            count++;
        } else if (current_bag.size > 0) {
            for (const b of current_bag.keys()) {
                count += check_bag(bags, b, count);
            }
        }
    }

    return count;
}

function count_bags(bags: Map<string, Map<string, number>>, bag: string, total_amount = -1) {
    const current_bag = bags.get(bag);

    if (current_bag) {
        if (current_bag.size === 0) {
            return 1;
        }

        for (const b of current_bag.keys()) {
            const amount = current_bag.get(b);

            if (amount) {
                total_amount += amount * count_bags(bags, b, 0);
            }
        }
    }

    return total_amount + 1;
}

main();
