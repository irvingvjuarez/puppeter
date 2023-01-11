const puppeteer = require("puppeteer")

describe("First test suit", () => {
	it("Opening and closing the browser", async () => {
		const browser = await puppeteer.launch({
			headless: false
		})

		const page = await browser.newPage()
		await page.goto("https://platzi.com/home")

		await puppeteer.waitForTimeout(1000)
		browser.close()
	})
})