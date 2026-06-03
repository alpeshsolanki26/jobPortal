"use client";

import { useEffect, useState } from "react";

import { getApplicantsList } from "@/app/services/api";

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await getApplicantsList(token);

        console.log("Applicants API Response:", data);

        setApplicants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadApplicants();
  }, []);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Applicants</h1>

        <div className="grid gap-6">
          {Array.isArray(applicants) &&
            applicants.map((applicant) => (
              <div
                key={applicant._id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-6
                "
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Applicant</h2>

                    <p className="text-gray-500">Status: {applicant.status}</p>

                    <p className="text-gray-500">
                      Applied:{" "}
                      {new Date(
                        applicant.dateOfApplication,
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-blue-100
                      text-blue-700
                    "
                  >
                    {applicant.status}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium">SOP</h3>

                  <p className="text-gray-600 mt-2">{applicant.sop}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
