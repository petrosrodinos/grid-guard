import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


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

const OUTAGES_LINK = "https://siteapps.deddie.gr/outages2public";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1dnVkcGF0aG11bnlkaGh2dHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MzQzNzAsImV4cCI6MjA1NzExMDM3MH0.qVcfH7_hiiYP9S6AOuzbsnC72ud7njNmfBnpek89pvg"
const SUPABASE_URL = "https://euvudpathmunydhhvtyh.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const getUsersWithLocations = async () => {
    try {
        const { data, error } = await supabase.from('users').select(`
            id,
            full_name,
            phone,
            user_id,
            locations ( id, prefecture,municipality,address )
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
        return rows.map(row => {
            return Array.from(row.querySelectorAll("td")).map(td => td.innerText.trim());
        });
    });

    await browser.close();

    const formattedData = formatData(tableData);
    return formattedData;
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

// getLocationOutageData("21", "413").then(data => console.log("Outage Data:", data)).catch(console.error);

getUsersWithLocations().then(data => console.log("Users Data:", data)).catch(console.error);
