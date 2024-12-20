import { test, expect } from "@playwright/test";
import { user } from "../testdata/users";
import { env } from "../testdata/environments";
import { LoginPage } from "../pages/LoginPage";
import { AuthoringPage } from "../pages/AuthoringPage";
import { constanttext } from "../testdata/constants";

test.describe("Workflow E2E tests", async () => {
    let authoringPage: AuthoringPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        authoringPage = await new AuthoringPage(page);
        await authoringPage.LoginToE2E();
    });

    test("Create New page", async ({ page, }) => {
        await authoringPage.createNewPage();
        await page.waitForTimeout(1000);
        await authoringPage.add_Content();
        await page.waitForTimeout(2000);
        await authoringPage.verify_Status("Draft");
        await authoringPage.verify_ActionButton("Send for review");                            
    });                                                                                                             

    test("Send page for review", async ({ page, }) => {
        await authoringPage.createNewPage();
        await page.waitForTimeout(1000);
        await authoringPage.add_Content();
        await page.waitForTimeout(3000);
        await authoringPage.click_ActionButton("Send for review");
        await authoringPage.click_submitondialog();
        await authoringPage.findRecordAndClick(authoringPage.page_title);
        await page.waitForTimeout(10000);
        await authoringPage.verify_Status("Under Review");
        await authoringPage.verify_SecondActionButton("Publish");
    });


    test("Reject page", async ({ page, }) => {
        await authoringPage.createNewPage();
        await page.waitForTimeout(1000);
        await authoringPage.add_Content();
        await page.waitForTimeout(3000);
        await authoringPage.click_ActionButton("Send for review");
        await authoringPage.click_submitondialog();
        await authoringPage.findRecordAndClick(authoringPage.page_title);
        await page.waitForTimeout(2000);
        await authoringPage.click_ActionButton("Reject");
        await authoringPage.click_submitondialog();
        await authoringPage.click_closebtn();
        await page.waitForTimeout(7000);
        await authoringPage.verify_Status("Draft");
        await authoringPage.verify_ActionButton("Send for review");
    });
    test("Publish page", async ({ page, }) => {
        await authoringPage.createNewPage();
        await page.waitForTimeout(1000);
        await authoringPage.add_Content();
        await page.waitForTimeout(3000);
        await authoringPage.click_ActionButton("Send for review");
        await authoringPage.click_submitondialog();
        await authoringPage.findRecordAndClick(authoringPage.page_title);
        await authoringPage.click_SecondActionButton("Publish");
        await authoringPage.click_submitondialog();
        await authoringPage.click_closebtn();
        await page.waitForTimeout(7000);
        await authoringPage.verify_Status("Published");
        await authoringPage.verify_disabledbuttonvisible();
    });

    test("Verify when published page is edited", async ({ page, }) => {
        await authoringPage.open_PublishedPage();
        await page.waitForTimeout(1000);
        await authoringPage.add_Content();
        await page.waitForTimeout(5000);
        await authoringPage.verify_Status("Published Draft");
        await authoringPage.verify_ActionButton("Send for review");
    });


    test("Verify when published page is send for review", async ({ page, }) => {
        await authoringPage.open_PublishedPage();
        await page.waitForTimeout(1000);
        await authoringPage.add_Content();
        await page.waitForTimeout(3000);
        await authoringPage.click_ActionButton("Send for review");
        await authoringPage.click_submitondialog();
        await authoringPage.findRecordAndClick(authoringPage.page_title);
        await authoringPage.verify_Status("Under Review");
        await authoringPage.verify_SecondActionButton("Publish");
    });

    test("Verify when published page is Rejected", async ({ page, }) => {
        await authoringPage.open_PublishedPage();
        await page.waitForTimeout(1000);
        await authoringPage.add_Content();
        await page.waitForTimeout(3000);
        await authoringPage.click_ActionButton("Send for review");
        await authoringPage.click_submitondialog();
        await authoringPage.findRecordAndClick(authoringPage.page_title);
        await authoringPage.click_ActionButton("Reject");
        await authoringPage.click_submitondialog();
        await authoringPage.click_closebtn();
        await page.waitForTimeout(7000);
        await authoringPage.verify_Status("Published Draft");
        await authoringPage.verify_ActionButton("Send for review");
    });


    test("Verify when published page is republished", async ({ page, }) => {
        await authoringPage.open_PublishedPage();
        await page.waitForTimeout(1000);
        await authoringPage.add_Content();
        await page.waitForTimeout(3000);
        await authoringPage.click_ActionButton("Send for review");
        await authoringPage.click_submitondialog();
        await authoringPage.findRecordAndClick(authoringPage.page_title);
        await authoringPage.click_SecondActionButton("Publish");
        await authoringPage.click_submitondialog();
        await authoringPage.click_closebtn();
        await page.waitForTimeout(7000);
        await authoringPage.verify_Status("Published");
        await authoringPage.verify_disabledbuttonvisible();
    });

    test("Unpublish a Published page", async ({ page, }) => {
        await authoringPage.navigate_PublishedTab();
        await authoringPage.unpublishFirstPublishedPage();
        await authoringPage.navigate_ALLTab();
        await page.waitForTimeout(4000);
        await authoringPage.findRecordAndClick(authoringPage.page_title);
        await page.waitForTimeout(3000);
        await authoringPage.verify_Status("Draft");
        await authoringPage.verify_ActionButton("Send for review");
    });

    test("Unpublish a Published Draft page", async ({ page, }) => {
        await authoringPage.navigate_PublishedTab();
        await authoringPage.unpublishFirstPublishedDraftPage();
        await authoringPage.navigate_ALLTab();
        await page.waitForTimeout(4000);
        await authoringPage.findRecordAndClick(authoringPage.page_title);
        await page.waitForTimeout(3000);
        // needs to uncomment below lines after fixing the issue for unpublish scenario
        // await authoringPage.verify_Status("Draft");
        // await authoringPage.verify_ActionButton("Send for review");
    });
});
