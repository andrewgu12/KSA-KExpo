import { Performance } from '../../models/performance';
import { expect } from 'chai';

const saveABunchPerformances = async () => {
    const promiseArray = [];
    let perfPromise = null;
    for (let i = 0; i < 10; i++) {
        perfPromise = new Performance(`performance ${i}`);
        promiseArray.push(perfPromise.save());
    }
    Promise.all(promiseArray).then((values) => {
        return Promise.resolve(true);
    }).catch((err) => {
        console.log(err);
        throw err;
    });
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

    it('default performance values', (done) => {
        expect(testPerformance.name).to.equal('Performance 1');
        expect(testPerformance.votes).to.equal(0);
        expect(testPerformance.fileName).to.equal('performance_1');
        done();
    });

    it('getting all performances', async () => {
        const performances: Performance[] = await Performance.returnAllPerformances();
        expect(performances).to.have.lengthOf(10);
    });
});
