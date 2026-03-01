import { beforeEach, describe, expect, it, vi } from "vitest";

import { submitDemoRequest } from "@/app/(common)/demo/actions";
import prisma from "@/lib/prisma";

vi.mock("@/lib/prisma", () => ({
  default: {
    demoLead: {
      create: vi.fn(),
    },
  },
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

    expect(result).toEqual({
      success: false,
      message: "Please complete all required fields to book your demo.",
    });
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
      message: "Please provide a valid work email address.",
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
