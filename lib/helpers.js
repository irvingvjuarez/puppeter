function getErrorMsg(fnName, selector) {
	return `Error while ${fnName} function at Selector: ${selector}`
}

async function click(page, selector, config = {}) {
	try {
		await page.waitForSelector(selector)
		await page.click(selector, config)
	} catch(e) {
		throw new Error(getErrorMsg("click", selector))
	}
}

async function doubleClick(page, selector, config = {}) {
	try {
		await page.waitForSelector(selector)
		await page.click(selector, { ...config, clickCount: 2 })
	} catch (e) {
		throw new Error(getErrorMsg("doubleClick", selector))
	}
}

async function getText(page, selector) {
	try {
		await page.waitForSelector(selector)
		const text = await page.$eval(selector, (e) => e.textContent)
		return text
	} catch (e) {
		throw new Error(getErrorMsg("getText", selector))
	}
}

async function type(page, selector, content = "") {
	try {
		await page.waitForSelector(selector)
		await page.type(selector, content)
	} catch (e) {
		throw new Error(getErrorMsg("type", selector))
	}
}

async function getCount(page, selector) {
	try {
		await page.waitForSelector(selector)
		const count = await page.$$eval(selector, (els) => els.length)
		return count
	} catch (e) {
		throw new Error(getErrorMsg("getCount", selector))
	}
}

module.exports = {
	click,
	doubleClick,
	getText,
	type,
	getCount
}