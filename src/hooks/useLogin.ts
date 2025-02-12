import { useMutation } from "@tanstack/react-query";
import { loginUser, LoginCredentials, User } from "@/lib/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/lib/firebaseConfig";


export function useLogin() {
    const dispatch = useDispatch();
    const router = useRouter()

    const loginMutation = useMutation<User, Error, LoginCredentials>({
        mutationFn: loginUser,
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: async (values: LoginCredentials) => handleSubmit(values),
    });

    const handleSubmit = async (values: LoginCredentials) => {
        try {

            const token = await loginWithEmail({
                email: values.email, password: values.password
            })

            if (token) {
                await axios.post("/api/set-cookies", { token: token })

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data: any = await loginMutation.mutateAsync(values);

                dispatch(
                    loginSuccess({
                        token: data.data.token,
                        user: {
                            firstName: data.data.firstName,
                            lastName: data.data.lastName,
                            email: data.data.email,
                        },
                    })
                );

                router.push("/dashboard")
            }

        } catch (error) {
            console.error(error);
        }
    };


    return {
        formik,
    };
}
