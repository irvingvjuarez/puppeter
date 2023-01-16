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

	beforeEach(async () => {
		await page.goto("https://platzi.com")
	})

	it("Creating screenshots", async () => {
		await page.screenshot({
			path: "./screenshots/capture.png",
			fullPage: true
		})
	})

	it("Screenshot in a specific area", async () => {
		await page.screenshot({
			path: "./screenshots/capture-area.png",
			clip: {
				x: 0,
				y: 0,
				width: 250,
				height: 500
			}
		})
	})

	it("Screenshot with transparent background", async () => {
		await page.evaluate(() => document.body.style.background = "transparent")

		await page.screenshot({
			path: "./screenshots/transparent-bg.png",
			fullPage: true
		})
	})

	it.only("Screenshot to a certain element", async () => {
		const testBtn = await page.waitForSelector("a[href='/forms/profile_test/']")

		await testBtn.screenshot({
			path: "./screenshots/element.png"
		})
	})
})