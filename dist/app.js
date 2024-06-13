"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandlers_1 = __importDefault(require("./app/middlewares/globalErrorHandlers"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
app.use([express_1.default.json(), express_1.default.urlencoded({ extended: true }), (0, cors_1.default)()]);
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "Welcome From Car Wash Booking System!",
    });
});
app.use([globalErrorHandlers_1.default, notFound_1.default]);
exports.default = app;
