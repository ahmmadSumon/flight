// pages/create-flight.tsx
import React from "react";
import FlightForm from "../../components/flights/FlightForm"; // Import the component

const CreateFlight: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-60">
      
      <FlightForm /> {/* Render the form */}
    </div>
  );
};

export default CreateFlight;
