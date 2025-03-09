import { useState } from "react"
import supabase from "../utils/supabase"
import { useIonLoading } from "@ionic/react"
import { useAuth } from "./auth"

export const useLocation = () => {
    const { getUser } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<any>(null)
    const [present, dismiss] = useIonLoading();

    const addLocation = async ({
        prefecture,
        municipality,
        address,
    }: any) => {
        present({
            message: "Adding Location",
        })
        try {
            const user = await getUser();
            if (!user) {
                setError("User not found")
                return;
            }

            const { error } = await supabase
                .from('locations')
                .insert({ user_id: user.id, prefecture, municipality, address })

            if (error) {
                setError(error.message);
                return null;
            }

            return true;


        } catch (error: any) {
            setError(error.message)
            return null;


        } finally {
            dismiss()
        }

    }

    return {
        addLocation, error, data, setData, setError
    }
}