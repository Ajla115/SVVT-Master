import { Builder, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import path from "path";

// Update path below if necessary
const chromedriverPath = "/opt/homebrew/bin/chromedriver"; // or use `which chromedriver` in terminal

let driver: WebDriver;

export async function createDriver(url: string) {
    const service = new chrome.ServiceBuilder(chromedriverPath);
    const chromeOptions = new chrome.Options();

    driver = await new Builder()
        .forBrowser("chrome")
        .setChromeService(service) // <-- key line added
        .setChromeOptions(chromeOptions)
        .build();

    await driver.get(url);
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 15000 });
    return driver;
}

export async function quitDriver(driver: WebDriver) {
    await driver.quit();
}
