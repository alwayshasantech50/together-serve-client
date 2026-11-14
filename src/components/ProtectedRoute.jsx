"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  const { data: session, isPending, error, refetch } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !error && !session) {
      router.replace("/login");
    }
  }, [session, isPending, error, router]);

  if (error) {
    return (
      <section className="px-6 py-16 text-center">
        <p>Unable to check your login. Please try again.</p>

        <button type="button" onClick={() => refetch()} className="btn mt-5">
          Try Again
        </button>
      </section>
    );
  }

  if (isPending || !session) {
    return (
      <section className="px-6 py-16 text-center">
        <span className="loading loading-spinner loading-lg" />
        <p className="mt-4">Checking your login...</p>
      </section>
    );
  }

  return children;
};

export default ProtectedRoute;
