const puppetter = require("puppeteer")
const { MAX_TIMEOUT } = require("../globals")
const { click, doubleClick } = require("../lib/helpers")

describe("Interacting with elements", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppetter.launch({
			headless: false,
			defaultViewport: null
		})

		page = await browser.newPage()
		page.on("dialog", async (dialog) => {
			await dialog.accept()
		})

		await page.goto("https://demo.guru99.com/test/simple_context_menu.html")
	}, MAX_TIMEOUT)

	// afterAll(() => {
	// })

	it("Should interact with right click", async () => {
		await click(page, "#authentication > span", { button: "right" })
		await click(page, "#context-menu-layer + ul > li:first-child", { delay: 1000 })

		await doubleClick(page, "#authentication > button")
		// await page.waitForTimeout(3000)

		browser.close()
	}, MAX_TIMEOUT)
})