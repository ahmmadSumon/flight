"use client";

import React, { useEffect, useState } from "react";

const FlightDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [flightId, setFlightId] = useState<string | null>(null);
  const [flight, setFlight] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Unwrap the params Promise
    const getParams = async () => {
      const unwrappedParams = await params;
      setFlightId(unwrappedParams.id);
    };

    getParams();
  }, [params]);

  useEffect(() => {
    if (flightId) {
      const fetchFlight = async () => {
        try {
          const response = await fetch(
            `https://flight-back.vercel.app/api/v1/flight/${flightId}`
          );
          const data = await response.json();

          if (data.success) {
            setFlight(data.data);
          } else {
            setError(data.message || "Flight not found");
          }
        } catch (err) {
          setError("Error fetching flight details");
        } finally {
          setLoading(false);
        }
      };

      fetchFlight();
    }
  }, [flightId]);

  if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500 text-lg">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Flight Details</h1>
        <div className="text-gray-700 space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Flight Number:</span> {flight.flightNumber}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Airline:</span> {flight.airline}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Origin:</span> {flight.origin}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Destination:</span> {flight.destination}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Price:</span> ${flight.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsPage;
