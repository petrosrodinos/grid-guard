import { onRequest } from "firebase-functions/v2/https";
import puppeteer from "puppeteer";
import { createClient } from "@supabase/supabase-js";
import admin from "firebase-admin";

type DataItem = [
    string, // from
    string, // to
    string, // area
    string, // areaDescription
    string, // number
    string  // reason
];

interface FormattedData {
    from: DateTime;
    to: DateTime;
    area: string;
    areaDescription: string;
    reason: string;
}

interface DateTime {
    date: string;
    time: string;
}

interface User {
    id: string;
    user_id: string;
    full_name: string;
    phone: string;
    pushNotificationsToken: string;
    sms: boolean,
    push: boolean,
    viber: boolean,
    locations: Location[];
}

interface Location {
    prefecture: string;
    municipality: string;
    address: string;
    name: string;
    outages: FormattedData[];
}

const OUTAGES_LINK = "https://siteapps.deddie.gr/outages2public";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1dnVkcGF0aG11bnlkaGh2dHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MzQzNzAsImV4cCI6MjA1NzExMDM3MH0.qVcfH7_hiiYP9S6AOuzbsnC72ud7njNmfBnpek89pvg"
const SUPABASE_URL = "https://euvudpathmunydhhvtyh.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

admin.initializeApp();

const messaging = admin.messaging();

let browser: any;
let page: any;

export const getOutages = onRequest({ timeoutSeconds: 240, memory: "512MiB" }, async (request, response) => {

    try {
        const userId = request.query.userId as string;

        const usersWithLocations: User[] = await getUsersWithLocations(userId);

        await initBrowser();

        const usersWithOutages = await getUserOutages(usersWithLocations);

        if (!userId) {
            await sendNotifications(usersWithOutages);
        }

        response.status(200).send({ data: usersWithOutages });
    } catch (error: any) {
        response
            .status(500)
            .send({ error: error.message });
    }

});

const getUserOutages = async (users: User[]) => {
    const usersWithOutages = await Promise.all(users.map(async (user: User) => {
        user.locations = await Promise.all(user.locations.map(async (location: Location) => {
            const { prefecture, municipality } = location;
            location.outages = await getLocationOutageData(prefecture, municipality);
            return location;
        }));
        return user;
    }));
    await browser.close();

    return usersWithOutages;
};

const getUsersWithLocations = async (userId?: string): Promise<User[]> => {
    try {
        if (userId) {
            const { data, error } = await supabase.from('users').select(`
                *,locations (prefecture,municipality,address,name )
              `).eq('user_id', userId);

            if (error) {
                throw error;
            }

            return data;
        } else {
            const { data, error } = await supabase.from('users').select(`
                *,locations (prefecture,municipality,address,name )
              `);

            if (error) {
                throw error;
            }

            return data;
        }

    } catch (error) {
        throw error;
    }
}


const getLocationOutageData = async (prefecture: string, municipality: string) => {
    try {

        await page.waitForSelector("#PrefectureID", { timeout: 3000 });
        await page.select("#PrefectureID", prefecture);
        await new Promise(resolve => setTimeout(resolve, 1000));

        await page.waitForSelector("#MunicipalityID", { timeout: 3000 });
        await page.select("#MunicipalityID", municipality);
        await new Promise(resolve => setTimeout(resolve, 2000));

        await page.waitForSelector("#tblOutages", { timeout: 10000 });

        const tableData: any = await page.evaluate(() => {
            const table = document.querySelector("#tblOutages");
            if (!table) {
                return [];
            }

            const rows = Array.from(table.querySelectorAll("tbody tr"));
            return rows.map((row: any) => {
                return Array.from(row.querySelectorAll("td")).map((td: any) => td.innerText.trim());
            });
        });


        const formattedData = formatData(tableData);
        return formattedData;
    } catch (error) {
        console.error("Error in getLocationOutageData:", error);
        throw error;
    }
};


function formatData(data: DataItem[]): FormattedData[] {
    return data.map(item => {
        const formatDateTime = (dateTimeString: string): DateTime => {
            const [date, time, period] = dateTimeString.split(" ");
            // const [time, period] = timeWithPeriod.split(" ");
            return {
                date: date,
                time: `${time} ${period}`,
            };
        };

        return {
            from: formatDateTime(item[0]),
            to: formatDateTime(item[1]),
            area: item[2],
            areaDescription: item[3],
            reason: item[5],
        };
    });
}

const initBrowser = async () => {
    browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/opt/google/chrome/chrome' // Change the path
    });

    page = await browser.newPage();
    await page.goto(OUTAGES_LINK, { waitUntil: "networkidle2" });
};

const sendNotifications = async (users: User[]) => {
    users.forEach(async (user: User) => {
        if (user.pushNotificationsToken) {
            user.locations.map((location: Location) => {
                if (location.outages.length > 0) {
                    sendPushNotification({
                        title: "Διακοπή ρεύματος",
                        body: `Διακοπή ρεύματος στην διεύθυνση ${location.name} πατήστε για περισσότερες πληροφορίες`,
                        token: user.pushNotificationsToken
                    });
                }
            }
            );
        }
    });
}

const sendPushNotification = ({
    title,
    body,
    token
}: {
    title: string,
    body: string,
    token: string
}) => {
    const message = {
        notification: {
            title,
            body,
        },
        token,
    };

    messaging
        .send(message)
        .then((response: any) => console.log("Successfully sent message:", response))
        .catch((error: any) => console.error("Error sending message1:", error));
}



