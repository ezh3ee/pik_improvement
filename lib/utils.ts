import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataObjectToFormData(data: Record<string, string>) {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return formData;
}
