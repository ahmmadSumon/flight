"use client"
import { useState } from "react"; // Import useState
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CreateFlight from "../create-flight/page";
import FlightTable from "@/components/flights/FlightTable";
import Link from "next/link";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"create" | "view">("create"); // State to track active tab

  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
            {/* Buttons to toggle between components */}
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div
                className=" rounded-xl bg-muted/50 flex items-center justify-center cursor-pointer  hover:bg-blue-300"
                onClick={() => setActiveTab("create")}
              >
                Create Flight
              </div>
              <div
                className=" rounded-xl bg-muted/50 flex items-center justify-center cursor-pointer hover:bg-blue-300"
                onClick={() => setActiveTab("view")}
              >
                View Flights
              </div>
              <Link href="/">
              <div className=" rounded-xl bg-muted/50 flex items-center justify-center">

                See Website
              </div>
              </Link>
            </div>

            {/* Render the active component dynamically */}
            <div className="min-h-[100vh] flex-1 rounded-xl bg-red-500 md:min-h-min p-4">
              {activeTab === "create" && <CreateFlight />}
              {activeTab === "view" && <FlightTable />}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
