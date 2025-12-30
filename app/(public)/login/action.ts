"use server";
import { auth } from "@/lib/auth";
import { getAuthErrorMessage } from "@/lib/auth-errors-map";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SigninSchema } from "./schema";

export type signinFormState = {
  errors: {
    password?: string[];
    username?: string[];
  };
  message: string | null;
  success: boolean;
};

export async function signinAction(
  state: signinFormState,
  formData: FormData
): Promise<signinFormState> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = SigninSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Ошибки при заполнении",
      success: false,
    };
  }

  try {
    await auth.api.signInUsername({
      body: {
        password: validatedFields.data.password,
        username: validatedFields.data.username,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.log("ERROR ", error.message, error.status);

      return {
        errors: {},
        message: getAuthErrorMessage(error),
        success: false,
      };
    }

    throw error;
  }

  redirect("/");

  return {
    errors: {},
    message: "Successfully signed in",
    success: true,
  };
}
