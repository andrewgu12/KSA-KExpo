"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const guest_1 = require("../../models/guest");
const performance_1 = require("../../models/performance");
const chai_1 = require("chai");
const library_1 = require("../library");
const generate_random_string_1 = require("../../helpers/generate-random-string");
describe('Guest Model', () => {
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield library_1.saveABunchPerformances();
        yield library_1.saveABunchGuests();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield performance_1.Performance.clearTable();
        yield guest_1.Guest.clearTable();
    }));
    it('can register a new guest and change their name', () => __awaiter(this, void 0, void 0, function* () {
        const guest = new guest_1.Guest('guest test', generate_random_string_1.generateRandomString(40));
        chai_1.expect(guest.name).to.equal('guest test');
        const newName = 'billybob';
        guest.name = newName;
        chai_1.expect(guest.name).to.equal(newName);
    }));
    it('can save a guest properly', () => __awaiter(this, void 0, void 0, function* () {
        const guest = new guest_1.Guest('guest test', generate_random_string_1.generateRandomString(40));
        yield guest.save();
        const guestResult = yield guest_1.Guest.findOne('guest test');
        chai_1.expect(guestResult).to.not.be.empty;
    }));
    it('can delete a guest from the DB', () => __awaiter(this, void 0, void 0, function* () {
        const guest = new guest_1.Guest('guest test', generate_random_string_1.generateRandomString(40));
        yield guest.save();
        let guestResult = yield guest_1.Guest.findOne('guest test');
        chai_1.expect(guestResult).to.not.be.empty;
        yield guest.delete();
        guestResult = yield guest_1.Guest.findOne('guest test');
        chai_1.expect(guestResult).to.be.null;
    }));
    it('can vote for a performance correctly', () => __awaiter(this, void 0, void 0, function* () {
        const ids = yield performance_1.Performance.returnAllIds();
        const guest = new guest_1.Guest('guest test', generate_random_string_1.generateRandomString(40));
        chai_1.expect(guest.voteCount(ids[0])).to.be.false;
        yield guest.vote(ids[0]);
        chai_1.expect(guest.voteCount(ids[0])).to.be.true;
        chai_1.expect(yield guest.vote(-100000)).to.be.false;
    }));
    it('can test to see if password is valid', () => {
        const validPass = generate_random_string_1.generateRandomString(40);
        const guest = new guest_1.Guest('Test Guest', validPass);
        debugger;
        chai_1.expect(guest.validPassword(validPass)).to.be.true;
        chai_1.expect(guest.validPassword(null)).to.be.false;
        chai_1.expect(guest.validPassword('abcdef')).to.be.false;
    });
});
