import { HomePage } from "../core/page-objects/landing-page";
import { LoginPage } from "../core/page-objects/login-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let loginPage: LoginPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);

}, 300000);

test("add category", async () => {
    await loginPage.provideEmail();
    await loginPage.clickOnLoginButton();
    await homePage.addNewCategory();
},500000);


afterAll(async () => {
    await quitDriver(driver);
},1500);


