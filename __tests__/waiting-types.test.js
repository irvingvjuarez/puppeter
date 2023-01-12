const puppeteer = require("puppeteer")
const { MAX_TIMEOUT } = require("../globals")

describe("Testing different waiting types", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: false
		})

		page = await browser.newPage()
	}, MAX_TIMEOUT)

	afterAll(() => {
		browser.close()
	}, MAX_TIMEOUT)

	it("Testing modals and waiting types", async () => {
		// await page.goto("https://platzi.com/", { waitUntil: "networkidle0" })
		await page.goto("https://demoqa.com/modal-dialogs", { waitUntil: "networkidle0" })
		await page.click("#showSmallModal")

		await page.waitForSelector(".modal-content", { visible: true })
	}, MAX_TIMEOUT)
})