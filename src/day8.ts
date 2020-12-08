import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day8.txt").toString("ascii").trim().split("\n");

    for (let n = 1; n < input.length; n++) {
        execute(input, n, 0);
    }

    for (let j = 1; j < input.length; j++) {
        execute(input, 0, j);
    }
}

function execute(input: string[], nop_switch: number, jmp_switch: number, instruction_pointer = 0, accumulator = 0) {
    const executed_list = Array<boolean>(input.length).fill(false);

    let nop_count = 0;
    let jmp_count = 0;

    while (instruction_pointer < input.length) {
        if (executed_list[instruction_pointer] === true) {
            return;
        }

        executed_list[instruction_pointer] = true;
        const [opcode, operand] = input[instruction_pointer].split(" ");

        switch (opcode) {
            case "nop":
                nop_count++;
                instruction_pointer++;

                if (nop_count === nop_switch) {
                    instruction_pointer--;
                    instruction_pointer += Number(operand);
                }

                break;
            case "acc":
                accumulator += Number(operand);
                instruction_pointer++;
                break;
            case "jmp":
                jmp_count++;
                instruction_pointer += Number(operand);

                if (jmp_count === jmp_switch) {
                    instruction_pointer -= Number(operand);
                    instruction_pointer++;
                }

                break;
        }
    }

    console.log(accumulator);
    return;
}

main();
