const puppeteer = require("puppeteer")
const { MAX_TIMEOUT } = require("../globals")

describe("Testing app performance", () => {
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
	}, MAX_TIMEOUT)

	afterAll(async () => {
		await browser.close()
	})

	it("Measuring automation performance", async () => {
		await page.waitForSelector("img")
		const metrics = await page.metrics()

		console.log(metrics)
	})

	it("Measuring the page performance", async () => {
		await page.waitForSelector("img")
		const performance = await page.evaluate(() => JSON.stringify(window.performance))
		console.log(JSON.parse(performance))
	})
})