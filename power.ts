// deno-lint-ignore-file no-explicit-any
// deno-lint-ignore no-explicit-any
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import admin from "https://esm.sh/firebase-admin@13.2.0?bundle";
import fs from "node:fs";

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
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();



const getUserOutages = async () => {

    const usersWithLocations: User[] = await getUsersWithLocations();

    const usersWithOutages = await Promise.all(usersWithLocations.map(async (user: User) => {
        user.locations = await Promise.all(user.locations.map(async (location: Location) => {
            const { prefecture, municipality } = location;
            location.outages = await getLocationOutageData(prefecture, municipality);
            return location;
        }));
        return user;
    }));

    return usersWithOutages;
};

const getUsersWithLocations = async (): Promise<User[]> => {
    try {
        const { data, error } = await supabase.from('users').select(`
            *,locations (prefecture,municipality,address,name )
          `);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        throw error;
    }
}


const getLocationOutageData = async (prefecture: string, municipality: string) => {
    try {
        // const browser = await puppeteer.launch({ headless: true });
        const browser = await puppeteer.launch({
            executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(OUTAGES_LINK, { waitUntil: "networkidle2" });

        await page.select("#PrefectureID", prefecture);
        await page.waitForTimeout(1000);

        await page.select("#MunicipalityID", municipality);
        await page.waitForTimeout(2000);

        const tableData = await page.evaluate(() => {
            const table = document.querySelector("#tblOutages");
            if (!table) return [];

            const rows = Array.from(table.querySelectorAll("tbody tr"));
            return rows.map((row: any) => {
                return Array.from(row.querySelectorAll("td")).map((td: any) => td.innerText.trim());
            });
        });

        await browser.close();

        const formattedData = formatData(tableData);
        return formattedData;
    } catch (error) {
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

// getLocationOutageData("21", "413").then(data => console.log("Outage Data:", data)).catch(console.error);

// getUsersWithLocations().then(data => console.log("Users Data:", data)).catch(console.error);

getUserOutages().then(data => console.log("User Outages:", data)).catch(console.error);

const sendTestNotification = () => {
    sendPushNotification({
        title: "Test Notification",
        body: "This is a test notification",
        token: "dcrTUul9S-2gpydYJtpz1s:APA91bHciX8JTObAUbfa9p-6FzdMFJN22Qcq-fqwoyD-2z8YkhRkF8gGktnFqjygV6qRBDgNmF8laVRtJPVqGiQ_OvOPtOlv4Wj7kfu4dfn8LCuw2FhHOF4"
    })
}

// try {
//     sendTestNotification();
//     console.log("Notification sent");
// } catch (error) {
//     console.error("Error sending notification2:", error);
// }