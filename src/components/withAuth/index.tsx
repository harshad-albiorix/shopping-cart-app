"use client";
import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function withAuth(Component: ComponentType) {
  return function ProtectedPage(props: React.ComponentProps<typeof Component>) {
    const router = useRouter();

    // Get the auth state from Redux
    const { token } = useSelector((state: RootState) => state.auth);

    // State to track if the component is mounted to handle client-side only logic
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      // Ensure we only run this on the client side
      setIsMounted(true);

      if (isMounted && !token) {
        router.push("/login");
      }
    }, [isMounted, token, router]);

    if (!isMounted || !token) {
      return null; // Return nothing or a loading spinner while the check is happening
    }

    return <Component {...props} />;
  };
}
