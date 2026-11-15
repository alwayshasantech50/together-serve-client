"use client";

import Image from "next/image";
import { useState } from "react";
import { UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const ProfileDetails = () => {
  const { data: session, isPending, error, refetch } =
    authClient.useSession();

  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const form = event.currentTarget;

    const name = form.elements.fullName.value.trim();
    const photoURL = form.elements.photoURL.value.trim();

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

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        image: photoURL,
      });

      if (error) {
        toast.error(error.message || "Unable to update your profile.");
        return;
      }

      toast.success("Profile updated successfully!");

      // Refresh the saved profile and navbar information.
      await refetch();
    } catch {
      toast.error("Unable to complete the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div role="status" className="py-10 text-center">
        <span className="loading loading-spinner loading-lg" />
        <p className="mt-4">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="rounded-2xl bg-base-200 p-8 text-center">
        <p>Unable to load your profile.</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="btn btn-outline mt-5 rounded-full"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Saved profile information */}
      <div className="rounded-3xl border border-base-300 bg-base-200 p-6 text-center">
        <div className="mx-auto flex size-28 items-center justify-center overflow-hidden rounded-full border border-base-300 bg-base-100">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={112}
              height={112}
              unoptimized
              className="size-28 object-cover"
            />
          ) : (
            <UserRound size={48} className="text-green-600" />
          )}
        </div>

        <h2 className="mt-5 break-words text-xl font-bold">
          {user.name}
        </h2>

        <p className="mt-2 break-words text-sm">
          {user.email}
        </p>

        <p className="mt-6 text-sm leading-7">
          Small actions. Stronger communities.
        </p>
      </div>

      {/* Profile editing form */}
      <div className="rounded-3xl border border-base-300 bg-base-200 p-6 sm:p-8 md:col-span-2">
        <h2 className="text-2xl font-bold">Edit your profile</h2>

        <p className="mt-3 text-sm leading-7">
          Update the name and photo shown on your TogetherServe account.
        </p>

        <form onSubmit={handleUpdateProfile} className="mt-6">
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
                defaultValue={user.name}
                placeholder="Enter your full name"
                required
                className="input w-full"
              />
            </div>

            <div>
              <label
                htmlFor="profileEmail"
                className="mb-2 block text-sm font-medium"
              >
                Email address
              </label>

              <input
                id="profileEmail"
                type="email"
                value={user.email}
                readOnly
                aria-describedby="email-help"
                className="input w-full"
              />

              <p id="email-help" className="mt-2 text-xs leading-6">
                Your email address cannot be changed here.
              </p>
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
                defaultValue={user.image || ""}
                placeholder="https://example.com/photo.jpg"
                aria-describedby="photo-help"
                required
                className="input w-full"
              />

              <p id="photo-help" className="mt-2 text-xs leading-6">
                Use a direct image URL that opens without requiring login.
              </p>
            </div>

            <button
              type="submit"
              className="btn rounded-full border-0 bg-green-700 px-7 text-white hover:bg-green-800"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;