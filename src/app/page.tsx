"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PasswordInput } from "@/components/ui/password-input";
import { useActionState, useEffect } from "react";
import { signupAction } from "@/server-action/sigup-action";
import { signupFormSchema } from "@/utils/signup-formSchema";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Signup() {
  const [lastResult, action] = useActionState(signupAction, undefined);

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupFormSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (lastResult?.error?.length > 0) {
      alert(lastResult?.error[0]);
    }
  }, [lastResult?.error]);

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Please enter your details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            className="space-y-4 max-w-3xl mx-auto py-10"
            noValidate
          >
            <div>
              <Label htmlFor={fields.email.id}>Email</Label>

              <Input
                placeholder="Enter your email"
                id={fields.email.id}
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={
                  (lastResult?.initialValue?.email as string) ||
                  (fields.email.initialValue as string)
                }
              />

              <p
                className="text-sm p-1.5 text-red-500 dark:text-red-500"
                id={fields.email.id}
              >
                {fields.email.errors}
              </p>
            </div>

            <div>
              <Label htmlFor={fields.username.id}>Username</Label>

              <Input
                placeholder="Enter your username"
                id={fields.username.id}
                key={fields.username.key}
                name={fields.username.name}
                defaultValue={
                  lastResult?.initialValue?.username ||
                  (fields.username.initialValue as string)
                }
              />

              <p
                className="text-sm p-1.5 text-red-500 dark:text-red-500"
                id={fields.username.id}
              >
                {fields.username.errors}
              </p>
            </div>
            <div>
              <Label htmlFor={fields.password.id}>Password</Label>

              <PasswordInput
                placeholder="Enter your password"
                id={fields.password.id}
                key={fields.password.key}
                name={fields.password.name}
                defaultValue={
                  lastResult?.initialValue?.password ||
                  (fields.password.initialValue as string)
                }
              />

              <p
                className="text-sm p-1.5 text-red-500 dark:text-red-500"
                id={fields.password.id}
              >
                {fields.password.errors}
              </p>
            </div>

            <div>
              <Label htmlFor={fields.description.id}>Description</Label>

              <Textarea
                placeholder="Enter your description"
                className="resize-none"
                id={fields.description.id}
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={
                  lastResult?.initialValue?.description ||
                  (fields.description.initialValue as string)
                }
              />

              <p
                className="text-sm p-1.5 text-red-500 dark:text-red-500"
                id={fields.description.id}
              >
                {fields.description.errors}
              </p>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
