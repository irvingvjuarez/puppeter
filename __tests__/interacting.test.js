const puppetter = require("puppeteer")

describe("Interacting with elements", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppetter.launch({
			headless: false,
			defaultViewport: null
		})

		page = await browser.newPage()
	})

	afterAll(() => {
		browser.close()
	})

	it("Should interact with elements", async () => {
		page.on("dialog", async (dialog) => {
			await dialog.accept()
		})


		await page.goto("https://demo.guru99.com/test/simple_context_menu.html")
		await page.click("#authentication > span", { button: "right" })
		await page.click("#context-menu-layer + ul > li:first-child", { delay: 1000 })

		// await page.waitForSelector("#authentication > ul")
	}, 30000)
})