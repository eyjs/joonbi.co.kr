# PreToolUse Hook

Before executing tools, validate the following:

## File Operations

- **Write/Edit**: Check if file path is within project directory
- **Delete**: Confirm with user before deleting important files (.env, package.json, etc.)

## Database Operations

- **Migration**: Always backup before running destructive migrations
- **Seed**: Warn if running in production environment

## Git Operations

- **Commit**: Run lint and type-check before commit
- **Push**: Ensure tests pass before push to main/develop

## Docker Operations

- **Build**: Check Dockerfile exists
- **Down**: Warn about data loss for volumes
