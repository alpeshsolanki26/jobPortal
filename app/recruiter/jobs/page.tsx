"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJobs } from "../../services/api";
import Link from "next/link";

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
      <Link
        href="/recruiter/jobs/create"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Job
      </Link>
      <div className="grid gap-5">
        <div className="grid md:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => router.push(`/recruiter/jobs/${job._id}`)}
              className="border rounded-lg p-5 shadow"
            >
              <h2 className="text-xl font-bold"> {job.title} </h2>
              <p>
                {" "}
                <strong> Recruiter: </strong> {job.recruiter?.name}{" "}
              </p>
              <p>
                {" "}
                <strong> Job Type: </strong> {job.jobType}{" "}
              </p>
              <p>
                {" "}
                <strong> Salary: </strong> ₹{job.salary}{" "}
              </p>
              <p>
                <strong> Deadline: </strong>{" "}
                {new Date(job.deadline).toLocaleDateString()}
              </p>
              <p className="mt-2">
                <strong> Skills: </strong>
              </p>
              <div className="flex gap-2 flex-wrap mt-2">
                {job.skillsets?.map((skill, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
