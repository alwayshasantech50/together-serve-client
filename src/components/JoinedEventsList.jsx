"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

const JoinedEventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadJoinedEvents = async () => {
      try {
        const headers = await getAuthHeaders();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/joined-events`,
          {
            headers,
            cache: "no-store",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load joined events.");
        }

        if (active) {
          setEvents(data);
        }
      } catch (error) {
        if (active) {
          setError(error.message || "Unable to load joined events.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadJoinedEvents();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div role="status" className="py-10 text-center">
        <span className="loading loading-spinner loading-lg" />
        <p className="mt-4">Loading your joined events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="rounded-2xl bg-base-200 p-8 text-center">
        <p>{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn btn-outline mt-5 rounded-full"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-2xl bg-base-200 p-8 text-center">
        <h2 className="text-xl font-bold">You haven’t joined any events yet</h2>

        <p className="mt-3 leading-7">
          Find a cause you care about and take your first step.
        </p>

        <Link
          href="/upcoming-events"
          className="btn mt-6 rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
        >
          Explore Events
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default JoinedEventsList;
