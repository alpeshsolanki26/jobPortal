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

      skills: [""],

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* NAME */}
      <div>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="border p-2 w-full"
        />

        {errors.name && <p>{errors.name.message}</p>}
      </div>

      {/* EMAIL */}
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border p-2 w-full"
        />

        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {/* PASSWORD */}
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 w-full"
        />

        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {/* EDUCATION */}
      <div>
        <input
          type="text"
          placeholder="Institution Name"
          {...register("education.0.institutionName")}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Start Year"
          {...register("education.0.startYear", {
            valueAsNumber: true,
          })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="End Year"
          {...register("education.0.endYear", {
            valueAsNumber: true,
          })}
          className="border p-2 w-full"
        />
      </div>

      {/* SKILLS */}
      <div className="space-y-3">
        <h2 className="font-bold text-lg">Skills</h2>

        {skillFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              type="text"
              placeholder={`Skill ${index + 1}`}
              {...register(`skills.${index}`)}
              className="border p-2 w-full"
            />

            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="bg-red-500 text-white px-3"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendSkill("")}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add More
        </button>
      </div>

      {/* SUBMIT */}
      <button type="submit" className="bg-black text-white px-4 py-2">
        Register Applicant
      </button>
    </form>
  );
}
