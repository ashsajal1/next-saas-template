import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface RateLimitResult {
  remaining: number;
  reset: number;
  success: boolean;
}

let ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  if (ratelimit) {
    return ratelimit;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  try {
    const redis = new Redis({ url, token });
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "rate_limit",
      analytics: true,
    });
    return ratelimit;
  } catch (error) {
    console.error("Unable to initialize rate limiter:", error);
    return null;
  }
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getRatelimit();

  if (!limiter) {
    return {
      success: true,
      remaining: Number.MAX_SAFE_INTEGER,
      reset: 0,
    };
  }

  return limiter.limit(identifier);
}
