"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";

const EventGrid = ({ limit = false, showFilters = false }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("");

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

  const clearFilters = () => {
    setSearch("");
    setEventType("");
  };

  // Search without treating uppercase and lowercase differently.
  const searchText = search.trim().toLowerCase();

  const filteredEvents = events.filter((event) => {
    const matchesTitle = event.title.toLowerCase().includes(searchText);

    const matchesLocation = event.location.toLowerCase().includes(searchText);

    const matchesSearch = matchesTitle || matchesLocation;

    const matchesType = eventType === "" || event.eventType === eventType;

    return matchesSearch && matchesType;
  });

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

  return (
    <div>
      {showFilters && (
        <div className="mb-8 rounded-2xl border border-base-300 bg-base-200 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="event-search"
                className="mb-2 block text-sm font-medium"
              >
                Search events
              </label>

              <input
                id="event-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title or location"
                className="input w-full"
              />
            </div>

            <div>
              <label
                htmlFor="event-type-filter"
                className="mb-2 block text-sm font-medium"
              >
                Event type
              </label>

              <select
                id="event-type-filter"
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
                className="select w-full"
              >
                <option value="">All types</option>
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p aria-live="polite" className="text-sm">
              Events found: {filteredEvents.length}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="btn btn-ghost btn-sm rounded-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <div className="rounded-2xl bg-base-200 p-8 text-center">
          <h3 className="text-xl font-bold">No upcoming events yet</h3>

          <p className="mt-3 leading-7">
            Check back soon for new opportunities to help your community.
          </p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="rounded-2xl bg-base-200 p-8 text-center">
          <h3 className="text-xl font-bold">No matching events</h3>

          <p className="mt-3 leading-7">
            Try another title, location, or event type.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="btn btn-outline mt-5 rounded-full"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventGrid;
