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
const config_1 = require("../db/config");
const performance_1 = require("./performance");
const generate_random_string_1 = require("../helpers/generate-random-string");
const crypto = require("crypto");
class Guest {
    constructor(name, pass, generatePassHash = true) {
        this.username = name;
        this.performances = null; // can't call async functions in constructor
        this.newEntry = true;
        if (generatePassHash) {
            this.generatePassword(pass);
        }
    }
    // Build out map that holds performance information
    static prefillPerformances() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ids = yield performance_1.Performance.returnAllIds();
                const votes = {};
                ids.forEach((id) => {
                    votes[id] = false;
                });
                return Promise.resolve(votes);
            }
            catch (err) {
                throw err;
            }
        });
    }
    get name() {
        return this.username;
    }
    set name(name) {
        this.username = name;
    }
    generatePassword(pass) {
        this.salt = generate_random_string_1.generateRandomString(60);
        this.password = crypto.createHash('sha256').update(this.salt + this.password).digest('hex');
    }
    vote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // make sure performances map isn't null!
            if (!this.performances) {
                try {
                    this.performances = yield Guest.prefillPerformances();
                }
                catch (err) {
                    throw err;
                }
            }
            console.log(this.performances);
            if (this.performances.hasOwnProperty(id)) {
                this.performances[id] = (this.performances[id]) ? false : true;
                return Promise.resolve(true); // just means its succeeded
            }
            // failed b/c likely the ID doesn't exist
            return Promise.resolve(false);
        });
    }
    voteCount(id) {
        if (this.performances) {
            return this.performances[id];
        }
        return false;
    }
    // Save a new audiece member
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.newEntry) {
                if (!this.performances) {
                    this.performances = yield Guest.prefillPerformances();
                }
                try {
                    yield config_1.pool.query('INSERT INTO guest(username, performances, password, salt) VALUES($1, $2, $3, $4)', [this.username, this.performances, this.password, this.salt]);
                    return Promise.resolve(true);
                }
                catch (err) {
                    throw err;
                }
            }
            else {
                try {
                    yield config_1.pool.query('UPDATE guest SET performances = $1, password = $2, salt = $3 WHERE username = $4', [this.performances, this.password, this.salt, this.username]);
                    return Promise.resolve(true);
                }
                catch (err) {
                    throw err;
                }
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.pool.query('DELETE FROM guest WHERE username = $1', [this.username]);
                return Promise.resolve(true);
            }
            catch (err) {
                throw err;
            }
        });
    }
    static clearTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.pool.query('DELETE FROM guest', []);
                return Promise.resolve(true);
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Make sure username is unique - not case sensitive
    // CALL BEFORE BUILDING OUT GUEST!
    static findOne(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield config_1.pool.query('SELECT * FROM guest WHERE username = $1 LIMIT 1', [name]);
                if (results.rows.length) {
                    const dbguest = results.rows[0];
                    const guest = new Guest(dbguest.username, dbguest.password, false);
                    guest.salt = dbguest.salt;
                    guest.password = dbguest.password;
                    guest.performances = dbguest.performances;
                    guest.newEntry = false;
                    return Promise.resolve(results.rows[0]);
                }
                return Promise.resolve(null);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.Guest = Guest;
