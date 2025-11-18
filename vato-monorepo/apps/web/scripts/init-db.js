const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  // Load environment variables
  require('dotenv').config({ path: '.env.local' });

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }

  // Get SSL configuration similar to PostgreSQLAdapter
  const getSSLConfig = () => {
    const isAWS = connectionString.includes('rds.amazonaws.com');
    const sslMode = process.env.POSTGRES_SSL_MODE;
    
    if (sslMode === 'require' || isAWS) {
      return {
        rejectUnauthorized: false, // AWS RDS uses self-signed certificates
        require: true,
      };
    }
    
    return process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false;
  };

  const pool = new Pool({ 
    connectionString,
    ssl: getSSLConfig()
  });

  try {
    console.log('Connecting to database...');
    
    // Read SQL schema
    const schemaPath = path.join(__dirname, '../lib/database/schema/identity.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    console.log('Creating tables...');
    await pool.query(schema);

    console.log('✅ Database initialized successfully!');
    console.log('Tables created:');
    console.log('  - users');
    console.log('  - auth_sessions');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };