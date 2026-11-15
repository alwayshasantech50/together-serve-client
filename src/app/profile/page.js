import ProtectedRoute from "@/components/ProtectedRoute";
import ProfileDetails from "@/components/ProfileDetails";

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
          Your TogetherServe account
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          My Profile
        </h1>

        <p className="mt-4 leading-7">
          View your account details and keep your profile up to date.
        </p>

        <div className="mt-10">
          <ProfileDetails />
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default ProfilePage;