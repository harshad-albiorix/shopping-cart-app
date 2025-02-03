import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
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
        <Link href="/" className="hover:text-blue-400 font-semibold">
          View Cart
        </Link>
        <Link href="/" className="hover:text-blue-400 font-semibold">
          Logout
        </Link>
      </nav>
    </header>
  );
};
