"use client";


import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import GoogleLogin from "@/components/GoogleLogin";


const RegisterPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();

        if (loading) {
            return;
        }


        const form = event.currentTarget;

        const name = form.elements.fullName.value.trim();
        const email = form.elements.email.value.trim();
        const photoURL = form.elements.photoURL.value.trim();
        const password = form.elements.password.value;

        if (!name) {
            toast.error("Please enter your name.");
            return;
        }

        if (
            !photoURL.startsWith("https://") &&
            !photoURL.startsWith("http://")
        ) {
            toast.error("Photo URL must start with http:// or https://.");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must have at least 6 characters.");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain an uppercase letter.");
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain a lowercase letter.");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.signUp.email({
                name,
                email,
                image: photoURL,
                password,
            });

            if (error) {
                toast.error(error.message || "Registration failed.");
                return;
            }

            toast.success("Account created successfully!");

            router.push("/");
        } catch {
            toast.error("Unable to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
            <div className="grid overflow-hidden rounded-3xl border border-base-300 md:grid-cols-2">

                <div className="flex flex-col justify-center bg-green-800 p-8 text-white lg:p-12">
                    <HeartHandshake size={44} />

                    <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-lime-300">
                        Welcome to TogetherServe
                    </p>

                    <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                        Your next chapter starts with a little kindness.
                    </h1>

                    <p className="mt-6 leading-8 text-green-100">
                        Join local causes, meet people who care, and help create
                        a stronger community.
                    </p>

                    <p className="mt-8 text-sm text-green-100">
                        Small actions. Stronger communities.
                    </p>
                </div>



                <div className="bg-base-200 p-8 lg:p-12">
                    <h2 className="text-3xl font-bold">Create an account</h2>

                    <p className="mt-3 text-sm leading-7">
                        Find your community. Start making a difference.
                    </p>

                    <form onSubmit={handleRegister} className="mt-8">
                        <fieldset disabled={loading} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Full name
                                </label>

                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                    required
                                    className="input w-full"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Enter your email"
                                    required
                                    className="input w-full"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="photoURL"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Photo URL
                                </label>

                                <input
                                    id="photoURL"
                                    name="photoURL"
                                    type="url"
                                    placeholder="https://example.com/photo.jpg"
                                    required
                                    className="input w-full"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Create a password"
                                    maxLength={128}
                                    aria-describedby="password-help"
                                    required
                                    className="input w-full"
                                />

                                <p
                                    id="password-help"
                                    className="mt-2 text-xs leading-6"
                                >
                                    Use at least 6 characters, including an uppercase
                                    and a lowercase letter.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="btn w-full rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
                            >
                                {loading ? "Creating account..." : "Create Account"}
                            </button>
                        </fieldset>
                    </form>

                    <div className="divider my-6">OR</div>

                    <GoogleLogin />

                    <p className="mt-6 text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-green-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;