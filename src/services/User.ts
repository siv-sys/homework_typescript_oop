import { User, UserData } from '../models/User';

export class ServiceError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export type CreateUserInput = Pick<UserData, 'name' | 'email'>;
export type UpdateUserInput = Partial<CreateUserInput>;

export class UserService {
  async getAllUsers(): Promise<UserData[]> {
    return User.findAll();
  }

  async getUserById(id: number): Promise<UserData> {
    this.validateId(id);

    const user = await User.findById(id);

    if (!user) {
      throw new ServiceError('User not found', 404);
    }

    return user;
  }

  async createUser(input: CreateUserInput): Promise<UserData> {
    this.validateCreateInput(input);

    const newUserId = await User.create(input);
    return { id: newUserId, ...input };
  }

  async updateUser(id: number, input: UpdateUserInput): Promise<void> {
    this.validateId(id);
    this.validateUpdateInput(input);

    const success = await User.update(id, input);

    if (!success) {
      throw new ServiceError('User not found or no changes made', 404);
    }
  }

  async deleteUser(id: number): Promise<void> {
    this.validateId(id);

    const success = await User.delete(id);

    if (!success) {
      throw new ServiceError('User not found', 404);
    }
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new ServiceError('Valid user id is required');
    }
  }

  private validateCreateInput(input: CreateUserInput): void {
    const { name, email } = input;

    if (!name || !email) {
      throw new ServiceError('Name and email are required');
    }

    this.validateEmail(email);
  }

  private validateUpdateInput(input: UpdateUserInput): void {
    const { name, email } = input;

    if (name === undefined && email === undefined) {
      throw new ServiceError('Name or email is required');
    }

    if (email !== undefined) {
      this.validateEmail(email);
    }
  }

  private validateEmail(email: string): void {
    if (!email.includes('@')) {
      throw new ServiceError('Valid email is required');
    }
  }
}
