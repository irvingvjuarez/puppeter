const puppeteer = require("puppeteer")
const { MAX_TIMEOUT } = require("../globals")

describe("Testing inputs", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: false
		})

		page = await browser.newPage()
		await page.goto("https://devexpress.github.io/testcafe/example")
	}, MAX_TIMEOUT)

	it("Popullating input w/data", async () => {
		await page.type("#developer-name", "Irving Juárez")
	}, MAX_TIMEOUT)

	it("Checking a box check input", async () => {
		await page.click("#tried-test-cafe")
		await page.type("#comments", "Well, I think is not that good btw")
		await page.click("#submit-button")

		await new Promise(r => setTimeout(r, 3000));

		browser.close()
	})
})