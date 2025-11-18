export interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
  command: string;
}

export interface IRelationalDB {
  /**
   * Execute a SQL query with parameters
   */
  query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>>;
  
  /**
   * Execute a SQL query and return the first row
   */
  queryOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
  
  /**
   * Begin a database transaction
   */
  beginTransaction(): Promise<void>;
  
  /**
   * Commit the current transaction
   */
  commitTransaction(): Promise<void>;
  
  /**
   * Rollback the current transaction
   */
  rollbackTransaction(): Promise<void>;
  
  /**
   * Execute multiple queries in a transaction
   */
  transaction<T>(callback: (db: IRelationalDB) => Promise<T>): Promise<T>;
  
  /**
   * Close database connection
   */
  close(): Promise<void>;
  
  /**
   * Check if database is healthy
   */
  healthCheck(): Promise<boolean>;
}