import { create } from 'zustand';
import * as SQLite from 'expo-sqlite';
import { User, UserCreateInput, UserUpdateInput } from '../types/user';

interface UserState {
  users: User[];
  isLoading: boolean;
  db: SQLite.SQLiteDatabase | null;
  initializeDatabase: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  addUser: (user: UserCreateInput) => Promise<void>;
  updateUser: (id: number, user: UserUpdateInput) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  db: null,

  initializeDatabase: async () => {
    try {
      const db = await SQLite.openDatabaseAsync('userDatabase');
      
      // Create users table if not exists
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          age INTEGER NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      set({ db });
    } catch (error) {
      console.error('Failed to initialize database', error);
    }
  },

  fetchUsers: async () => {
    const { db } = get();
    if (!db) {
      await get().initializeDatabase();
      return get().fetchUsers();
    }

    set({ isLoading: true });
    try {
      const users = await db.getAllAsync('SELECT * FROM users ORDER BY createdAt DESC');
      set({ 
        users: users as User[],
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch users', error);
    }
  },

  addUser: async (user) => {
    const { db } = get();
    if (!db) {
      await get().initializeDatabase();
      return get().addUser(user);
    }

    set({ isLoading: true });
    try {
      const result = await db.runAsync(
        'INSERT INTO users (name, email, age) VALUES (?, ?, ?)', 
        user.name, 
        user.email, 
        user.age
      );

      await get().fetchUsers();
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to add user', error);
    }
  },

  updateUser: async (id, user) => {
    const { db } = get();
    if (!db) {
      await get().initializeDatabase();
      return get().updateUser(id, user);
    }

    set({ isLoading: true });
    try {
      await db.runAsync(
        'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
        user.name ?? '', 
        user.email ?? '', 
        user.age ?? 0, 
        id
      );

      await get().fetchUsers();
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to update user', error);
    }
  },

  deleteUser: async (id) => {
    const { db } = get();
    if (!db) {
      await get().initializeDatabase();
      return get().deleteUser(id);
    }

    set({ isLoading: true });
    try {
      await db.runAsync(
        'DELETE FROM users WHERE id = ?', 
        id
      );

      await get().fetchUsers();
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to delete user', error);
    }
  },
}));