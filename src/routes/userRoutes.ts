import { Router } from 'express';
// 6. import/export module
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// Define CRUD routes utilizing the controller methods
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
// Route using the requested 'create method in controller'
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
