import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  resetRateLimit,
  resetRateLimitForIP,
} from "@/lib/rateLimiter";

export async function GET(request: NextRequest) {
  try {
    // Get IP detection info
    const forwarded = request.headers.get("x-forwarded-for");
    const realIP = request.headers.get("x-real-ip");
    const cfConnectingIP = request.headers.get("cf-connecting-ip");
    const nextIP = (request as NextRequest & { ip?: string }).ip;

    // Check current rate limit status
    const rateLimitStatus = await checkRateLimit("teamRegistration", request);

    return NextResponse.json({
      status: "success",
      ipDetection: {
        forwarded,
        realIP,
        cfConnectingIP,
        nextIP,
      },
      headers: Object.fromEntries(request.headers.entries()),
      rateLimitStatus,
      environment: process.env.NODE_ENV,
      redisConfigured: !!process.env.REDIS_URL,
      message:
        "Use POST /api/debug-rate-limit to reset rate limits in development",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        environment: process.env.NODE_ENV,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        status: "error",
        message: "Rate limit reset is not allowed in production",
      },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { limiterType = "teamRegistration", ipAddress } = body;

    let resetSuccess;
    if (ipAddress) {
      // Reset for specific IP address
      resetSuccess = await resetRateLimitForIP(limiterType, ipAddress);
    } else {
      // Reset for current request IP
      resetSuccess = await resetRateLimit(limiterType, request);
    }

    if (resetSuccess) {
      return NextResponse.json({
        status: "success",
        message: `Rate limit reset successfully for ${limiterType}${
          ipAddress ? ` (IP: ${ipAddress})` : ""
        }`,
        limiterType,
        ipAddress: ipAddress || "current request IP",
      });
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to reset rate limit",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
