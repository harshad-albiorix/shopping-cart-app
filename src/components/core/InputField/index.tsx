/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps } from "formik";

interface IInputFieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  name: string;
  placeholder?: string;
  formik: FormikProps<any>;
}

export const InputField: React.FC<IInputFieldProps> = ({
  label,
  type = "text",
  name,
  formik,
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={label}
          name={name}
          type={type}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {formik.touched[name] && formik.errors[name] && (
        <>
          {typeof formik.errors[name] === "string" && (
            <p className="text-red-500 mt-2">{formik.errors[name]}</p>
          )}
        </>
      )}
    </div>
  );
};
