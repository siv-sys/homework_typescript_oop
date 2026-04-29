import { Router } from 'express';
// 6. import/export module
import { UserController } from '../controllers/UserController';

const router = Router();

// Define CRUD routes utilizing the controller methods
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
// Route using the requested 'create method in controller'
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
