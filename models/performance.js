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
class Performance {
    // Create a new performance object
    constructor(name) {
        this.performanceName = name;
        this.count = 0;
        this.imageName = this.performanceName.toLowerCase().replace(/ /g, '_');
        this.newEntry = true;
    }
    // Generate an unique ID to idenity each performance
    static generateUniqueId() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingIds = yield this.returnAllIds();
                let newId = Math.floor(Math.random() * 1000);
                // find function to convert decimal to int
                while (existingIds.indexOf(newId) >= 0) {
                    newId = Math.floor(Math.random() * 1000);
                }
                return newId;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Return all performances given in the database
    static returnAllPerformances() {
        return __awaiter(this, void 0, void 0, function* () {
            const performances = [];
            try {
                const results = yield db.pool.query('SELECT * FROM performances LIMIT 10', []);
                results.rows.forEach((res) => {
                    const single = new Performance(res.name);
                    single._id = res.id;
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
    // Return just the ids of all performances
    static returnAllIds() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield db.pool.query('SELECT id FROM performances');
                const ids = [];
                results.rows.forEach((idObj) => {
                    ids.push(idObj.id);
                });
                return Promise.resolve(ids);
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
    // Specify the number of top performances to get and returns 1->n
    static getTop(places) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const performances = [];
                const results = yield db.pool.query('SELECT * FROM performances ORDER BY votes DESC LIMIT $1', [places]);
                results.rows.forEach((res) => {
                    const single = new Performance(res.name);
                    single._id = res.id;
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
    // set and change name(?) - guess we can use the ID to index
    set name(name) {
        this.performanceName = name;
    }
    get name() {
        return this.performanceName;
    }
    get id() {
        return this._id;
    }
    get fileName() {
        return this.imageName;
    }
    set fileName(name) {
        this.imageName = name;
    }
    // Search for performance by name
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield db.pool.query('SELECT * FROM performances WHERE name = $1', [name]);
                const dbPerf = results.rows[0];
                if (!dbPerf) { // doesn't exist, so just return null
                    return Promise.resolve(null);
                }
                const perf = new Performance(dbPerf.name);
                perf._id = dbPerf.id;
                perf.votes = dbPerf.votes;
                perf.imageName = dbPerf.image_file;
                perf.newEntry = false;
                return Promise.resolve(perf);
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Search for performance by ID
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield db.pool.query('SELECT * FROM performances WHERE id = $1', [id]);
                const dbPerf = results.rows[0];
                if (!dbPerf) { // doesn't exist, so just return null
                    return Promise.resolve(null);
                }
                const perf = new Performance(dbPerf.name);
                perf._id = dbPerf.id;
                perf.votes = dbPerf.votes;
                perf.imageName = dbPerf.image_file;
                perf.newEntry = false;
                return Promise.resolve(perf);
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Save a new performance or update an existing performance
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.newEntry) {
                try {
                    this._id = yield Performance.generateUniqueId();
                    const results = yield db.pool.query('INSERT INTO performances(id, name, votes, image_file) VALUES($1, $2, $3, $4)', [this._id, this.performanceName, this.count, this.imageName]);
                    return Promise.resolve(true);
                }
                catch (err) {
                    throw err;
                }
            }
            else {
                try {
                    yield db.pool.query('UPDATE performances SET name = $1, votes = $2, image_file = $3 WHERE id = $4', [this.name, this.count, this.imageName, this._id]);
                    return Promise.resolve(true);
                }
                catch (err) {
                    throw err;
                }
            }
        });
    }
    // Delete a single performance from the table
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db.pool.query('DELETE FROM performances WHERE id = $1', [this._id]);
                return true;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Clear entire performance table
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
