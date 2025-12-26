"use server";
import { auth } from "@/lib/auth";
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
    const user = await auth.api.signInUsername({
      body: {
        password: validatedFields.data.password,
        username: validatedFields.data.username,
      },
    });

    console.log("from signin action ", user);
  } catch (error) {
    // if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // console.error("Prisma Client Known Request Error: ", e.code);
    // if (e.code === "P2002") {
    //   // Unique constraint violation
    //   console.error("Error: Email already exists.");
    //   return {
    //     errors: {},
    //     message: "Email already exists.",
    //     success: false,
    //   };
    // } else {
    //   console.error("Prisma Client Known Request Error:", error.message);
    //   return {
    //     errors: {},
    //     message: "Error creating user: " + error.message,
    //     success: false,
    //   };
    // }
    // }

    if (error instanceof APIError) {
      console.log("ERROR ", error.message, error.status);

      if (error.status === "UNAUTHORIZED") {
        return {
          errors: {},
          message: "Неверное имя пользователя или пароль",
          success: false,
        };
      }

      if (error.status === "UNPROCESSABLE_ENTITY") {
        return {
          errors: {},
          message: "Недопустимое имя пользователя",
          success: false,
        };
      }

      return {
        errors: {},
        message: "Cannot sign in. Please try again later." + error,
        success: false,
      };
    }
  }

  redirect("/");

  return {
    errors: {},
    message: "Successfully signed in",
    success: true,
  };
}
