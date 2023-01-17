const puppeteer = require("puppeteer")
const { AxePuppeteer } = require("@axe-core/puppeteer")
const { MAX_TIMEOUT } = require("../globals")

describe("Testing accessibility", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true
		})

		page = await browser.newPage()
	})

	// beforeEach(async () => {
	// 	await page.goto("https://platzi.com")
	// })

	afterAll(async () => {
		await browser.close()
	})

	it("Taking accessibility snapshot", async () => {
		await page.goto("https://platzi.com")
		await page.waitForSelector("img")
		const snapshot = await page.accessibility.snapshot()
		console.log(snapshot)
	})

	it.only("Testing accessibility w/axe", async () => {
		await page.setBypassCSP(true)
		await page.goto("https://platzi.com")
		await page.waitForSelector("img")

		const accessibilityReport = await new AxePuppeteer(page).analyze()
		console.log(accessibilityReport.violations[0])
	}, MAX_TIMEOUT)
})