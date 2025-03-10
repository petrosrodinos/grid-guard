import { useState } from "react";
import supabase from "../utils/supabase";
import { useIonLoading } from "@ionic/react";

export const useAuth = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [present, dismiss] = useIonLoading();

    const registerUser = async ({ phone, password, fullName }: any) => {
        try {
            present({
                message: "Registering",
            })
            const { data, error } = await supabase.auth.signUp({
                phone: `+30${phone}`,
                password: password,
                options: {
                    data: {
                        fulll_name: fullName,
                        email: "",
                        phone: `+30${phone}`,
                    },
                    channel: "sms",
                },
            });

            console.log(data, error);

            if (error) {
                setError(error.message);
                return;
            }

            if (data) {
                await supabase.from("users").upsert({
                    user_id: data.user?.id,
                    full_name: fullName,
                    email: "",
                    phone: `+30${phone}`,
                });
                setData(data)
                return data
            }
        } catch (error: any) {
            setError(error.message)
        }
        finally {
            dismiss()
        }
    };

    const loginUser = async ({ phone, password }: any) => {
        try {
            present({
                message: "Logging In",
            })
            const { data, error } = await supabase.auth.signInWithPassword({
                phone: `+30${phone}`,
                password: password,
            })

            console.log(data, error);

            if (error) {
                setError(error.message);
                return;
            }

            if (data) {
                setData(data)
                return data
            }
        } catch (error: any) {
            setError(error.message)
        }
        finally {
            dismiss()
        }
    };

    const getUser = async () => {
        try {

            const { error, data: { user } } = await supabase.auth.getUser()


            if (error) {
                setError(error.message);
                return;
            }

            if (user) {
                return user
            }

            return null;
        } catch (error: any) {
            setError(error.message)
        }
        finally {
        }
    };

    const verifyOtp = async ({ phone, otp }: any) => {
        try {
            present({
                message: "Verifing OTP",
            })
            const {
                data: { session },
                error,
            } = await supabase.auth.verifyOtp({
                phone: `+30${phone}`,
                token: otp,
                type: 'sms',
            })
            if (error) {
                setError(error.message)
                return
            }
            if (session) {
                setData(session)
                return session
            }
        } catch (error: any) {
            setError(error.message)

        }
        finally {
            dismiss()
        }
    }

    const resendOtp = async ({ phone }: any) => {
        try {
            setLoading(true)
            present({
                message: "Resending OTP",
            })
            const { error } = await supabase.auth.resend({
                type: 'sms',
                phone: `+30${phone}`,

            })
            if (error) {
                setError(error.message)
                return
            }

        } catch (error: any) {
            setError(error.message)

        }
        finally {
            setLoading(false)
            dismiss()
        }
    }

    return { registerUser, loginUser, error, loading, data, setError, getUser, verifyOtp, resendOtp };
}