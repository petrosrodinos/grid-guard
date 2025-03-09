import { useState } from "react"

export const useLocation = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)

    const addLocation = async ({
        prefecture,
        municipality,
        address
    }: any) => {
        console.log(prefecture, municipality, address)
    }

    return {
        addLocation
    }
}