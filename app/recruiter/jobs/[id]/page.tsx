"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getJobById, deleteJob, updateJob } from "@/app/services/api";
export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    maxApplicants: 0,
    maxPositions: 0,
    deadline: "",
  });
  useEffect(() => {
    const loadJob = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const result = await getJobById(token, params.id as string);

        setJob(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [params.id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await deleteJob(token, params.id as string);

      alert(response.message || "Job Deleted Successfully");

      router.push("/recruiter/jobs");
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!job) {
    return <div className="p-10 text-center">Job Not Found</div>;
  }
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await updateJob(token, params.id as string, {
        maxApplicants: Number(editForm.maxApplicants),

        maxPositions: Number(editForm.maxPositions),

        deadline: new Date(editForm.deadline).toISOString(),
      });

      alert(response.message || "Job Updated Successfully");

      setJob({
        ...job,
        ...editForm,
      });

      setEditOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update job");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold">{job.title}</h1>

          <p className="text-gray-500 mt-2">
            Deadline: {new Date(job.deadline).toLocaleDateString()}
          </p>
        </div>

        {/* Details */}

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-5 rounded-xl">
              <p className="text-gray-500">Salary</p>

              <p className="font-bold text-xl mt-2">₹ {job.salary}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <p className="text-gray-500">Job Type</p>

              <p className="font-bold text-xl mt-2">{job.jobType}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <p className="text-gray-500">Duration</p>

              <p className="font-bold text-xl mt-2">{job.duration} Months</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <p className="text-gray-500">Max Applicants</p>

              <p className="font-bold text-xl mt-2">{job.maxApplicants}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <p className="text-gray-500">Max Positions</p>

              <p className="font-bold text-xl mt-2">{job.maxPositions}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <p className="text-gray-500">Rating</p>

              <p className="font-bold text-xl mt-2">{job.rating}</p>
            </div>
          </div>

          {/* Skills */}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>

            <div className="flex flex-wrap gap-3">
              {job.skillsets?.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="
                      px-4
                      py-2
                      bg-blue-100
                      text-blue-700
                      rounded-full
                      font-medium
                    "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}

          <div className="flex gap-4 mt-10">
            <button
              onClick={() => {
                setEditForm({
                  maxApplicants: job.maxApplicants,
                  maxPositions: job.maxPositions,
                  deadline: job.deadline?.slice(0, 16),
                });

                setEditOpen(true);
              }}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
              "
            >
              Edit Job
            </button>

            <button
              onClick={handleDelete}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
              "
            >
              Delete Job
            </button>
            <Link
              href={`/recruiter/jobs/${params.id}/applications`}
              className="
    bg-green-600
    hover:bg-green-700
    text-white
    px-6
    py-3
    rounded-xl
  "
            >
              View Applicants
            </Link>
          </div>
        </div>

        {/* Edit Modal */}

        {editOpen && (
          <div
            className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
          >
            <div
              className="
        bg-white
        rounded-2xl
        p-8
        w-full
        max-w-xl
      "
            >
              <h2 className="text-2xl font-bold mb-6">Edit Job</h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">
                    Maximum Applicants
                  </label>

                  <input
                    type="number"
                    value={editForm.maxApplicants}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        maxApplicants: Number(e.target.value),
                      })
                    }
                    className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Maximum Positions
                  </label>

                  <input
                    type="number"
                    value={editForm.maxPositions}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        maxPositions: Number(e.target.value),
                      })
                    }
                    className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Deadline</label>

                  <input
                    type="datetime-local"
                    value={editForm.deadline}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        deadline: e.target.value,
                      })
                    }
                    className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleUpdate}
                  className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
          "
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setEditOpen(false)}
                  className="
            bg-gray-200
            px-6
            py-3
            rounded-xl
          "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
