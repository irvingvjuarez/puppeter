const puppeteer = require("puppeteer")
const { toMatchImageSnapshot } = require("jest-image-snapshot")
const { MAX_TIMEOUT } = require("../globals")
expect.extend({ toMatchImageSnapshot })

describe("Visual testings", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true
		})

		page = await browser.newPage()
	})

	beforeEach(async () => {
		await page.goto("https://google.com")
	})

	it("Snapshot of the whole page", async () => {
		await page.waitForSelector("img[alt='Google']")
		await page.setViewport({
			width: 1034,
			height: 575
		})

		const ss = await page.screenshot({
			fullPage: true
		})

		expect(ss).toMatchImageSnapshot()
	}, MAX_TIMEOUT)
})