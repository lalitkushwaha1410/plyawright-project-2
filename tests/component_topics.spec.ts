import { test, expect } from "@playwright/test";
import { user } from "../testdata/users";
import { env } from "../testdata/environments";
import { LoginPage } from "../pages/LoginPage";
import { TestHarnessPage } from "../pages/TestHarnessPage";
import {constanttext} from "../testdata/constants";

test.describe("Workflow component tests", async () => {
  let testharnessPage: TestHarnessPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
   // loginPage = await new LoginPage(page);
    testharnessPage = await new TestHarnessPage(page);
    await testharnessPage.URLToTestharness();
  });

  test("Create New page", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.verify_Status("Draft");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test("Verify error message when validation is failed", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await page.waitForTimeout(2000);
    await testharnessPage.click_passValidation();
    await testharnessPage.click_ActionButton("Send for review")
    await testharnessPage.validatebeforesendforreview();
  });

  test("Send page for review", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Under review");
    await testharnessPage.verify_SecondActionButton("Publish",true);
    await testharnessPage.click_ActionButton("Reject");
  });

  test("Verify validation popup for reject confirmation", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Reject");
    // scenario for cancel in popup
    await testharnessPage.click_cancelonpopup();
    await testharnessPage.verify_Status("Under review");
    await testharnessPage.verify_SecondActionButton("Publish",true);
    // scenario for clicking on reject in popup
    await testharnessPage.click_ActionButton("Reject");
    await testharnessPage.verify_validationrejectpopup();
    await testharnessPage.click_submitondialog();
  });

  test("Verify validation popup once page is rejected", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Reject");
    await testharnessPage.click_submitondialog();
    await testharnessPage.validatepopupafterreject();
  });

  test("Reject page", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Reject");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Draft");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test("Verify validation popup for publish confirmation", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SecondActionButton("Publish");
    // scenario for publish in popup
    await testharnessPage.click_cancelonpopup();
    await testharnessPage.verify_Status("Under review");
    await testharnessPage.verify_SecondActionButton("Publish",true); 
    // scenario for clicking on publish in popup
    await testharnessPage.click_SecondActionButton("Publish");
    await testharnessPage.verify_validatepublishpopup();
    await testharnessPage.click_submitondialog();
  });

  test("Verify validation popup once page is published", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SecondActionButton("Publish");
    await testharnessPage.click_submitondialog();
    await testharnessPage.validatepopupafterpublish();
  });

  test("Publish page", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SecondActionButton("Publish");
    await testharnessPage.verify_validatepublishpopup();
    await testharnessPage.click_submitondialog();
    await testharnessPage.validatepopupafterpublish();
    await testharnessPage.verify_Status("Published");
    await testharnessPage.verify_disabledbuttonvisible();
  });

  test("Verify update workflow", async ({page,}) => {     
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SecondActionButton("Publish");
    await testharnessPage.click_submitondialog();
    await testharnessPage.closevalidationpopup();
    await testharnessPage.startupdateworkflow();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Published draft");
    await testharnessPage.verify_ActionButton("Send for review");
    await testharnessPage.click_ActionButton("Send for review");
    // scenario for cancel in popup
    await testharnessPage.click_cancelonpopup();
    await testharnessPage.verify_Status("Published draft");
    await testharnessPage.verify_ActionButton("Send for review");
    //scenario for send for review in popup
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Under review");
    await testharnessPage.verify_SecondActionButton("Publish",true);
    // scenario for Reject
    await testharnessPage.click_ActionButton("Reject");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Published draft");
    await testharnessPage.verify_ActionButton("Send for review");
    await testharnessPage.closevalidationpopup();
    // // scenario for Publish
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SecondActionButton("Publish");
    await testharnessPage.click_submitondialog();
    await testharnessPage.closevalidationpopup();
    await testharnessPage.verify_Status("Published");
  }
  );

  test("Delete workflow", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.deleteWorkflow();
    await testharnessPage.businessKeyTextBlank();
  });

  test("ACM Scenario for user having No access for Workflow", async ({page, context}) => {
    await context.clearCookies();
    await testharnessPage.LoginToTestharness(user.noAccess.username,user.noAccess.password);
    await testharnessPage.createNewTopicPage();
    await testharnessPage.verify_firstActionButton("Send for review",false);  
  });

  test.skip("ACM Scenario for user not having Publish/Reject permissions", async ({page, context}) => {
    await context.clearCookies();
    await testharnessPage.LoginToTestharness(user.creatorAccess.username,user.creatorAccess.password);
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Under review");
    await testharnessPage.verify_firstActionButton("Reject",false);
    await testharnessPage.verify_SecondActionButton("Publish",false);
  });

  test("ACM Scenario for user having Publish/Reject permissions", async ({page,}) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Under review");
    await testharnessPage.verify_firstActionButton("Reject",true);
    await testharnessPage.verify_SecondActionButton("Publish",true);  
  });

});
