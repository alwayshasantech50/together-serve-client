import ProtectedRoute from "@/components/ProtectedRoute";
import UpdateEventLoader from "@/components/UpdateEventLoader";

const UpdateEventPage = async ({ params }) => {
  const { id } = await params;

  return (
    <ProtectedRoute>
      <UpdateEventLoader key={id} eventId={id} />
    </ProtectedRoute>
  );
};

export default UpdateEventPage;