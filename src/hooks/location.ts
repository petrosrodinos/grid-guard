import { useEffect, useState } from "react"
import supabase from "../utils/supabase"
import { useIonLoading } from "@ionic/react"
import { useUser } from "./user"

export const useLocation = () => {
    const { getUser } = useUser()
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<any>([])
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        try {
            getLocationsWithOutages()
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

    const getLocationsWithOutages = async () => {
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

    const getLocations = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("userId") || "{}");

            const { data, error } = await supabase
                .from('locations')
                .select('*')
                .eq('user_id', userId);

            if (error) {
                setError(error.message);
                return null;
            }

            setData(data);
            return data;

        } catch (error: any) {
            setError(error.message)
            return null;
        }
    }

    const updateLocation = async (data: any) => {
        try {
            present({
                message: "Updating",
            })
            const { error } = await supabase.from("locations").upsert(data)
            if (error) {
                setError(error.message)
                return
            }
        } catch (error: any) {
            setError(error.message)

        }
        finally {
            dismiss()
        }
    }

    const deleteLocation = async (id: string) => {
        try {
            present({
                message: "Deleting",
            })
            const { error } = await supabase.from("locations").delete().eq("id", id)
            if (error) {
                setError(error.message)
                return
            }
            return true
        } catch (error: any) {
            setError(error.message)

        }
        finally {
            dismiss()
        }
    }


    return {
        addLocation, error, data, setData, setError, getLocationsWithOutages, updateLocation, getLocations, deleteLocation
    }
}