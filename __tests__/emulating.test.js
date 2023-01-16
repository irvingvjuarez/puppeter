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

	it("Emulating mobile phone", async () => {
		await page.emulate({
			name: "Mobile device",
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

		await new Promise(r => setTimeout(r, 3000))
	})

	it("Emulating a dektop device", async () => {
		await page.setViewport({
			width: 1440,
			height: 1024
		})

		await new Promise(r => setTimeout(r, 3000))
	})

	it("Emulating tablet", async () => {
		const tablet = puppeteer.KnownDevices["iPad Pro"]
		await page.emulate(tablet)

		await new Promise(r => setTimeout(r, 3000))
	})

	it("Emulating mobile phone w/puppeteer", async () => {
		const mobile = puppeteer.KnownDevices["iPhone 12 Mini landscape"]

		await page.emulate(mobile)

		await new Promise(r => setTimeout(r, 3000))
	})
})