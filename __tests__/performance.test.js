const puppeteer = require("puppeteer")
const fs = require("fs")
const { MAX_TIMEOUT } = require("../globals")

describe("Testing app performance", () => {
	const URL = "https://platzi.com"
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true
		})

		page = await browser.newPage()
	})

	// beforeEach(async () => {
	// 	await page.goto(URL)
	// }, MAX_TIMEOUT)

	afterAll(async () => {
		await browser.close()
	})

	it("Measuring automation performance", async () => {
		await page.waitForSelector("img")
		const metrics = await page.metrics()

		console.log(metrics)
	})

	it("Getting the page performance info", async () => {
		await page.waitForSelector("img")
		const performance = await page.evaluate(() => JSON.stringify(window.performance))
		console.log(JSON.parse(performance))
	})

	it("Getting even more information about the page performance", async () => {
		await page.tracing.start({
			path: "./performance/profile.json"
		})

		await page.goto(URL)

		await page.tracing.stop()
	}, MAX_TIMEOUT)

	it("Measuring performance w/screenshots", async () => {
		await page.tracing.start({
			path: "./performance/profile.json",
			screenshots: true
		})

		await page.goto(URL)

		await page.tracing.stop()

		// Decoding screenshots from profile.json file
		let tracing = fs.readFileSync("./performance/profile.json", "utf-8")
		tracing = JSON.parse(tracing)

		const traceScreenshots = tracing.traceEvents.filter(event =>
			event.cat == "disabled-by-default-devtools.screenshot" &&
			event.name == "Screenshot" &&
			event.args != "undefined" &&
			event.args.snapshot != "undefined"
		)

		// Writing the snapshots
		traceScreenshots.forEach((ss, index) => {
			fs.writeFile(`screenshots/tracing/ss-${index + 1}.png`, ss.args.snapshot, "base64", (err) => {
				if(err) console.log("Unable to create the tracing screenshot")
			})
		})
	}, MAX_TIMEOUT)

	it.only("First paint and contentful paint performance measure", async () => {
		const navigationPromise = page.waitForNavigation()

		await page.goto(URL)
		await navigationPromise

		let performanceInfo = await page.evaluate(() => {
			const firstPaint = window.performance.getEntriesByName("first-paint")
			const firstContentfulPaint = window.performance.getEntriesByName("first-contentful-paint")
			return JSON.stringify({firstPaint, firstContentfulPaint})
		})
		performanceInfo = JSON.parse(performanceInfo)

		console.log(performanceInfo)
	}, MAX_TIMEOUT)
})