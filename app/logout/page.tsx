"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function logoutPage() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    router.replace("/login");
  }, []);
  return <p>Logging out...</p>;
}
