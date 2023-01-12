const puppeteer = require("puppeteer")
const { MAX_TIMEOUT } = require("../globals")

describe("Testing inputs", () => {
	it("Popullating input w/data", async () => {
		const browser = await puppeteer.launch({
			defaultViewport: null,
			headless: false
		})

		const page = await browser.newPage()
		await page.goto("https://devexpress.github.io/testcafe/example")
		await page.type("#developer-name", "Irving Juárez")

		await new Promise(r => setTimeout(r, 3000));

		browser.close()

	}, MAX_TIMEOUT)
})