import { describe, expect, it, vi } from "vitest";

import { submitContactForm } from "@/app/(common)/contact/actions";

describe("submitContactForm", () => {
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
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

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
    expect(infoSpy).toHaveBeenCalledOnce();
    infoSpy.mockRestore();
  });
});
