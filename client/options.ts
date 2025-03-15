import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { writeFileSync } from "node:fs";
const url = "https://siteapps.deddie.gr/outages2public";

const getMunicipalityOptions = async () => {
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: true
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Get all Prefecture options
    const prefectures = await page.evaluate(() => {
        const selectElement = document.querySelector("#PrefectureID");
        if (!selectElement) return [];

        return Array.from(selectElement.querySelectorAll("option"))
            .filter(option => option.value.trim() !== "") // Exclude empty values
            .map(option => ({
                id: option.value.trim(),
                value: option.textContent?.trim() || ""
            }));
    });

    console.log(`Found ${prefectures.length} prefectures. Fetching municipalities in parallel...`);

    // Function to get municipalities for a given prefecture ID
    const fetchMunicipalities = async (prefectureId: string) => {
        const newPage = await browser.newPage(); // Open a new page per prefecture for concurrency
        await newPage.goto(url, { waitUntil: "networkidle2" });

        await newPage.select("#PrefectureID", prefectureId);
        await newPage.waitForTimeout(1000); // Allow municipalities to load

        const municipalities = await newPage.evaluate(() => {
            const selectElement = document.querySelector("#MunicipalityID");
            if (!selectElement) return [];

            return Array.from(selectElement.querySelectorAll("option"))
                .filter(option => option.value.trim() !== "") // Exclude empty values
                .map(option => ({
                    id: option.value.trim(),
                    value: option.textContent?.trim() || ""
                }));
        });

        await newPage.close(); // Close the page after extracting data
        return { id: prefectureId, municipalities };
    };

    // Run all prefecture fetch operations in parallel
    const results = await Promise.all(prefectures.map(pref => fetchMunicipalities(pref.id)));

    await browser.close();
    return results;
};

getMunicipalityOptions()
    .then(data => {
        writeFileSync("municipalities.json", JSON.stringify(data, null, 2));
        console.log("Data saved to municipalities.json");
    })
    .catch(console.error);