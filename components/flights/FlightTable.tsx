"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Flight {
  _id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  price: number;
}

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("searchTerm", searchTerm);
      if (origin) queryParams.append("origin", origin);
      if (destination) queryParams.append("destination", destination);

      const response = await fetch(
        `https://flight-back.vercel.app/api/v1/flight?${queryParams.toString()}`
      );
      const data = await response.json();

      if (data.success) {
        setFlights(data.data.data); // Nested flight array
      } else {
        setError(data.message || "Failed to fetch flights");
      }
    } catch (err) {
      setError("Error fetching flight data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (flightId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this flight?');
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://flight-back.vercel.app/api/v1/flight/delete/${flightId}`,
          {
            method: 'DELETE',
          }
        );
  
        const data = await response.json();
        console.log('Delete Response:', data); // Log the response for debugging
  
        if (data.success) {
          alert('Flight deleted successfully');
          fetchFlights(); // Re-fetch to show updated list after deletion
        } else {
          alert(`Failed to delete flight: ${data.message}`);
        }
      } catch (err) {
        console.error('Error deleting flight:', err);
        alert('Error deleting flight');
      }
    }
  };
  

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Flight Table</h1>

      {/* Search and Filter Inputs */}
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
          placeholder="Filter by origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
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

      {/* Loading and Error States */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Flights Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Flight Number</th>
              <th className="px-4 py-2 border-b text-left">Airline</th>
              <th className="px-4 py-2 border-b text-left">Origin</th>
              <th className="px-4 py-2 border-b text-left">Destination</th>
              <th className="px-4 py-2 border-b text-left">Price</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.length > 0 ? (
              flights.map((flight) => (
                <tr key={flight._id} className="border-b">
                  <td className="px-4 py-2">
                    <Link href={`/flight-details/${flight._id}`}>
                      {flight.flightNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{flight.airline}</td>
                  <td className="px-4 py-2">{flight.origin}</td>
                  <td className="px-4 py-2">{flight.destination}</td>
                  <td className="px-4 py-2">{flight.price}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(flight._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No flights available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightTable;
