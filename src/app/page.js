import { ArrowUpRight, Sprout } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f7f2] px-6 py-16 text-[#174b3a]">
      <section className="max-w-3xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#174b3a]/15 px-4 py-2 text-sm font-medium">
          <Sprout size={18} />
          Small actions. Stronger communities.
        </div>

        <p className="mb-5 text-xl font-bold tracking-tight">
          Together<span className="text-[#64813c]">Serve</span>
          <span className="text-[#64813c]">.</span>
        </p>

        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          A little of your time.
          <br />
          A lasting change.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#52665c] sm:text-lg">
          Discover local causes, join meaningful events, and bring
          your neighborhood together.
        </p>

        <div className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#d4f77d] px-5 py-3 font-semibold">
          Your community starts here
          <ArrowUpRight size={20} />
        </div>
      </section>
    </main>
  );
}