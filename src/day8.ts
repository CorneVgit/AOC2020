import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day8.txt").toString("ascii").trim().split("\n");

    for (let n = 1; n < input.length; n++) {
        let [found, accumulator] = execute(input, n, 0);
        [found, accumulator] = execute(input, 0, n);
        
        if (found) {
            console.log(accumulator);
            break;
        }
    }
}

function execute(input: string[], nop_switch: number, jmp_switch: number, instruction_pointer = 0, accumulator = 0) {
    const executed_list = Array<boolean>(input.length).fill(false);

    let nop_count = 0;
    let jmp_count = 0;

    while (instruction_pointer < input.length) {
        if (executed_list[instruction_pointer] === true) {
            return [false, 0];
        }

        executed_list[instruction_pointer] = true;
        const [opcode, operand] = input[instruction_pointer].split(" ");

        switch (opcode) {
            case "nop":
                nop_count++;

                if (nop_count === nop_switch) {
                    instruction_pointer += Number(operand);
                    break;
                }

                instruction_pointer++;
                break;
            case "acc":
                accumulator += Number(operand);
                instruction_pointer++;
                break;
            case "jmp":
                jmp_count++;

                if (jmp_count === jmp_switch) {
                    instruction_pointer++;
                    break;
                }

                instruction_pointer += Number(operand);
                break;
        }
    }

    return [true, accumulator];
}

main();
