"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/api";

interface Props {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: Props) {
  const [profile, setProfile] = useState({
    name: "",
    contactNumber: "",
    bio: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    loadProfile();
  }, []);
  const handleUpdate = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token not found");
        return;
      }

      const response = await updateProfile(token, profile);

      console.log(response);

      setMessage("Profile updated successfully");

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };
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

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Profile</h2>

          <button onClick={onClose} className="text-red-500">
            ✕
          </button>
        </div>
        {message && (
          <div className="mb-4 bg-green-100 border border-green-300 text-green-700 p-3 rounded">
            {message}
          </div>
        )}
        <input
          className="w-full border p-3 rounded mb-3"
          value={profile.name}
          onChange={(e) =>
            setProfile({
              ...profile,
              name: e.target.value,
            })
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Contact Number"
          value={profile.contactNumber}
          onChange={(e) =>
            setProfile({
              ...profile,
              contactNumber: e.target.value,
            })
          }
        />

        <textarea
          className="w-full border p-3 rounded mb-3"
          rows={4}
          placeholder="Bio"
          value={profile.bio}
          onChange={(e) =>
            setProfile({
              ...profile,
              bio: e.target.value,
            })
          }
        />

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
}
function loadProfile() {
  throw new Error("Function not implemented.");
}
