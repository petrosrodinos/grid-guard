import { useState } from "react";
import supabase from "../utils/supabase";
import { useIonLoading, useIonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";

export const useUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [present, dismiss] = useIonLoading();
    const histort = useHistory();
    const [presentToast] = useIonToast();


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

    const getUserData = async () => {
        try {

            // const { data: userData, error: userError } = await supabase.auth.getUser();
            // if (userError) {
            //     setError(userError.message);
            //     return;
            // }
            const userId = JSON.parse(localStorage.getItem("userId") || "{}");

            if (typeof userId !== "string") {
                histort.push("/login")
                return;
            }

            const { data, error } = await supabase.from("users").select("*").eq("user_id", userId).single()
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
        }
    }

    const updateUser = async (data: any) => {
        try {
            present({
                message: "Updating",
            })
            const userId = JSON.parse(localStorage.getItem("userId") || "{}");

            if (typeof userId !== "string") {
                histort.push("/login")
                return;
            }
            const { error } = await supabase.from("users").update(data).eq("user_id", userId)
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