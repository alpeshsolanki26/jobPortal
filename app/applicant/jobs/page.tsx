"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJobs } from "../../services/api";

interface Job {
  _id: string;
  title: string;
  salary: number;
  jobType: string;
  deadline: string;
  skillsets: string[];

  recruiter: {
    name: string;
    bio: string;
    contactNumber: string;
  };
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchJobs(token);
  }, []);

  const fetchJobs = async (token: string) => {
    try {
      const result = await getJobs(token);
      console.log(result);
      if (Array.isArray(result)) {
        setJobs(result);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-10">
      <h1 className="text-3x1 font-bold mb-8">Jobs List</h1>
      <div className="grid gap-5">
        <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => router.push(`/applicant/jobs/${job._id}`)}
              className="border rounded-lg p-5 shadow cursor-pointer hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold mb-3"> {job.title} </h2>
              <p className="mb-2">
                <strong>Deadline:</strong>{" "}
                {new Date(job.deadline).toLocaleDateString()}{" "}
              </p>
              <div className="flex flex-wrap gap-2">
                {" "}
                {job.skillsets?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    {" "}
                    {skill}{" "}
                  </span>
                ))}{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
