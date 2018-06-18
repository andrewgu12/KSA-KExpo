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
class Guest {
    constructor(name) {
        this.username = name;
        this.performances = null; // can't call async functions in constructor
    }
    // Build out map that holds performance information
    static prefillPerformances() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(null);
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
