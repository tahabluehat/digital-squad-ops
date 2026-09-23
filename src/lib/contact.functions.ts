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
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { sendContactEmail } = await import("./contact.server");
      await sendContactEmail({
        name: data.name,
        email: data.email,
        message: data.message,
        company: data.company,
        interest: data.interest,
      });
    } catch (mailError) {
      console.error("Contact email error:", mailError);
      throw new Error(
        "We could not send your message. Please try again or email contact@digitalsquad.ma.",
      );
    }

    return { success: true };
  });
