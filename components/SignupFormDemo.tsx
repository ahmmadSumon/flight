"use client"
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";

// Validation schema for Register
const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

type RegisterFormInputs = yup.InferType<typeof registerSchema>;

export function SignupFormDemo() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitRegister: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const response = await fetch('https://flight-back.vercel.app/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setAlertMessage('Registration successful!');
      } else {
        setAlertMessage('Registration failed: ' + result.message);
      }
    } catch (error:any) {
      setAlertMessage('Error during registration: ' + error.message);
    }
  };

  return (
    <div className="max-w-md w-full mt-28 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmitRegister)} className="mt-8">
        <div className="mb-4">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your full name" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="Enter your email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full h-10 rounded-md"
        >
          Register
        </button>

        {alertMessage && <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">{alertMessage}</div>}
      </form>
    </div>
  );
}
