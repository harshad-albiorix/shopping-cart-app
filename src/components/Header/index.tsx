"use client";
import { logoutUser } from "@/lib/auth";
import { logout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const cartSelector = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
  });

  const itemCount = cartSelector.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/")}
        role="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="50"
          viewBox="0 0 200 50"
        >
          <text
            x="10"
            y="35"
            fontFamily="Arial, sans-serif"
            fontSize="30"
            fill="white"
          >
            Hardy Store
          </text>
        </svg>
      </div>

      <nav className="hidden md:flex space-x-6">
        <Link
          href="/cart"
          className="relative hover:text-blue-400 font-semibold"
        >
          View Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {itemCount}
            </span>
          )}
        </Link>
        <button
          className="hover:text-blue-400 font-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};
