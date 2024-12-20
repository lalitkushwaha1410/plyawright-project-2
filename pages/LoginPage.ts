import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("#userNameInput");
        this.passwordInput = page.locator("#passwordInput");
        this.loginButton = page.locator("#submitButton");
    }

    async logintotestharness(username: string, password: string, url: string) {
        await this.page.goto(url);
        await this.page.getByRole("link", { name: "CHA" }).click();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await Promise.all([this.page.waitForNavigation(), this.loginButton.click()]);
    }

}
