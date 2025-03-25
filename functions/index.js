const express = require('express')
const puppeteer = require("puppeteer");
const createClient = require("@supabase/supabase-js").createClient;
const admin = require("firebase-admin");
const cors = require('cors');
const serviceAccount = require("./service-key.json");
const app = express()

app.use(cors());

const OUTAGES_LINK = "https://siteapps.deddie.gr/outages2public";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1dnVkcGF0aG11bnlkaGh2dHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MzQzNzAsImV4cCI6MjA1NzExMDM3MH0.qVcfH7_hiiYP9S6AOuzbsnC72ud7njNmfBnpek89pvg";
const SUPABASE_URL = "https://euvudpathmunydhhvtyh.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const messaging = admin.messaging();

let browser;
let page;


app.get("/", async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");

        const userId = req.query.userId;
        const usersWithLocations = await getUsersWithLocations(userId);
        await initBrowser();
        const usersWithOutages = await getUserOutages(usersWithLocations);

        const todaysOutages = await getTodaysOutages(usersWithOutages);

        if (!userId) {
            await sendNotifications(todaysOutages);
        }


        res.status(200).send({ data: todaysOutages });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


const getUserOutages = async (users) => {
    const usersWithOutages = await Promise.all(users.map(async (user) => {
        user.locations = await Promise.all(user.locations.map(async (location) => {
            const { prefecture, municipality } = location;
            location.outages = await getLocationOutageData(prefecture, municipality);
            return location;
        }));
        return user;
    }));
    await browser.close();
    return usersWithOutages;
};

const getUsersWithLocations = async (userId) => {
    try {
        const query = supabase.from('users').select(`*,locations (prefecture,municipality,address,name )`);
        const { data, error } = userId ? await query.eq('user_id', userId) : await query;
        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
};

const getLocationOutageData = async (prefecture, municipality) => {
    try {
        await page.waitForSelector("#PrefectureID", { timeout: 5000 });
        await page.select("#PrefectureID", prefecture);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        await page.waitForSelector("#MunicipalityID", { timeout: 5000 });
        await page.select("#MunicipalityID", municipality);
        // await new Promise(resolve => setTimeout(resolve, 2000));
        await page.waitForSelector("#tblOutages", { timeout: 5000 });

        const tableData = await page.evaluate(() => {
            const table = document.querySelector("#tblOutages");
            if (!table) return [];
            return Array.from(table.querySelectorAll("tbody tr")).map(row =>
                Array.from(row.querySelectorAll("td")).map(td => td.innerText.trim())
            );
        });

        return formatData(tableData);
    } catch (error) {
        console.error("Error in getLocationOutageData:", error);
        throw error;
    }
};

const formatData = (data) => {
    return data.map(item => {
        const formatDateTime = (dateTimeString) => {
            const [date, time, period] = dateTimeString.split(" ");
            return { date, time: `${time} ${period}` };
        };
        return {
            from: formatDateTime(item[0]),
            to: formatDateTime(item[1]),
            area: item[2],
            areaDescription: item[3],
            reason: item[5],
        };
    });
};

const initBrowser = async () => {
    browser = await puppeteer.connect({
        browserWSEndpoint: 'https://production-sfo.browserless.io/?token=S0V4xaDt2YdJQL8b78c3e8ef0923c41902cf478488',
    });

    page = await browser.newPage();
    await page.goto(OUTAGES_LINK, { waitUntil: "networkidle2" });
};

const getTodaysOutages = (users) => {
    const today = new Date().toLocaleDateString("el-GR");

    return users.map(user => ({
        ...user,
        locations: user.locations.map(location => ({
            ...location,
            outages: location.outages.filter(outage => outage.from.date === today)
        })).filter(location => location.outages.length > 0)
    })).filter(user => user.locations.length > 0);
};


const sendNotifications = async (users) => {
    users.forEach(async (user) => {
        if (user.pushNotificationsToken) {
            user.locations.forEach(location => {
                if (location.outages.length > 0) {
                    sendPushNotification({
                        title: "Διακοπή ρεύματος",
                        body: `Διακοπή ρεύματος στην διεύθυνση ${location.name} πατήστε για περισσότερες πληροφορίες`,
                        token: user.pushNotificationsToken
                    });
                }
            });
        }
    });
};

const sendPushNotification = ({ title, body, token }) => {
    const message = { notification: { title, body }, token };
    messaging.send(message)
        .then(response => console.log("Successfully sent message:", response))
        .catch(error => console.error("Error sending message:", error));
};


exports.getOutages = app