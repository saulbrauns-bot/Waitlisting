/**
 * Fail-fast environment variable utility
 * Throws a clear error if required env vars are missing
 */

export function getEnv<K extends string>(key: K): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
        `Please ensure ${key} is set in your .env.local file.\n` +
        `See .env.example for reference.`
    );
  }

  return value;
}
