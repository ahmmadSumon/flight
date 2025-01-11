"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FlightFormData {
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

const FlightForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlightFormData>();

  const onSubmit = async (data: FlightFormData) => {
    try {
      const response = await axios.post(
        "https://flight-back.vercel.app/api/v1/flight/create",
        data
      );
      console.log("Flight Created:", response.data);
    } catch (error) {
      console.error("Error creating flight:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-blue-600">
        Create New Flight
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Flight Number
          </label>
          <input
            type="text"
            {...register("flightNumber", { required: "Flight number is required" })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.flightNumber && (
            <p className="text-red-500">{errors.flightNumber.message}</p>
          )}
        </div>
        {/* Repeat the same structure for other form fields */}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg"
      >
        Create Flight
      </button>
    </form>
  );
};

export default FlightForm;
