// Interfaces
export * from './interfaces/IRelationalDB';

// Implementations
export * from './implementations/PostgreSQLAdapter';

// Factory
export * from './factory/DatabaseFactory';

// Convenience exports
export { DatabaseFactory as db } from './factory/DatabaseFactory';