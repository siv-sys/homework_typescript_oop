import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Defining interface for our User data
export interface UserData {
  id?: number;
  name: string;
  email: string;
}

// 2. class
export class User {
  id?: number;
  name: string;
  email: string;

  constructor(name: string, email: string, id?: number) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  // 3. static method in model (Get all users)
  static async findAll(): Promise<UserData[]> {
    // 5. destructuring array (taking rows from the result array)
    // 7. async/await
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users');
    return rows as UserData[];
  }

  // Static method to find a user by ID
  static async findById(id: number): Promise<UserData | null> {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
    
    // 5. destructuring array
    const [user] = rows;
    
    if (user) {
      return user as UserData;
    }
    return null;
  }

  // Static method to create a new user
  static async create(user: UserData): Promise<number> {
    // 5. destructuring object
    const { name, email } = user;
    
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    
    return result.insertId;
  }

  // Static method to update an existing user
  static async update(id: number, user: Partial<UserData>): Promise<boolean> {
    const updates: string[] = [];
    const values: Array<string | number> = [];

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

    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  }

  // Static method to delete a user
  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}
