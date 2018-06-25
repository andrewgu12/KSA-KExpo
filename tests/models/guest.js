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
        const guest = new guest_1.Guest('guest test');
        chai_1.expect(guest.name).to.equal('guest test');
        const newName = 'billybob';
        guest.name = newName;
        chai_1.expect(guest.name).to.equal(newName);
    }));
    it('can save a guest properly', () => __awaiter(this, void 0, void 0, function* () {
        const guest = new guest_1.Guest('guest test');
        yield guest.save();
        const guestResult = yield guest_1.Guest.checkUsernameExists('guest test');
        chai_1.expect(guestResult).to.be.true;
    }));
    it('can delete a guest from the DB', () => __awaiter(this, void 0, void 0, function* () {
        const guest = new guest_1.Guest('guest test');
        yield guest.save();
        let guestResult = yield guest_1.Guest.checkUsernameExists('guest test');
        chai_1.expect(guestResult).to.be.false;
        yield guest.delete();
        guestResult = yield guest_1.Guest.checkUsernameExists('guest test');
        chai_1.expect(guestResult).to.be.false;
    }));
    it('can vote for a performance correctly', () => __awaiter(this, void 0, void 0, function* () {
        const ids = yield performance_1.Performance.returnAllIds();
        const guest = new guest_1.Guest('guest test');
        chai_1.expect(guest.voteCount(ids[0])).to.be.false;
        yield guest.vote(ids[0]);
        chai_1.expect(guest.voteCount(ids[0])).to.be.true;
        chai_1.expect(guest.vote(-100000)).to.throw('Id doesn\'t exist!');
    }));
});
