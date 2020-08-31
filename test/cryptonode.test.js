const cryptonodeJS = require("./../cryptonode");

const {
    expect
} = require("chai");

const c = new cryptonodeJS;


describe("Cryptonode Test Driven Development", function () {
    describe('Caesar Cipher', function () {

        it("blank params",
            function () {
                expect(function () {
                    c.caesar();
                }).to.Throw("Parameter value cant be blank");
            });
        it("must return valid caesar cipher encode", function () {
            let encode = c.caesar("e", "Defri Indra Mahardika", 3);
            expect(encode).to.be.equal("Ghiul Lqgud Pdkduglnd");
        });


        it("must return valid caesar cipher encode with custom letters", function () {
            let encode = c.caesar("e", "Defri Indra Mahardika", 13, "stuvwxyzabcdefgh");
            expect(encode).to.be.equal("Abcri Inarx Mxexraikx");
        });

        it("must return valid caesar cipher decode", function () {
            let decode = c.caesar("d", "Ghiul Lqgud Pdkduglnd", 3);
            expect(decode).to.be.equal("Defri Indra Mahardika");
        });
    });

    describe('NATO', function () {

        it("blank params",
            function () {
                expect(function () {
                    c.nato();
                }).to.Throw("Parameter value cant be blank");
            });
        it("must return \"Delta Echo Foxtrot Romeo India (space) India November Delta Romeo Alfa (space) Mike Alfa Hotel Alfa Romeo Delta India Kilo Alfa \"",
            function () {
                let encode = c.nato("e", "defri indra mahardika");
                expect(encode).to.be.equal("Delta Echo Foxtrot Romeo India (space) India November Delta Romeo Alfa (space) Mike Alfa Hotel Alfa Romeo Delta India Kilo Alfa");
            });

        it("must return valid caesar cipher decode \"defri indra mahardika\"",
            function () {
                let decode = c.nato("d", "Delta Echo Foxtrot Romeo India (space) India November Delta Romeo Alfa (space) Mike Alfa Hotel Alfa Romeo Delta India Kilo Alfa");
                expect(decode).to.be.equal("defri indra mahardika");
            });
    });

    describe('MORSE', function () {
        it("blank params",
            function () {
                expect(function () {
                    c.morse();
                }).to.Throw("Parameter value cant be blank");
            });
        it("must return valid Morse encode \"-.. . ..-. .-. .. / .. -. -.. .-. .- / -- .- .... .- .-. -.. .. -.- .-\"",
            function () {
                let encode = c.morse("e", "defri indra mahardika");
                expect(encode).to.be.equal("-.. . ..-. .-. .. / .. -. -.. .-. .- / -- .- .... .- .-. -.. .. -.- .-");
            });

        it("must return valid Morse decode \"defri indra mahardika \"",
            function () {
                let decode = c.morse("d", "-.. . ..-. .-. .. / .. -. -.. .-. .- / -- .- .... .- .-. -.. .. -.- .-");
                expect(decode).to.be.equal("defri indra mahardika");
            });

        it("must return valid Morse decode \"defri indra mahardika \" with custom symbol",
            function () {
                let decode = c.morse("d", "100 0 0010 010 00 # 00 10 100 010 01 # 11 01 0000 01 010 100 00 101 01", {
                    space: "#",
                    short: 0,
                    long: 1
                });
                expect(decode).to.be.equal("defri indra mahardika");
            });
    });

    describe('ROT13', function () {
        it("blank params",
            function () {
                expect(function () {
                    c.rot13();
                }).to.Throw("Parameter value cant be blank");
            });
        it("must return valid Rot13 \"Qrsev Vaqen Znuneqvxn\"",
            function () {
                let encode = c.rot13("Defri Indra Mahardika");
                expect(encode).to.be.equal("Qrsev Vaqen Znuneqvxn");
            });
    });

    describe('affine', function () {
        it("blank params", function () {
            expect(function () {
                c.affine()
            }).to.Throw("Parameter value cant be blank");
        });

        it("must return valid cipher", function () {
            let plain_text = "Defri Indra Mahardika";
            let cipher_text = "Knqaz Zokab Lbwbakzfb";

            let key = [3, 1];

            expect(c.affine('e', plain_text, key)).to.be.equal(cipher_text);
            expect(c.affine('d', cipher_text, key)).to.be.equal(plain_text);
        });

        it("must return valid cipher with custom letters", function () {
            let custom_letters = "OPQRSTUVWXYZABCDEFGHIJKLMN";
            let cipher_text = "Iloyx Xmiyz Jzuzyixdz";
            let plain_text = "Defri Indra Mahardika"
            let key = [3, 1];

            expect(c.affine('e', plain_text, key, custom_letters)).to.be.equal(cipher_text);
            expect(c.affine('d', cipher_text, key, custom_letters)).to.be.equal(plain_text);
        });

        it("must return throw because key isnt coprime", function () {
            let plain_text = "Defri Indra Mahardika"
            let key = [2, 1];

            expect(function () {
                c.affine('e', plain_text, key);
            }).to.Throw("Key isnt coprime !!");
        });
    });

    describe("Vigenere", function () {
        it("Blank Params", function () {
            expect(function () {
                c.vigenere();
            }).to.Throw("Parameter value cant be blank")
        });

        it("Simple usage", function () {
            let plain_text = "Defri Indra Mahardika";
            let cipher_text = "Svtxz Izhgr Agyadhxbo";
            let key = "programe";


            expect(c.vigenere('e', plain_text, key)).to.be.equal(cipher_text);
            expect(c.vigenere('d', cipher_text, key)).to.be.equal(plain_text);
        });


        it("using 1 key", function () {
            let plain_text = "Defri Indra Mahardika";
            let cipher_text = "Efgsj Joesb Nbibsejlb";
            let key = "b";


            expect(c.vigenere('e', plain_text, key)).to.be.equal(cipher_text);
            expect(c.vigenere('d', cipher_text, key)).to.be.equal(plain_text);
        });

        it("using custom letters", function () {
            let plain_text = "Defri Indra Mahardika";
            let cipher_text = "Iljnp Ypflf Tedhhfkef";
            let key = "programme";
            let custom_letters = "OQSTUVWXYZABCDeFGHIJKLN";
            let custom_letters_2 = "KLMNOPQRSTUVWXYZABCDeFGHIJ";


            expect(function () {
                c.vigenere('e', plain_text, key, custom_letters);
            }).to.Throw("Char key doesnt exist in letters");

            expect(c.vigenere('d', cipher_text, key, custom_letters_2)).to.be.equal(plain_text);
        });
    });

    describe('BASE 64', function(){
        it('Blank Params', function(){
            expect(function(){
                c.b64();
            }).to.Throw("Parameter value cant be blank")
        });

        it('Normal Usage', function(){
            let plain_text = "Defri indra Mahardika";
            let encoding_text = "RGVmcmkgaW5kcmEgTWFoYXJkaWth";

            expect(c.b64('e', plain_text)).to.be.equal(encoding_text);
            expect(c.b64('d', encoding_text)).to.be.equal(plain_text)
        });

        it('Contain Padding', function () {
            expect(c.b64("encode", "any carnal pleasu")).to.be.equal("YW55IGNhcm5hbCBwbGVhc3U=")
            expect(c.b64('e', "##Defri indra Mahardika*&^%`")).to.be.equal("IyNEZWZyaSBpbmRyYSBNYWhhcmRpa2EqJl4lYA==")

            expect(c.b64("d", "YW55IGNhcm5hbCBwbGVhc3U=")).to.be.equal("any carnal pleasu")
            expect(c.b64('decode', "IyNEZWZyaSBpbmRyYSBNYWhhcmRpa2EqJl4lYA==")).to.be.equal("##Defri indra Mahardika*&^%`")
        });
    });
});