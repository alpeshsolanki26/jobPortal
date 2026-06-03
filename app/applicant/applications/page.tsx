"use client";

import { useEffect, useState } from "react";
import { getMyApplications } from "../../services/api";

export default function Page() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getMyApplications(token);
        console.log(data);
        setApplications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Applications</h1>

          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            {applications.length} Applications
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No Applications Found
            </h2>
            <p className="text-gray-500 mt-2">
              You haven't applied to any jobs yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {application.job?.title || "Job"}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      application.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : application.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Recruiter:</strong>{" "}
                    {application.recruiter?.name || "N/A"}
                  </p>

                  <p>
                    <strong>Applied On:</strong>{" "}
                    {new Date(
                      application.dateOfApplication,
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>SOP:</strong>
                  </p>

                  <p className="text-gray-500 line-clamp-3">
                    {application.sop}
                  </p>
                </div>

                <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
