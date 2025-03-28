import axios from 'axios';
import { CLOUD_FUNCTION_URL } from '../constants/env';

export const getUserOutages = async (userId: string) => {
    try {
        const { data } = await axios.get(`${CLOUD_FUNCTION_URL}?userId=${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        console.log("DATA", data.data)
        return data?.data?.[0] || [];
    } catch (error) {
        console.error(error);
        return [];
    }
} 