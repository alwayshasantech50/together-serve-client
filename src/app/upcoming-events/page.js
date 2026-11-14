import EventGrid from "@/components/EventGrid";

const UpcomingEventsPage = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
        Find your next cause
      </p>

      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
        Upcoming Events
      </h1>

      <p className="mt-4 max-w-2xl leading-7">
        Discover local opportunities to give your time, support a
        cause, and make a difference with your community.
      </p>

      <div className="mt-10">
        <EventGrid />
      </div>
    </section>
  );
};

export default UpcomingEventsPage;