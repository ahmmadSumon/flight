// app/register/page.tsx

import React from "react";

import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex justify-center mt-20 items-center h-screen bg-gray-100">
            <LoginForm/>
        </div>
    );
}
