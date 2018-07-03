"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_random_string_1 = require("../../helpers/generate-random-string");
const chai_1 = require("chai");
describe('Random String Helper', () => {
    it('returns a blank string for no length', () => {
        chai_1.expect(generate_random_string_1.generateRandomString(0)).to.have.length(0);
    });
    it('returns a string of length 40', () => {
        chai_1.expect(generate_random_string_1.generateRandomString(40)).to.have.length(40);
    });
    it('returns a string of length 100', () => {
        chai_1.expect(generate_random_string_1.generateRandomString(100)).to.have.length(100);
    });
});
