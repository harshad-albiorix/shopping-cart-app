"use client";

import Link from "next/link";
import { InputField } from "../core";
import { useRegister } from "@/hooks/useRegister";

export const RegisterForm = () => {
  const { formik } = useRegister();

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4">
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          formik={formik}
        />

        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          formik={formik}
        />

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
          href="/login"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition duration-200 "
        >
          {"Already have an account?"}{" "}
          <span className="underline">Login here</span>
        </Link>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={formik.isSubmitting || formik.isValidating}
        >
          {formik.isSubmitting ? "Registering..." : "Sign up"}
        </button>
      </div>
    </form>
  );
};
