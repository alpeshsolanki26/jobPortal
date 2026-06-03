"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getJobById, applyJob } from "../../../services/api";
export default function JobDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState<any>(null);
  const [sop, setSop] = useState("");
  const [applying, setApplying] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && params.id) {
      fetchJob(token, params.id as string);
    }
  }, []);
  const fetchJob = async (token: string, id: string) => {
    const result = await getJobById(token, id);
    console.log(result);
    setJob(result);
  };
  if (!job) {
    return <p> Loading... </p>;
  }

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      setApplying(true);

      const result = await applyJob(token, params.id as string, sop);

      console.log(result);

      alert(result.message || "Applied Successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      {" "}
      <h1 className="text-4xl font-bold mb-5"> {job.title} </h1>{" "}
      <p>
        {" "}
        <strong> Job Type: </strong> {job.jobType}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong> Salary: </strong> ₹{job.salary}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong> Max Applicants: </strong> {job.maxApplicants}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong> Positions: </strong> {job.maxPositions}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong> Active Applications: </strong> {job.activeApplications}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong> Deadline: </strong>{" "}
        {new Date(job.deadline).toLocaleDateString()}{" "}
      </p>{" "}
      <div className="mt-5">
        {" "}
        <h2 className="font-bold mb-3"> Skills Required </h2>{" "}
        <div className="flex flex-wrap gap-2">
          {" "}
          {job.skillsets?.map((skill: string, index: number) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded">
              {" "}
              {skill}{" "}
            </span>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <div className="mt-8">
        {" "}
        <label className="block mb-2 font-bold"> SOP </label>{" "}
        <textarea
          rows={5}
          value={sop}
          onChange={(e) => setSop(e.target.value)}
          placeholder="Why should you be selected for this job?"
          className="w-full border rounded p-3"
        />{" "}
      </div>{" "}
      <button
        onClick={handleApply}
        disabled={applying}
        className="mt-5 bg-blue-600 text-white px-5 py-3 rounded"
      >
        {" "}
        {applying ? "Applying..." : "Apply Job"}{" "}
      </button>{" "}
    </div>
  );
}
