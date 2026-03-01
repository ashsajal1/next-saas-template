import { beforeEach, describe, expect, it, vi } from "vitest";

import { submitContactForm } from "@/app/(common)/contact/actions";
import prisma from "@/lib/prisma";

vi.mock("@/lib/prisma", () => ({
  default: {
    contactLead: {
      create: vi.fn(),
    },
  },
}));

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns persistence error when create fails", async () => {
    vi.mocked(prisma.contactLead.create).mockRejectedValueOnce(new Error("db down"));

    const formData = new FormData();
    formData.set("firstName", "Jane");
    formData.set("lastName", "Doe");
    formData.set("email", "jane@example.com");
    formData.set("message", "Need help with onboarding.");

    const result = await submitContactForm(formData);

    expect(result).toEqual({
      success: false,
      message: "Unable to submit right now. Please try again shortly.",
    });
  });

  it("returns error when required fields are missing", async () => {
    const formData = new FormData();
    formData.set("firstName", "Jane");
    formData.set("email", "jane@example.com");

    const result = await submitContactForm(formData);

    expect(result).toEqual({
      success: false,
      message: "Please fill in all required fields before submitting.",
    });
  });

  it("returns error for invalid email", async () => {
    const formData = new FormData();
    formData.set("firstName", "Jane");
    formData.set("lastName", "Doe");
    formData.set("email", "invalid-email");
    formData.set("message", "Need help with onboarding.");

    const result = await submitContactForm(formData);

    expect(result).toEqual({
      success: false,
      message: "Please provide a valid email address.",
    });
  });

  it("returns success for valid payload", async () => {
    vi.mocked(prisma.contactLead.create).mockResolvedValueOnce({
      id: "lead_1",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      company: "Acme",
      inquiryType: "support",
      message: "Need help with onboarding.",
      createdAt: new Date("2026-03-01T00:00:00.000Z"),
    });

    const formData = new FormData();
    formData.set("firstName", "Jane");
    formData.set("lastName", "Doe");
    formData.set("email", "jane@example.com");
    formData.set("company", "Acme");
    formData.set("inquiryType", "support");
    formData.set("message", "Need help with onboarding.");

    const result = await submitContactForm(formData);

    expect(result).toEqual({
      success: true,
      message: "Thanks! Our team will reach out shortly.",
    });
    expect(prisma.contactLead.create).toHaveBeenCalledOnce();
  });
});
