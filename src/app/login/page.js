import Link from "next/link";


const LoginPage = () => {
  return (
    <section className="mx-auto max-w-lg px-6 py-16">
      <div className="rounded-2xl bg-base-200 p-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>

        <p className="mt-4 leading-7">
          Our login form is coming in the next step.
        </p>

        <p className="mt-6 text-sm">
          New to TogetherServe?{" "}
          <Link
            href="/register"
            className="font-semibold text-green-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;