const puppeteer = require("puppeteer")

describe("Using firefox with Puppeteer", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: false,
			product: "firefox"
		})

		page = await browser.newPage()
	})

	beforeEach(async () => {
		await page.goto("https://platzi.com")
	})

	afterAll(async () => {
		await browser.close()
	})

	it("Running firefox browser", async () => {
		await page.waitForSelector("img")
	})
})