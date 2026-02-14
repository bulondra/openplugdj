"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = now;
exports.seconds = seconds;
exports.minutes = minutes;
exports.calculateRemaining = calculateRemaining;
function now() {
    return Date.now();
}
function seconds(seconds) {
    return seconds * 1000;
}
function minutes(minutes) {
    return minutes * 60 * 1000;
}
function calculateRemaining(startTime, duration) {
    const elapsed = now() - startTime;
    const remaining = duration - elapsed;
    return remaining > 0 ? remaining : 0;
}
