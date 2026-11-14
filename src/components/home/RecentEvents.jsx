import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EventGrid from "@/components/EventGrid";

const RecentEvents = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Make time for something meaningful
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Coming up in the community
          </h2>

          <p className="mt-4 max-w-xl leading-7">
            Explore the next six opportunities to show up and help.
          </p>
        </div>

        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 font-semibold text-green-600"
        >
          All events
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <div className="mt-10">
        <EventGrid limit={true} />
      </div>
    </section>
  );
};

export default RecentEvents;
