import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TestHarnessPage } from "../pages/TestHarnessPage";

test.describe("Workflow visual regression tests for pricing", async () => {
  let testharnessPage: TestHarnessPage;
  let loginPage: LoginPage;
  const SnapDir = './tests/visual_tests_pricing.spec.ts-snapshots/';

  test.beforeEach(async ({ page }) => {
    testharnessPage = await new TestHarnessPage(page);
    await testharnessPage.URLToTestharness();
  });

  test("Verify UI for Send for review button when page is in Draft state", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await page.waitForTimeout(4000);
    const pageElement = testharnessPage.workflowcontainer
    await testharnessPage.setupBaselineImage(page, 'SendForReview', SnapDir, pageElement);
    //await testharnessPage.verify_UIForWorkflowState("SendForReview");
  });

  test("Verify UI for Start Review and Pull back buttons when page is in Ready for review state", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    const pageElement = testharnessPage.workflowcontainer
    await testharnessPage.setupBaselineImage(page, 'ReadyForReview', SnapDir, pageElement);
    //await testharnessPage.verify_UIForWorkflowState("ReadyForReview");
  });

  test("Verify UI for Approve, Send back and Release review buttons when page is in In Review state", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    const pageElement = testharnessPage.workflowcontainer;
    await testharnessPage.setupBaselineImage(page, 'InReview', SnapDir, pageElement);
    //await testharnessPage.verify_UIForWorkflowState("InReview");
  });

  test.skip("Verify UI for Send for Review button when page is Returned to Author state", async ({ page, }) => {
    await testharnessPage.createNewPricingPage();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(3000);
    await testharnessPage.click_SendBack();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(9000);
    const pageElement = testharnessPage.workflowcontainer;
    await testharnessPage.setupBaselineImage(page, 'ReturnedToAuthorState', SnapDir, pageElement);
    //await testharnessPage.verify_UIForWorkflowState("ReturnedToAuthorState");
  });

  test("Verify UI for Send for Review button and Cancel button when page is in Correction Draft", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await page.waitForTimeout(5000);
    const pageElement = testharnessPage.workflowcontainer;
    await testharnessPage.setupBaselineImage(page, 'CorrectionDraftState', SnapDir, pageElement);
   // await testharnessPage.verify_UIForWorkflowState("CorrectionDraftState");
  });

  test("Verify UI for Start review ,Pullback and Cancel button when page is in Correction Ready for review", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    const pageElement = testharnessPage.workflowcontainer;
    await testharnessPage.setupBaselineImage(page, 'CorrectionReadyForReview', SnapDir, pageElement);
    //await testharnessPage.verify_UIForWorkflowState("CorrectionReadyForReview");
  });

  test("Verify UI for Approve ,Send back, Release review and Cancel button when page is in Correction in review", async ({ page, }) => {
    await testharnessPage.createNewPricingPageforCorrection();
    await testharnessPage.click_sendForReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.click_startReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    const pageElement = testharnessPage.workflowcontainer;
    await testharnessPage.setupBaselineImage(page, 'CorrectionInReview', SnapDir, pageElement);
   // await testharnessPage.verify_UIForWorkflowState("CorrectionInReview");
  });

});