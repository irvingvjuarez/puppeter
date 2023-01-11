const puppeteer = require("puppeteer")

describe("First test suit", () => {
	it("Opening and closing the browser", async () => {
		const browser = await puppeteer.launch({
			headless: true,
			defaultViewport: null
		})

		const page = await browser.newPage()
		await page.goto("https://yahoo.com/")
		await page.waitForSelector("img")

		await page.goto("https://platzi.com")
		await page.goBack()
		await page.goForward()

		browser.close()
	}, 30000)
})