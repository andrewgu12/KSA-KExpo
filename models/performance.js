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
const db = require("../db/config");
// TODO: none of the find functions actually work! filler until DB has results
class Performance {
    // Create a new performance object
    constructor(name) {
        this.performanceName = name;
        this.count = 0;
        this.imageName = this.performanceName.toLowerCase().replace(/ /, '_');
        this.newEntry = true;
    }
    // Return all performances given in the database
    static returnAllPerformances() {
        return __awaiter(this, void 0, void 0, function* () {
            const performances = [];
            try {
                const results = yield db.pool.query('SELECT * FROM performances LIMIT 10', []);
                results.rows.forEach((res) => {
                    const single = new Performance(res.name);
                    single.id = res.id;
                    single.count = res.votes;
                    single.newEntry = false;
                    performances.push(single);
                });
                return Promise.resolve(performances);
            }
            catch (err) {
                throw err;
            }
        });
    }
    // This should only be used when building out from DB.
    set votes(numberVotes) {
        this.count = numberVotes;
    }
    get votes() {
        return this.count;
    }
    // set and change name(?) - guess we can use the ID to index
    set name(name) {
        this.performanceName = name;
    }
    get name() {
        return this.performanceName;
    }
    get fileName() {
        return this.imageName;
    }
    // Search for performance by name
    // Rewrite this with async/await
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield db.pool.query('SELECT * FROM performances WHERE name = $1', [name]);
                const dbPerf = results.rows[0];
                if (!dbPerf) {
                    return Promise.resolve(null);
                }
                const perf = new Performance(dbPerf.name);
                perf.id = dbPerf.id;
                perf.votes = dbPerf.votes;
                perf.newEntry = false;
                return Promise.resolve(perf);
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Search for performance by ID
    // Rewrite this with async/await
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield db.pool.query('SELECT * FROM performances WHERE id = $1', [id]);
                const dbPerf = results.rows[0];
                if (!dbPerf) {
                    return Promise.resolve(null);
                }
                const perf = new Performance(dbPerf.name);
                perf.id = dbPerf.id;
                perf.votes = dbPerf.votes;
                perf.newEntry = false;
                return Promise.resolve(perf);
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Add a single vote & returns total number of votes
    addVote() {
        this.count += 1;
        return this.count;
    }
    subtractVote() {
        this.count -= 1;
        return this.count;
    }
    clearVotes() {
        this.count = 0;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.newEntry) {
                try {
                    const results = yield db.pool.query('INSERT INTO performances(name, votes, imageName) VALUES($1, $2, $3)', [this.performanceName, this.count, this.imageName]);
                    return Promise.resolve(true);
                }
                catch (err) {
                    throw err;
                }
            }
            else {
                // db.query()
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db.pool.query('DELETE FROM performances WHERE id = $1', [this.id]);
                return true;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static clearTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db.pool.query('DELETE FROM performances', []);
                return Promise.resolve(true);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.Performance = Performance;
