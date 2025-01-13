"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { FloatingDockDemo } from "./FloatingDockDemo";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null); // To track logged-in user's email

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Get user info from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setUserEmail(JSON.parse(user).email); // Set user email from stored data
    }
  }, []);

  const handleLogout = () => {
    // Logout by clearing user data
    localStorage.removeItem("user");
    setUserEmail(null);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-[120px] bg-white md:ml-[69px] md:mr-[45px] max-w-[1884px] mx-auto flex justify-between items-center border-b-[1px] border-[#DBD7D7] transition-transform duration-300 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative gap-0">
        <Link href="/">
          <h1 className="text-2xl px-2">Flight_Booking.com</h1>
        </Link>
      </div>
      <div className="relative gap-0">
        <FloatingDockDemo />
      </div>

      <div className="hidden lg:flex justify-center items-center">
        <div className="flex gap-[12px]">
          {userEmail ? (
            <div className="px-[44.75px] py-[8px] text-sm text-black rounded-xl border-[1px] border-[#767676] bg-[#E3E3E3]">
              {userEmail} {/* Display user email */}
            </div>
          ) : (
            <>
              <Link href="/login">
                <div className="px-[44.75px] py-[8px] text-sm text-black rounded-xl border-[1px] border-[#767676] bg-[#E3E3E3] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-[#d1d1d1] hover:border-[#767676]">
                  Sign In
                </div>
              </Link>

              <Link href="/register">
                <div className="px-[44.75px] py-[8px] text-sm text-white rounded-xl bg-[#2C2C2C] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-[#444444]">
                  Register
                </div>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="lg:hidden flex relative justify-center items-center gap-5">
        <Sheet>
          <Image src="/images/Icon.png" alt="notification icon" width={18} height={18} />
          <SheetTrigger asChild>
            <button className="p-2 mr-3 h-[40px] w-[40px] text-black rounded-md focus:outline-none">
              <GiHamburgerMenu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Explore our pages and features.</SheetDescription>
            </SheetHeader>
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col gap-4 mt-4">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="text-lg text-gray-800 hover:text-black">
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="text-lg text-gray-800 hover:text-black">
                      About Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/login" className="text-lg text-gray-800 hover:text-black">
                      Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/register" className="text-lg text-gray-800 hover:text-black">
                      Register
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
