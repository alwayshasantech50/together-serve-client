import { CalendarPlus, HeartHandshake, MapPin } from "lucide-react";


const features = [
  {
    id: 1,
    title: "Find your cause",
    description:
      "Explore local events and find a way to help that matches your interests.",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Bring people together",
    description:
      "Organize a community event and invite others to turn a shared idea into action.",
    icon: CalendarPlus,
  },
  {
    id: 3,
    title: "Stay involved",
    description:
      "Keep your joined events in one place and plan your next day of volunteering.",
    icon: HeartHandshake,
  },
];

const Features = () => {
  return (
    <section className="bg-base-200 px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            A little help goes a long way
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Your community. Your chance to help.
          </h2>

          <p className="mt-4 leading-7">
            TogetherServe makes it easier to discover a cause, gather
            your neighbors, and take part.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.id}
                className="rounded-2xl border border-base-300 bg-base-100 p-7"
              >
                <div className="inline-flex rounded-2xl bg-green-700 p-3 text-white">
                  <Icon size={26} />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;