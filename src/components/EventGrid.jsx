"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";

const EventGrid = ({ limit = false }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadEvents = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/events`;

        if (limit) {
          url = `${url}?limit=6`;
        }

        const response = await fetch(url, {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load events.");
        }

        if (active) {
          setEvents(data);
        }
      } catch (error) {
        if (active) {
          setError(error.message || "Unable to load events.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      active = false;
    };
  }, [limit]);

  if (loading) {
    return (
      <div role="status" aria-label="Loading events">
        <p className="sr-only">Loading events...</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((number) => (
            <div
              key={number}
              className="overflow-hidden rounded-2xl border border-base-300"
            >
              <div className="skeleton h-56 w-full rounded-none" />

              <div className="space-y-4 p-6">
                <div className="skeleton h-5 w-24" />
                <div className="skeleton h-7 w-full" />
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-5 w-2/3" />
                <div className="skeleton h-12 w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
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
        <h3 className="text-xl font-bold">No upcoming events yet</h3>

        <p className="mt-3 leading-7">
          Check back soon for new opportunities to help your community.
        </p>
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

export default EventGrid;
