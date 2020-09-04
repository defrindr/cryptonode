class cryptonodeJS {

    default_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /**
     * Simplify Switch condition
     * @param {String} type 
     * @param {CallableFunction} callback_encode 
     * @param {CallableFunction} callback_decode 
     * @returns {String | Throw}
     */
    _switcher(type, callback_encode, callback_decode) {
        switch (type.toLowerCase()) {
            case 'e':
            case 'encrypt':
            case 'encode':
                return callback_encode();
            case 'd':
            case 'decrypt':
            case 'decode':
                return callback_decode();
            default:
                throw ("Type doesnt exist");
        }
    }

    /**
     * Reversing List
     * @param {Array} original_list
     * @returns {Array}
     */
    _reverseList(original_list) {
        let reverse_list = Object.entries(original_list);
        reverse_list = reverse_list.map((element) => element.reverse());
        reverse_list = Object.fromEntries(reverse_list);
        return reverse_list;
    }

    /**
     * Check character type
     * @param {String} character 
     * @returns {Boolean}
     */
    _isUpper = (character) => {
        return (character === character.toUpperCase()) ? true : false;
    }

    /**
     * Check variable has value or not
     * @param {*} value 
     */
    _required(value) {
        if (value === undefined) throw ("Parameter value cant be blank");
    }

    /**
     * Encoding / Decoding  ROT 13 Cipher
     * @param {String} source 
     * @returns {String}
     */
    rot13(source) {
        this._required(source);
        return this.caesar('decode', source, 13);
    }

    /**
     * Encoding / Decoding  Caesar Cipher
     * @param {String} type 
     * @param {String} source 
     * @param {Integer} key 
     * @param {String} custom_letter 
     * @returns {String}
     */
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
        };

        const callback_encode = () => {
            return source.map((character) => {
                let index = letters.indexOf(character.toUpperCase());

                if (index !== -1) {
                    let is_uppercase = this._isUpper(character);
                    let letters_length = letters.length;
                    index += key;
                    if (index >= letters_length) index -= letters_length;
                    return getChar(is_uppercase, index);
                }
                return character;
            }).join("");
        };

        const callback_decode = () => {
            return source.map((character) => {
                let index = letters.indexOf(character.toUpperCase());

                if (index !== -1) {
                    let is_uppercase = this._isUpper(character);
                    index -= key;
                    if (index < 0) index += letters.length;
                    return getChar(is_uppercase, index);
                }
                return character;
            }).join("");
        }

        return this._switcher(type, callback_encode, callback_decode);
    }

    /**
     * Encoding / Decoding NATO Spelling
     * @param {String} type 
     * @param {String} source 
     * @returns {String}
     */
    nato(type, source) {
        this._required(type);
        this._required(source);

        let nato_table = {
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

        let callback_encode = () => {
            source = source.toLowerCase().split("");

            return source.map((character) => {
                if (nato_table[character] !== undefined) return nato_table[character];
                return character;
            }).join(" ");
        }

        let callback_decode = () => {
            source = source.split(" ");
            let reverse_table = this._reverseList(nato_table); // generate reverse table
            return source.map((character) => {
                if (reverse_table[character] !== undefined) return reverse_table[character];
                return character;
            }).join("");
        }

        return this._switcher(type, callback_encode, callback_decode);
    }

    /**
     * Encode / Decode Morse
     * @param {String} type 
     * @param {String} source 
     * @param {Object} options 
     * @returns {String}
     */
    morse(type, source, options = undefined) {
        this._required(type);
        this._required(source);
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

        options = options ? Object.assign({}, default_options, options) : default_options;

        /**
         * Prepare Morse table
         * @param {Object} table 
         * @param {Object} options 
         * @returns {Object}
         */
        const generateTable = (table, options) => {
            let reverse_list = Object.entries(table);

            reverse_list = reverse_list.map((element) => {
                options.forEach((option) => {
                    element[1] = element[1].split(option[0]).join(option[1]); // replace all [name] with symbol
                });

                return element;
            });
            reverse_list = Object.fromEntries(reverse_list);
            return reverse_list;
        }

        table_morse = generateTable(table_morse, Object.entries(options));

        const callback_encode = function () {
            source = source.split("");
            return source.map((character) => {
                let value = table_morse[character];
                if (value) return value;
            }).join(" ");
        };

        const callback_decode = () => {
            let reverse_table = this._reverseList(table_morse);
            source = source.split(" ");
            return source.map((character) => {
                let value = reverse_table[character];
                if (value) return value;
            }).join("");
        };
        return this._switcher(type, callback_encode, callback_decode);
    }

    /**
     * 
     * @param {*} type 
     * @param {*} source_text 
     * @param {*} keys 
     * @param {*} custom_letters 
     */
    affine(type, source_text, keys, custom_letters) {
        this._required(type);
        this._required(source_text);
        this._required(keys);

        /**
         * Find Modular Inverse
         * @param {Integer} a 
         * @param {Integer} b 
         * @returns {Integer}
         */
        const modInverse = (a, b) => {

            /**
             * Find Extended Greatest Common Divisor
             * @param {Integer} a 
             * @param {Integer} b 
             * @returns {Array}
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
            };
            let [gcd, x, y] = egcd(a, b);
            return (gcd === 1) ? x % b : undefined; // modular inverse doesnt exist
        };

        /**
         * Encryption plain_text
         * (a x + b) % len
         * 
         * @param {*} plain_text 
         * @param {*} a 
         * @param {*} b 
         * @param {*} letters 
         * @returns {String}
         */
        const encription = (plain_text, a, b, letters) => {
            let is_uppercase = false;
            let letters_length = letters.length;

            return plain_text.split("").map(character => {
                let index = letters.indexOf(character.toUpperCase());

                if (index !== -1) {
                    let key = (a * index + b) % letters_length;
                    let character_encrypted = letters[key];
                    is_uppercase = this._isUpper(character);

                    if (!is_uppercase) character_encrypted = character_encrypted.toLowerCase();
                    return character_encrypted;
                }
                return character;
            }).join("");
        };

        /**
         * Decrypt cipher
         * P = (mod_inv * (index - b)) % 26 
         * 
         * @param {*} cipher_text 
         * @param {*} a 
         * @param {*} b 
         * @param {*} letters 
         * @returns {String}
         */
        const decription = (cipher_text, a, b, letters) => {
            let is_uppercase = false;
            let letters_length = letters.length;

            return cipher_text.split("").map(character => {
                let index = letters.indexOf(character.toUpperCase());

                if (index !== -1) {
                    let key = (a * (index - b)) % letters_length;
                    is_uppercase = this._isUpper(character);

                    if (key < 0) key += 26; // handle negatif number

                    let char = letters[key];

                    if (!is_uppercase) char = char.toLowerCase();
                    return char;
                }
                return character;
            }).join("");
        };

        let letters = (custom_letters) ? custom_letters.toUpperCase() : this.default_letters;
        let mod_inv = modInverse(keys[0], letters.length);

        if (mod_inv === undefined) throw ("Key isnt coprime !!");

        const callback_encode = function () {
            return encription(source_text, keys[0], keys[1], letters);
        };

        const callback_decode = function () {
            return decription(source_text, mod_inv, keys[1], letters);
        };

        return this._switcher(type, callback_encode, callback_decode);
    }

    vigenere(type, source, keys, custom_letters = undefined) {
        this._required(type);
        this._required(source);
        this._required(keys);

        let letters = (custom_letters) ? custom_letters.toUpperCase() : this.default_letters;
        let letters_length = letters.length;
        let key_length = keys.length;
        let index = 0;
        let is_uppercase = false;

        keys.split("").forEach(character => {
            if (letters.indexOf(character.toUpperCase()) === -1) throw ("Char key doesnt exist in letters");
        });

        keys = keys.repeat(Math.ceil(letters_length / key_length)).toUpperCase();

        let callback_e = () => {
            return source.split("").map((character) => {
                let character_index = letters.indexOf(character.toUpperCase());
                is_uppercase = this._isUpper(character);

                if (character_index !== -1) {
                    let another_character = keys[index];
                    let key_index = letters.indexOf(another_character.toUpperCase());
                    let key = (character_index + key_index) % letters_length;
                    character = letters[key];

                    if (!is_uppercase) character = character.toLowerCase();

                    index++;
                    return character;
                }
                return character;
            }).join("");
        };
        let callback_d = () => {
            return source.split("").map((character) => {
                let character_index = letters.indexOf(character.toUpperCase());
                is_uppercase = this._isUpper(character);

                if (character_index !== -1) {
                    let another_character = keys[index];
                    let i_key = letters.indexOf(another_character.toUpperCase());
                    let key = (character_index - i_key) % letters_length;

                    if (key < 0) {
                        key += letters_length;
                    }

                    character = letters[key];

                    if (!is_uppercase) character = character.toLowerCase();

                    index++;
                    return character;
                }
                return character;
            }).join("");
        };
        return this._switcher(type, callback_e, callback_d);
    }

    /**
     * Encoding / Decoding Text to Base64 format
     * @param {String} type 
     * @param {String} source 
     * @returns {String}
     */
    b64 = (type, source) => {
        this._required(type);
        this._required(source);
        let base64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        /**
         * Convert Binary to Decimal
         * @param {String} binary 
         * @returns {Integer}
         */
        const convert2Decimal = (binary) => {
            let decimal = 0;
            let length = binary.length - 1;

            binary.split("").forEach((value, index) => {
                decimal += (value === "1") ? 2 ** (length - index) : 0;
            });
            return decimal;
        };

        /**
         * Convert Floating number into Integer
         * @param {Float} number 
         * @returns {Integer}
         */
        const floor = (number) => {
            return number - (number % 1);
        };

        /**
         * Convert Decimal into Binary
         * @param {Integer} number 
         * @returns {String}
         */
        const convert2Binary = (number) => {
            let binary = "";

            while (number !== 0) {
                binary = `${number % 2}` + binary;
                number = floor(number / 2);
            }
            return binary;
        };

        /**
         * Convert origin string to base64
         * @returns {String}
         */
        const encode = () => {
            let cipher_text = "";

            /**
             * Convert Ascii string to binnary
             * @param {String} source 
             * @returns {String}
             */
            const string2Binary = (source) => {
                return source.split("").map(character => {
                    let binary = convert2Binary(character.charCodeAt(0));
                    let b_length = binary.length;

                    if (b_length < 8) {
                        binary = "0".repeat(8 - b_length) + binary; // add padding    
                    }
                    return binary;
                }).join("");
            };
            source = string2Binary(source).split(/(.{24})/).filter(value => value !== "");

            source.forEach((byte_list) => {
                byte_list = byte_list.split(/(.{6})/).filter(value => value !== "");
                let padding_length = byte_list.length % 2;

                byte_list.forEach((byte) => {
                    if (byte.length < 6) {
                        if (6 - byte.length <= 2) {
                            padding_length = 1;
                        } else {
                            padding_length = 2;
                        }
                        byte += "0".repeat(6 - byte.length);
                    }
                    cipher_text += base64_table[convert2Decimal(byte)];
                })

                if (padding_length) {
                    cipher_text += "=".repeat(padding_length);
                }
            });

            return cipher_text;
        };

        /**
         * Convert base64 to origin string
         * @returns {String}
         */
        const decode = () => {
            let plain_text = "";

            /**
             * Find Matching Character in table and return index as binary
             * @param {String} source 
             * @returns {String}
             */
            const matchWithTable = (source) => {
                return source.split("").map(character => {
                    let character_position = base64_table.indexOf(character);

                    if (character_position === -1) {
                        throw ("Invalid character detected");
                    }
                    let binary = convert2Binary(character_position);
                    let b_length = binary.length;

                    if (b_length < 6) {
                        binary = "0".repeat(6 - b_length) + binary;
                    }
                    return binary;
                }).join("");
            };

            source = source.split("=").join(""); // replace all = character
            source = matchWithTable(source).split(/(.{24})/).filter(value => value !== "");

            source.forEach((byte_list) => {
                byte_list = byte_list.split(/(.{8})/).filter(value => value !== "");

                byte_list.forEach((byte) => {
                    if (byte.length == 8) {
                        plain_text += String.fromCharCode(convert2Decimal(byte));
                    }
                })
            });

            return plain_text;
        };

        return this._switcher(type, encode, decode);
    }
}


module.exports = cryptonodeJS;