"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@ynvrs/ui";

const VALID_EMAIL = "admin@admin.com";
const VALID_PASSWORD = "admin";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate network latency so the prototype feels real.
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        toast.success("Login successful", { description: "Redirecting to dashboard…" });
        router.push("/auth/dashboard");
      } else {
        toast.error("Login failed", { description: "Invalid email or password." });
        setIsSubmitting(false);
      }
    }, 600);
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Welcome back. Sign in to continue.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="mt-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
