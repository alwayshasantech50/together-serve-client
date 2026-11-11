"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";


const AuthSuccessPage = () => {
    const router = useRouter();

    const {
        data: session,
        isPending,
        error,
    } = authClient.useSession();

    useEffect(() => {
        if (session && !error) {
            toast.success("Logged in with Google successfully!", {
                id: "google-login-success",
            });

            router.replace("/");
        }
    }, [session, error, router]);

    if (isPending) {
        return (
            <section className="px-6 py-20 text-center">
                <span className="loading loading-spinner loading-lg" />
                <p className="mt-4">Checking your login...</p>
            </section>
        );
    }

    if (error || !session) {
        return (
            <section className="px-6 py-20 text-center">
                <h1 className="text-2xl font-bold">
                    We couldn’t confirm your login.
                </h1>

                <Link
                    href="/login"
                    className="btn mt-6 rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
                >
                    Return to Login
                </Link>
            </section>
        );
    }

    return (
        <section className="px-6 py-20 text-center">
            <p>Login successful. Opening the homepage...</p>
        </section>
    );
};

export default AuthSuccessPage;