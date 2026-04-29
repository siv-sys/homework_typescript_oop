"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// 6. import/export module
const User_1 = require("../models/User");
class UserController {
    // Get all users controller logic
    static async getAllUsers(req, res) {
        // 8. try/catch
        try {
            const users = await User_1.User.findAll();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    }
    // Get user by ID controller logic
    static async getUserById(req, res) {
        try {
            // 5. destructuring object
            const { id } = req.params;
            const user = await User_1.User.findById(Number(id));
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    }
    // 4. create method in controller
    static async createUser(req, res) {
        try {
            // 5. destructuring object
            const { name, email } = req.body;
            if (!name || !email) {
                res.status(400).json({ message: 'Name and email are required' });
                return;
            }
            const newUserId = await User_1.User.create({ name, email });
            res.status(201).json({ id: newUserId, name, email });
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }
    // Update user controller logic
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const success = await User_1.User.update(Number(id), { name, email });
            if (!success) {
                res.status(404).json({ message: 'User not found or no changes made' });
                return;
            }
            res.status(200).json({ message: 'User updated successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }
    // Delete user controller logic
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const success = await User_1.User.delete(Number(id));
            if (!success) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}
exports.UserController = UserController;
