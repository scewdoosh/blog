"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createlogOutput = exports.createlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    username: zod_1.default.string().email({ message: "invalid email" }),
    password: zod_1.default.string().min(6, { message: "invalid password must be >6" }),
    name: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string().email({ message: "invalid email" }),
    password: zod_1.default.string().min(6, { message: "invalid password must be >6" }),
});
exports.createlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.createlogOutput = zod_1.default.object({
    title: zod_1.default.string(),
    constant: zod_1.default.string(),
    authorId: zod_1.default.number()
});
