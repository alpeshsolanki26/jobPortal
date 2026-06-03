"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "../../schemas/loginSchema";

import { loginUser } from "@/app/services/api";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      //console.log(data);
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      console.log("Login Response:", response);
      alert("Login Success");
      localStorage.setItem("token", response.token);
      localStorage.setItem("userType", response.type);
      const userType = localStorage.getItem("userType");
      if (userType === "recruiter") {
        router.push("../../recruiter/dashboard");
      } else {
        router.push("../../applicant/dashboard");
      }
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);

        alert(error.response?.data?.message || "Invalid Email or Password");
      } else {
        console.log(error);

        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Login </h1>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border rounded-lg p-3 outline-none"
        />

        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border rounded-lg p-3 outline-none"
        />

        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-full p-3 rounded-lg"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
