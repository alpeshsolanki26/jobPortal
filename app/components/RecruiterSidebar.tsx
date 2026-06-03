"use client";

import Link from "next/link";
import { useState } from "react";
import ProfileModal from "../components/ProfileModal";

export default function RecruiterSidebar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
        <h1 className="text-2xl font-bold mb-8">Recruiter</h1>

        <nav className="flex flex-col gap-4">
          <Link href="/recruiter/dashboard">Dashboard</Link>

          <Link href="/recruiter/jobs">Jobs</Link>

          <Link href="/recruiter/jobs/create">Create Job</Link>

          <Link href="/recruiter/applicants">Applicants</Link>

          <button className="text-left" onClick={() => setShowProfile(true)}>
            Profile
          </button>

          <Link href="/logout">Logout</Link>
        </nav>
      </aside>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </>
  );
}
