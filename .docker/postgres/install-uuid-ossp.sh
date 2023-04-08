#!/bin/bash
set -e
psql -U postgres -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
psql -U postgres -c 'CREATE SCHEMA IF NOT EXISTS "auth";'
psql -U postgres -c 'CREATE SCHEMA IF NOT EXISTS "email";'
psql -U postgres -c 'CREATE SCHEMA IF NOT EXISTS "news";'
psql -U postgres -c 'CREATE SCHEMA IF NOT EXISTS "product";'
psql -U postgres -c 'CREATE SCHEMA IF NOT EXISTS "order";'
