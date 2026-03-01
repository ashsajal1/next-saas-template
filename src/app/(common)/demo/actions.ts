"use server";

interface FormResult {
  message: string;
  success: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitDemoRequest(formData: FormData): Promise<FormResult> {
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const workEmail = String(formData.get("workEmail") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const teamSize = String(formData.get("teamSize") || "").trim();
  const useCase = String(formData.get("useCase") || "").trim();
  const timezone = String(formData.get("timezone") || "").trim();
  const preferredDateTime = String(formData.get("preferredDateTime") || "").trim();
  const recordDemo = String(formData.get("recordDemo") || "").trim() === "yes";

  if (!firstName || !lastName || !workEmail || !company || !teamSize || !useCase || !timezone) {
    return {
      success: false,
      message: "Please complete all required fields to book your demo.",
    };
  }

  if (!EMAIL_REGEX.test(workEmail)) {
    return {
      success: false,
      message: "Please provide a valid work email address.",
    };
  }

  console.info("Demo request submission", {
    firstName,
    lastName,
    workEmail,
    company,
    teamSize,
    useCase,
    timezone,
    preferredDateTime,
    recordDemo,
  });

  return {
    success: true,
    message: "Demo request received. We will email scheduling options soon.",
  };
}
