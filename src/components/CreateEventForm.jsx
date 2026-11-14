"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getAuthHeaders } from "@/lib/getAuthHeaders";


const CreateEventForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const form = event.currentTarget;

    const title = form.elements.title.value.trim();
    const description = form.elements.description.value.trim();
    const eventType = form.elements.eventType.value;
    const thumbnail = form.elements.thumbnail.value.trim();
    const location = form.elements.location.value.trim();
    const dateValue = form.elements.eventDate.value;

    if (
      !title ||
      !description ||
      !eventType ||
      !thumbnail ||
      !location ||
      !dateValue
    ) {
      toast.error("Please complete all event fields.");
      return;
    }

    if (!thumbnail.startsWith("https://") && !thumbnail.startsWith("http://")) {
      toast.error("Image URL must start with http:// or https://.");
      return;
    }

    const eventDate = new Date(dateValue);

    if (Number.isNaN(eventDate.getTime()) || eventDate <= new Date()) {
      toast.error("Event date must be in the future.");
      return;
    }

    const newEvent = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate: eventDate.toISOString(),
    };

    setLoading(true);

    try {
      const authHeaders = await getAuthHeaders();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/events`,
        {
          method: "POST",

          headers: {
            ...authHeaders,
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newEvent),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Unable to create the event.");
        return;
      }

      toast.success("Event created successfully!");

      router.push("/upcoming-events");
    } catch (error) {
      toast.error(error.message || "Unable to create the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
        Bring your community together
      </p>

      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Create an event</h1>

      <p className="mt-4 leading-7">
        Share a cause, choose a date, and invite others to make a difference
        with you.
      </p>

      <form
        onSubmit={handleCreateEvent}
        className="mt-8 rounded-3xl border border-base-300 bg-base-200 p-6 sm:p-8"
      >
        <fieldset disabled={loading} className="space-y-6">
          <div>
            <label htmlFor="title" className="mb-2 block font-medium">
              Event title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Winter Clothes Distribution"
              required
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Explain the purpose, planned activities, and anything volunteers should bring."
              required
              className="textarea w-full"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="eventType" className="mb-2 block font-medium">
                Event type
              </label>

              <select
                id="eventType"
                name="eventType"
                defaultValue=""
                required
                className="select w-full"
              >
                <option value="" disabled>
                  Select an event type
                </option>
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="eventDate" className="mb-2 block font-medium">
                Event date and time
              </label>

              <input
                id="eventDate"
                name="eventDate"
                type="datetime-local"
                aria-describedby="event-date-help"
                required
                className="input w-full"
              />

              <p id="event-date-help" className="mt-2 text-xs">
                Choose a future date and time in your local timezone.
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="thumbnail" className="mb-2 block font-medium">
              Thumbnail image URL
            </label>

            <input
              id="thumbnail"
              name="thumbnail"
              type="url"
              placeholder="https://example.com/event-photo.jpg"
              required
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="location" className="mb-2 block font-medium">
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="Mirpur 10, Dhaka"
              required
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            className="btn w-full rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
          >
            {loading ? "Creating event..." : "Create Event"}
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default CreateEventForm;
