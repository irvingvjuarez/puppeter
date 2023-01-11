const puppeteer = require("puppeteer")

describe("First test suit", () => {
	it("Opening and closing the browser", async () => {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 0,
			devtools: false,
			args: ["--window-size=1200,800"],
			defaultViewport: null
		})

		const page = await browser.newPage()
		await page.goto("https://platzi.com/home")

		browser.close()
	}, 8000)
})