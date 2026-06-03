"use client";

import Link from "next/link";
import { useState } from "react";
import ProfileModal from "../components/ProfileModal";

export default function ApplicantNavbar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
        <h1 className="font-bold text-xl">Applicant</h1>

        <div className="flex gap-6">
          <Link href="/applicant/jobs">Jobs</Link>

          <Link href="/applicant/applications">Applications</Link>

          <button onClick={() => setShowProfile(true)}>Profile</button>

          <Link href="/logout">Logout</Link>
        </div>
      </nav>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </>
  );
}
