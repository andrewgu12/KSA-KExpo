"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../db/config");
class Performance {
    // Create a new performance object
    constructor(name) {
        this.name = name;
        this.count = 0;
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
    // Search for performance by name
    static findByName(name) {
        return null;
    }
    // Search for performance by ID
    static findById(id) {
        return null;
    }
    // Add a single vote & returns total number of votes
    addVote() {
        this.count += 1;
        return this.count;
    }
    save() {
        return false;
    }
}
exports.Performance = Performance;
