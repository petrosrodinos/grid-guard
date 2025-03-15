import { useState } from "react"
import supabase from "../utils/supabase"
import { useIonLoading, useIonToast } from "@ionic/react"
import { useAuth } from "./auth"

export const useLocation = () => {
    const { getUserSession } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<any>([])
    const [present, dismiss] = useIonLoading();
    const [presentToast] = useIonToast();
    const [loading, setLoading] = useState<boolean>(false);

    const addLocation = async ({
        prefecture,
        municipality,
        address,
        name,
    }: any) => {
        present({
            message: "Adding Location",
        })
        try {
            const session = await getUserSession()

            const { error } = await supabase
                .from('locations')
                .insert({ user_id: session?.session?.user.id, prefecture, municipality, address, name })

            if (error) {
                setError(error.message);
                return null;
            }

            presentToast({
                message: "Location added successfully",
                duration: 1500,
                position: "top",
                cssClass: "toast-success",
            });

            return true;


        } catch (error: any) {
            setError(error.message)
            return null;


        } finally {
            dismiss()
        }

    }

    const getLocationsWithOutages = async (): Promise<any[]> => {
        return [
            {
                prefecture: "67",
                municipality: "1530",
                address: "Shinjuku Station",
                name: "home",
                outages: [
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
                name: "home",
                prefecture: "8",
                municipality: "67",
                address: "Shibuya Crossing",
                outages: [
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

    }

    const getLocations = async () => {
        try {
            setLoading(true);

            const session = await getUserSession()

            const { data, error } = await supabase
                .from('locations')
                .select('*')
                .eq('user_id', session?.session?.user.id);

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
        finally {
            setLoading(false)
        }
    }

    const updateLocation = async (data: any) => {
        try {
            present({
                message: "Updating",
            })
            const { error } = await supabase.from("locations").update(data).eq("id", data.id)
            if (error) {
                setError(error.message)
                return null;
            }
            presentToast({
                message: "Location Updated successfully",
                duration: 1500,
                position: "top",
                cssClass: "toast-success",
            });
            return true;
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
            presentToast({
                message: "Location Deleted successfully",
                duration: 1500,
                position: "top",
                cssClass: "toast-success",
            });
            return true
        } catch (error: any) {
            setError(error.message)

        }
        finally {
            dismiss()
        }
    }


    return {
        addLocation, error, data, setData, setError, getLocationsWithOutages, updateLocation, getLocations, deleteLocation, loading
    }
}