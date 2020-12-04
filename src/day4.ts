import fs from 'fs';

main();

function main() {
    const input = fs.readFileSync("data/input_day4.txt").toString("ascii").split("\n");
    const passports = make_passports(input);

    let count = 0;
    for (const passport of passports) {
        if (validate_passport(passport)) count++;
    }

    console.log(count);
}

interface Passport {
    [key: string]: string,
}

function make_passports(input: string[]) {
    const passports: Passport[] = [];
    let passport_raw = "";

    for (const s of input) {
        if (s === "") {
            const passport: Passport = {};

            passport_raw.trim().split(" ").forEach(element => {
                const [key, value] = element.split(":");
                passport[key] = value;
            });

            passports.push(passport);
            passport_raw = "";
        }

        passport_raw += " " + s;
    }

    return passports;
}

function validate_passport(passport: Passport) {
    if (!("byr" in passport && validate_byr(passport["byr"]))) return false;
    if (!("iyr" in passport && validate_iyr(passport["iyr"]))) return false;
    if (!("eyr" in passport && validate_eyr(passport["eyr"]))) return false;
    if (!("hgt" in passport && validate_hgt(passport["hgt"]))) return false;
    if (!("hcl" in passport && validate_hcl(passport["hcl"]))) return false;
    if (!("ecl" in passport && validate_ecl(passport["ecl"]))) return false;
    if (!("pid" in passport && validate_pid(passport["pid"]))) return false;

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
