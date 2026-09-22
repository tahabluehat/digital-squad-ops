import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  company: z.string().optional(),
  interest: z.string().optional(),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const supabaseUrl = process.env["VITE_SUPABASE_URL"];
    const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Backend is not configured for contact submissions.");
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const details = [
      data.company ? `Company: ${data.company}` : null,
      data.interest ? `Area of interest: ${data.interest}` : null,
    ].filter(Boolean);

    const message = details.length
      ? `${details.join("\n")}\n\n${data.message}`
      : data.message;

    const { error } = await admin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message,
    });

    if (error) {
      console.error("Contact submission error:", error);
      throw new Error("Failed to send your message. Please try again later.");
    }

    return { success: true };
  });
