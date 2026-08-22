import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/button";
import { Input } from "../components/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/form";

const meta: Meta = {
  title: "Forms/Form",
  parameters: { layout: "centered" },
};

export default meta;

const schema = z.object({ name: z.string().min(2, "Must be at least 2 characters.") });

type FormValues = z.infer<typeof schema>;

export const Overview: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { name: "" },
    });
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="w-80 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ada Lovelace" {...field} />
                </FormControl>
                <FormDescription>Field wired through react-hook-form.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};