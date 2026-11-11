"use client";


import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";


const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/auth-success`,
        errorCallbackURL: `${window.location.origin}/login`,
      });

      if (error) {
        toast.error(error.message || "Google login failed.");
      }
    } catch {
      toast.error("Unable to connect to Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="btn btn-outline w-full rounded-full"
    >
      {loading ? "Connecting to Google..." : "Continue with Google"}
    </button>
  );
};

export default GoogleLogin;