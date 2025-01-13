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

      // Show success alert
      window.alert("Flight created successfully!");
    } catch (error) {
      console.error("Error creating flight:", error);

      // Show error alert
      window.alert("Error creating flight. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">
        Create New Flight
      </h2>

      <div className="flex flex-wrap gap-6">
        {/* Flight Number */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2 ">
            Flight Number
          </label>
          <input
            type="text"
            {...register("flightNumber", {
              required: "Flight number is required",
            })}
            className="min-w-2xl px-4 py-2 border rounded-lg"
          />
          {errors.flightNumber && (
            <p className="text-red-500">{errors.flightNumber.message}</p>
          )}
        </div>

        {/* Airline */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">Airline</label>
          <input
            type="text"
            {...register("airline", { required: "Airline is required" })}
            className="min-w-2xl px-4 py-2 border rounded-lg"
          />
          {errors.airline && (
            <p className="text-red-500">{errors.airline.message}</p>
          )}
        </div>

        {/* Origin */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">Origin</label>
          <input
            type="text"
            {...register("origin", { required: "Origin is required" })}
            className="min-w-2xl  px-4 py-2 border rounded-lg"
          />
          {errors.origin && (
            <p className="text-red-500">{errors.origin.message}</p>
          )}
        </div>

        {/* Destination */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">
            Destination
          </label>
          <input
            type="text"
            {...register("destination", { required: "Destination is required" })}
            className="min-w-2xl  px-4 py-2 border rounded-lg"
          />
          {errors.destination && (
            <p className="text-red-500">{errors.destination.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="min-w-2xl px-4 py-2 border rounded-lg"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">
            Flight Date
          </label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.date && (
            <p className="text-red-500">{errors.date.message}</p>
          )}
        </div>

        {/* Start Time */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">
            Start Time
          </label>
          <input
            type="time"
            {...register("startTime", { required: "Start time is required" })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.startTime && (
            <p className="text-red-500">{errors.startTime.message}</p>
          )}
        </div>

        {/* End Time */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">End Time</label>
          <input
            type="time"
            {...register("endTime", { required: "End time is required" })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.endTime && (
            <p className="text-red-500">{errors.endTime.message}</p>
          )}
        </div>

        {/* Available Seats */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">
            Available Seats
          </label>
          <input
            type="number"
            {...register("availableSeats", {
              required: "Available seats are required",
            })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.availableSeats && (
            <p className="text-red-500">{errors.availableSeats.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg"
      >
        Create Flight
      </button>
    </form>
  );
};

export default FlightForm;
