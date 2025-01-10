import { useForm } from "react-hook-form";
import { createFlight } from "@/services/flightService";

const FlightForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await createFlight(data);
      alert("Flight added successfully");
      reset();
    } catch (error) {
      alert("Failed to add flight");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <input {...register("flightNumber")} placeholder="Flight Number" className="input" />
      <input {...register("airline")} placeholder="Airline" className="input" />
      <input {...register("origin")} placeholder="Origin" className="input" />
      <input {...register("destination")} placeholder="Destination" className="input" />
      <button type="submit" className="btn">Add Flight</button>
    </form>
  );
};

export default FlightForm;
