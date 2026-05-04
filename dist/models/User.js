"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = __importDefault(require("../config/db"));
// 2. class
class User {
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }
    // 3. static method in model (Get all users)
    static async findAll() {
        // 5. destructuring array (taking rows from the result array)
        // 7. async/await
        const [rows] = await db_1.default.execute('SELECT * FROM users');
        return rows;
    }
    // Static method to find a user by ID
    static async findById(id) {
        const [rows] = await db_1.default.execute('SELECT * FROM users WHERE id = ?', [id]);
        // 5. destructuring array
        const [user] = rows;
        if (user) {
            return user;
        }
        return null;
    }
    // Static method to create a new user
    static async create(user) {
        // 5. destructuring object
        const { name, email } = user;
        const [result] = await db_1.default.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        return result.insertId;
    }
    // Static method to update an existing user
    static async update(id, user) {
        const updates = [];
        const values = [];
        if (user.name !== undefined) {
            updates.push('name = ?');
            values.push(user.name);
        }
        if (user.email !== undefined) {
            updates.push('email = ?');
            values.push(user.email);
        }
        if (updates.length === 0) {
            return false;
        }
        values.push(id);
        const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
        const [result] = await db_1.default.execute(sql, values);
        return result.affectedRows > 0;
    }
    // Static method to delete a user
    static async delete(id) {
        const [result] = await db_1.default.execute('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
exports.User = User;
