import ProtectedRoute from "@/components/ProtectedRoute";
import ManageEventsList from "@/components/ManageEventsList";

const ManageEventsPage = () => {
    return (
        <ProtectedRoute>
            <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                    Bring your ideas to life
                </p>

                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                    Manage Events
                </h1>

                <p className="mt-4 leading-7">
                    Review, update, or delete the events you’ve created.
                </p>

                <div className="mt-10">
                    <ManageEventsList />
                </div>
            </section>
        </ProtectedRoute>
    );
};

export default ManageEventsPage;