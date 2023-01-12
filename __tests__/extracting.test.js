const puppeteer = require("puppeteer")
const { MAX_TIMEOUT } = require("../globals")

describe("Extracting info and using it in another test", () => {
	let browser, page, title

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: false,
			args: ["--user-agent=foo"]
		})

		page = await browser.newPage()
	}, MAX_TIMEOUT)

	afterAll(async () => {
		const browserOpen = await page.evaluate(() => navigator.userAgent)
		if (browserOpen) {
			browser.close()
		}
	}, MAX_TIMEOUT)

	it("Extracting title of the page", async () => {
		await page.goto("https://platzi.com", { waitUntil: "networkidle0" })
		title = await page.title()

	}, MAX_TIMEOUT)

	it("Should match the title with a text", () => {
		expect(title).toMatch("Cursos Online")
	})
})