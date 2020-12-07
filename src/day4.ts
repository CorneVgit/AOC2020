import fs from 'fs';

function main() {
    const input = fs.readFileSync("data/input_day4.txt").toString("ascii").split("\n");
    const passports = make_passports(input);

    let count = 0;
    for (const passport of passports) {
        if (validate_passport(passport)) count++;
    }

    console.log(count);
}

function make_passports(input: string[]) {
    const passports: Map<string, string>[] = [];
    let passport_raw = "";

    for (const str of input) {
        if (str === "") {
            const passport = new Map<string, string>();

            passport_raw.trim().split(" ").forEach(element => {
                const [key, value] = element.split(":");
                passport.set(key, value);
            });

            passports.push(passport);
            passport_raw = "";
        }

        passport_raw += " " + str;
    }

    return passports;
}

function validate_passport(passport: Map<string, string>) {
    if (!(passport.has("byr") && validate_byr(passport.get("byr") || ""))) return false;
    if (!(passport.has("iyr") && validate_iyr(passport.get("iyr") || ""))) return false;
    if (!(passport.has("eyr") && validate_eyr(passport.get("eyr") || ""))) return false;
    if (!(passport.has("hgt") && validate_hgt(passport.get("hgt") || ""))) return false;
    if (!(passport.has("hcl") && validate_hcl(passport.get("hcl") || ""))) return false;
    if (!(passport.has("ecl") && validate_ecl(passport.get("ecl") || ""))) return false;
    if (!(passport.has("pid") && validate_pid(passport.get("pid") || ""))) return false;

    return true;
}

function validate_byr(key: string) {
    return /^(19[2-9][0-9]|200[0-2])$/.exec(key) !== null;
}
function validate_iyr(key: string) {
    return /^(201[0-9]|2020)$/.exec(key) !== null;
}
function validate_eyr(key: string) {
    return /^(202[0-9]|2030)$/.exec(key) !== null;
}
function validate_hgt(key: string) {
    return /^((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)$/.exec(key) !== null;
}
function validate_hcl(key: string) {
    return /^#[0-9, a-f, A-F]{6}$/.exec(key) !== null;
}
function validate_ecl(key: string) {
    return /^(amb|blu|brn|gry|grn|hzl|oth)$/.exec(key) !== null;
}
function validate_pid(key: string) {
    return /^[0-9]{9}$/.exec(key) !== null;
}

main();
