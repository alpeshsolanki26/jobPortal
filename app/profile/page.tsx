"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/app/services/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    contactNumber: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const data = await getProfile(token);

      setProfile({
        name: data.name || "",
        contactNumber: data.contactNumber || "",
        bio: data.bio || "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) return;

      await updateProfile(token, profile);

      alert("Profile Updated");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading Profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {profile.name?.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>

            <p className="text-gray-500">Manage your account details</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>

            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Contact Number</label>

            <input
              type="text"
              value={profile.contactNumber}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  contactNumber: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Bio</label>

            <textarea
              rows={5}
              value={profile.bio}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
