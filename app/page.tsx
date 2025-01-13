import FlightTable from "@/components/flights/FlightTable";
import { Hero } from "@/components/Hero";
import Image from "next/image";
import Flights from "./all-flights/page";

export default function Page() {
  return (
    <main className="">
      <Hero/>
      <Flights/>
     
    </main>
  );
}
