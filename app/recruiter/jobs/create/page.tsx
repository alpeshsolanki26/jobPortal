"use client";

import { useState } from "react";
import { createJob } from "../../../services/api";

export default function CreateJobPage() {
  const [form, setForm] = useState({
    title: "",
    maxApplicants: 0,
    maxPositions: 0,
    deadline: "",
    skillsets: "",
    jobType: "Full Time",
    duration: 0,
    salary: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token") || "";

      const response = await createJob(token, {
        title: form.title,
        maxApplicants: Number(form.maxApplicants),
        maxPositions: Number(form.maxPositions),
        deadline: new Date(form.deadline).toISOString(),
        skillsets: form.skillsets.split(",").map((s) => s.trim()),
        jobType: form.jobType,
        duration: Number(form.duration),
        salary: Number(form.salary),
      });

      alert(response.message || "Job Created Successfully");

      setForm({
        title: "",
        maxApplicants: 0,
        maxPositions: 0,
        deadline: "",
        skillsets: "",
        jobType: "Full Time",
        duration: 0,
        salary: 0,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r  bg-slate-900 p-6">
            <h1 className="text-3xl font-bold text-white">Create New Job</h1>

            <p className="text-blue-100 mt-2">
              Fill in the details below to post a new job.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Job Title
                </label>

                <input
                  type="text"
                  placeholder="Senior React Developer"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Max Applicants */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Maximum Applicants
                </label>

                <input
                  type="number"
                  value={form.maxApplicants}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      maxApplicants: Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Max Positions */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Maximum Positions
                </label>

                <input
                  type="number"
                  value={form.maxPositions}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      maxPositions: Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Application Deadline
                </label>

                <input
                  type="datetime-local"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      deadline: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Duration (Months)
                </label>

                <input
                  type="number"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration: Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Salary
                </label>

                <input
                  type="number"
                  value={form.salary}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      salary: Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Job Type
                </label>

                <select
                  value={form.jobType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      jobType: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full Time">Full Time</option>

                  <option value="Part Time">Part Time</option>

                  <option value="Work From Home">Work From Home</option>
                </select>
              </div>

              {/* Skills */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Required Skills
                </label>

                <textarea
                  rows={4}
                  placeholder="React, Next.js, Node.js, MongoDB"
                  value={form.skillsets}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      skillsets: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:scale-[1.01] transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {loading ? "Creating Job..." : "Create Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
