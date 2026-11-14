"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UserMenu = () => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending, error, refetch } = authClient.useSession();

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed.");
        return;
      }

      toast.success("Logged out successfully!");

      router.push("/");
    } catch {
      toast.error("Unable to logout. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <div role="status" className="flex items-center gap-2">
        <span className="loading loading-spinner loading-sm" />
        <span className="text-sm">Checking account...</span>
      </div>
    );
  }

  if (error) {
    return (
      <button
        type="button"
        onClick={() => refetch()}
        className="btn btn-ghost btn-sm"
      >
        Retry account check
      </button>
    );
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="btn rounded-full border-0 bg-green-700 px-6 text-white hover:bg-green-800"
      >
        Login
      </Link>
    );
  }

  const user = session.user;

  return (
    <div className="flex items-center gap-3">
      <details className="dropdown dropdown-end">
        <summary
          title={user.name}
          aria-label={`Open account menu for ${user.name}`}
          className="flex size-11 cursor-pointer list-none items-center justify-center overflow-hidden rounded-full border border-base-300 bg-base-200"
        >
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={44}
              height={44}
              unoptimized
              className="size-11 object-cover"
            />
          ) : (
            <UserRound size={23} />
          )}
        </summary>

        <div className="dropdown-content z-50 mt-3 w-60 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-lg">
          <p className="break-words font-semibold">{user.name}</p>

          <p className="mt-1 break-words text-sm">{user.email}</p>

          <div className="mt-4 border-t border-base-300 pt-3">
            <Link
              href="/create-event"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-base-200"
            >
              Create Event
            </Link>
            <Link
              href="/joined-events"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-base-200"
            >
              Joined Events
            </Link>
          </div>
        </div>
      </details>

      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className="btn btn-outline rounded-full"
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default UserMenu;
