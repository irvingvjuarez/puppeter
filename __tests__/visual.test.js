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

	it("Snapshot test of only one element", async () => {
		const logo = await page.waitForSelector("img[alt='Google']")
		const ss = await logo.screenshot()

		expect(ss).toMatchImageSnapshot({
			failureThreshold: 0.5,
			failureThresholdType: "percent"
		})
	})

	it("Snapshot test of a mobile device", async () => {
		const mobile = puppeteer.KnownDevices["iPhone 12"]
		await page.emulate(mobile)

		const ss = await page.screenshot()
		expect(ss).toMatchImageSnapshot()
	})

	it("Remove image before to create a snapshot", async () => {
		await page.waitForSelector("img")
		await page.evaluate(() => [...document.querySelectorAll("img")].forEach(el => {
			el.remove()
		}))

		const ss = await page.screenshot()

		expect(ss).toMatchImageSnapshot()
	})
})