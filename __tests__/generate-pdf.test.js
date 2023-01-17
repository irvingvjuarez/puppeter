const puppeteer = require("puppeteer")

describe("Generating PDF's", () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true
		})

		page = await browser.newPage()
	})

	beforeEach(async () => {
		await page.goto("https://platzi.com")
	})

	afterAll(async () => {
		await browser.close()
	})

	it("Generate PDF of the whole page", async () => {
		const pdfStyles = []
		pdfStyles.push("h1 { font-size: 10px; margin-left: 30px }")

		pdfStyles.unshift("<style>")
		pdfStyles.push("</style>")

		const baseCss = pdfStyles.join("")
		const headerTemplate = baseCss + "<h1>My first pdf generated with puppeteer</h1>"
		const footerTemplate = baseCss + "<h1>Page <span class='pageNumber'></span> of <span class='totalPages'></span></h1>"

		await page.pdf({
			path: "./pdfs/whole-page.pdf",
			format: "A4",
			printBackground: true,
			displayHeaderFooter: true,
			headerTemplate,
			footerTemplate,
			margin: {
				top: "100px",
				bottom: "200px",
				right: "20px",
				left: "20px"
			}
			// landscape: true
		})
	})
})