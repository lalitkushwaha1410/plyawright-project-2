import { test, expect } from "@playwright/test";
import { user } from "../testdata/users";
import { env } from "../testdata/environments";
import { LoginPage } from "../pages/LoginPage";
import { TestHarnessPage } from "../pages/TestHarnessPage";
import { constanttext } from "../testdata/constants";

test.describe("Workflow component tests", async () => {
  let testharnessPage: TestHarnessPage;

  test.beforeEach(async ({ page }) => {
    testharnessPage = await new TestHarnessPage(page);
    await testharnessPage.URLToTestharness();
  });

  test("Create New page", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.verify_Status("Draft");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test.skip("Verify error message when validation is failed", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.validatebeforesendforreview();
  });

  test("Send page for review", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Ready for review");
    await testharnessPage.click_startReview();
    await testharnessPage.verify_ActionButton("Pull back");

  });


  test("Actions on Pull back from Ready for review", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_PullBack();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Draft");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test("Actions on Start Review", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("In review");
    await testharnessPage.verify_ActionButton("Approve");
    await testharnessPage.verify_ActionButton("Send back");
    await testharnessPage.verify_ActionButton("Release review");
  });

  test.skip("Actions on Send back from In review", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SendBack();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Returned to author");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test("Actions on Release Review from In review", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ReleaseReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Ready for review");
    await testharnessPage.click_startReview();
    await testharnessPage.verify_ActionButton("Pull back");
  });

  test("Actions on Approve from In review when price is scheduled", async ({ page, }) => {
    await testharnessPage.createNewScheduledPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_Approve();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Ready to publish");
    await testharnessPage.verify_ActionButton("Send back");
    await testharnessPage.verify_ActionButton("Pull back");
  });

  test.skip("Actions on Send back from Ready to publish", async ({ page, }) => {
    await testharnessPage.createNewScheduledPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_Approve();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SendBack();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Returned to author");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test("Actions on Pull back from Ready to publish", async ({ page, }) => {
    await testharnessPage.createNewScheduledPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_Approve();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_PullBack();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Draft");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test("Actions on Approve from In review when price is not scheduled", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_Approve();
    await testharnessPage.click_submitondialog();
    //await page.waitForTimeout(150000);
    await testharnessPage.click_Close();
    await testharnessPage.verify_Status("Published");
    await testharnessPage.verify_buttonnotvisible();
  });

  //Correction workflow

  test("Actions on Correction needed", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.verify_Status("Correction draft");
    await testharnessPage.verify_ActionButton("Send for review");
    await testharnessPage.verify_ActionButton("Cancel correction");
  });

  test("Actions on Send for Review from Correction draft status", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.verify_Status("Correction ready for review");
    await testharnessPage.verify_ActionButton("Start review");
    await testharnessPage.verify_ActionButton("Cancel correction");
  });

  test("Actions on Cancel from Correction draft status", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_CancelCorrection();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.verify_elementnotvisible();
  });

  test("Actions on Cancel from Correction ready for review status", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.verify_Status("Correction ready for review");
    await testharnessPage.click_CancelCorrection();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.verify_elementnotvisible();
  });


  test("Actions on Start Review from Correction ready for review status", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.verify_Status("Correction in review");
    await testharnessPage.verify_ActionButton("Approve");
    await testharnessPage.verify_ActionButton("Send back");
    await testharnessPage.verify_ActionButton("Release review");
    await testharnessPage.verify_ActionButton("Cancel correction");
  });

  test("Actions on Cancel from Correction in review status", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.click_CancelCorrection();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.verify_elementnotvisible();
  });

  test("Actions on Send back from Correction in review status", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.verify_Status("Correction in review");
    await testharnessPage.click_sendBack();
    await page.waitForTimeout(1000);
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.verify_Status("Correction draft");
    await testharnessPage.verify_ActionButton("Send for review");
    await testharnessPage.verify_ActionButton("Cancel correction");
  });

  test("Actions on Release review from Correction in review status", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.verify_Status("Correction in review");
    await testharnessPage.click_ReleaseReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.verify_Status("Correction ready for review");
    await testharnessPage.verify_ActionButton("Start review");
    await testharnessPage.verify_ActionButton("Cancel correction");
  });

  test("Actions on Approve from Correction in review status", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.verify_Status("Correction in review");
    await testharnessPage.click_Approve();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.verify_Status("Correction published");
    await testharnessPage.click_Close();
    await testharnessPage.verify_buttonnotvisible();
  });
});
