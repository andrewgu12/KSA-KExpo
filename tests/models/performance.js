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
const performance_1 = require("../../models/performance");
const chai_1 = require("chai");
const saveABunchPerformances = () => __awaiter(this, void 0, void 0, function* () {
    const promiseArray = [];
    let perfPromise = null;
    for (let i = 0; i < 10; i++) {
        perfPromise = new performance_1.Performance(`performance ${i}`);
        promiseArray.push(perfPromise.save());
    }
    Promise.all(promiseArray).then((values) => {
        return Promise.resolve(true);
    }).catch((err) => {
        console.log(err);
        throw err;
    });
});
describe('Test Performance model', () => {
    let testPerformance = null;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield saveABunchPerformances();
        testPerformance = new performance_1.Performance('Performance 1');
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        testPerformance = null;
        yield performance_1.Performance.clearTable();
    }));
    it('default performance values', (done) => {
        chai_1.expect(testPerformance.name).to.equal('Performance 1');
        chai_1.expect(testPerformance.votes).to.equal(0);
        chai_1.expect(testPerformance.fileName).to.equal('performance_1');
        done();
    });
    it('getting all performances', () => __awaiter(this, void 0, void 0, function* () {
        const performances = yield performance_1.Performance.returnAllPerformances();
        chai_1.expect(performances).to.have.lengthOf(10);
    }));
});
