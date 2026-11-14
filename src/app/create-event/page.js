import ProtectedRoute from "@/components/ProtectedRoute";
import CreateEventForm from "@/components/CreateEventForm";


const CreateEventPage = () => {
  return (
    <ProtectedRoute>
      <CreateEventForm />
    </ProtectedRoute>
  );
};

export default CreateEventPage;