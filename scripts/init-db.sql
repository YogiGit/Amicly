-- Amicly Database Initialization Script
-- This script runs when PostgreSQL container starts for the first time

-- Create additional databases if needed
-- CREATE DATABASE amicly_test;

-- Create extensions that might be needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE amicly_dev TO postgres;

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'Amicly PostgreSQL database initialized successfully';
END $$;