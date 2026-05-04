"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// 6. import/export module
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
// Define CRUD routes utilizing the controller methods
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
// Route using the requested 'create method in controller'
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
exports.default = router;
