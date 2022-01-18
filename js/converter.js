const hexDef1 = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "a",
        11: "b",
        12: "c",
        13: "d",
        14: "e",
        15: "f",
    },
    hexDef2 = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15,
    },
    hexDef3 = {
        0: "0000",
        1: "0001",
        2: "0010",
        3: "0011",
        4: "0100",
        5: "0101",
        6: "0110",
        7: "0111",
        8: "1000",
        9: "1001",
        a: "1010",
        b: "1011",
        c: "1100",
        d: "1101",
        e: "1110",
        f: "1111",
    },
    hexDef4 = {
        "0000": "0",
        "0001": "1",
        "0010": "2",
        "0011": "3",
        "0100": "4",
        "0101": "5",
        "0110": "6",
        "0111": "7",
        1000: "8",
        1001: "9",
        1010: "a",
        1011: "b",
        1100: "c",
        1101: "d",
        1110: "e",
        1111: "f",
    },
    octDef1 = {
        "000": "0",
        "001": "1",
        "010": "2",
        "011": "3",
        100: "4",
        101: "5",
        110: "6",
        111: "7",
    },
    octDef2 = {
        0: "000",
        1: "001",
        2: "010",
        3: "011",
        4: "100",
        5: "101",
        6: "110",
        7: "111",
    };

window.decimal = {
    binary(number) {
        let result = "";
        while (number) {
            result = (number % 2) + result; // avoid Math.floor by div = (y - rem) / x
            number = Math.floor(number / 2); // avoid modulo by rem = y - div * x
        }
        return result;
    },
    octal(number) {
        let result = "";
        while (number) {
            result = (number % 8) + result;
            number = Math.floor(number / 8);
        }
        return result;
    },
    hexadecimal(number) {
        let result = "";
        while (number) {
            result = hexDef1[number % 16] + result;
            number = Math.floor(number / 16);
        }
        return result;
    },
};

window.octal = {
    binary(number) {
        let result = "";
        for (const digit of number) result += octDef2[digit];
        return removeLeadingZeros(result);
    },
    decimal(number) {
        let result = 0;
        number
            .split("")
            .reverse()
            .forEach((digit, index) => {
                result += digit * 8 ** index;
            });
        return result.toString();
    },
    hexadecimal(number) {
        return binary.hexadecimal(this.binary(number));
    },
};

window.binary = {
    decimal(number) {
        let result = 0;
        number
            .split("")
            .reverse()
            .forEach((digit, index) => {
                result += digit * 2 ** index;
            });
        return result.toString();
    },
    octal(number) {
        let result = "";
        slice(number, 3).forEach((chunk) => (result += octDef1[chunk]));
        return removeLeadingZeros(result);
    },
    hexadecimal(number) {
        let result = "";
        slice(number, 4).forEach((chunk) => (result += hexDef4[chunk]));
        return removeLeadingZeros(result);
    },
};

window.hexadecimal = {
    binary(number) {
        let result = "";
        number.split("").forEach((digit) => (result += hexDef3[digit]));
        return removeLeadingZeros(result);
    },
    octal(number) {
        return binary.octal(this.binary(number));
    },
    decimal(number) {
        let result = 0;
        number
            .split("")
            .reverse()
            .forEach((digit, index) => {
                result += hexDef2[digit] * 16 ** index;
            });
        return result.toString();
    },
};
