import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class LoginPage extends BasePage {

    private email_field = By.xpath("//input[@type='email' and @placeholder='Enter your email']");
    private login_button = By.xpath("//button[text()='View Your Movies']")

  
    constructor(driver: WebDriver) {
        super(driver);
    }


    async provideEmail(){
        await this.fillInputField(this.email_field, testData.credentials.email);
    }


    async clickOnLoginButton(){
        await this.findElementAndClick(this.login_button);
    }

    
   
}
