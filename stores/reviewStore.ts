import { create } from 'zustand';
import * as SQLite from 'expo-sqlite';
import { Review, ReviewCreateInput, ReviewUpdateInput } from '../types/review';

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  db: SQLite.SQLiteDatabase | null;
  initializeDatabase: () => Promise<void>;
  fetchReviews: () => Promise<void>;
  fetchReviewsByType?: (type: string) => Promise<void>;
  addReview: (review: ReviewCreateInput) => Promise<void>;
  updateReview: (id: number, review: ReviewUpdateInput) => Promise<void>;
  deleteReview: (id: number) => Promise<void>;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  isLoading: false,
  db: null,

  initializeDatabase: async () => {
    try {
      const db = await SQLite.openDatabaseAsync('reviewDatabase');
      
      // Create reviews table if not exists
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS reviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          itemName TEXT NOT NULL,
          stars INTEGER NOT NULL CHECK(stars >= 1 AND stars <= 5),
          description TEXT,
          date DATETIME DEFAULT CURRENT_TIMESTAMP,
          type TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      set({ db });
    } catch (error) {
      console.error('Failed to initialize review database', error);
    }
  },

  fetchReviews: async () => {
    const { db } = get();
    if (!db) {
      await get().initializeDatabase();
      return get().fetchReviews();
    }

    set({ isLoading: true });
    try {
      const reviews = await db.getAllAsync('SELECT * FROM reviews ORDER BY createdAt DESC');
      set({ 
        reviews: reviews as Review[],
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch reviews', error);
    }
  },

  fetchReviewsByType: async (type: string) => {
    const { db } = get();
    if (!db) {
      await get().initializeDatabase();
      return get().fetchReviewsByType!(type);
    }

    set({ isLoading: true });
    try {
      const reviews = await db.getAllAsync(
        'SELECT * FROM reviews WHERE type = ? ORDER BY createdAt DESC', 
        type
      );
      set({ 
        reviews: reviews as Review[],
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch reviews by type', error);
    }
  },

  addReview: async (review) => {
    const { db } = get();
    if (!db) {
      await get().initializeDatabase();
      return get().addReview(review);
    }

    set({ isLoading: true });
    try {
      const result = await db.runAsync(
        'INSERT INTO reviews (itemName, stars, description, type) VALUES (?, ?, ?, ?)', 
        review.itemName, 
        review.stars, 
        review.description ?? '', 
        review.type
      );

      await get().fetchReviews();
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to add review', error);
    }
  },

  updateReview: async (id, review) => {
    const { db } = get();
    if (!db) {
      await get().initializeDatabase();
      return get().updateReview(id, review);
    }

    set({ isLoading: true });
    try {
      await db.runAsync(
        'UPDATE reviews SET itemName = ?, stars = ?, description = ?, type = ? WHERE id = ?',
        review.itemName ?? '', 
        review.stars ?? 0, 
        review.description ?? '', 
        review.type ?? '', 
        id
      );

      await get().fetchReviews();
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to update review', error);
    }
  },

  deleteReview: async (id) => {
    const { db } = get();
    if (!db) {
      await get().initializeDatabase();
      return get().deleteReview(id);
    }

    set({ isLoading: true });
    try {
      await db.runAsync(
        'DELETE FROM reviews WHERE id = ?', 
        id
      );

      await get().fetchReviews();
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to delete review', error);
    }
  },
}));