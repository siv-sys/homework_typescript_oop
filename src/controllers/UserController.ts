import { Request, Response } from 'express';
import { BaseController } from './baseController';
import { ServiceError, UserService } from '../services/User';

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  // Get all users controller logic
  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    // 8. try/catch
    try {
      const users = await this.userService.getAllUsers();
      this.success(res, users);
    } catch (error) {
      this.handleError(res, error, 'Error retrieving users');
    }
  };

  // Get user by ID controller logic
  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      // 5. destructuring object
      const { id } = req.params;
      const user = await this.userService.getUserById(Number(id));
      this.success(res, user);
    } catch (error) {
      this.handleError(res, error, 'Error retrieving user');
    }
  };

  // 4. create method in controller
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // 5. destructuring object
      const { name, email } = req.body;
      const user = await this.userService.createUser({ name, email });
      this.success(res, user, 201);
    } catch (error) {
      this.handleError(res, error, 'Error creating user');
    }
  };

  // Update user controller logic
  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      await this.userService.updateUser(Number(id), { name, email });
      this.success(res, { message: 'User updated successfully' });
    } catch (error) {
      this.handleError(res, error, 'Error updating user');
    }
  };

  // Delete user controller logic
  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(Number(id));
      this.success(res, { message: 'User deleted successfully' });
    } catch (error) {
      this.handleError(res, error, 'Error deleting user');
    }
  };

  private handleError(res: Response, error: unknown, fallbackMessage: string): void {
    if (error instanceof ServiceError) {
      this.error(res, error.message, error.statusCode);
      return;
    }

    this.error(res, fallbackMessage, 500, error);
  }
}
