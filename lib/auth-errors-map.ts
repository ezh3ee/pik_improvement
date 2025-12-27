import { APIError } from "better-auth";

export const AUTH_ERRORS_MAP: Record<string, string> = {
  UNAUTHORIZED: "Неверное имя пользователя или пароль",
  UNPROCESSABLE_ENTITY: "Недопустимое имя пользователя",
};

export function getAuthErrorMessage(error: APIError) {
  return AUTH_ERRORS_MAP[error.status] || "Неизвестная ошибка";
}
