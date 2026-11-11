"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import GoogleLogin from "@/components/GoogleLogin";


const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const form = event.currentTarget;

    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed.");
        return;
      }

      toast.success("Logged in successfully!");

      router.push("/");
    } catch {
      toast.error("Unable to login. Please try again.");
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
            Welcome back
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Your community is better with you.
          </h1>

          <p className="mt-6 leading-8 text-green-100">
            Sign in to join meaningful events, support local causes,
            and keep making a difference.
          </p>

          <p className="mt-8 text-sm text-green-100">
            Small actions. Stronger communities.
          </p>
        </div>

        <div className="bg-base-200 p-8 lg:p-12">
          <h2 className="text-3xl font-bold">Login</h2>

          <p className="mt-3 text-sm leading-7">
            Continue your journey with TogetherServe.
          </p>

          <form onSubmit={handleLogin} className="mt-8">
            <fieldset disabled={loading} className="space-y-5">
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
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="input w-full"
                />
              </div>

              <button
                type="submit"
                className="btn w-full rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </fieldset>
          </form>


          <div className="divider my-6">OR</div>

          <GoogleLogin />


          <p className="mt-6 text-center text-sm">
            New to TogetherServe?{" "}
            <Link
              href="/register"
              className="font-semibold text-green-600 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;