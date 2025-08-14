import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimiter";

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
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      environment: process.env.NODE_ENV,
    }, { status: 500 });
  }
}
