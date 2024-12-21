"use server";

import { signupFormSchema } from "@/utils/signup-formSchema";
import { parseWithZod } from "@conform-to/zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signupAction(previousUrl: any, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signupFormSchema,
  });

  console.log(submission);

  if (submission.status !== "success") {
    return submission.reply();
  }

  // return submission.reply();

  return {
    ...previousUrl,
    ...submission.reply(),
    status: "error",
    error: ["Failed to submit the form. Please try again."],
  };
}
