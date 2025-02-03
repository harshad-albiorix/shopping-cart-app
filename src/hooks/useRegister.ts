import { useMutation } from "@tanstack/react-query";
import { registerUser, RegisterCredentials, User } from "@/lib/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export function useRegister() {

    const router = useRouter();

    const registerMutation = useMutation<User, Error, RegisterCredentials>({
        mutationFn: registerUser,
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First Name is Required"),
            lastName: Yup.string().required("Last Name is Required"),

            email: Yup.string().email("Invalid email address").required("Email is Required"),
            password: Yup.string().required("Password is Required"),
        }),
        onSubmit: async (values: RegisterCredentials) => handleSubmit(values),
    });

    const handleSubmit = async (values: RegisterCredentials) => {
        try {
            await registerMutation.mutateAsync(values);
            formik.resetForm();
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return {
        formik,
    };
}
