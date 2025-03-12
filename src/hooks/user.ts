import { useState } from "react";
import supabase from "../utils/supabase";
import { useIonLoading, useIonToast } from "@ionic/react";
import { useAuth } from "./auth";

export const useUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [present, dismiss] = useIonLoading();
    const [presentToast] = useIonToast();
    const { getUserSession } = useAuth()


    const getUser = async () => {
        try {
            setLoading(true)
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
            setLoading(false)
        }
    };

    const getUserData = async () => {
        try {

            setLoading(true)

            const session = await getUserSession()


            const { data, error } = await supabase.from("users").select("*").eq("user_id", session?.session?.user.id).single()
            if (error) {
                setError(error.message)
                return
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
            setLoading(false)
        }
    }

    const updateUser = async (data: any) => {
        try {
            present({
                message: "Updating",
            })

            const session = await getUserSession()


            const { error } = await supabase.from("users").update(data).eq("user_id", session?.session?.user.id)
            if (error) {
                setError(error.message)
                return
            }
            presentToast({
                message: "Location Deleted successfully",
                duration: 1500,
                position: "top",
                cssClass: "toast-success",
            });

        } catch (error: any) {
            setError(error.message)

        }
        finally {
            dismiss()
        }
    }



    return { error, loading, data, getUserData, setError, getUser, updateUser };
}