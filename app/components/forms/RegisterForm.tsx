"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { registerSchema, RegisterFormData } from "../../schemas/registerSchema";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });
  const router = useRouter();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      // console.log(data);
      // alert("Registration Success");
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        type: data.type as "applicant" | "recruiter",
        education: [],
        skills: [],
        rating: 0,
        resume: data.contactNumber,
        profile: data.bio,
      };
      const response = await registerUser(payload);
      console.log("API reponse:", response);
      alert("Registeration Success");
      reset();
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        console.log(data);
        //alert(JSON.stringify(error.response?.data));
        if (data?.code === 11000) {
          alert("Email already exists");
        } else {
          alert("Something went wrong");
        }
      } else {
        console.log(error);

        alert("Unexpected Error");
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
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <input
          type="text"
          placeholder="Full Name"
          {...register("name")}
          className="w-full border rounded-lg p-3 outline-none"
        />

        <p className="text-red-500 text-sm">{errors.name?.message}</p>
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

        <input
          type="text"
          placeholder="Type"
          defaultValue="recruiter"
          {...register("type")}
          className="w-full border rounded-lg p-3 outline-none"
        />

        <input
          type="text"
          placeholder="Contact Number"
          {...register("contactNumber")}
          className="w-full border rounded-lg p-3 outline-none"
        />

        <input
          type="text"
          placeholder="Bio"
          {...register("bio")}
          className="w-full border rounded-lg p-3 outline-none"
        />
        <p className="text-red-500 text-sm">{errors.bio?.message}</p>
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-full p-3 rounded-lg"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
