"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

interface Flight {
  _id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  price: number;
  date: string;
  startTime: string;
  endTime: string;
  availableSeats: number;
}

const Flights: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const router = useRouter(); // Initialize useRouter

  const fetchFlights = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("searchTerm", searchTerm);
      if (origin) params.append("origin", origin);
      if (destination) params.append("destination", destination);

      const response = await fetch(`https://flight-back.vercel.app/api/v1/flight?${params.toString()}`);
      const data = await response.json();

      if (data.data && Array.isArray(data.data.data)) {
        setFlights(data.data.data);
      } else {
        console.error("No flights data found in response.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [searchTerm, origin, destination]);

  const handleViewDetails = (id: string) => {
    router.push(`/flight-details/${id}`); // Navigate to the flight details page
  };

  return (
    <div className="flex justify-center items-center mt-32">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-7xl p-4">
          <h2 className="text-center text-4xl py-7">All Flights</h2>
          <div className="flex justify-between mb-4">
            <div className="mb-6 flex gap-4 flex-wrap justify-center items-center">
              <input
                type="text"
                placeholder="Search by flight number or airline"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded-md w-full md:w-1/4"
              />
              <span>or</span>
              <input
                type="text"
                placeholder="Filter by destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border p-2 rounded-md w-full md:w-1/3"
              />
              <button
                onClick={fetchFlights}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Search
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Flight Number</th>
                  <th className="px-4 py-2 border">Airline</th>
                  <th className="px-4 py-2 border">Origin</th>
                  <th className="px-4 py-2 border">Destination</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Available Seats</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.length > 0 ? (
                  flights.map((flight) => (
                    <tr key={flight._id}>
                      <td className="px-4 py-2 border">{flight.flightNumber}</td>
                      <td className="px-4 py-2 border">{flight.airline}</td>
                      <td className="px-4 py-2 border">{flight.origin}</td>
                      <td className="px-4 py-2 border">{flight.destination}</td>
                      <td className="px-4 py-2 border">{flight.price}</td>
                      <td className="px-4 py-2 border">{flight.availableSeats}</td>
                      <td className="px-4 py-2 border">
                        <button
                          className="text-blue-500"
                          onClick={() => handleViewDetails(flight._id)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No flights found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flights;
