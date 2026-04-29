import { Request, Response } from 'express';
// 6. import/export module
import { User } from '../models/User';

export class UserController {
  
  // Get all users controller logic
  public static async getAllUsers(req: Request, res: Response): Promise<void> {
    // 8. try/catch
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  }

  // Get user by ID controller logic
  public static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      // 5. destructuring object
      const { id } = req.params;
      const user = await User.findById(Number(id));
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  }

  // 4. create method in controller
  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      // 5. destructuring object
      const { name, email } = req.body;
      
      if (!name || !email) {
        res.status(400).json({ message: 'Name and email are required' });
        return;
      }
      
      const newUserId = await User.create({ name, email });
      res.status(201).json({ id: newUserId, name, email });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  // Update user controller logic
  public static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      
      const success = await User.update(Number(id), { name, email });
      
      if (!success) {
        res.status(404).json({ message: 'User not found or no changes made' });
        return;
      }
      
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  // Delete user controller logic
  public static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await User.delete(Number(id));
      
      if (!success) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}
