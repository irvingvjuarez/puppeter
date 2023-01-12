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

		// await page.waitForSelector(".modal-content", { visible: true })
		await page.waitForFunction(() => {
			return document.getElementById("example-modal-sizes-title-sm").textContent == "Small Modal"
		})

		const observeResize = page.waitForFunction("window.innerWidth <= 250")
		await page.setViewport({ width: 199, height: 500 })

		await observeResize
	}, MAX_TIMEOUT)
})