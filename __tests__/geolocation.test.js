const puppeteer = require("puppeteer")

describe("Geolocation", () => {
	let browser, page
	const url = "https://chercher.tech/practice/geo-location.html"

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true
		})

		page = await browser.newPage()
	})

	afterAll(async () => {
		await browser.close()
	})

	it("Changing geolocation", async () => {
		const context = browser.defaultBrowserContext()
		await context.overridePermissions(url, [
			"geolocation"
		])

		await page.setGeolocation({ latitude: 90, longitude: 20 })

		await page.goto(url)
		const locationData = await page.$eval("#demo", el => el.textContent)

		expect(locationData).toMatch("Latitude: 90")
		expect(locationData).toMatch("Longitude: 20")
	})
})