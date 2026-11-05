import Link from "next/link";
import { ArrowUpRight, Sprout } from "lucide-react";

export default function Home() {
  return (
    <section className="px-6 py-20 text-center sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-base-200 px-4 py-2 text-sm">
          <Sprout size={18} className="text-green-600" />
          Small actions. Stronger communities.
        </div>

        <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
          A little of your time.
          <br />
          <span className="text-green-600">A lasting change.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 sm:text-lg">
          Discover local causes, join meaningful events, and bring
          your neighborhood together.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/upcoming-events"
            className="btn rounded-full border-0 bg-green-700 px-7 text-white hover:bg-green-800"
          >
            Explore Events
            <ArrowUpRight size={19} />
          </Link>

          <Link
            href="/login"
            className="btn btn-outline rounded-full px-7"
          >
            Get Involved
          </Link>
        </div>
      </div>
    </section>
  );
}