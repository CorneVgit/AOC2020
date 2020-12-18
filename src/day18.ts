import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day18.txt").toString("ascii").trim().split("\n");

    const result = [0, 0];

    for (const s of input) {
        result[0] += Number(evaluate(s.replaceAll(" ", "").split(""), 1));
        result[1] += Number(evaluate(s.replaceAll(" ", "").split(""), 2));
    }

    console.log(result);
}

function evaluate(input: string[], version = 1) {
    const open_brackets: number[] = [];
    const closed_brackets: number[] = [];
    let operands: string[] = [];
    let operator = "";

    let i = 0;
    while (input[i]) {
        if (operands.length === 2) {
            operands = [evaluate([operands[0], operator, operands[1]], version)];
            operator = '';
        }

        if (input[i] === '(') {
            open_brackets.unshift(i);
        } else if (input[i] === ')') {
            closed_brackets.unshift(i);
            if (closed_brackets.length === open_brackets.length) {
                operands.push(evaluate(input.slice(open_brackets.pop() as number + 1, i), version));
                open_brackets.length = 0;
                closed_brackets.length = 0;
            }
        } else if (open_brackets.length === 0) {
            if (!isNaN(Number(input[i]))) {
                operands.push(input[i]);
            } else if (input[i] === '+' ) {
                operator = input[i];
            } else if (input[i] === '*') {
                operator = input[i];
                if (version === 2) {
                    operands.push(evaluate(input.slice(i + 1), version));
                    break;
                }
            }
        }

        i++;
    }
    if (operands.length === 2) {
        return ((eval(operands[0] + operator + operands[1]) as number)).toString();
    } else {
        return operands[0];
    }
}

main();
