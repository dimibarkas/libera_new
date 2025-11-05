import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToInput(date: Date | string | null | undefined) {
  if (!date) return "";
  const parsed = typeof date === "string" ? new Date(date) : date;
  return parsed.toISOString().split("T")[0];
}

export function formatDisplayDate(date: Date | string | null | undefined) {
  if (!date) return "";
  const parsed = typeof date === "string" ? new Date(date) : date;
  return parsed.toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

export type ApiError = {
  message: string;
  status?: number;
};

export function getErrorMessage(error: unknown): ApiError {
  if (error instanceof Error) {
    return { message: error.message };
  }
  if (typeof error === "string") {
    return { message: error };
  }
  return { message: "Unbekannter Fehler" };
}
