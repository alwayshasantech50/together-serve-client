"use client";

import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";


export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,

  fetchOptions: {
    credentials: "include",
  },

  plugins: [jwtClient()],
});