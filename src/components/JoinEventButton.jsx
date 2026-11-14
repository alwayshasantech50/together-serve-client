"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

const JoinEventButton = ({ eventId, eventDate }) => {
  const {
    data: session,
    isPending,
    error: sessionError,
  } = authClient.useSession();

  const [joined, setJoined] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkError, setCheckError] = useState("");

  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    let active = true;

    const checkParticipation = async () => {
      setChecking(true);
      setCheckError("");

      try {
        const headers = await getAuthHeaders();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/events/${eventId}/join-status`,
          {
            headers,
            cache: "no-store",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to check participation.");
        }

        if (active) {
          setJoined(data.joined);
        }
      } catch (error) {
        if (active) {
          setCheckError(error.message || "Unable to check participation.");
        }
      } finally {
        if (active) {
          setChecking(false);
        }
      }
    };

    checkParticipation();

    return () => {
      active = false;
    };
  }, [eventId, userId]);

  const handleJoin = async () => {
    if (loading || joined) {
      return;
    }

    setLoading(true);

    try {
      const headers = await getAuthHeaders();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/events/${eventId}/join`,
        {
          method: "POST",
          headers,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setJoined(true);
        }

        toast.error(data.message || "Unable to join the event.");
        return;
      }

      setJoined(true);
      toast.success("You joined the event successfully!");
    } catch (error) {
      toast.error(error.message || "Unable to join the event.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <p>Checking your login...</p>;
  }

  if (sessionError || checkError) {
    return (
      <div>
        <p>Unable to check your account or participation.</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn btn-outline mt-3 rounded-full"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (new Date(eventDate) <= new Date()) {
    return (
      <button type="button" disabled className="btn rounded-full">
        Event has started
      </button>
    );
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="btn rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
      >
        Login to Join
      </Link>
    );
  }

  if (checking) {
    return <p>Checking your participation...</p>;
  }

  if (joined) {
    return (
      <div>
        <button type="button" disabled className="btn rounded-full">
          Already Joined
        </button>

        <Link
          href="/joined-events"
          className="mt-3 block font-semibold text-green-600"
        >
          View my joined events →
        </Link>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleJoin}
      disabled={loading}
      className="btn rounded-full border-0 bg-green-700 px-8 text-white hover:bg-green-800"
    >
      {loading ? "Joining..." : "Join Event"}
    </button>
  );
};

export default JoinEventButton;
