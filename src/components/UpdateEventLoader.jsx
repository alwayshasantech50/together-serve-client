"use client";

import { useEffect, useState } from "react";
import CreateEventForm from "@/components/CreateEventForm";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

const UpdateEventLoader = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadEvent = async () => {
      try {
        const headers = await getAuthHeaders();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/manage-events/${eventId}`,
          {
            headers,
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load this event.");
        }

        if (active) {
          setEvent(data);
        }
      } catch (error) {
        if (active) {
          setError(error.message || "Unable to load this event.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadEvent();

    return () => {
      active = false;
    };
  }, [eventId]);

  if (loading) {
    return (
      <section role="status" className="px-6 py-16 text-center">
        <span className="loading loading-spinner loading-lg" />
        <p className="mt-4">Loading your event...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section role="alert" className="px-6 py-16 text-center">
        <p>{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn btn-outline mt-5 rounded-full"
        >
          Try Again
        </button>
      </section>
    );
  }

  return <CreateEventForm initialEvent={event} />;
};

export default UpdateEventLoader;