"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
// Configured using async/await connection pooling from mysql2
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root', // update with your db user
    password: '', // update with your db password
    database: 'test_db', // update with your db name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
