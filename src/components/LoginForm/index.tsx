"use client";

import { useLogin } from "@/hooks/useLogin";
import { InputField } from "../core";
import Link from "next/link";

export const LoginForm = () => {
  const { formik } = useLogin();

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4">
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Email address"
          formik={formik}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          formik={formik}
        />

        <Link
          href="/register"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition duration-200"
        >
          {"Don't have an account?"}{" "}
          <span className="underline">Sign up here</span>
        </Link>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={formik.isSubmitting || formik.isValidating}
        >
          {formik.isSubmitting ? "Logging in..." : "Sign in"}
        </button>
      </div>

      {formik.isSubmitting && (
        <p className="text-blue-500 mt-2">Logging in...</p>
      )}
    </form>
  );
};
