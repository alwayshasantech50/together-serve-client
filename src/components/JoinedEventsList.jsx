"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EventCard from "@/components/EventCard";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

const JoinedEventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [confirmId, setConfirmId] = useState("");
  const [cancellingId, setCancellingId] = useState("");

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

  const handleCancelParticipation = async (id) => {
    if (cancellingId) {
      return;
    }

    setCancellingId(id);

    try {
      const headers = await getAuthHeaders();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/events/${id}/join`,
        {
          method: "DELETE",
          headers,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Unable to cancel participation.");
        return;
      }

      // Remove the cancelled event from this user's list.
      setEvents((currentEvents) =>
        currentEvents.filter((event) => event._id !== id),
      );

      setConfirmId("");

      toast.success("Participation cancelled successfully!");
    } catch (error) {
      toast.error(error.message || "Unable to cancel participation.");
    } finally {
      setCancellingId("");
    }
  };

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
        <h2 className="text-xl font-bold">You have no joined events</h2>

        <p className="mt-3 leading-7">
          Find a cause you care about and take your next step.
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
        <div key={event._id} className="flex h-full flex-col">
          <div className="flex-1">
            <EventCard event={event} />
          </div>

          <div className="mt-3 rounded-2xl border border-base-300 bg-base-200 p-4">
            {confirmId === event._id ? (
              <div>
                <p className="text-sm font-medium">
                  Cancel your participation in this event?
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmId("")}
                    disabled={Boolean(cancellingId)}
                    className="btn btn-sm rounded-full"
                  >
                    Keep My Place
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCancelParticipation(event._id)}
                    disabled={Boolean(cancellingId)}
                    className="btn btn-error btn-sm rounded-full"
                  >
                    {cancellingId === event._id
                      ? "Cancelling..."
                      : "Yes, Cancel"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmId(event._id)}
                disabled={Boolean(cancellingId)}
                className="btn btn-outline btn-error w-full rounded-full"
              >
                Cancel Participation
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinedEventsList;
