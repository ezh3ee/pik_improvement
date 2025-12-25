import { auth } from "@/lib/auth";
import { log } from "console";
import { redirect } from "next/navigation";
import { z } from "zod";

const SigninSchema = z.object({
  password: z.string().min(8),
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
      message: "Missing Fields. Failed to login.",
      success: false,
    };
  }

  try {
    const user = await auth.api.signInUsername({
      body: {
        password: validatedFields.data.password,
        username: validatedFields.data.username,
      },
    });

    log("from signin action ", user);
  } catch (e) {
    log("ERROR from signin action ", e);

    return {
      errors: {},
      message: "Cannot sign in. Please try again later." + e,
      success: false,
    };
  }

  redirect("/");

  return {
    errors: {},
    message: "Successfully signed in",
    success: true,
  };
}
