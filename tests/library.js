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
const performance_1 = require("../models/performance");
const guest_1 = require("../models/guest");
// Generates a bunch of performances for testing
exports.saveABunchPerformances = () => __awaiter(this, void 0, void 0, function* () {
    let perfPromise = null;
    for (let i = 0; i < 10; i++) {
        perfPromise = new performance_1.Performance(`performance ${i}`);
        yield perfPromise.save();
    }
});
// Generates a bunch of audiece members for testing
exports.saveABunchGuests = () => __awaiter(this, void 0, void 0, function* () {
    let guestPromise = null;
    for (let i = 0; i < 100; i++) {
        guestPromise = new guest_1.Guest(`guest ${i}`);
        yield guestPromise.save();
    }
});
