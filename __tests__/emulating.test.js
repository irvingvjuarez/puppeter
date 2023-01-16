const puppeteer = require("puppeteer")

describe("Emulating devices", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: false
		})

		page = await browser.newPage()
	})

	beforeEach(async () => {
		await page.goto("https://platzi.com")
	})

	it.only("Emulating mobile phone", async () => {
		await page.emulate({
			name: "Mobile phone",
			viewport: {
				width: 375,
				height: 667,
				deviceScaleFactor: 2,
				isMobile: true,
				hasTouch: true,
				isLandscape: false
			},
			userAgent: "Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36"
		})

		await page.waitForTimeout(3000)
	})
})