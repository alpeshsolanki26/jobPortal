"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerApplicantSchema,
  RegisterApplicantFormData,
} from "../../schemas/registerApplicantSchema";

export default function RegisterFormApplicant() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterApplicantFormData>({
    resolver: zodResolver(registerApplicantSchema),

    defaultValues: {
      type: "applicant",

      rating: -1,

      education: [
        {
          institutionName: "",
          startYear: 2018,
          endYear: 2022,
        },
      ],

      skills: [
        {
          value: "",
        },
      ],

      resume: "",
      profile: "",
    },
  });

  // Dynamic Skills
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = async (data: RegisterApplicantFormData) => {
    try {
      const payload = {
        ...data,
      };

      const response = await fetch(
        "https://next-training-dev-api.connectid.cloud/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        alert("Applicant Registered Successfully");
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl shadow-2xl p-8 md:p-10"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>

          <input
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>

          <input
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>

          <input
            type="password"
            placeholder="********"
            {...register("password")}
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Institution</label>

          <input
            type="text"
            placeholder="GTU"
            {...register("education.0.institutionName")}
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Start Year</label>

          <input
            type="number"
            {...register("education.0.startYear", {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-gray-300 p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">End Year</label>

          <input
            type="number"
            {...register("education.0.endYear", {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-gray-300 p-3"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Skills</h2>

          <button
            type="button"
            onClick={() =>
              appendSkill({
                value: "",
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Skill
          </button>
        </div>

        <div className="space-y-3">
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <input
                type="text"
                placeholder={`Skill ${index + 1}`}
                {...register(`skills.${index}.value`)}
                className="flex-1 rounded-xl border border-gray-300 p-3"
              />

              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-xl"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-10">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition"
        >
          Register Applicant
        </button>
      </div>
    </form>
  );
}
