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
    let perfPromise = null;
    for (let i = 0; i < 10; i++) {
        perfPromise = new performance_1.Performance(`performance ${i}`);
        yield perfPromise.save();
    }
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
    it('gets default performance values', (done) => {
        chai_1.expect(testPerformance.name).to.equal('Performance 1');
        chai_1.expect(testPerformance.votes).to.equal(0);
        chai_1.expect(testPerformance.fileName).to.equal('performance_1');
        done();
    });
    it('gets all performances', () => __awaiter(this, void 0, void 0, function* () {
        const performances = yield performance_1.Performance.returnAllPerformances();
        chai_1.expect(performances).to.have.lengthOf(10);
    }));
    it('can get and modify votes information correctly', () => __awaiter(this, void 0, void 0, function* () {
        const performances = yield performance_1.Performance.returnAllPerformances();
        const firstPerf = performances[0];
        chai_1.expect(firstPerf.votes).to.equal(0);
        firstPerf.votes = 100;
        chai_1.expect(firstPerf.votes).to.equal(100);
        for (let i = 0; i < 50; i++) {
            firstPerf.addVote();
            chai_1.expect(firstPerf.votes).to.equal(100 + i + 1);
        }
        chai_1.expect(firstPerf.votes).to.equal(150);
        for (let i = 0; i < 50; i++) {
            firstPerf.subtractVote();
            chai_1.expect(firstPerf.votes).to.equal(150 - i - 1);
        }
        chai_1.expect(firstPerf.votes).to.equal(100);
        yield firstPerf.save();
        chai_1.expect(firstPerf.votes).to.equal(100);
        firstPerf.clearVotes();
        chai_1.expect(firstPerf.votes).to.equal(0);
        yield firstPerf.save();
        chai_1.expect(firstPerf.votes).to.equal(0);
    }));
    it('can get and set names even after save', () => __awaiter(this, void 0, void 0, function* () {
        chai_1.expect(testPerformance.name).to.equal('Performance 1');
        testPerformance.name = 'Test Performance';
        chai_1.expect(testPerformance.name).to.equal('Test Performance');
        yield testPerformance.save();
        chai_1.expect(testPerformance.name).to.equal('Test Performance');
        chai_1.expect(testPerformance.fileName).to.equal('performance_1');
        testPerformance.fileName = 'test_performance';
        chai_1.expect(testPerformance.fileName).to.equal('test_performance');
        yield testPerformance.save();
        chai_1.expect(testPerformance.fileName).to.equal('test_performance');
    }));
    it('can find by id and name', () => __awaiter(this, void 0, void 0, function* () {
        // find by ID
        let thirdPerf = yield performance_1.Performance.findByName('performance 3');
        chai_1.expect(thirdPerf.name).to.equal('performance 3');
        let nullPerf = yield performance_1.Performance.findByName('performance null');
        chai_1.expect(nullPerf).to.be.null;
        thirdPerf = yield performance_1.Performance.findById(thirdPerf.id);
        chai_1.expect(thirdPerf.name).to.equal('performance 3');
        nullPerf = yield performance_1.Performance.findById(0);
        chai_1.expect(nullPerf).to.be.null;
    }));
    it('can safely delete an item from the DB', () => __awaiter(this, void 0, void 0, function* () {
        const performances = yield performance_1.Performance.returnAllPerformances();
        let forthPerformance = performances[3];
        const name = forthPerformance.name;
        yield forthPerformance.delete();
        forthPerformance = yield performance_1.Performance.findByName(name);
        chai_1.expect(forthPerformance).to.be.null;
    }));
    it('can safely clear the entire database', () => __awaiter(this, void 0, void 0, function* () {
        const performances = yield performance_1.Performance.returnAllPerformances();
        const perfIds = [];
        // first collect all the ids
        performances.forEach((perf) => {
            perfIds.push(perf.id);
        });
        // clear the table!
        yield performance_1.Performance.clearTable();
        let testPerf = null;
        // now search the DB
        perfIds.forEach((id) => __awaiter(this, void 0, void 0, function* () {
            testPerf = yield performance_1.Performance.findById(id);
            chai_1.expect(testPerf).to.be.null;
        }));
    }));
    it('can safely test getting top places', () => __awaiter(this, void 0, void 0, function* () {
        const performances = yield performance_1.Performance.returnAllPerformances();
        performances[2].votes = 4;
        yield performances[2].save();
        performances[5].votes = 9;
        yield performances[5].save();
        performances[9].votes = 6;
        yield performances[9].save();
        performances[8].votes = 7;
        yield performances[8].save();
        const finalPerformances = yield performance_1.Performance.getTop(4);
        chai_1.expect(finalPerformances[0].name).to.be.equal(performances[5].name);
        chai_1.expect(finalPerformances[1].name).to.be.equal(performances[8].name);
        chai_1.expect(finalPerformances[2].name).to.be.equal(performances[9].name);
        chai_1.expect(finalPerformances[3].name).to.be.equal(performances[2].name);
    }));
});
