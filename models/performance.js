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
            db.query('SELECT * FROM performances', [], (err, results) => {
                if (err) {
                    throw err;
                }
                else {
                    results.rows.forEach((res) => {
                        const single = new Performance(res.name);
                        single.id = res.id;
                        single.count = res.votes;
                        single.newEntry = false;
                        performances.push(single);
                    });
                }
            });
            return performances;
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
    // Search for performance by name
    // Rewrite this with async/await
    static findByName(name) {
        db.query('SELECT * FROM performances WHERE name = $1', [name], (err, res) => {
            if (err) {
                return null;
            }
            else {
                if (!res.res) {
                    return null;
                }
                else {
                    const perf = new Performance(res.name);
                    perf.id = res.id;
                    perf.votes = res.votes;
                    perf.newEntry = false;
                    return perf;
                }
            }
        });
        return null;
    }
    // Search for performance by ID
    // Rewrite this with async/await
    static findById(id) {
        db.query('SELECT * FROM performances WHERE id = $1', [id], (err, res) => {
            if (err) {
                return null;
            }
        });
        return null;
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
    // Rewrite this with async/await
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.newEntry) {
                db.query('INSERT INTO performances(name, votes, imageName) VALUES($1, $2, $3)', [this.performanceName, this.count, this.imageName], (err, res) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(res.rows); // for testing, will remove
                        return true;
                    }
                });
            }
            else {
                // db.query()
            }
            return false;
        });
    }
}
exports.Performance = Performance;
