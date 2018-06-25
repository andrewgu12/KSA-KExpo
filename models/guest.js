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
class Guest {
    constructor(name) {
        this.username = name;
        this.performances = null; // can't call async functions in constructor
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
    vote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
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
            return Promise.resolve(false);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(false);
        });
    }
    static clearTable() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(false);
        });
    }
    // Make sure username is unique - not case sensitive
    // CALL BEFORE BUILDING OUT GUEST!
    static checkUsernameExists(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                name = name.toLowerCase(); // not case sensitive
                const results = yield config_1.pool.query('SELECT * FROM guest WHERE username = $1 LIMIT 1', [name]);
                if (results.rows.length) {
                    return Promise.resolve(true);
                }
                return Promise.resolve(false);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.Guest = Guest;
