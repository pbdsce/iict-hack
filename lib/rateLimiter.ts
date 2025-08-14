/**
 * Production-Only Rate Limiting Implementation
 *
 * Features:
 * - Redis required (no development fallbacks)
 * - Strict IP validation with security-first error handling
 * - Designed for serverless/distributed environments
 * - Fails fast if not properly configured
 *
 * Requirements:
 * - REDIS_URL environment variable must be set
 * - Suitable Redis provider (Redis Cloud, Upstash, etc.)
 */

import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";

// Redis client for production environment
let redisClient: Redis | null = null;

// Initialize Redis client - REQUIRED for production
if (!process.env.REDIS_URL) {
  throw new Error(
    "REDIS_URL environment variable is required for rate limiting"
  );
}

try {
  redisClient = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  });

  redisClient.on("error", (error) => {
    console.error("Redis connection error:", error);
  });

  redisClient.on("connect", () => {
    console.log("✅ Redis connected for rate limiting");
  });
} catch (error) {
  console.error("Failed to initialize Redis client:", error);
  throw error; // Fail fast if Redis cannot be initialized
}

// Rate limiter configuration
const rateLimiterConfig = {
  // General API requests - 100 requests per 15 minutes per IP
  general: {
    points: 100,
    duration: 900, // 15 minutes
    blockDuration: 900,
  },

  // File upload operations - 5 uploads per hour per IP
  fileUpload: {
    points: 10,
    duration: 3600, // 1 hour
    blockDuration: 3600,
  },

  // Team registration - 10 registrations per hour per IP (increased for testing)
  teamRegistration: {
    points: 10,
    duration: 3600, // 1 hour
    blockDuration: 1800, // 30 minutes block instead of 1 hour
  },

  // College creation - 10 colleges per hour per IP
  collegeCreation: {
    points: 10,
    duration: 3600, // 1 hour
    blockDuration: 1800, // 30 minutes
  },

  // Validation requests - 50 per 10 minutes per IP
  validation: {
    points: 50,
    duration: 600, // 10 minutes
    blockDuration: 600,
  },
};

// Create production-ready rate limiters using Redis
const createRateLimiter = (config: typeof rateLimiterConfig.general) => {
  if (!redisClient) {
    throw new Error("Redis client is required for rate limiting");
  }

  return new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "iict_rl:", // Prefix to avoid key conflicts
    ...config,
  });
};

// Initialize rate limiters
const rateLimiters = {
  general: createRateLimiter(rateLimiterConfig.general),
  fileUpload: createRateLimiter(rateLimiterConfig.fileUpload),
  teamRegistration: createRateLimiter(rateLimiterConfig.teamRegistration),
  collegeCreation: createRateLimiter(rateLimiterConfig.collegeCreation),
  validation: createRateLimiter(rateLimiterConfig.validation),
};

// Helper function to get client IP address - Production IP detection
function getClientIP(request: NextRequest): string {
  // Try Next.js built-in ip property first (if available)
  const nextIP = (request as NextRequest & { ip?: string }).ip;
  if (nextIP && nextIP !== "127.0.0.1" && nextIP !== "::1") {
    return nextIP;
  }

  // Manual header extraction with proper precedence
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first (client IP)
    const clientIP = forwarded.split(",")[0].trim();
    if (clientIP && clientIP !== "127.0.0.1" && clientIP !== "::1") {
      return clientIP;
    }
  }

  if (realIP && realIP !== "127.0.0.1" && realIP !== "::1") {
    return realIP;
  }

  if (
    cfConnectingIP &&
    cfConnectingIP !== "127.0.0.1" &&
    cfConnectingIP !== "::1"
  ) {
    return cfConnectingIP;
  }

  // Development fallback - use localhost IP for development
  if (process.env.NODE_ENV === "development") {
    return "127.0.0.1";
  }

  // Production fallback - throw error if no valid IP found
  throw new Error("Unable to determine client IP address for rate limiting");
}

export function createRateLimitMiddleware(
  limiterType: keyof typeof rateLimiters
) {
  return async function rateLimitMiddleware(request: NextRequest | Request) {
    const limiter = rateLimiters[limiterType];

    // Convert Request to NextRequest if needed
    const nextRequest =
      request instanceof Request
        ? new NextRequest(request.url, request)
        : request;

    let clientIP: string;
    try {
      clientIP = getClientIP(nextRequest);
      console.log(`Rate limiter: Client IP detected: ${clientIP}`);
    } catch (error) {
      // If IP detection fails in development, use a default IP
      if (process.env.NODE_ENV === "development") {
        console.warn("Rate limiter: Using default IP for development:", error);
        clientIP = "127.0.0.1";
      } else {
        // If IP detection fails in production, reject the request for security
        console.error("Rate limiter: Unable to determine client IP:", error);
        console.error("Request headers:", Object.fromEntries(nextRequest.headers.entries()));
        return NextResponse.json(
          {
            status: "error",
            message: "Unable to process request",
            error: "IP detection failed",
          },
          { status: 400 }
        );
      }
    }

    try {
      // Try to consume a point from the rate limiter
      await limiter.consume(clientIP);

      // If successful, allow the request to proceed
      return null; // null means no error, continue processing
    } catch (rateLimiterRes: unknown) {
      // Rate limit exceeded
      const errorRes = rateLimiterRes as {
        remainingPoints?: number;
        msBeforeNext?: number;
      };
      const remainingPoints = errorRes?.remainingPoints || 0;
      const msBeforeNext = errorRes?.msBeforeNext || 0;

      // Create rate limit response
      const response = NextResponse.json(
        {
          status: "error",
          message: "Too many requests. Please try again later.",
          error: "Rate limit exceeded",
          details: {
            limit: limiter.points,
            remaining: remainingPoints,
            resetTime: new Date(Date.now() + msBeforeNext).toISOString(),
            retryAfter: Math.round(msBeforeNext / 1000), // in seconds
          },
        },
        { status: 429 }
      );

      // Add rate limit headers
      response.headers.set("X-RateLimit-Limit", limiter.points.toString());
      response.headers.set("X-RateLimit-Remaining", remainingPoints.toString());
      response.headers.set(
        "X-RateLimit-Reset",
        new Date(Date.now() + msBeforeNext).toISOString()
      );
      response.headers.set(
        "Retry-After",
        Math.round(msBeforeNext / 1000).toString()
      );

      return response;
    }
  };
}

// Pre-configured middleware functions for easy import
export const generalRateLimit = createRateLimitMiddleware("general");
export const fileUploadRateLimit = createRateLimitMiddleware("fileUpload");
export const teamRegistrationRateLimit =
  createRateLimitMiddleware("teamRegistration");
export const collegeCreationRateLimit =
  createRateLimitMiddleware("collegeCreation");
export const validationRateLimit = createRateLimitMiddleware("validation");

// Helper function to check rate limit without consuming a point (for monitoring)
export async function checkRateLimit(
  limiterType: keyof typeof rateLimiters,
  request: NextRequest | Request
) {
  const limiter = rateLimiters[limiterType];

  // Convert Request to NextRequest if needed
  const nextRequest =
    request instanceof Request
      ? new NextRequest(request.url, request)
      : request;

  let clientIP: string;
  try {
    clientIP = getClientIP(nextRequest);
  } catch (ipError) {
    // IP detection failed - return blocked status for security
    console.error("IP detection failed:", ipError);
    return {
      allowed: false,
      remaining: 0,
      resetTime: null,
      error: "IP detection failed",
    };
  }

  try {
    const rateLimiterRes = await limiter.get(clientIP);

    // The library returns null if the key doesn't exist (first-time user)
    if (
      rateLimiterRes &&
      rateLimiterRes.consumedPoints !== undefined &&
      rateLimiterRes.consumedPoints > 0
    ) {
      return {
        allowed: true,
        remaining: Math.max(0, limiter.points - rateLimiterRes.consumedPoints),
        resetTime: new Date(
          Date.now() + rateLimiterRes.msBeforeNext
        ).toISOString(),
      };
    }

    // If no record exists, they have all their points available
    return {
      allowed: true,
      remaining: limiter.points,
      resetTime: null,
    };
  } catch (rateLimitError) {
    // Log the error for monitoring
    console.error("Rate limit check error:", rateLimitError);

    // In production, fail securely by blocking the request
    return {
      allowed: false,
      remaining: 0,
      resetTime: null,
      error: "Rate limit service unavailable",
    };
  }
}

// Emergency function to reset rate limits for a specific IP (for testing only)
export async function resetRateLimit(
  limiterType: keyof typeof rateLimiters,
  request: NextRequest | Request
) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Rate limit reset is not allowed in production");
  }

  const limiter = rateLimiters[limiterType];
  const nextRequest =
    request instanceof Request
      ? new NextRequest(request.url, request)
      : request;

  try {
    const clientIP = getClientIP(nextRequest);
    await limiter.delete(clientIP);
    console.log(`Rate limit reset for IP: ${clientIP}, limiter: ${limiterType}`);
    return true;
  } catch (error) {
    console.error("Failed to reset rate limit:", error);
    return false;
  }
}
