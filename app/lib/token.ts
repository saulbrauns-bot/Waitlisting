import { createHash, randomBytes } from 'crypto';

/**
 * Token generation and hashing utilities for secure single-use tokens
 */

const TOKEN_LENGTH = 32; // 32 bytes = 256 bits of entropy
const TOKEN_EXPIRY_DAYS = 7;

export interface TokenPair {
  token: string; // Raw token to send in email
  hash: string; // SHA-256 hash to store in database
  expiresAt: Date;
}

/**
 * Generate a cryptographically secure random token
 * Returns both the raw token (for email) and its hash (for database)
 */
export function generateConfirmationToken(): TokenPair {
  const rawToken = randomBytes(TOKEN_LENGTH).toString('base64url');
  const hash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  return {
    token: rawToken,
    hash,
    expiresAt,
  };
}

/**
 * Hash a token using SHA-256
 * Used to verify tokens without storing them in plaintext
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Check if a token has expired
 */
export function isTokenExpired(expiresAt: Date | string): boolean {
  const expiry = typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt;
  return expiry < new Date();
}
