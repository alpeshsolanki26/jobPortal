"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { getApplicants } from "../services/api";

interface Applicant {
  _id: string;

  userId: string;

  recruiterId: string;

  jobId: string;

  status: string;

  dateOfApplication: string;

  sop: string;
}

export default function Page() {
  const router = useRouter();

  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const [userType, setUserType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const type = localStorage.getItem("userType");

    if (!token) {
      router.push("/login");
      return;
    }

    setUserType(type || "");

    // recruiter login
    if (type === "recruiter") {
      fetchApplicants(token);
    }
  }, []);

  const fetchApplicants = async (token: string) => {
    try {
      const result = await getApplicants(token);

      console.log("API RESULT =>", result);

      // safe array handling
      if (Array.isArray(result)) {
        setApplicants(result);
      } else if (result && Array.isArray(result.data)) {
        setApplicants(result.data);
      } else {
        setApplicants([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("userType");

    router.push("/login");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl mt-5 mb-10">
        Logged in as:
        <span className="font-bold text-blue-500 ml-2">{userType}</span>
      </h2>
      <button
        onClick={() => router.push("/applicant/jobs")}
        className="bg-blue-500 text-white px-5 py-2 rounded"
      >
        View Jobs
      </button>
      {/* Recruiter Applicants List */}

      {userType === "recruiter" && (
        <div>
          <h2 className="text-2xl font-bold mb-5">Applicants List</h2>

          <div className="grid gap-5">
            {applicants.length === 0 ? (
              <p>No Applicants Found</p>
            ) : (
              applicants.map((applicant) => (
                <div key={applicant._id} className="border p-5 rounded-lg">
                  <p>
                    <strong>User ID:</strong> {applicant.userId}
                  </p>

                  <p>
                    <strong>Job ID:</strong> {applicant.jobId}
                  </p>

                  <p>
                    <strong>Status:</strong> {applicant.status}
                  </p>

                  <p>
                    <strong>SOP:</strong> {applicant.sop}
                  </p>

                  <p>
                    <strong>Applied:</strong>{" "}
                    {new Date(applicant.dateOfApplication).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
