import * as SQLite from 'expo-sqlite';

class DatabaseManager {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync('myapp.db');
    this.initTables();
  }

  private initTables() {
    this.db.withTransactionAsync(tx => {
      // Users table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT, 
          email TEXT UNIQUE, 
          age INTEGER,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      );
    });
  }

  getDatabase() {
    return this.db;
  }
}

export const DatabaseService = new DatabaseManager();