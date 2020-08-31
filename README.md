# CryptoNode.JS

<img img src="https://i.ibb.co/6mJRk0r/coollogo-com-62664414.png" alt="Crypto.Node" style="width:80vw;display:block;height: auto;margin:10px auto">

## Description

Cryptonode.js is a simple library cryptography for NodeJS


## Installation

```
npm i cryptonode.js
```


## Table of Contents


- [CryptoNodeJS](#cryptonode.js)
    - [Description](#description)
    - [Installation](#installation)
    - [Table of Contents](#table-of-contents)
    - [List Crypto](#list-crypto)
        - [Caesar Cipher](#caesar-cipher)
            - [Description](#description-1)
            - [Sample](#sample)
        - [Morse](#morse)
            - [Description](#description-2)
            - [Sample](#sample-1)
        - [ROT13](#rot13)
            - [Description](#description-3)
            - [Sample](#sample-2)
        - [NATO](#nato)
            - [Description](#description-4)
            - [Sample](#sample-3)
        - [Affine Cipher](#affine-cipher)
            - [Description](#description-5)
            - [Sample](#sample-4)



## List Crypto

### Caesar Cipher

#### Description

<table>
    <thead>
        <th>Name</th>
        <th>Params</th>
        <th>Type Data</th>
        <th>Nullable</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td rowspan="3">caesar</td>
            <td>type</td>
            <td>string</td>
            <td>:heavy_multiplication_x:</td>
            <td>d, decode, e, encode</td>
        </tr>
        <tr>
            <td>source</td>
            <td>string</td>
            <td>:heavy_multiplication_x:</td>
            <td>plaintext</td>
        </tr>
        <tr>
            <td>key</td>
            <td>integer</td>
            <td>:heavy_check_mark:</td>
            <td>key shifter, default value is 13</td>
        </tr>
    </tbody>
</table>

#### Sample

```js

const c = new Crypto;

console.log(c.caesar("e", "Defri Indra Mahardika", 3));
console.log(c.caesar("d", "Ghiul Lqgud Pdkduglnd", 3));

// Output : 
// Ghiul Lqgud Pdkduglnd
// Defri Indra Mahardika

```


### Morse

#### Description

<table>
    <thead>
        <th>Name</th>
        <th>Params</th>
        <th>Type Data</th>
        <th>Nullable</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td rowspan="3">morse</td>
            <td>type</td>
            <td>string</td>
            <td>:heavy_multiplication_x:</td>
            <td>d, decode, e, encode</td>
        </tr>
        <tr>
            <td>source</td>
            <td>string</td>
            <td>:heavy_multiplication_x:</td>
            <td>plaintext</td>
        </tr>
        <tr>
            <td>options</td>
            <td>object</td>
            <td>:heavy_check_mark:</td>
            <td>you can custom short, long, and space symbol.</td>
        </tr>
    </tbody>
</table>

#### Sample

```js

const c = new Crypto;

console.log(c.morse("e", "defri indra mahardika", {
    short: "+"
}));

// Output : 
// -++ + ++-+ +-+ ++ / ++ -+ -++ +-+ +- / -- +- ++++ +- +-+ -++ ++ -+- +-

```



### ROT13

#### Description

<table>
    <thead>
        <th>Name</th>
        <th>Params</th>
        <th>Type Data</th>
        <th>Nullable</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td>rot13</td>
            <td>source</td>
            <td>string</td>
            <td>:heavy_multiplication_x:</td>
            <td>plaintext</td>
        </tr>
    </tbody>
</table>

#### Sample

```js

const c = new Crypto;

console.log(c.rot13("defri indra mahardika"));

// Output : 
// qrsev vaqen znuneqvxn

```




### NATO

#### Description

<table>
    <thead>
        <th>Name</th>
        <th>Params</th>
        <th>Type Data</th>
        <th>Nullable</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">nato</td>
            <td>type</td>
            <td>string</td>
            <td>:heavy_multiplication_x:</td>
            <td>d, decode, e, encode</td>
        </tr>
        <tr>
            <td>source</td>
            <td>string</td>
            <td>:heavy_multiplication_x:</td>
            <td>plaintext</td>
        </tr>
    </tbody>
</table>

#### Sample

```js

const c = new Crypto;

console.log(c.nato("e", "defri indra mahardika"));

// Output : 
// Delta Echo Foxtrot Romeo India(space) India November Delta Romeo Alfa(space) Mike Alfa Hotel Alfa Romeo Delta India Kilo Alfa

```




### Affine Cipher

#### Description

<table>
    <thead>
        <th>Name</th>
        <th>Params</th>
        <th>Type Data</th>
        <th>Nullable</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td rowspan="4">affine</td>
            <td>type</td>
            <td>string</td>
            <td>:heavy_multiplication_x:</td>
            <td>d, decode, e, encode</td>
        </tr>
        <tr>
            <td>source_text</td>
            <td>string</td>
            <td>:heavy_multiplication_x:</td>
            <td>plaintext</td>
        </tr>
        <tr>
            <td>keys</td>
            <td>Array</td>
            <td>:heavy_multiplication_x:</td>
            <td>must contain 2 key number . eg : [3, 1]</td>
        </tr>
        <tr>
            <td>custom_letters</td>
            <td>string</td>
            <td>:heavy_check_mark:</td>
            <td> eg : KLMNOPQRSTUVWXYZABCDEFGHIJ</td>
        </tr>
    </tbody>
</table>

#### Sample

```js

const c = new Crypto;
let custom_letters = "OPQRSTUVWXYZABCDEFGHIJKLMN";
let ciphertext = "Iloyx Xmiyz Jzuzyixdz";
let plaintext = "Defri Indra Mahardika"
let key = [3, 1];

console.log(c.affine("e", plaintext, key, custom_letters));
console.log(c.affine("d", ciphertext, key, custom_letters));

// Output : 
// Delta Echo Foxtrot Romeo India(space) India November Delta Romeo Alfa(space) Mike Alfa Hotel Alfa Romeo Delta India Kilo Alfa

```







