import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";


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

const url = "https://siteapps.deddie.gr/outages2public";

const getOutageData = async () => {
    // const browser = await puppeteer.launch({ headless: true });
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.select("#PrefectureID", "21");
    await page.waitForTimeout(1000);

    await page.select("#MunicipalityID", "413");
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

getOutageData().then(data => console.log("Outage Data:", data)).catch(console.error);
