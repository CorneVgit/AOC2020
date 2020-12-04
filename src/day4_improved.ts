import fs from 'fs';

class Passport {
    data = {
        "byr": "",
        "iyr": "",
        "eyr": "",
        "hgt": "",
        "hcl": "",
        "ecl": "",
        "pid": ""
    }

    private validation_table = {
        "byr": this.validate_byr.bind(this),
        "iyr": this.validate_iyr.bind(this),
        "eyr": this.validate_eyr.bind(this),
        "hgt": this.validate_hgt.bind(this),
        "hcl": this.validate_hcl.bind(this),
        "ecl": this.validate_ecl.bind(this),
        "pid": this.validate_pid.bind(this)
    };

    constructor(str: string) {
        for (const s of str.trim().split(" ")) {
            const [key, value] = s.split(":");
            if (key in this.data) {
                this.data[key as keyof Passport["data"]] = value;
            }
        }
    }

    private validate_byr(key: string) {
        return /^(19[2-9][0-9]|200[0-2])$/.exec(key) !== null;
    }
    private validate_iyr(key: string) {
        return /^(201[0-9]|2020)$/.exec(key) !== null;
    }
    private validate_eyr(key: string) {
        return /^(202[0-9]|2030)$/.exec(key) !== null;
    }
    private validate_hgt(key: string) {
        return /^((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)$/.exec(key) !== null;
    }
    private validate_hcl(key: string) {
        return /^#[0-9, a-f, A-F]{6}$/.exec(key) !== null;
    }
    private validate_ecl(key: string) {
        return /^(amb|blu|brn|gry|grn|hzl|oth)$/.exec(key) !== null;
    }
    private validate_pid(key: string) {
        return /^[0-9]{9}$/.exec(key) !== null;
    }

    is_valid() {
        for (const key of Object.keys(this.data)) {
            if (!(this.validation_table[key as keyof Passport["data"]](this.data[key as keyof Passport["data"]]))) return false;
        }

        return true;
    }
}

function main() {
    const input = fs.readFileSync("data/input_day4.txt").toString("ascii").split("\n");
    const passports = make_passports(input);

    let count = 0;
    for (const passport of passports) {
        if (passport.is_valid()) count++;
    }

    console.log(count);
}

function make_passports(input: string[]) {
    const passports: Passport[] = [];
    let passport_raw = "";

    for (const s of input) {
        if (s === "") {
            passports.push(new Passport(passport_raw));
            passport_raw = "";
        }

        passport_raw += " " + s;
    }

    return passports;
}

main();
