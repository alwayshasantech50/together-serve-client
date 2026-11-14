import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

const EventCard = ({ event }) => {
  const eventDate = new Date(event.eventDate);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100">
      <Image
        src={event.thumbnail}
        alt={event.title}
        width={600}
        height={400}
        unoptimized
        className="h-56 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-6">
        <span className="self-start rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
          {event.eventType}
        </span>

        <h3 className="mt-4 text-xl font-bold">{event.title}</h3>

        <p className="mt-4 flex items-start gap-2 text-sm">
          <MapPin size={18} className="shrink-0 text-green-600" />
          {event.location}
        </p>

        <p className="mt-3 flex items-start gap-2 text-sm">
          <CalendarDays size={18} className="shrink-0 text-green-600" />

          {eventDate.toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>

        <div className="mt-auto pt-6">
          <Link
            href={`/events/${event._id}`}
            className="btn w-full rounded-full border-0 bg-green-700 text-white hover:bg-green-800"
          >
            View Event
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
