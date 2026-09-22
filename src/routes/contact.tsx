import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone } from "lucide-react";
import { submitContact } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Digital Squad" },
      { name: "description", content: "Get in touch with Digital Squad. We are ready to listen, consult, achieve and deliver on time." },
      { property: "og:title", content: "Contact — Digital Squad" },
      { property: "og:description", content: "Get in touch with Digital Squad. We are ready to listen, consult, achieve and deliver on time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

function ContactPage() {
  const sendMessage = useServerFn(submitContact);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await sendMessage({ data });
      toast.success("Thank you! Your message has been sent.");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <section className="bg-[#1a1a2e] py-20 text-white lg:py-28">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="section-title text-4xl lg:text-5xl">Get In Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">Have a project in mind? We would love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f14836]/10 text-[#f14836]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Address</h3>
                <p className="mt-1 text-sm text-muted-foreground">Bd Mohamed zaf zaf<br />Im 14 appt RDC CASABLANCA</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f14836]/10 text-[#f14836]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Email</h3>
                <p className="mt-1 text-sm text-muted-foreground">contact@digitalsquad.ma</p>
                <p className="text-sm text-muted-foreground">recrutement@digitalsquad.ma</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f14836]/10 text-[#f14836]">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Phone</h3>
                <p className="mt-1 text-sm text-muted-foreground">+212 522 71 40 06</p>
                <p className="text-sm text-muted-foreground">+212 625 29 18 97</p>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-white p-8 shadow-sm lg:p-12">
            <h2 className="section-title text-2xl">Leave a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Full Name" {...register("name")} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="Email" {...register("email")} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" rows={5} placeholder="Enter your message..." {...register("message")} />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#f14836] text-white hover:bg-[#f14836]/90"
                >
                  {isSubmitting ? "Sending..." : "Send Now"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
