import { Performance } from '../../models/performance';
import { expect } from 'chai';

const saveABunchPerformances = async () => {
    let perfPromise = null;
    for (let i = 0; i < 10; i++) {
        perfPromise = new Performance(`performance ${i}`);
        await perfPromise.save();
    }
};

describe('Test Performance model', () => {
    let testPerformance: Performance = null;
    beforeEach(async () => {
        await saveABunchPerformances();
        testPerformance = new Performance('Performance 1');
    });

    afterEach(async () => {
        testPerformance = null;
        await Performance.clearTable();
    });

    it('gets default performance values', (done) => {
        expect(testPerformance.name).to.equal('Performance 1');
        expect(testPerformance.votes).to.equal(0);
        expect(testPerformance.fileName).to.equal('performance_1');
        done();
    });

    it('gets all performances', async () => {
        const performances: Performance[] = await Performance.returnAllPerformances();
        expect(performances).to.have.lengthOf(10);
    });

    it('can get and modify votes information correctly', async () => {
        const performances: Performance[] = await Performance.returnAllPerformances();
        const firstPerf: Performance = performances[0];

        expect(firstPerf.votes).to.equal(0);
        firstPerf.votes = 100;
        expect(firstPerf.votes).to.equal(100);
        for (let i = 0; i < 50; i++) {
            firstPerf.addVote();
            expect(firstPerf.votes).to.equal(100 + i + 1);
        }
        expect(firstPerf.votes).to.equal(150);
        for (let i = 0; i < 50; i++) {
            firstPerf.subtractVote();
            expect(firstPerf.votes).to.equal(150 - i - 1);
        }
        expect(firstPerf.votes).to.equal(100);

        await firstPerf.save();
        expect(firstPerf.votes).to.equal(100);

        firstPerf.clearVotes();
        expect(firstPerf.votes).to.equal(0);
        await firstPerf.save();
        expect(firstPerf.votes).to.equal(0);
    });

    it('can get and set names even after save', async () => {
        expect(testPerformance.name).to.equal('Performance 1');
        testPerformance.name = 'Test Performance';
        expect(testPerformance.name).to.equal('Test Performance');

        await testPerformance.save();
        expect(testPerformance.name).to.equal('Test Performance');

        expect(testPerformance.fileName).to.equal('performance_1');
        testPerformance.fileName = 'test_performance';
        expect(testPerformance.fileName).to.equal('test_performance');
        await testPerformance.save();
        expect(testPerformance.fileName).to.equal('test_performance');
    });

    it('can find by id and name', async () => {
        // find by ID
        let thirdPerf: Performance = await Performance.findByName('performance 3');
        expect(thirdPerf.name).to.equal('performance 3');

        let nullPerf: Performance = await Performance.findByName('performance null');
        expect(nullPerf).to.be.null;

        thirdPerf = await Performance.findById(thirdPerf.id);
        expect(thirdPerf.name).to.equal('performance 3');
        nullPerf = await Performance.findById(0);
        expect(nullPerf).to.be.null;
    });

    it('can safely delete an item from the DB', async () => {
        const performances: Performance[] = await Performance.returnAllPerformances();

        let forthPerformance = performances[3];
        const name = forthPerformance.name;
        await forthPerformance.delete();

        forthPerformance = await Performance.findByName(name);
        expect(forthPerformance).to.be.null;
    });

    it('can safely clear the entire database', async() => {
        const performances: Performance[] = await Performance.returnAllPerformances();
        const perfIds: Number[] = [];
        // first collect all the ids
        performances.forEach((perf: Performance) => {
            perfIds.push(perf.id);
        });
        // clear the table!
        await Performance.clearTable();
        let testPerf: Performance = null;
        // now search the DB
        perfIds.forEach(async (id: number) => {
            testPerf = await Performance.findById(id);
            expect(testPerf).to.be.null;
        });
    });

    it('can safely test getting top places', async() => {
        const performances: Performance[] = await Performance.returnAllPerformances();

        performances[2].votes = 4;
        await performances[2].save();
        performances[5].votes = 9;
        await performances[5].save();
        performances[9].votes = 6;
        await performances[9].save();
        performances[8].votes = 7;
        await performances[8].save();
        const finalPerformances: Performance[] = await Performance.getTop(4);
        expect(finalPerformances[0].name).to.be.equal(performances[5].name);
        expect(finalPerformances[1].name).to.be.equal(performances[8].name);
        expect(finalPerformances[2].name).to.be.equal(performances[9].name);
        expect(finalPerformances[3].name).to.be.equal(performances[2].name);
    });
});
