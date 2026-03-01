import { beforeEach, describe, expect, it, vi } from "vitest";

import { submitDemoRequest } from "@/app/(common)/demo/actions";
import prisma from "@/lib/prisma";

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn().mockResolvedValue({
    remaining: 10,
    reset: 0,
    success: true,
  }),
}));
vi.mock("@/lib/resend", () => ({
  sendLeadNotification: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/prisma", () => ({
  default: {
    demoLead: {
      create: vi.fn(),
    },
  },
}));
vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));
vi.mock("next/headers", () => ({
  headers: () =>
    new Headers({
      "x-forwarded-for": "127.0.0.1",
    }),
}));

describe("submitDemoRequest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns persistence error when create fails", async () => {
    vi.mocked(prisma.demoLead.create).mockRejectedValueOnce(new Error("db down"));

    const formData = new FormData();
    formData.set("firstName", "Sam");
    formData.set("lastName", "Taylor");
    formData.set("workEmail", "sam@example.com");
    formData.set("company", "Acme");
    formData.set("teamSize", "11-50");
    formData.set("useCase", "analytics");
    formData.set("timezone", "est");

    const result = await submitDemoRequest(formData);

    expect(result).toEqual({
      success: false,
      message: "Unable to submit right now. Please try again shortly.",
    });
  });

  it("returns error when required fields are missing", async () => {
    const formData = new FormData();
    formData.set("firstName", "Sam");
    formData.set("workEmail", "sam@example.com");

    const result = await submitDemoRequest(formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain("required");
  });

  it("returns error for invalid work email", async () => {
    const formData = new FormData();
    formData.set("firstName", "Sam");
    formData.set("lastName", "Taylor");
    formData.set("workEmail", "bad-email");
    formData.set("company", "Acme");
    formData.set("teamSize", "11-50");
    formData.set("useCase", "analytics");
    formData.set("timezone", "est");

    const result = await submitDemoRequest(formData);

    expect(result).toEqual({
      success: false,
      message: "A valid work email is required",
    });
  });

  it("returns success for valid payload", async () => {
    vi.mocked(prisma.demoLead.create).mockResolvedValueOnce({
      id: "demo_1",
      firstName: "Sam",
      lastName: "Taylor",
      workEmail: "sam@example.com",
      company: "Acme",
      teamSize: "11-50",
      useCase: "analytics",
      timezone: "est",
      preferredDateTime: new Date("2026-03-04T10:00:00.000Z"),
      recordDemo: true,
      createdAt: new Date("2026-03-01T00:00:00.000Z"),
    });

    const formData = new FormData();
    formData.set("firstName", "Sam");
    formData.set("lastName", "Taylor");
    formData.set("workEmail", "sam@example.com");
    formData.set("company", "Acme");
    formData.set("teamSize", "11-50");
    formData.set("useCase", "analytics");
    formData.set("timezone", "est");
    formData.set("preferredDateTime", "2026-03-04T10:00");
    formData.set("recordDemo", "yes");

    const result = await submitDemoRequest(formData);

    expect(result).toEqual({
      success: true,
      message: "Demo request received. We will email scheduling options soon.",
    });
    expect(prisma.demoLead.create).toHaveBeenCalledOnce();
  });
});
