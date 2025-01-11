// app/register/page.tsx

import React from "react";
import { SignupFormDemo } from "@/components/SignupFormDemo"; // Update the path as needed

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <SignupFormDemo />
        </div>
    );
}
