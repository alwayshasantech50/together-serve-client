import ProtectedRoute from "@/components/ProtectedRoute";
import JoinedEventsList from "@/components/JoinedEventsList";

const JoinedEventsPage = () => {
    return (
        <ProtectedRoute>
            <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                    Your community commitments
                </p>

                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                    Joined Events
                </h1>

                <p className="mt-4 leading-7">
                    Find the events you’ve joined, organized by event date.
                </p>

                <div className="mt-10">
                    <JoinedEventsList />
                </div>
            </section>
        </ProtectedRoute>
    );
};

export default JoinedEventsPage;