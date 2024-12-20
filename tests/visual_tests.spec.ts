import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TestHarnessPage } from "../pages/TestHarnessPage";

test.describe("Workflow visual regression tests for topics", async () => {
  let testharnessPage: TestHarnessPage;
  let loginPage: LoginPage;
  const SnapDir = './tests/visual_tests.spec.ts-snapshots/';

  test.beforeEach(async ({ page }) => {
    testharnessPage = await new TestHarnessPage(page);
    await testharnessPage.URLToTestharness();
  });

  test("Verify UI for error validation message", async ({ page, }) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review")
    const pageElement = testharnessPage.permissiondialog;
    //await testharnessPage.setupBaselineImage(page, 'errorvalidation', SnapDir, pageElement);
    await testharnessPage.verify_UIforValidationPopup();
  });

  test("Verify UI for reject confirmation popup", async ({ page, }) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Reject");
    await testharnessPage.verify_Status("Under Review");
    const pageElement = testharnessPage.confirmationpopup;
    //await testharnessPage.setupBaselineImage(page, 'rejectpopup', SnapDir, pageElement);
    await testharnessPage.verify_UIforPopupBeforeReject();
    await testharnessPage.click_submitondialog();
  });

  test("Verify UI for validation popup after page is rejected and draft state workflow container", async ({ page, }) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Reject");
    await testharnessPage.click_submitondialog();
    const pageElement = testharnessPage.afterreject_publishpopuptitle;
    //await testharnessPage.setupBaselineImage(page, 'rejectconfirmationpopup', SnapDir, pageElement);
    await testharnessPage.verify_UIforPopupAfterReject();
    const pageElement1 = testharnessPage.workflowcontainer;
    //await testharnessPage.setupBaselineImage(page, 'rejectstate', SnapDir, pageElement1);
    await testharnessPage.verify_UIForWorkflowState("rejectstate");
  });

  test("Verify UI for publish confirmation popup", async ({ page, }) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SecondActionButton("Publish");
    const pageElement = testharnessPage.confirmationpopup;
    //await testharnessPage.setupBaselineImage(page, 'publishpopup', SnapDir, pageElement);
    await testharnessPage.verify_UIforPopupBeforePublish();
    await testharnessPage.click_submitondialog();
  });

  test("Verify UI for validation popup after page is published and published state workflow container", async ({ page, }) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SecondActionButton("Publish");
    await testharnessPage.click_submitondialog();
    const pageElement = testharnessPage.afterreject_publishpopuptitle;
    await testharnessPage.setupBaselineImage(page, 'publishconfirmationpopup', SnapDir, pageElement);
    await testharnessPage.verify_UIforPopupAfterPublish();
    const pageElement1 = testharnessPage.workflowcontainer;
    //await testharnessPage.setupBaselineImage(page, 'publishstate', SnapDir, pageElement1);
    await testharnessPage.verify_UIForWorkflowState("publishstate");
  });

  test("Verify UI for review state workflow container", async ({ page, }) => {
    await testharnessPage.createNewTopicPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    const pageElement = testharnessPage.workflowcontainer;
    //await testharnessPage.setupBaselineImage(page, 'reviewstate', SnapDir, pageElement);
    await testharnessPage.verify_UIForWorkflowState("reviewstate");
  });
});