import { test, expect, Locator, Page } from "@playwright/test";
import { user } from "../testdata/users";
import { env, getEnv, getBrowser } from "../testdata/environments";
import { LoginPage } from "../pages/LoginPage";
import { constanttext } from "../testdata/constants";
import * as fs from 'fs/promises';
import * as path from 'path';

let loginPage: LoginPage;
let sampleJsonText = "";


export class TestHarnessPage {
  readonly page: Page;
  readonly generatecontentIDBtn: Locator;
  readonly processIDFieldtopics: Locator;
  readonly processIDFieldpricing: Locator;
  readonly passValidationCheckbox: Locator;
  readonly startWorkflowBtn: Locator;
  readonly resetBtn: Locator;
  readonly workflowStatus: Locator;
  readonly workflowStatusBtn: Locator;
  readonly submitBtn: Locator;
  readonly reviewworkflowStatusBtn: Locator;
  readonly rejectworkflowStatusBtn: Locator;
  readonly publishworkflowStatusBtn: Locator;
  readonly workflowcontainer: Locator;
  readonly workflowbutton: Locator;
  readonly secondButton: Locator;
  readonly permissiondialog: Locator;
  readonly cancelBtn: Locator;
  readonly reject_publishpopuptitle: Locator;
  readonly validaterejectpopuptext: Locator;
  readonly afterreject_publishpopuptitle: Locator;
  readonly afterreject_publishpopuptext: Locator;
  readonly closepopup: Locator;
  readonly validatepublishpopuptext: Locator;
  readonly afterpublishpopuptitle: Locator;
  readonly beforereviewpopuptext: Locator;
  readonly updateworkflowBtn: Locator;
  readonly cancelonpopup: Locator;
  readonly deleteIcon: Locator;
  readonly BusinessKeyTextBox: Locator;
  readonly confirmationpopup: Locator;
  readonly reviewpopup: Locator;
  readonly sendForReviewBtn: Locator;
  readonly SampleJsonBtn: Locator;
  readonly pullbackBtn: Locator;
  readonly sendbackBtn: Locator;
  readonly approveBtn: Locator;
  readonly closeBtn: Locator;
  readonly textarea: Locator;
  readonly processIDFieldContent: Locator;
  readonly UnderReviewBtn: Locator;
  readonly correctionNeededBtn: Locator;
  readonly startReviewBtn: Locator;
  readonly pullBackBtn: Locator;
  readonly releaseReviewBtn: Locator;
  readonly buttoncontainer: Locator;
  readonly buttonUnderContainer:Locator;
  readonly cancelCorrection:Locator;



  constructor(page: Page) {
    this.page = page;
    this.BusinessKeyTextBox = page.getByPlaceholder("Enter Business Key");
    this.generatecontentIDBtn = page.getByRole("button", { name: "Generate Guid" });
    this.processIDFieldtopics = page.locator('input[name="processDefinitionKey"][id="intelligence"]');
    this.processIDFieldpricing = page.locator('input[name="processDefinitionKey"][id="pricing"]');
    this.processIDFieldContent= page.locator('input[name="processDefinitionKey"][id="market-context"]');
    this.passValidationCheckbox = page.locator('input[type="checkbox"][name="allowNextActionsAvailable"]');
    this.SampleJsonBtn = page.getByRole("button", { name: "Sample JSON" });
    this.startWorkflowBtn = page.getByRole("button", { name: "Start Workflow" });
    this.pullbackBtn = page.getByRole("button", { name: "Pull back" });
    this.releaseReviewBtn = page.getByRole("button", { name: "Release review" });
    this.sendbackBtn = page.getByRole("button", { name: "Send back" });
    this.approveBtn = page.getByRole("button", { name: "Approve" });
    this.resetBtn = page.getByRole("button", { name: "Reset" });
    this.workflowStatus = page.locator("div[data-testid^='workflow-status-']:nth-of-type(2)");
    this.submitBtn = page.getByTestId("modal-footer-workflow-action-btn");
    this.workflowcontainer = page.getByTestId("workflow-container");
    this.buttoncontainer = page.getByTestId("button-container");
    this.buttonUnderContainer=this.buttoncontainer.getByRole("button");
    this.workflowbutton = this.workflowcontainer.getByRole("button");
    this.startReviewBtn= page.getByTestId("Start review");
    //this.pullBackBtn= page.getByTestId("Pull back");
    this.UnderReviewBtn= page.getByTestId("UNDER_REVIEW");
    this.sendForReviewBtn= page.getByTestId("Send for review");
    this.correctionNeededBtn=page.getByTestId("CORRECTION_NEEDED");
    this.permissiondialog = page.getByTestId("workflow-permission-modal");
    this.cancelBtn = this.permissiondialog.getByRole("button", { name: "Cancel" });
    this.confirmationpopup = page.getByTestId("workflow-confirmation-modal");
    this.reject_publishpopuptitle = page.locator("div[data-testid='workflow-confirmation-modal']>div:nth-of-type(1)");
    this.validaterejectpopuptext = page.locator("div[data-testid='Confirmation-content']:nth-of-type(1)");
    this.afterreject_publishpopuptitle = page.getByTestId("workflow-success-modal");
    this.afterreject_publishpopuptext = page.locator("div[data-testid='workflow-success-modal']>div:nth-of-type(3)>div:nth-of-type(2)");
    this.closepopup = page.locator('svg[data-icon="xmark"]');
    this.closeBtn=page.getByTestId("closeBtn");
    //this.CloseBtn= page.getByRole("button", { name: "Close" });
    this.validatepublishpopuptext = page.getByTestId("confirmation-content");
    this.afterpublishpopuptitle = page.locator('div[data-testid="workflow-success-modal"]>div:nth-of-type(1)');
    this.beforereviewpopuptext = page.locator("div[data-testid='workflow-permission-modal']>div>div>div:nth-of-type(1)");
    this.updateworkflowBtn = page.getByRole("button", { name: "Start Update Workflow" });
    this.cancelonpopup = page.getByRole("button", { name: "Cancel" });
    this.cancelCorrection= page.getByTestId("Cancel correction");
    this.deleteIcon = page.locator("svg[data-icon='trash-can']");
    this.textarea = page.locator('#userVariables');
  }

  async URLToTestharness() {
    await this.page.goto(getEnv().TestHarnessUrl);
  }

  async LoginToTestharness(username, password) {
    loginPage = await new LoginPage(this.page);
    await loginPage.logintotestharness(username, password, getEnv().TestHarnessUrl);
  }

  async createNewTopicPage() {
    await this.fillContentID();
    await this.fillProcessIDtopics();
    await this.click_CreateNew();
  }

  async createNewPricingPage() {
    await this.fillContentID();
    await this.fillProcessIDpricing();
    //await this.SampleJsonBtn.click();
    await this.fillSampleJsonForPricing("new");
    await this.click_CreateNew();
  }

  async createNewScheduledPricingPage() {
    await this.fillContentID();
    await this.fillProcessIDpricing();
    //await this.SampleJsonBtn.click();
    await this.fillSampleJsonForScheduledPricing("new");
    await this.click_CreateNew();
  }

  async createNewContentPage() {
    await this.fillContentID();
    await this.fillProcessIDContent();
    //await this.SampleJsonBtn.click();
    await this.click_CreateNew();
  }

  async createNewPricingPageforCorrection() {
    await this.fillContentID();
    await this.fillProcessIDpricing();
    //await this.SampleJsonBtn.click();
    await this.fillSampleJsonForPricing("correction");
    await this.click_CreateNew();
  }

  async createNewContentPageforCorrection() {
    await this.fillContentID();
    await this.fillProcessIDContent();
    //await this.SampleJsonBtn.click();
    await this.fillSampleJsonForPricing("correction");
    await this.click_CreateNew();
  }

  async fillSampleJsonForPricing(workflowtype) {
    let currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    const hours = String(currentDate.getUTCHours()).padStart(2, '0');
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

   // console.log(formattedDate);
    const constanttext = {
      sampleJson: {
        JsonText: {
          "workflowType": workflowtype,
          "targetProcess": "pricing-advance",
         // "publishOnDateString": "2024-11-13T10:46:42Z",
         "publishOnDateString": formattedDate,
          "content": "TestHarness Automation- Melamine Americas",
          "contentType": "Pricing",
          "market": "Melamine",
          "location": "Americas",
          "saveToTasklistDb": false,
      }
      }
    };
    sampleJsonText = JSON.stringify(constanttext.sampleJson.JsonText);
    await this.textarea.fill(sampleJsonText);
  }
  
  async fillSampleJsonForScheduledPricing(workflowtype) {
    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 2);
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    const hours = String(currentDate.getUTCHours()).padStart(2, '0');
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');


    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

   // console.log("scheduled entry" +formattedDate);
    const constanttext = {
      sampleJson: {
        JsonText: {
          "workflowType": workflowtype,
          "targetProcess": "pricing-advance",
         // "publishOnDateString": "2024-11-13T10:46:42Z",
         "publishOnDateString": formattedDate,
          "content": "TestHarness Automation- Melamine Americas",
          "contentType": "Pricing",
          "market": "Melamine",
          "location": "Americas",
          "saveToTasklistDb": false,
      }
      }
    };
    sampleJsonText = JSON.stringify(constanttext.sampleJson.JsonText);
    await this.textarea.fill(sampleJsonText);
  }

  async fillContentID() {
    await this.generatecontentIDBtn.click();
  }

  async fillProcessIDtopics() {
    await this.processIDFieldtopics.click();
  }

  async fillProcessIDpricing() {
    await this.processIDFieldpricing.click();
  }

  async fillProcessIDContent() {
    await this.processIDFieldContent.click();
  }

  async click_passValidation() {
    await this.passValidationCheckbox.click();
  }
  
  async click_CreateNew() {
    await this.startWorkflowBtn.click();
  }

  async startupdateworkflow() {
    await this.updateworkflowBtn.click();
  }

  async click_PullBack() {
    await this.pullbackBtn.click();
  }

  async click_SendBack() {
    await this.sendbackBtn.click();
  }

  async click_ReleaseReview() {
    await this.releaseReviewBtn.click();
  }

  async click_Approve() {
    await this.approveBtn.click();
  }

  async click_CancelCorrection() {
    await this.cancelCorrection.click();
  }

  async click_Close() {
    await this.closeBtn.click();
  }


  async verify_Status(status) {
    await this.workflowStatus.waitFor();
    const workflowStatustext = await this.workflowStatus.textContent();
    await expect(workflowStatustext).toEqual(status);
  }


 /* async verify_ActionButton(actionbutton) {
    await this.workflowbutton.first().waitFor();
    const workflowStatusBtntext = await this.workflowbutton.first().textContent();
    expect(workflowStatusBtntext).toEqual(actionbutton);
  }*/

  async verify_ActionButton(actionButtonText: string) {
    const buttons = await this.buttonUnderContainer.all();
    const buttonTexts = await Promise.all(buttons.map(async (button) => {
        return await button.textContent();
    }));
    const buttonExists = buttonTexts.includes(actionButtonText);
    expect(buttonExists).toBe(true);
}

  async verify_SecondActionButton(actionbutton, result) {
    const publishButtonText = await this.workflowbutton.nth(1).textContent();
    await this.workflowbutton.nth(1).waitFor();
    expect(await this.workflowbutton.nth(1).isEnabled()).toBe(result);
  }

  async verify_thirdActionButton(actionbutton, result) {
    const publishButtonText = await this.workflowbutton.nth(2).textContent();
    await this.workflowbutton.nth(2).waitFor();
    expect(await this.workflowbutton.nth(2).isEnabled()).toBe(result);
  }

  async verify_fourthActionButton(actionbutton, result) {
    const publishButtonText = await this.workflowbutton.nth(3).textContent();
    await this.workflowbutton.nth(3).waitFor();
    expect(await this.workflowbutton.nth(3).isEnabled()).toBe(result);
  }


  async click_ActionButton(actionbutton) {
    await this.workflowbutton.nth(0).waitFor();
    await this.workflowbutton.nth(0).click();
  }

  async click_sendForReview()
  {
    await this.sendForReviewBtn.click();
  }

  async click_startReview() {
    await this.startReviewBtn.click();
  }
  async click_pullBack() {
    await this.pullBackBtn.click();
  } 

async click_releaseReview() {
  await this.releaseReviewBtn.click();
}

async click_sendBack() {  
  await this.sendbackBtn.click();
}

  async verify_firstActionButton(actionbutton, result) {
    await this.workflowbutton.nth(0).waitFor();
    expect(await this.workflowbutton.nth(0).isEnabled()).toBe(result);
  }

  async click_SecondActionButton(actionbutton) {
    await this.workflowbutton.nth(1).click();
  }

  async click_submitondialog() {
    await this.submitBtn.click();
  }

  async click_cancelonpopup() {
    await this.cancelonpopup.click();
  }


  async verify_buttonnotvisible() {
    expect(await this.workflowbutton.isVisible()).toBe(false);
  }

  async verify_elementnotvisible()
  {
    expect(await this.workflowcontainer.isVisible()).toBe(false);
  }

  async verify_disabledbuttonvisible() {
    expect(await this.UnderReviewBtn.isDisabled()).toBe(true);
  }

  async verify_reviewdisablebutton() {
    expect(await this.sendForReviewBtn.isDisabled()).toBe(true);
  }

  async verify_correctionNeededdisablebutton() {
    expect(await this.correctionNeededBtn.isDisabled()).toBe(true);
  }

  async verify_validationpopup() {
    await this.permissiondialog.waitFor();
    expect(await this.permissiondialog.isVisible()).toBe(true);
  }

  async click_cancelondialog() {
    await this.cancelBtn.click();
  }


  async verify_validationrejectpopup() {
    await this.reject_publishpopuptitle.waitFor();
    expect(await this.reject_publishpopuptitle.isVisible()).toBe(true);
    await this.validaterejectpopuptext.waitFor();
    expect(await this.validaterejectpopuptext.isVisible()).toBe(true);
    const validaterejectpopuptext = await this.validaterejectpopuptext.textContent();
    expect(await validaterejectpopuptext).toEqual(constanttext.rejectpopuptext);
  }


  async validatepopupafterreject() {
    await this.afterreject_publishpopuptext.waitFor();
    expect(await this.afterreject_publishpopuptext.isVisible()).toBe(true);
    const validaterejectpopuptext = await this.afterreject_publishpopuptext.textContent();
    await expect(validaterejectpopuptext).toEqual(constanttext.afterrejectpopuptext);
    await this.closepopup.click();
  }


  async verify_validatepublishpopup() {
    await this.reject_publishpopuptitle.waitFor();
    expect(await this.reject_publishpopuptitle.isVisible()).toBe(true);
    await this.validatepublishpopuptext.nth(0).waitFor();
    expect(await this.validatepublishpopuptext.nth(0).isVisible()).toBe(true);
    var validatepublishpopuptext = await this.validatepublishpopuptext.nth(0).textContent();
    await expect(validatepublishpopuptext).toEqual(constanttext.publishpopuptext);
  }


  async validatepopupafterpublish() {
    await this.afterpublishpopuptitle.waitFor();
    expect(await this.afterpublishpopuptitle.isVisible()).toBe(true);
    var afterpublishpopuptitle = await this.afterpublishpopuptitle.textContent();
    await expect(afterpublishpopuptitle).toEqual(constanttext.afterpublishpopuptitle);
    await this.afterreject_publishpopuptext.waitFor();
    expect(await this.afterreject_publishpopuptext.isVisible()).toBe(true);
    var afterpublishpopuptext = await this.afterreject_publishpopuptext.textContent();
    await expect(afterpublishpopuptext).toEqual(constanttext.afterpublishpopuptext);
    await this.closepopup.click();
  }


  async validatebeforesendforreview() {
    await this.beforereviewpopuptext.waitFor();
    expect(await this.beforereviewpopuptext.isVisible()).toBe(true);
    var beforereviewpopuptext = await this.beforereviewpopuptext.textContent();
    await expect(beforereviewpopuptext).toEqual(constanttext.beforereviewpopuptext);
    await this.permissiondialog.waitFor();
    await this.closepopup.click();
  }


  async closevalidationpopup() {
    await this.closepopup.click();
  }


  async deleteWorkflow() {
    await this.page.waitForTimeout(3000);
    expect(await this.deleteIcon.isVisible()).toBe(true);
    await this.deleteIcon.click();
  }


  async businessKeyTextBlank() {
    await this.BusinessKeyTextBox.waitFor();
    var guidText = await this.BusinessKeyTextBox.textContent();
    await expect(guidText).toEqual("");
  }


  async verify_UIforPopupBeforeReject() {
    await this.confirmationpopup.waitFor();
    expect(await this.confirmationpopup.screenshot()).toMatchSnapshot({ name: `rejectpopup.png`});
  }


  async verify_UIforPopupAfterReject() {
    await this.afterreject_publishpopuptitle.waitFor();
    expect(await this.afterreject_publishpopuptitle.screenshot()).toMatchSnapshot({ name: `rejectconfirmationpopup.png`});
  }

  async verify_UIforStartReviewAndPullbackButtons() {
    await this.workflowcontainer.waitFor();
    expect(await this.workflowcontainer.screenshot()).toMatchSnapshot({ name: `StartReviewAndPullbackButtons.png`});
  }

  async verify_UIForWorkflowState(currentstate) {
    await this.workflowcontainer.waitFor();
    expect(await this.workflowcontainer.screenshot()).toMatchSnapshot({ name: `${currentstate}.png`});
  }

  async verify_UIForWorkflowStateContent(currentstate) {
    await this.workflowcontainer.waitFor();
    expect(await this.workflowcontainer.screenshot()).toMatchSnapshot({ name: `${currentstate}-content.png`});
  }

  async verify_UIforPopupBeforePublish() {
    await this.confirmationpopup.waitFor();
    expect(await this.confirmationpopup.screenshot()).toMatchSnapshot({ name: `publishpopup.png`});
  }

  async verify_UIforPopupAfterPublish() {
    await this.afterreject_publishpopuptitle.waitFor();
    expect(await this.afterreject_publishpopuptitle.screenshot()).toMatchSnapshot({ name: `publishconfirmationpopup.png`});
  }



  async verify_UIforValidationPopup() {
    await this.permissiondialog.waitFor();
    expect(await this.permissiondialog.screenshot()).toMatchSnapshot({ name: `errorvalidation.png`});
  }

  async setupBaselineImage(page, testName, snapshotDir, element?: Locator) {
    const os = process.platform;
    const browserName = getBrowser();
    const baselineImagePath = path.join(snapshotDir, `${testName}-${browserName}-${os}.png`);
    //console.log(baselineImagePath);
    try {
      let baselineImage = await fs.readFile(baselineImagePath);
      return baselineImage;
    } catch (error) {
      console.log('Baseline image not found, Capturing and saving a new baseline Image');
      const screenshot = element ? await element.screenshot({ path: baselineImagePath }) : await page.screenshot({ path: baselineImagePath });
      return screenshot;
    }
  }

}
