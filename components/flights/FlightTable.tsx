import { useEffect } from "react";
import { getFlights } from "@/services/flightService";
import { useFlightStore } from "@/stores/useFlightStore";

const FlightTable = () => {
  const { flights, setFlights } = useFlightStore();

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await getFlights("");
      setFlights(response.data);
    };

    fetchFlights();
  }, [setFlights]);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Flight Number</th>
          <th>Airline</th>
          <th>Origin</th>
          <th>Destination</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <tr key={flight.id}>
            <td>{flight.flightNumber}</td>
            <td>{flight.airline}</td>
            <td>{flight.origin}</td>
            <td>{flight.destination}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;
