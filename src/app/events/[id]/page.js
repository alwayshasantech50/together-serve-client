import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const EventDetailsPage = async ({ params }) => {
    const { id } = await params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/events/${id}`,
        { cache: "no-store" }
    ).catch(() => null);

    if (response && (response.status === 400 || response.status === 404)) {
        notFound();
    }

    if (!response || !response.ok) {
        return (
            <section className="px-6 py-16 text-center">
                <h1 className="text-2xl font-bold">
                    Unable to load this event
                </h1>

                <p className="mt-4">
                    Please try again shortly.
                </p>

                <Link
                    href="/upcoming-events"
                    className="btn btn-outline mt-6 rounded-full"
                >
                    Back to events
                </Link>
            </section>
        );
    }

    const event = await response.json();

    return (
        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
            <Link
                href="/upcoming-events"
                className="font-semibold text-green-600"
            >
                ← Back to events
            </Link>

            <Image
                src={event.thumbnail}
                alt={event.title}
                width={1200}
                height={700}
                unoptimized
                className="mt-6 h-64 w-full rounded-3xl object-cover sm:h-96"
            />

            <div className="mt-8 rounded-3xl border border-base-300 bg-base-200 p-6 sm:p-8">
                <span className="inline-block rounded-full bg-green-700 px-3 py-1 text-sm text-white">
                    {event.eventType}
                </span>

                <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                    {event.title}
                </h1>

                <p className="mt-5">
                    <strong>Location:</strong> {event.location}
                </p>

                <p className="mt-3">
                    <strong>Date:</strong>{" "}
                    {new Date(event.eventDate).toLocaleString("en-GB", {
                        timeZone: "UTC",
                        dateStyle: "long",
                        timeStyle: "short",
                    })}{" "}
                    UTC
                </p>

                <h2 className="mt-8 text-xl font-bold">
                    About this event
                </h2>

                <p className="mt-4 whitespace-pre-wrap break-words leading-8">
                    {event.description}
                </p>
            </div>
        </section>
    );
};

export default EventDetailsPage;