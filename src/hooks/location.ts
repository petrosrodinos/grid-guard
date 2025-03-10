import { useEffect, useState } from "react"
import supabase from "../utils/supabase"
import { useIonLoading } from "@ionic/react"
import { useAuth } from "./auth"

export const useLocation = () => {
    const { getUser } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<any>([])
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        try {
            getLocations()
        } catch (error: any) {
            setError(error.message)
        }
    }, [])

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

    const getLocations = async () => {
        setData(
            [
                {
                    prefecture: "Tokyo",
                    municipality: "Shinjuku",
                    address: "Shinjuku Station",
                    outage: [
                        {
                            from: "2025-03-11 10:00",
                            to: "2025-03-11 14:00",
                            area: "Main Street & 5th Ave",
                            reason: "Scheduled maintenance",
                        },
                        {
                            from: "2025-03-12 08:00",
                            to: "2025-03-12 12:00",
                            area: "Downtown District",
                            reason: "Emergency repair"
                        }
                    ]
                },
                {
                    prefecture: "Tokyo",
                    municipality: "Shibuya",
                    address: "Shibuya Crossing",
                    outage: [
                        {
                            from: "2025-03-11 10:00",
                            to: "2025-03-11 14:00",
                            area: "Main Street & 5th Ave",
                            reason: "Scheduled maintenance",
                        },
                        {
                            from: "2025-03-12 08:00",
                            to: "2025-03-12 12:00",
                            area: "Downtown District",
                            reason: "Emergency repair"
                        }
                    ]
                }
            ]
        );
    }

    return {
        addLocation, error, data, setData, setError, getLocations
    }
}