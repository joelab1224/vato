import { IRelationalDB } from '../interfaces/IRelationalDB';
import { PostgreSQLAdapter } from '../implementations/PostgreSQLAdapter';

export class DatabaseFactory {
  private static relationalDB: IRelationalDB | null = null;

  /**
   * Get singleton instance of relational database
   */
  static getRelationalDB(): IRelationalDB {
    if (!this.relationalDB) {
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is required');
      }
      this.relationalDB = new PostgreSQLAdapter(connectionString);
    }
    return this.relationalDB;
  }

  /**
   * Reset database instances (useful for testing)
   */
  static async reset(): Promise<void> {
    if (this.relationalDB) {
      await this.relationalDB.close();
      this.relationalDB = null;
    }
  }

  /**
   * Health check for all databases
   */
  static async healthCheck(): Promise<{ relational: boolean }> {
    return {
      relational: this.relationalDB ? await this.relationalDB.healthCheck() : false,
    };
  }
}