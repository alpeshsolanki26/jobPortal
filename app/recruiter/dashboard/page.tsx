import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Dashboard</h1>
      <Link
        href="/recruiter/jobs/create"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Job
      </Link>
    </>
  );
}
