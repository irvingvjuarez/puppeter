const puppeteer = require("puppeteer")
const { MAX_TIMEOUT } = require("../globals")
const { getText } = require("../lib/helpers")

describe("Extracting info and using it in another test", () => {
	let browser, page, latestCourse

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true,
			args: ["--user-agent=foo"]
		})

		page = await browser.newPage()
	}, MAX_TIMEOUT)

	afterAll(async () => {
		const browserOpen = await page.evaluate(() => navigator.userAgent)
		if (browserOpen) {
			browser.close()
		}
	}, MAX_TIMEOUT)

	it("Extracting latest released course", async () => {
		await page.goto("https://platzi.com", { waitUntil: "networkidle0" })
		const cssSelector = ".RecentLaunches-list > a:first-child .RecentLaunches-card-content"
		latestCourse = await getText(page, cssSelector)
	}, MAX_TIMEOUT)

	it("Should match the title with a text", () => {
		expect(latestCourse).toMatch("Ethereum")
	}, MAX_TIMEOUT)
})