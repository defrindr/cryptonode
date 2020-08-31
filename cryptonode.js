class cryptonodeJS {

    default_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    _switcher(type, enc, dec) {
        switch (type.toLowerCase()) {
            case 'e':
            case 'encrypt':
            case 'encode':
                return enc();
            case 'd':
            case 'decrypt':
            case 'decode':
                return dec();
        }
    }

    _reverseList(list) {
        let reverse_list = Object.entries(list);
        reverse_list = reverse_list.map((el) => el.reverse());
        reverse_list = Object.fromEntries(reverse_list);
        return reverse_list;
    }

    _isUpper = (chr) => {
        return (chr === chr.toUpperCase()) ? true : false;
    }

    _required(value) {
        if (value === undefined) throw ("Parameter value cant be blank");
    }

    rot13(source) {
        this._required(source);
        return this.caesar('decode', source, 13);
    }

    caesar(type, source, key = 13, custom_letter = undefined) {
        this._required(source);
        this._required(type);

        let letters = custom_letter ? custom_letter.toUpperCase() : this.default_letters;

        source = source.split("");
        key = key % letters.length; // limiting key

        const getChar = (is_uppercase, index) => {
            if (is_uppercase) {
                return letters[index].toUpperCase();
            } else {
                return letters[index].toLowerCase();
            }
        }

        let callback_e = () => {
            return source.map((chr) => {
                let index = letters.indexOf(chr.toUpperCase());
                if (index !== -1) {
                    let is_uppercase = this._isUpper(chr);
                    index += key;
                    if (index >= letters.length) {
                        index -= letters.length;
                    }
                    return getChar(is_uppercase, index);
                }
                return chr;
            }).join("");
        }

        let callback_d = () => {
            return source.map((chr) => {
                let index = letters.indexOf(chr.toUpperCase());
                if (index !== -1) {
                    let is_uppercase = this._isUpper(chr);
                    index -= key;
                    if (index < 0) {
                        index += letters.length;
                    }
                    return getChar(is_uppercase, index);
                }
                return chr;
            }).join("");
        }

        return this._switcher(type, callback_e, callback_d);
    }

    nato(type, source) {
        this._required(type);
        this._required(source);

        let list = {
            '1': 'One',
            '2': 'Two',
            '3': 'Three',
            '4': 'Four',
            '5': 'Five',
            '6': 'Six',
            '7': 'Seven',
            '8': 'Eight',
            '9': 'Nine',
            a: 'Alfa',
            b: 'Bravo',
            c: 'Charlie',
            d: 'Delta',
            e: 'Echo',
            f: 'Foxtrot',
            g: 'Golf',
            h: 'Hotel',
            i: 'India',
            j: 'Juliett',
            k: 'Kilo',
            l: 'Lima',
            m: 'Mike',
            n: 'November',
            o: 'Oscar',
            p: 'Papa',
            q: 'Quebec',
            r: 'Romeo',
            s: 'Sierra',
            t: 'Tango',
            v: 'Victor',
            w: 'Whiskey',
            x: 'X-ray',
            y: 'Yankee',
            z: 'Zulu',
            '.': 'Stop',
            ' ': '(space)'
        };

        let callback_e = () => {
            source = source.toLowerCase().split("");

            return source.map((chr) => {
                if (list[chr] !== undefined) return list[chr];
                return chr;
            }).join(" ");
        }

        let callback_d = () => {
            source = source.split(" ");
            let reverse_table = this._reverseList(list); // generate reverse table
            return source.map((chr) => {
                if (reverse_table[chr] !== undefined) return reverse_table[chr];
                return chr;
            }).join("");
        }

        return this._switcher(type, callback_e, callback_d);
    }

    morse(type, source, options = undefined) {
        let table_morse = {
            '0': 'longlonglonglonglong',
            '1': 'shortlonglonglonglong',
            '2': 'shortshortlonglonglong',
            '3': 'shortshortshortlonglong',
            '4': 'shortshortshortshortlong',
            '5': 'shortshortshortshortshort',
            '6': 'longshortshortshortshort',
            '7': 'longlongshortshortshort',
            '8': 'longlonglongshortshort',
            '9': 'longlonglonglongshort',
            '-': 'longshortshortshortshortlong',
            '=': 'longshortshortshortlong',
            '!': 'longshortlongshortlonglong',
            '@': 'shortlonglongshortlongshort',
            '$': 'shortshortshortshortshort',
            '&': 'shortlongshortshortshort',
            '(': 'longshortlonglongshort',
            ')': 'longshortlonglongshortlong',
            _: 'shortshortlonglongshortlong',
            '+': 'shortlongshortlongshort',
            q: 'longlongshortlong',
            w: 'shortlonglong',
            e: 'short',
            r: 'shortlongshort',
            t: 'long',
            y: 'longshortlonglong',
            u: 'shortshortlong',
            i: 'shortshort',
            o: 'longlonglong',
            p: 'shortlonglongshort',
            a: 'shortlong',
            s: 'shortshortshort',
            d: 'longshortshort',
            f: 'shortshortlongshort',
            g: 'longlongshort',
            h: 'shortshortshortshort',
            j: 'shortlonglonglong',
            k: 'longshortlong',
            l: 'shortlongshortshort',
            ';': 'longshortlongshortlongshort',
            "'": 'shortlonglonglonglongshort',
            ':': 'longlonglongshortshortshort',
            '"': 'shortlongshortshortlongshort',
            z: 'longlongshortshort',
            x: 'longshortshortlong',
            c: 'longshortlongshort',
            v: 'shortshortshortlong',
            b: 'longshortshortshort',
            n: 'longshort',
            m: 'longlong',
            ',': 'longlongshortshortlonglong',
            '.': 'shortlongshortlongshortlong',
            '/': 'longshortshortlongshort',
            '?': 'shortshortlonglongshortshort',
            ' ': 'space'
        };
        let default_options = {
            "space": "/",
            "long": "-",
            "short": "."
        };

        this._required(type);
        this._required(source);

        options = options ? Object.assign({}, default_options, options) : default_options;

        const generateTable = (table, options) => {
            let reverse_list = Object.entries(table);

            reverse_list = reverse_list.map((el) => {
                options.forEach((option) => {
                    el[1] = el[1].split(option[0]).join(option[1]); // replace all
                });

                return el;
            });

            reverse_list = Object.fromEntries(reverse_list);
            return reverse_list;
        }

        table_morse = generateTable(table_morse, Object.entries(options));

        let callback_e = function () {
            source = source.split("");
            return source.map((chr) => {
                let value = table_morse[chr];
                if (value) return value;
            }).join(" ");
        }

        let callback_d = () => {
            let reverse_table = this._reverseList(table_morse);
            source = source.split(" ");
            return source.map((chr) => {
                let value = reverse_table[chr];
                if (value) return value;
            }).join("");
        }

        return this._switcher(type, callback_e, callback_d);
    }

    affine(type, source_text, keys, custom_letters) {
        this._required(type);
        this._required(source_text);
        this._required(keys);

        /**
         * Find Modular Inverse
         * @param {*} a 
         * @param {*} b 
         * @return {Integer}
         */
        const modInverse = (a, b) => {

            /**
             * Find Extended Greatest Common Divisor
             * @param {*} a 
             * @param {*} b 
             * @return {Array}
             */
            const egcd = (a, b) => {
                let [x, y, _x, _y] = [0, 1, 1, 0];

                let div, mod, nx, ny = undefined;

                while (a !== 0) {
                    div = parseInt(b / a),
                        mod = b % a;

                    nx = x - _x * div,
                        ny = y - _y * div;

                    b = a,
                        a = mod,
                        x = _x,
                        y = _y,
                        _x = nx,
                        _y = ny;
                }

                let gcd = b;
                return [gcd, x, y];
            }

            let [gcd, x, y] = egcd(a, b);

            return (gcd === 1) ? x % b : undefined; // modular inverse doesnt exist
        }

        /**
         * Encryption plain_text
         * (a x + b) % len
         * 
         * @param {*} plain_text 
         * @param {*} a 
         * @param {*} b 
         * @param {*} letters 
         * @return {String}
         */
        const Encrypt = (plain_text, a, b, letters) => {
            let is_uppercase = false;
            let len = letters.length;

            return plain_text.split("").map(chr => {
                let index = letters.indexOf(chr.toUpperCase());

                if (index !== -1) {
                    let key = (a * index + b) % len;
                    let enc = letters[key];
                    is_uppercase = this._isUpper(chr);

                    if (!is_uppercase) {
                        enc = enc.toLowerCase();
                    }
                    return enc;
                }
                return chr;
            }).join("");
        }

        /**
         * Return Pa
         * P = (mod_inv * (index - b)) % 26 
         * 
         * @param {*} cipher_text 
         * @param {*} a 
         * @param {*} b 
         * @param {*} letters 
         * @return {String}
         */
        const decript = (cipher_text, a, b, letters) => {
            let is_uppercase = false;
            let len = letters.length;

            return cipher_text.split("").map(chr => {
                let index = letters.indexOf(chr.toUpperCase());

                if (index !== -1) {
                    let key = (a * (index - b)) % len;
                    is_uppercase = this._isUpper(chr);

                    if (key < 0) key += 26; // catch negatif number

                    let char = letters[key];

                    if (!is_uppercase) {
                        char = char.toLowerCase();
                    }
                    return char;
                }
                return chr;
            }).join("");
        }

        let letters = (custom_letters) ? custom_letters.toUpperCase() : this.default_letters;
        let mod_inv = modInverse(keys[0], letters.length);

        if (mod_inv === undefined) {
            throw ("Key isnt coprime !!");
        }

        let callback_e = function () {
            return Encrypt(source_text, keys[0], keys[1], letters);
        }

        let callback_d = function () {
            return decript(source_text, mod_inv, keys[1], letters);
        }

        return this._switcher(type, callback_e, callback_d);
    }

    vigenere(type, source, keys, custom_letters = undefined) {
        this._required(type);
        this._required(source);
        this._required(keys);

        let letters = (custom_letters) ? custom_letters.toUpperCase() : this.default_letters;
        let len = letters.length;
        let key_len = keys.length;
        let index = 0;
        let is_uppercase = false;

        keys.split("").forEach(chr => {
            if (letters.indexOf(chr.toUpperCase()) === -1) throw ("Char key doesnt exist in letters");
        });

        keys = keys.repeat(Math.ceil(len / key_len)).toUpperCase();



        let callback_e = () => {
            return source.split("").map((chr) => {
                let i_chr = letters.indexOf(chr.toUpperCase());
                is_uppercase = this._isUpper(chr);

                if (i_chr !== -1) {
                    let another_chr = keys[index];
                    let i_key = letters.indexOf(another_chr.toUpperCase());
                    let key = (i_chr + i_key) % len;

                    chr = letters[key];
                    if (!is_uppercase) {
                        chr = chr.toLowerCase();
                    }

                    index++;
                    return chr;
                }

                return chr;
            }).join("");
        }

        let callback_d = () => {
            return source.split("").map((chr) => {
                let i_chr = letters.indexOf(chr.toUpperCase());
                is_uppercase = this._isUpper(chr);

                if (i_chr !== -1) {
                    let another_chr = keys[index];
                    let i_key = letters.indexOf(another_chr.toUpperCase());
                    let key = (i_chr - i_key) % len;

                    if (key < 0) {
                        key += len;
                    }

                    chr = letters[key];

                    if (!is_uppercase) {
                        chr = chr.toLowerCase();
                    }

                    index++;
                    return chr;
                }

                return chr;
            }).join("");
        }

        return this._switcher(type, callback_e, callback_d);
    }

}


module.exports = cryptonodeJS;