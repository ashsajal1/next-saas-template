"use server";

import * as Sentry from "@sentry/nextjs";
import { headers } from "next/headers";

import prisma from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendLeadNotification } from "@/lib/resend";
import { contactLeadSchema } from "@/lib/validation/leads";

interface FormResult {
  message: string;
  success: boolean;
}

export async function submitContactForm(formData: FormData): Promise<FormResult> {
  const ipAddress =
    headers().get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const rateLimit = await checkRateLimit(`contact:${ipAddress}`);

  if (!rateLimit.success) {
    return {
      success: false,
      message: "Too many requests. Please wait a few minutes and try again.",
    };
  }

  const payload = contactLeadSchema.safeParse({
    firstName: String(formData.get("firstName") || ""),
    lastName: String(formData.get("lastName") || ""),
    email: String(formData.get("email") || ""),
    company: String(formData.get("company") || ""),
    inquiryType: String(formData.get("inquiryType") || ""),
    message: String(formData.get("message") || ""),
  });

  if (!payload.success) {
    return {
      success: false,
      message: payload.error.issues[0]?.message || "Invalid form submission.",
    };
  }

  const { firstName, lastName, email, company, inquiryType, message } =
    payload.data;

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

    await sendLeadNotification({
      title: "New Contact Lead",
      details: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Company: ${company || "-"}`,
        `Inquiry Type: ${inquiryType || "-"}`,
        `Message: ${message}`,
      ].join("\n"),
    });
  } catch (error) {
    Sentry.captureException(error);
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
