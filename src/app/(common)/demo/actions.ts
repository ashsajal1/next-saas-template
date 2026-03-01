"use server";

import * as Sentry from "@sentry/nextjs";
import { headers } from "next/headers";

import prisma from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendLeadNotification } from "@/lib/resend";
import { demoLeadSchema } from "@/lib/validation/leads";

interface FormResult {
  message: string;
  success: boolean;
}

export async function submitDemoRequest(formData: FormData): Promise<FormResult> {
  const ipAddress =
    headers().get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const rateLimit = await checkRateLimit(`demo:${ipAddress}`);

  if (!rateLimit.success) {
    return {
      success: false,
      message: "Too many requests. Please wait a few minutes and try again.",
    };
  }

  const payload = demoLeadSchema.safeParse({
    firstName: String(formData.get("firstName") || ""),
    lastName: String(formData.get("lastName") || ""),
    workEmail: String(formData.get("workEmail") || ""),
    company: String(formData.get("company") || ""),
    teamSize: String(formData.get("teamSize") || ""),
    useCase: String(formData.get("useCase") || ""),
    timezone: String(formData.get("timezone") || ""),
    preferredDateTime: String(formData.get("preferredDateTime") || ""),
    recordDemo: String(formData.get("recordDemo") || "").trim() === "yes",
  });

  if (!payload.success) {
    return {
      success: false,
      message: payload.error.issues[0]?.message || "Invalid form submission.",
    };
  }

  const {
    firstName,
    lastName,
    workEmail,
    company,
    teamSize,
    useCase,
    timezone,
    preferredDateTime,
    recordDemo,
  } = payload.data;

  const parsedDate = preferredDateTime ? new Date(preferredDateTime) : null;
  const validPreferredDate =
    parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null;

  try {
    await prisma.demoLead.create({
      data: {
        firstName,
        lastName,
        workEmail,
        company,
        teamSize,
        useCase,
        timezone,
        preferredDateTime: validPreferredDate,
        recordDemo,
      },
    });

    await sendLeadNotification({
      title: "New Demo Lead",
      details: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${workEmail}`,
        `Company: ${company}`,
        `Team Size: ${teamSize}`,
        `Use Case: ${useCase}`,
        `Timezone: ${timezone}`,
        `Preferred Date: ${preferredDateTime || "-"}`,
        `Record Demo: ${recordDemo ? "yes" : "no"}`,
      ].join("\n"),
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Failed to persist demo lead:", error);
    return {
      success: false,
      message: "Unable to submit right now. Please try again shortly.",
    };
  }

  return {
    success: true,
    message: "Demo request received. We will email scheduling options soon.",
  };
}
