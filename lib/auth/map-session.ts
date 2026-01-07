import { AppUser } from "@/lib/auth/types/app-user";

type SessionUserInput = {
  id: string;
  email: string;
  name: string;
  surname: string;
  username?: string | null;
  patronymic?: string | null;
  role?: string | null;
  active: boolean | null;
};

export function mapSession(user: SessionUserInput): AppUser {
  if (!user.username) throw new Error("Username is not defined");
  if (!user.role) throw new Error("Role is not defined");
  if (user.active === null) throw new Error("Active is not defined");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    surname: user.surname,
    username: user.username,
    patronymic: user.patronymic ?? "",
    role: user.role,
    active: user.active,
  };
}
