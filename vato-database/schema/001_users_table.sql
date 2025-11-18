-- VATO Database Schema
-- Identity Domain: Users Table
-- Created: 2025-11-05
-- 
-- Purpose: Foundation table for user identity management
-- Part of the cognitive architecture's identity layer

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    -- Primary identifier
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication & Identity
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100),
    
    -- Temporal tracking (critical for episodic memory)
    created_at TIMESTAMP DEFAULT NOW(),
    last_active_at TIMESTAMP,
    
    -- Cognitive personalization (flexible JSONB)
    -- Example: {"theme": "dark_intelligence", "language": "en", "mode": "analytical"}
    preferences JSONB DEFAULT '{}',
    
    -- Extended metadata (future-proof)
    -- Example: {"signup_source": "web", "onboarding_completed": true}
    metadata JSONB DEFAULT '{}'
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_last_active_at ON users(last_active_at);

-- Create index on JSONB fields for fast queries
CREATE INDEX IF NOT EXISTS idx_users_preferences ON users USING GIN (preferences);
CREATE INDEX IF NOT EXISTS idx_users_metadata ON users USING GIN (metadata);

-- Add comments for documentation
COMMENT ON TABLE users IS 'Identity domain - manages user authentication and profile data';
COMMENT ON COLUMN users.user_id IS 'Unique identifier for the user (UUID v4)';
COMMENT ON COLUMN users.email IS 'User email address (unique, required for authentication)';
COMMENT ON COLUMN users.username IS 'Display name for the user (optional)';
COMMENT ON COLUMN users.created_at IS 'Timestamp when user account was created';
COMMENT ON COLUMN users.last_active_at IS 'Timestamp of last user activity (for temporal context)';
COMMENT ON COLUMN users.preferences IS 'User preferences as flexible JSONB (theme, language, mode settings)';
COMMENT ON COLUMN users.metadata IS 'Extended user metadata as flexible JSONB (signup source, features, etc)';
