
import React from "react";
import FlightTable from "../../components/flights/FlightTable"; // Import the table component

const Flights: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-60">
     
      <FlightTable /> {/* Display the flight table */}
    </div>
  );
};

export default Flights;
