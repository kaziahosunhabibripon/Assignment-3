"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minutesToTime = exports.timeToMinutes = void 0;
const timeToMinutes = (timeString) => {
    if (!timeString)
        return 0;
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
};
exports.timeToMinutes = timeToMinutes;
const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`;
};
exports.minutesToTime = minutesToTime;
