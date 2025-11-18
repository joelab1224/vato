import { Pool, PoolClient, QueryResult as PgQueryResult } from 'pg';
import { IRelationalDB, QueryResult } from '../interfaces/IRelationalDB';

export class PostgreSQLAdapter implements IRelationalDB {
  private pool: Pool;
  private client: PoolClient | null = null;

  constructor(connectionString: string) {
    this.pool = new Pool({
      connectionString,
      ssl: this.getSSLConfig(),
      max: parseInt(process.env.POSTGRES_MAX_CONNECTIONS || '20'),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 15000, // Increased from 2000ms to 15000ms for AWS RDS
      acquireTimeoutMillis: 15000,    // Added timeout for acquiring connections from pool
      statementTimeoutMillis: 30000,  // Added statement timeout
      keepAlive: true,                 // Keep connections alive
      keepAliveInitialDelayMillis: 10000, // Initial delay for keep-alive
    });
  }

  async query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
    const maxRetries = 3;
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const client = this.client || this.pool;
        const result = await client.query(sql, params);
        
        return {
          rows: result.rows as T[],
          rowCount: result.rowCount || 0,
          command: result.command,
        };
      } catch (error) {
        lastError = error as Error;
        
        // Check if it's a connection-related error and we should retry
        if (attempt < maxRetries && this.isRetryableError(error)) {
          console.warn(`Database query attempt ${attempt} failed, retrying...`, error.message);
          await this.delay(attempt * 1000); // Exponential backoff
          continue;
        }
        
        // If it's the last attempt or not retryable, throw the error
        throw error;
      }
    }
    
    throw lastError!;
  }

  async queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
    const result = await this.query<T>(sql, params);
    return result.rows[0] || null;
  }

  async beginTransaction(): Promise<void> {
    if (this.client) {
      throw new Error('Transaction already in progress');
    }
    this.client = await this.pool.connect();
    await this.client.query('BEGIN');
  }

  async commitTransaction(): Promise<void> {
    if (!this.client) {
      throw new Error('No transaction in progress');
    }
    await this.client.query('COMMIT');
    this.client.release();
    this.client = null;
  }

  async rollbackTransaction(): Promise<void> {
    if (!this.client) {
      throw new Error('No transaction in progress');
    }
    await this.client.query('ROLLBACK');
    this.client.release();
    this.client = null;
  }

  async transaction<T>(callback: (db: IRelationalDB) => Promise<T>): Promise<T> {
    await this.beginTransaction();
    try {
      const result = await callback(this);
      await this.commitTransaction();
      return result;
    } catch (error) {
      await this.rollbackTransaction();
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.client) {
      this.client.release();
      this.client = null;
    }
    await this.pool.end();
  }

  private isRetryableError(error: any): boolean {
    // Check for connection-related errors that are worth retrying
    const retryableErrors = [
      'Connection terminated unexpectedly',
      'Connection terminated due to connection timeout',
      'ECONNRESET',
      'ENOTFOUND',
      'ETIMEDOUT',
      'ECONNREFUSED',
      'connection timeout',
    ];

    const errorMessage = error?.message || '';
    const errorCode = error?.code || '';
    
    return retryableErrors.some(retryableError => 
      errorMessage.includes(retryableError) || errorCode === retryableError
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getSSLConfig() {
    // For AWS RDS, we need SSL even in development
    const isAWS = process.env.DATABASE_URL?.includes('rds.amazonaws.com');
    const sslMode = process.env.POSTGRES_SSL_MODE;
    
    if (sslMode === 'require' || isAWS) {
      return {
        rejectUnauthorized: false, // AWS RDS uses self-signed certificates
        require: true,
      };
    }
    
    // For local development without AWS
    return process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false;
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }
}
