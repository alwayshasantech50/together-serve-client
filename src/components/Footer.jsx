import Link from "next/link";
import Logo from "@/components/Logo";


const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />

            <p className="mt-4 text-sm leading-7">
              Bring people together through meaningful community
              service. A little of your time can make a lasting
              difference.
            </p>
          </div>

          <div>
            <h2 className="font-bold">Explore</h2>

            <nav
              className="mt-4 flex flex-col gap-3 text-sm"
              aria-label="Footer navigation"
            >
              <Link href="/" className="hover:text-green-600">
                Home
              </Link>

              <Link
                href="/upcoming-events"
                className="hover:text-green-600"
              >
                Upcoming Events
              </Link>

              <Link href="/login" className="hover:text-green-600">
                Login
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="font-bold">Make a difference</h2>

            <p className="mt-4 text-sm leading-7">
              Join a cleanup, plant a tree, or support a donation
              drive. Find a cause that matters to you.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-4 inline-block font-semibold text-green-600"
            >
              Explore events →
            </Link>
          </div>
        </div>

        <p className="mt-10 border-t border-base-300 pt-6 text-center text-sm">
          © {new Date().getFullYear()} TogetherServe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;