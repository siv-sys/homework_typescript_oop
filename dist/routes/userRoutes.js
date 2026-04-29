"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// 6. import/export module
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
// Define CRUD routes utilizing the controller methods
router.get('/', UserController_1.UserController.getAllUsers);
router.get('/:id', UserController_1.UserController.getUserById);
// Route using the requested 'create method in controller'
router.post('/', UserController_1.UserController.createUser);
router.put('/:id', UserController_1.UserController.updateUser);
router.delete('/:id', UserController_1.UserController.deleteUser);
exports.default = router;
