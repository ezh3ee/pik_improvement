"use client";

import { START_DASHBOARD_URL } from "@/lib/redirect-urls";
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect(START_DASHBOARD_URL);
}
