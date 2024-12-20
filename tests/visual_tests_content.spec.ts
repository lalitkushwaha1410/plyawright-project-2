import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TestHarnessPage } from "../pages/TestHarnessPage";

test.describe("Workflow visual regression tests for content", async () => {
  let testharnessPage: TestHarnessPage;
  let loginPage: LoginPage;
  const SnapDir = './tests/visual_tests_content.spec.ts-snapshots/';

  test.beforeEach(async ({ page }) => {
    testharnessPage = await new TestHarnessPage(page);
    await testharnessPage.URLToTestharness();
  });

  test("Verify UI for Send for review button when page is in Draft state", async ({ page, }) => {
    await testharnessPage.createNewContentPage();
    await page.waitForTimeout(4000);
    const pageElement = testharnessPage.workflowcontainer
   // await testharnessPage.setupBaselineImage(page, 'SendForReview-content', SnapDir, pageElement);
    await testharnessPage.verify_UIForWorkflowStateContent("SendForReview");
  });

  test("Verify UI for Start Review and Pull back buttons when page is in Ready for review state", async ({ page, }) => {
    await testharnessPage.createNewContentPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    const pageElement = testharnessPage.workflowcontainer
   //await testharnessPage.setupBaselineImage(page, 'ReadyForReview-content', SnapDir, pageElement);
    await testharnessPage.verify_UIForWorkflowStateContent("ReadyForReview");
  });

  test("Verify UI for Approve, Send back and Release review buttons when page is in In Review state", async ({ page, }) => {
    await testharnessPage.createNewContentPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Start review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    const pageElement = testharnessPage.workflowcontainer;
   //await testharnessPage.setupBaselineImage(page, 'InReview-content', SnapDir, pageElement);
   await testharnessPage.verify_UIForWorkflowStateContent("InReview");
  });

  test.skip("Verify UI for Send for Review button when page is Returned to Author state", async ({ page, }) => {
    await testharnessPage.createNewContentPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Start review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(3000);
    await testharnessPage.click_SendBack();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(9000);
    const pageElement = testharnessPage.workflowcontainer;
    await testharnessPage.setupBaselineImage(page, 'ReturnedToAuthorState-content', SnapDir, pageElement);
    await testharnessPage.verify_UIForWorkflowStateContent("ReturnedToAuthorState");
  });

  test.skip("Verify UI for Send for Review button and Cancel button when page is in Correction Draft", async ({ page, }) => {
    await testharnessPage.createNewContentPageforCorrection();
    await page.waitForTimeout(5000);
    const pageElement = testharnessPage.workflowcontainer;
    //await testharnessPage.setupBaselineImage(page, 'CorrectionDraftState-content', SnapDir, pageElement);
    await testharnessPage.verify_UIForWorkflowStateContent("CorrectionDraftState");
  });

  test.skip("Verify UI for Start review ,Pullback and Cancel button when page is in Correction Ready for review", async ({ page, }) => {
    await testharnessPage.createNewContentPageforCorrection();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    const pageElement = testharnessPage.workflowcontainer;
    //await testharnessPage.setupBaselineImage(page, 'CorrectionReadyForReview-content', SnapDir, pageElement);
    await testharnessPage.verify_UIForWorkflowStateContent("CorrectionReadyForReview");
  });

  test.skip("Verify UI for Approve ,Send back, Release review and Cancel button when page is in Correction in review", async ({ page, }) => {
    await testharnessPage.createNewContentPageforCorrection();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    await testharnessPage.click_ActionButton("Start review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);
    const pageElement = testharnessPage.workflowcontainer;
    //await testharnessPage.setupBaselineImage(page, 'CorrectionInReview-content', SnapDir, pageElement);
    await testharnessPage.verify_UIForWorkflowStateContent("CorrectionInReview");
  });

});