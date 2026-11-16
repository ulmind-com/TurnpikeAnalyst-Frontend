import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@turnpike/shared/components/ui/dialog";
import { Button } from "@turnpike/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@turnpike/shared/components/ui/form";
import { Input } from "@turnpike/shared/components/ui/input";
import { Textarea } from "@turnpike/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@turnpike/shared/components/ui/select";
import { useBookCall } from "@turnpike/shared/hooks/use-public-api";
import { Consultant } from "@turnpike/shared/api/services/consultants.api";

const schema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone is required"),
  company: z.string().min(2, "Company is required"),
  department: z.string(),
  message: z.string().min(10, "Please provide more details"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultant?: Consultant;
}

export function BookCallDialog({ open, onOpenChange, consultant }: Props) {
  const bookCall = useBookCall();
  const [success, setSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      company: "",
      department: "CONSULTING",
      message: consultant ? `I would like to book a slot with ${consultant.name}.` : "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await bookCall.mutateAsync({
        ...data,
        subject: consultant ? `Booking with ${consultant.name}` : "General Booking",
      });
      setSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        form.reset();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) setSuccess(false);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book a Slot</DialogTitle>
          <DialogDescription>
            {consultant ? `Book a consultation with ${consultant.name}.` : "Schedule a call with our team."}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center text-success">
            <h3 className="text-xl font-medium mb-2">Request Sent!</h3>
            <p className="text-sm text-muted-foreground">We will be in touch shortly to confirm your slot.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message / Topic</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What would you like to discuss?" className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={bookCall.isPending}>
                  {bookCall.isPending ? "Sending..." : "Request Slot"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
