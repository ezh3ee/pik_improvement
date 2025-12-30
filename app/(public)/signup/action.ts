"use server";
import { auth } from "@/lib/auth";
import { getAuthErrorMessage } from "@/lib/auth-errors-map";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import z from "zod";
import { SignupSchema } from "./schema";
// import { SignupSchema } from "./schema";

export type SignupFormState = {
  errors: {
    email?: string[];
    password?: string[];
    username?: string[];
    position?: string[];
    name?: string[];
    surname?: string[];
    patronymic?: string[];
  };
  message: string | null;
  success: boolean;
};

export async function signupAction(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = SignupSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log(
      "ERROR from signup action validation:  ",
      validatedFields.error
    );
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Ошибки при заполнении данных",
      success: false,
    };
  }

  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        username: validatedFields.data.username,
        name: validatedFields.data.name,
        positionId: validatedFields.data.position,
        surname: validatedFields.data.surname,
        patronymic: validatedFields.data?.patronymic || "",
      },
    });

    console.log("from signup action ", user);
  } catch (error) {
    console.log("ERROR from signup action ", error);

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
    message: "Successfully created account",
    success: true,
  };
}
