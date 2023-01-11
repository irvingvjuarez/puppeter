const puppetter = require("puppeteer")
const { MAX_TIMEOUT } = require("../globals")

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
		await page.click("#authentication > span", { button: "right" })
		await page.click("#context-menu-layer + ul > li:first-child", { delay: 1000 })

		await page.click("#authentication > button", { clickCount: 2 })
		// await page.waitForTimeout(3000)

		browser.close()
	}, MAX_TIMEOUT)
})