const puppeteer = require("puppeteer")

describe("Testing accessibility", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true
		})

		page = await browser.newPage()
	})

	beforeEach(async () => {
		await page.goto("https://platzi.com")
	})

	afterAll(async () => {
		await browser.close()
	})

	it("Taking accessibility snapshot", async () => {
		await page.waitForSelector("img")
		const snapshot = await page.accessibility.snapshot()
		console.log(snapshot)
	})
})