"use client";

import { authClient } from "@/lib/auth-client";


export const getAuthHeaders = async () => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Please login to continue.");
  }

  return {
    Authorization: `Bearer ${data.token}`,
  };
};