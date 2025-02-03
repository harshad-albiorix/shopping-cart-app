"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();

  // Get the auth state from Redux
  const { token } = useSelector((state: RootState) => state.auth);

  // State to track if the component is mounted to handle client-side only logic
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure we only run this on the client side
    setIsMounted(true);

    // Check if the component is mounted and token is present
    if (isMounted && token) {
      router.push("/dashboard"); // Redirect to dashboard if token is available
    } else if (isMounted && !token) {
      router.push("/login"); // Redirect to login if no token
    }
  }, [isMounted, token, router]);

  return null; // No UI for this component as it's just handling redirects
}
