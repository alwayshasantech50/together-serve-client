import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Sprout } from "lucide-react";


const Hero = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">


        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-base-200 px-4 py-2 text-sm font-medium">
            <Sprout size={18} className="text-green-600" />
            Small actions. Stronger communities.
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl">
            A little of your time.
            <br />
            <span className="text-green-600">A lasting change.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8">
            Turn your care into action. Discover local causes, meet
            people who care, and build a stronger community together.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-base-200 px-4 py-2">
              Community cleanups
            </span>

            <span className="rounded-full bg-base-200 px-4 py-2">
              Tree planting
            </span>

            <span className="rounded-full bg-base-200 px-4 py-2">
              Donation drives
            </span>
          </div>
        </div>

        
        
        <div className="relative pb-8">
          <Image
            src="/images/community-cleanup.jpg"
            alt="Volunteers working together to clean a forest"
            width={900}
            height={1000}
            sizes="(max-width: 1023px) 100vw, 50vw"
            loading="eager"
            className="h-96 w-full rounded-3xl object-cover lg:h-[500px]"
          />

          <div className="absolute bottom-0 left-4 right-4 flex items-center gap-4 rounded-2xl bg-green-800 p-5 text-white shadow-lg sm:left-8 sm:right-8">
            <span className="rounded-full bg-white/15 p-3">
              <HeartHandshake size={28} />
            </span>

            <div>
              <p className="text-lg font-bold">
                Good things start with us.
              </p>

              <p className="mt-1 text-sm text-green-100">
                Give your time. Grow your community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;