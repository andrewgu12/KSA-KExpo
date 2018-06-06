"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../db/config");
// TODO: none of the find functions actually work! filler until DB has results
class Performance {
    // Create a new performance object
    constructor(name) {
        this.performanceName = name;
        this.count = 0;
        this.imageName = this.performanceName.toLowerCase().replace(/ /, '_');
    }
    // Return all performances given in the database
    static returnAllPerformances() {
        db.query('SELECT * FROM performances', [], (err, result) => {
            if (err) {
                console.log(err);
                return [];
            }
            else {
                const performances = [];
                result.forEach((res) => {
                    const single = new Performance(res.name);
                    single.count = res.votes;
                    performances.push(single);
                });
                return performances;
            }
        });
        return [];
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
                    perf.votes = res.votes;
                    return perf;
                }
            }
        });
        return null;
    }
    // Search for performance by ID
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
    save() {
        return false;
    }
}
exports.Performance = Performance;
