"use server";
import { auth } from "@/lib/auth";
import { getAuthErrorMessage } from "@/lib/auth-errors-map";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { z } from "zod";

const SigninSchema = z.object({
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
  username: z.string(),
});

export type SigninFormState = {
  errors: {
    password?: string[];
    username?: string[];
  };
  message: string | null;
  success: boolean;
};

export async function signinAction(
  state: SigninFormState,
  formData: FormData
): Promise<SigninFormState> {
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
