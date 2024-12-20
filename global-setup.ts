import { Browser, Page, chromium, firefox, webkit } from "@playwright/test";
import * as playwright from 'playwright';
import { user } from "./testdata/users";
import { env, getEnv } from "./testdata/environments";

export default async function globalSetup(BROWSER) {
    let browser;
  
    switch (BROWSER) {
      case 'firefox':
        browser = firefox;
        break;
      case 'webkit':
        browser = webkit;
        break;
      case 'chromium':
      default:
        browser = chromium;
        break;
    }
    const browserInstance = await browser.launch();
    const page: Page = await browserInstance.newPage({ ignoreHTTPSErrors: true });
    await page.goto(getEnv().AuthoringUrl);
    await page.getByRole("link", { name: "CHA" }).click();
    await page.locator("#userNameInput").fill(user.reviewAccess.username);
    await page.locator("#passwordInput").fill(user.reviewAccess.password);
    await Promise.all([page.waitForNavigation(), page.locator("#submitButton").click()]);
    await page.context().storageState({ path: './LoginAuth.json' });
    await browserInstance.close();
}

//  export default globalSetup;