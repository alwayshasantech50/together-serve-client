import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 lg:pb-20">
      <div className="grid gap-8 rounded-3xl bg-green-800 p-8 text-white md:grid-cols-2 md:items-center lg:p-12">

        <div>
          <Mail size={32} />

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Stay close to the good.
          </h2>

          <p className="mt-4 max-w-lg leading-7 text-green-100">
            Get community stories and discover more ways to give
            your time to a cause that matters.
          </p>
        </div>


        <div>
          <label
            htmlFor="newsletter-email"
            className="mb-3 block text-sm font-semibold"
          >
            Your email address
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-full bg-white px-5 py-3 text-gray-900 placeholder:text-gray-500"
            />

            <button
              type="button"
              disabled
              className="rounded-full bg-lime-300 px-6 py-3 font-semibold text-green-950 disabled:cursor-not-allowed"
            >
              Coming soon
            </button>
          </div>

          <p className="mt-3 text-sm text-green-100">
            Newsletter subscriptions are not available yet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;