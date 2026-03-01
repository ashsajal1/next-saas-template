import { z } from "zod";

export const contactLeadSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("A valid email is required"),
  company: z.string().trim().optional(),
  inquiryType: z.string().trim().optional(),
  message: z.string().trim().min(1, "Message is required"),
});

export const demoLeadSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  workEmail: z.string().trim().email("A valid work email is required"),
  company: z.string().trim().min(1, "Company is required"),
  teamSize: z.string().trim().min(1, "Team size is required"),
  useCase: z.string().trim().min(1, "Use case is required"),
  timezone: z.string().trim().min(1, "Timezone is required"),
  preferredDateTime: z.string().trim().optional(),
  recordDemo: z.boolean().optional(),
});

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;
export type DemoLeadInput = z.infer<typeof demoLeadSchema>;
