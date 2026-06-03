"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  getJobApplications,
  updateApplicationStatus,
  getUserById,
} from "@/app/services/api";

export default function ApplicationsPage() {
  const params = useParams();

  const [applications, setApplications] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await getJobApplications(token, params.id as string);

        const enrichedApplications = await Promise.all(
          data.map(async (app: any) => {
            try {
              const profile = await getUserById(token, app.userId);

              return {
                ...app,
                applicantProfile: profile,
              };
            } catch {
              return app;
            }
          }),
        );

        setApplications(enrichedApplications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [params.id]);

  const handleStatusChange = async (applicationId: string, status: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      await updateApplicationStatus(token, applicationId, {
        status,
      });

      setApplications(
        applications.map((app) =>
          app._id === applicationId
            ? {
                ...app,
                status,
              }
            : app,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Job Applications</h1>

        <div className="space-y-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-6
                "
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {application?.applicantProfile?.name || "Unknown User"}
                  </h2>
                  <p className="text-gray-500">
                    Contact: {application?.applicantProfile?.contactNumber}
                  </p>
                  <div className="mt-4">
                    <h3 className="font-semibold">Bio</h3>

                    <p className="text-gray-600 mt-2">
                      {application?.applicantProfile?.bio}
                    </p>
                  </div>
                  <p className="text-gray-500">Status: {application.status}</p>

                  <p className="text-gray-500">
                    Applied:{" "}
                    {new Date(
                      application.dateOfApplication,
                    ).toLocaleDateString()}
                  </p>
                </div>

                <select
                  value={application.status}
                  onChange={(e) =>
                    handleStatusChange(application._id, e.target.value)
                  }
                  className="
                      border
                      rounded-lg
                      px-3
                      py-2
                    "
                >
                  <option value="applied">Applied</option>

                  <option value="shortlisted">Shortlisted</option>

                  <option value="accepted">Accepted</option>

                  <option value="rejected">Rejected</option>

                  <option value="cancelled">Cancelled</option>

                  <option value="finished">Finished</option>
                </select>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">SOP</h3>

                <p className="text-gray-600 mt-2">{application.sop}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
