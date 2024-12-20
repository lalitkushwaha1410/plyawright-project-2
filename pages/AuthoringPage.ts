import { test, expect, Locator, Page } from "@playwright/test";
import { user } from "../testdata/users";
import { env, getEnv } from "../testdata/environments";
import { LoginPage } from "../pages/LoginPage";
import { constanttext } from "../testdata/constants";

let loginPage: LoginPage;
export class AuthoringPage {
    readonly page: Page;
    readonly createNew: Locator;
    readonly headLine: Locator;
    readonly pageDescription: Locator;
    readonly nextbtn: Locator;
    readonly onecolumnTemplate: Locator;
    readonly createPageBtn: Locator;
    readonly workflowStatus: Locator;
    readonly workflowStatusBtn: Locator;
    readonly publishedTab: Locator;
    readonly publishedRow: Locator;
    readonly submitBtn: Locator;
    readonly reviewworkflowStatusBtn: Locator;
    readonly rejectworkflowStatusBtn: Locator;
    readonly publishworkflowStatusBtn: Locator;
    readonly workflowcontainer: Locator;
    readonly workflowbutton: Locator;
    readonly secondButton: Locator;
    readonly closepopup: Locator;
    readonly updateworkflowBtn: Locator;
    readonly cancelonpopup: Locator;
    readonly addContentBlockButton: Locator;
    readonly clickImageCard: Locator;
    readonly pagetitle: Locator;
    readonly clickRichtext: Locator;
    readonly Richtextbox: Locator;
    readonly pageTitle: Locator;
    public page_title: string;
    readonly closebtn: Locator;
    readonly sortingLastUpdated: Locator;
    readonly workflowstatuscontainer: Locator;
    readonly addContentBlock: Locator;
    readonly underReviewTab: Locator;
    readonly backclick: Locator;
    readonly unpublishBtn: Locator;
    readonly unpublishSubmitBtn: Locator;
    readonly allTab: Locator;
    readonly draftTab: Locator;
    readonly sendForReviewBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createNew = page.getByTestId("create-new-page-button");
        this.headLine = page.getByTestId("headline-textarea");
        this.pageDescription = page.getByTestId("description-textarea");
        this.nextbtn = page.getByTestId("next-button");
        this.onecolumnTemplate = page.getByTestId("template-image-wrapper-One Column");
        this.createPageBtn = page.getByTestId("create-page-button");
        this.workflowStatus = page.locator("div[data-testid^='workflow-status-']:nth-of-type(2)");
        this.submitBtn = page.getByTestId("modal-footer-workflow-action-btn");
        this.workflowcontainer = page.getByTestId("workflow-container");
        this.workflowstatuscontainer = page.getByTestId("workflow-status-container");
        this.workflowbutton = this.workflowcontainer.getByRole("button");
        this.draftTab = page.getByTestId('page-status-filter-Draft');
        this.allTab = page.getByTestId('page-status-filter-All');
        this.publishedTab = page.getByTestId('page-status-filter-Published');
        this.sendForReviewBtn= page.getByTestId("UNDER_REVIEW");
        this.underReviewTab = page.getByTestId('page-status-filter-Under Review');
        this.publishedRow = page.locator("tr[data-testid='PUBLISHED-page-row']>td");
        this.pageTitle = page.getByTestId("page-title");
        this.closebtn = page.getByTestId('closeBtn');
        this.closepopup = page.locator('svg[data-icon="xmark"]');
        this.updateworkflowBtn = page.getByRole("button", { name: "Start Update Workflow" });
        this.cancelonpopup = page.getByTestId("workflow-confirmation-modal");
        this.addContentBlock = page.locator('svg[aria-hidden="true"][data-icon="plus"]').first();
        this.clickImageCard = page.getByTestId("content-block-button-image-capability");
        this.pagetitle = page.getByTestId("page-title-link");
        this.sortingLastUpdated = page.getByTestId("table-heading-last-updated");
        this.backclick = page.getByTestId("page-list-link");
        this.unpublishBtn = page.locator('svg[data-icon="unpublish"][data-prefix="fac"]');
        this.unpublishSubmitBtn = page.getByTestId("modal-footer-primary-btn");
        this.unpublishBtn = page.locator('svg[data-icon="unpublish"][data-prefix="fac"]');
        this.unpublishSubmitBtn = page.getByTestId("modal-footer-primary-btn");
    }

    async LoginToE2E() {
        // await this.page.goto(getEnv().AuthoringToggleUrl);
        // await this.page.waitForTimeout(2000);
        // await this.page.getByTestId('toggle-off').nth(1).click();
        // await this.page.goto(getEnv().AuthoringToggleUrl);
        // await this.page.waitForTimeout(2000);
        // await this.page.getByTestId('toggle-off').nth(1).click();
        await this.page.goto(getEnv().AuthoringUrl);
    }

    async sortByLastUpdated() {
        await this.sortingLastUpdated.click();
        await this.sortingLastUpdated.click();
        await this.page.waitForTimeout(5000);
    }

    async findRecordAndClick(string) {
        await this.sortingLastUpdated.click();
        await this.sortingLastUpdated.click();
        await this.page.waitForTimeout(3000);
        await this.page
            .getByTestId('page-title-link')
            .filter({ hasText: string }).first()
            .click();

    }

    async createNewPage() {
        await this.Click_CreateNew();
        const timestamp = new Date().getTime();
        //code to trim the timestamp to 3 digits
        const trimmedTimestamp = timestamp.toString().slice(-3);
        await this.headLine.fill("Automation-IntelPage-" + trimmedTimestamp);
        await this.pageDescription.fill("Automation-description");
        await this.nextbtn.click();
        await this.onecolumnTemplate.click();
        await this.createPageBtn.click();
        this.page_title = await this.pageTitle.textContent();
    }

    async Click_CreateNew() {
        await this.createNew.click();
    }

    async verify_Status(status) {
        const workflowStatustext = await this.workflowStatus.textContent();
        await expect(workflowStatustext).toEqual(status);
    }

    async wait_until_status_change() {
        const response = await this.page.waitForResponse(req => {
            const request = req.request();
            const requestBody = request.postDataJSON();
            return request.url().includes("/api/canvas/v1/graphql") && requestBody.operationName === "GET_CANVAS_PAGE";
        });
    }

    async open_PublishedPage() {
        await this.publishedTab.click();
        //add code to click on Under Review tab if no records are present in Published tab
        const publishedRowCount = await this.publishedRow.count();
        if (publishedRowCount === 0) {
            await this.underReviewTab.click();
            await this.page
                .getByTestId('page-title-link').first().click();
            await this.page.waitForTimeout(1000);
            await this.workflowstatuscontainer.click();
            await this.page.waitForTimeout(1000);
            await this.click_SecondActionButton("Publish");
            await this.click_submitondialog();
            await this.click_closebtn();
            await this.page.waitForTimeout(7000);
            await this.verify_Status("Published");
            await this.backclick.click();
            await this.publishedTab.click();
            await this.sortingLastUpdated.click();
            await this.sortingLastUpdated.click();
        }

        await this.publishedRow.first().click();
        this.page_title = await this.pageTitle.textContent();
    }

    async navigate_PublishedTab() {
        await this.publishedTab.click();
    }

    async navigate_ALLTab() {
        await this.allTab.click();
    }

    async navigate_draftTab() {
        await this.draftTab.click();
    }

    async add_Content() {
        await this.workflowstatuscontainer.click();
        await this.page.waitForTimeout(2000);
        await this.addContentBlock.click();
        await this.page.waitForTimeout(2000);
        await this.clickImageCard.click();
        await this.workflowstatuscontainer.click();
    }

    async add_ImageContent() {
        await this.clickImageCard.click();
        await this.workflowstatuscontainer.click();
    }


    async verify_ActionButton(actionbutton) {
        await this.workflowbutton.waitFor();
        const workflowStatusBtntext = await this.workflowbutton.first().textContent();
        expect(workflowStatusBtntext).toEqual(actionbutton);
    }

    async verify_SecondActionButton(actionbutton) {
        const publishButtonText = await this.workflowbutton.nth(1).textContent();
    }

    async click_ActionButton(actionbutton) {
        await this.workflowbutton.nth(0).click();
    }

    async click_SecondActionButton(actionbutton) {
        await this.workflowbutton.nth(1).click();
    }


    async click_submitondialog() {
        await this.submitBtn.click();
    }

    async click_closebtn() {
        await this.closebtn.click();

    }

    async verify_buttonnotvisible() {
        expect(await this.workflowbutton.isVisible()).toBe(false);
    }

    async verify_disabledbuttonvisible() {
        expect(await this.sendForReviewBtn.isDisabled()).toBe(true);
      }

    async click_BackToPageListPage() {
        await this.backclick.click();
        await this.page.waitForTimeout(5000);
    }

    async click_unpublishSubmitDialog() {
        await this.unpublishSubmitBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async selectPublishedPage() {
        await this.publishedRow.first().click();
        await this.page.waitForTimeout(3000);
        this.page_title = await this.pageTitle.textContent();
        await this.click_BackToPageListPage();
        await this.publishedTab.click();
    }

    async unpublishFirstPublishedPage() {
        await this.sortByLastUpdated();
        const firstPublishPageName = this.page.locator('tr[data-testid="PUBLISHED-page-row"]')
        .first().locator('td');
        await firstPublishPageName.nth(0).click();
        this.page_title = await this.pageTitle.textContent();
        await this.click_BackToPageListPage();
        await this.publishedTab.click();
        await this.sortByLastUpdated();
        const UnpublishButton = firstPublishPageName.nth(5);
        await UnpublishButton.click();
        await this.click_unpublishSubmitDialog();
    }

    async unpublishFirstPublishedDraftPage() {
        await this.sortByLastUpdated();
        const firstPublishDraftPage = this.page.locator('tr[data-testid="PUBLISHED_DRAFT-page-row"]')
        .first().locator('td');
        await firstPublishDraftPage.nth(0).click();
        this.page_title = await this.pageTitle.textContent();
        await this.click_BackToPageListPage();
        await this.publishedTab.click();
        await this.sortByLastUpdated();
        const UnpublishButton = firstPublishDraftPage.nth(5);
        await UnpublishButton.click();
        await this.click_unpublishSubmitDialog();
    }
    
}