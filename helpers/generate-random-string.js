"use strict";
// Generates a random string of given length
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = (length) => {
    const allPossCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += allPossCharacters[Math.floor(Math.random() * allPossCharacters.length)];
    }
    return result;
};
