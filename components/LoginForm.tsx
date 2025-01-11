"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";


// Validation schema for Login
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

// Form input types

type LoginFormInputs = yup.InferType<typeof loginSchema>;


export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login data:", data);
  };

  return (
    <FormContainer title="Welcome Back" subtitle="Login to your account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4" error={errors.email?.message}>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" {...register("email")} placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8" error={errors.password?.message}>
          <Label htmlFor="password">Password</Label>
          <Input id="password" {...register("password")} placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <SubmitButton text="Login &rarr;" />
      </form>
    </FormContainer>
  );
}

// Reusable components
const SubmitButton = ({ text }: { text: string }) => (
  <button
    className="bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-input"
    type="submit"
  >
    {text}
  </button>
);

const FormContainer = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">{title}</h2>
    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">{subtitle}</p>
    {children}
  </div>
);

const LabelInputContainer = ({
  children,
  error,
  className,
}: {
  children: React.ReactNode;
  error?: string;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
