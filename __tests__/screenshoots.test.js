const puppeteer = require("puppeteer")

describe("Screenshots", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true
		})

		page = await browser.newPage()
	})

	it("Creating screenshots", async () => {
		await page.goto("https://platzi.com")
		await page.screenshot({
			path: "./screenshots/capture.png",
			fullPage: true
		})
	})
})