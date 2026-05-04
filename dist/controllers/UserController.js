"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const baseController_1 = require("./baseController");
const User_1 = require("../services/User");
class UserController extends baseController_1.BaseController {
    constructor() {
        super();
        // Get all users controller logic
        this.getAllUsers = async (req, res) => {
            // 8. try/catch
            try {
                const users = await this.userService.getAllUsers();
                this.success(res, users);
            }
            catch (error) {
                this.handleError(res, error, 'Error retrieving users');
            }
        };
        // Get user by ID controller logic
        this.getUserById = async (req, res) => {
            try {
                // 5. destructuring object
                const { id } = req.params;
                const user = await this.userService.getUserById(Number(id));
                this.success(res, user);
            }
            catch (error) {
                this.handleError(res, error, 'Error retrieving user');
            }
        };
        // 4. create method in controller
        this.createUser = async (req, res) => {
            try {
                // 5. destructuring object
                const { name, email } = req.body;
                const user = await this.userService.createUser({ name, email });
                this.success(res, user, 201);
            }
            catch (error) {
                this.handleError(res, error, 'Error creating user');
            }
        };
        // Update user controller logic
        this.updateUser = async (req, res) => {
            try {
                const { id } = req.params;
                const { name, email } = req.body;
                await this.userService.updateUser(Number(id), { name, email });
                this.success(res, { message: 'User updated successfully' });
            }
            catch (error) {
                this.handleError(res, error, 'Error updating user');
            }
        };
        // Delete user controller logic
        this.deleteUser = async (req, res) => {
            try {
                const { id } = req.params;
                await this.userService.deleteUser(Number(id));
                this.success(res, { message: 'User deleted successfully' });
            }
            catch (error) {
                this.handleError(res, error, 'Error deleting user');
            }
        };
        this.userService = new User_1.UserService();
    }
    handleError(res, error, fallbackMessage) {
        if (error instanceof User_1.ServiceError) {
            this.error(res, error.message, error.statusCode);
            return;
        }
        this.error(res, fallbackMessage, 500, error);
    }
}
exports.UserController = UserController;
