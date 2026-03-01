import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const notificationEmail = process.env.LEADS_NOTIFICATION_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface LeadNotificationInput {
  details: string;
  title: string;
}

export async function sendLeadNotification({
  title,
  details,
}: LeadNotificationInput): Promise<void> {
  if (!resend || !notificationEmail) {
    return;
  }

  await resend.emails.send({
    from: fromEmail,
    to: notificationEmail,
    subject: title,
    text: details,
  });
}
