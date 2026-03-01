"use server";

import prisma from "@/lib/prisma";

interface FormResult {
  message: string;
  success: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(formData: FormData): Promise<FormResult> {
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const inquiryType = String(formData.get("inquiryType") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!firstName || !lastName || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields before submitting.",
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    };
  }

  try {
    await prisma.contactLead.create({
      data: {
        firstName,
        lastName,
        email,
        company: company || null,
        inquiryType: inquiryType || null,
        message,
      },
    });
  } catch (error) {
    console.error("Failed to persist contact lead:", error);
    return {
      success: false,
      message: "Unable to submit right now. Please try again shortly.",
    };
  }

  return {
    success: true,
    message: "Thanks! Our team will reach out shortly.",
  };
}
