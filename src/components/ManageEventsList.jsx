"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

const ManageEventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    let active = true;

    const loadEvents = async () => {
      try {
        const headers = await getAuthHeaders();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/manage-events`,
          {
            headers,
            cache: "no-store",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load your events.");
        }

        if (active) {
          setEvents(data);
        }
      } catch (error) {
        if (active) {
          setError(error.message || "Unable to load your events.");
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
  }, []);

  const handleDelete = async (id) => {
    if (deletingId) {
      return;
    }

    setDeletingId(id);

    try {
      const headers = await getAuthHeaders();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/events/${id}`,
        {
          method: "DELETE",
          headers,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Unable to delete this event.");
        return;
      }

      setEvents((currentEvents) =>
        currentEvents.filter((event) => event._id !== id),
      );

      setConfirmId("");
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Unable to delete this event.");
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return (
      <div role="status" className="py-10 text-center">
        <span className="loading loading-spinner loading-lg" />
        <p className="mt-4">Loading your events...</p>
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
        <h2 className="text-xl font-bold">
          You haven’t created any events yet
        </h2>

        <Link
          href="/create-event"
          className="btn mt-6 rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
        >
          Create Your First Event
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {events.map((event) => (
        <article
          key={event._id}
          className="flex flex-col rounded-2xl border border-base-300 bg-base-200 p-6"
        >
          <p className="text-sm font-semibold text-green-600">
            {event.eventType}
          </p>

          <h2 className="mt-3 text-xl font-bold">{event.title}</h2>

          <p className="mt-3">{event.location}</p>

          <p className="mt-2 text-sm">
            {new Date(event.eventDate).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link
              href={`/update-event/${event._id}`}
              className="btn rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
            >
              Update
            </Link>

            <button
              type="button"
              onClick={() => setConfirmId(event._id)}
              disabled={Boolean(deletingId)}
              className="btn btn-outline btn-error rounded-full"
            >
              Delete
            </button>
          </div>

          {confirmId === event._id && (
            <div className="mt-5 rounded-xl border border-base-300 bg-base-100 p-4">
              <p className="font-medium">Delete this event permanently?</p>

              <p className="mt-2 text-sm">
                Its participant registrations will also be removed.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmId("")}
                  disabled={Boolean(deletingId)}
                  className="btn btn-sm rounded-full"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(event._id)}
                  disabled={Boolean(deletingId)}
                  className="btn btn-error btn-sm rounded-full"
                >
                  {deletingId === event._id ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

export default ManageEventsList;
