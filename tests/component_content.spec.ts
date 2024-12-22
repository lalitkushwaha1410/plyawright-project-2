import { test, expect } from "@playwright/test";
import { user } from "../testdata/users";
import { env } from "../testdata/environments";
import { LoginPage } from "../pages/LoginPage";
import { TestHarnessPage } from "../pages/TestHarnessPage";
import {constanttext} from "../testdata/constants";

test.describe("Workflow component tests", async () => {
  let testharnessPage: TestHarnessPage;

  test.beforeEach(async ({ page }) => {
    testharnessPage = await new TestHarnessPage(page);
    await testharnessPage.URLToTestharness();
  });

  test("Create New page", async ({page,}) => {
    await testharnessPage.createNewContentPage();
    await testharnessPage.verify_Status("Draft");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test.skip("Verify error message when validation is failed", async ({page,}) => {
    await testharnessPage.createNewContentPage();
    await testharnessPage.click_ActionButton("Send for review")
    await testharnessPage.validatebeforesendforreview();
  });

  test("Send page for review", async ({page,}) => {
    await testharnessPage.createNewContentPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Ready for review");
    await testharnessPage.click_ActionButton("Start Review");
    await testharnessPage.verify_SecondActionButton("Pull back",true);
    
  });


  test("Actions on Pull back from Ready for review", async ({page,}) => {
    await testharnessPage.createNewContentPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_PullBack();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Draft");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test("Actions on Start Review", async ({page,}) => {
    await testharnessPage.createNewContentPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Start review");
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("In review");
    await testharnessPage.verify_ActionButton("Approve");
    await testharnessPage.verify_SecondActionButton("Send back",true);
    await testharnessPage.verify_thirdActionButton("Release review",true);
  });

  test("Actions on Send back from In review", async ({page,}) => {
    await testharnessPage.createNewContentPage(); 
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Start review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_SendBack();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Draft");
    await testharnessPage.verify_ActionButton("Send for review");
  });

  test("Actions on Release Review from In review", async ({page,}) => {
    await testharnessPage.createNewContentPage();
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Start review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ReleaseReview();
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(7000);
    await testharnessPage.verify_Status("Ready for review");
    await testharnessPage.click_ActionButton("Start Review");
    await testharnessPage.verify_SecondActionButton("Pull back",true);
    
  });


  test("Actions on Approve from In review", async ({page,}) => {
    await testharnessPage.createNewContentPage(); 
    await testharnessPage.click_ActionButton("Send for review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton("Start review");
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_Approve();
    await testharnessPage.click_submitondialog();
   // await page.waitForTimeout(130000);
    await testharnessPage.click_Close();
    await testharnessPage.verify_Status("Published");
    await testharnessPage.verify_reviewdisablebutton();
    await testharnessPage.verify_correctionNeededdisablebutton();
   // await testharnessPage.click_ActionButton("Correction needed");
  });

 
  //Correction workflow

 /*   test("Actions on Correction needed", async ({page,}) => {
        await testharnessPage.createNewContentPage(); 
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Approve();
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Close();
        await testharnessPage.click_ActionButton("Correction needed");
        await testharnessPage.verify_Status("Correction draft");
        await testharnessPage.verify_ActionButton("Send for review");
        await testharnessPage.verify_SecondActionButton("Cancel",true);
    });

    test("Actions on Send for Review from Correction draft status", async ({page,}) => {
        await testharnessPage.createNewContentPage(); 
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Approve();
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Close();
        await testharnessPage.click_ActionButton("Correction needed");
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction Ready for review");
        await testharnessPage.verify_ActionButton("Start review");
        await testharnessPage.verify_SecondActionButton("Cancel",true);
    });

    test("Actions on Cancel from Correction draft status", async ({page,}) => {
        await testharnessPage.createNewContentPage(); 
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Approve();
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Close();
        await testharnessPage.click_ActionButton("Correction needed");
        await testharnessPage.click_ActionButton("Cancel");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Published");
        await testharnessPage.verify_ActionButton("Correction needed");
        await testharnessPage.verify_reviewdisablebutton();
    });

    test("Actions on Cancel from Correction ready for review status", async ({page,}) => {
        await testharnessPage.createNewContentPage(); 
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Approve();
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Close();
        await testharnessPage.click_ActionButton("Correction needed");
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction Ready for review");
        await testharnessPage.click_ActionButton("Cancel");
        await testharnessPage.verify_Status("Published");
        await testharnessPage.verify_ActionButton("Correction needed");
        await testharnessPage.verify_reviewdisablebutton();
    });


    test("Actions on Start Review from Correction ready for review status", async ({page,}) => {
        await testharnessPage.createNewContentPage(); 
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Approve();
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Close();
        await testharnessPage.click_ActionButton("Correction needed");
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction in review");
        await testharnessPage.verify_ActionButton("Approve");
        await testharnessPage.verify_SecondActionButton("Send back",true);
        await testharnessPage.verify_thirdActionButton("Release review",true);
        await testharnessPage.verify_fourthActionButton("Cancel",true);
    });

    test("Actions on Cancel from Correction in review status", async ({page,}) => {
        await testharnessPage.createNewContentPage(); 
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Approve();
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Close();
        await testharnessPage.click_ActionButton("Correction needed");
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.click_ActionButton("Cancel");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction in review");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Published");
        await testharnessPage.verify_ActionButton("Correction needed");
        await testharnessPage.verify_reviewdisablebutton();
    });

    test("Actions on Send back from Correction in review status", async ({page,}) => {
        await testharnessPage.createNewContentPage(); 
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Approve();
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Close();
        await testharnessPage.click_ActionButton("Correction needed");
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction in review");
        await testharnessPage.click_ActionButton("Send back");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction draft");
        await testharnessPage.verify_ActionButton("Send for review");
        await testharnessPage.verify_SecondActionButton("Cancel",true);
    });

    test("Actions on Release review from Correction in review status", async ({page,}) => {
        await testharnessPage.createNewContentPage(); 
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Approve();
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Close();
        await testharnessPage.click_ActionButton("Correction needed");
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction in review");
        await testharnessPage.click_ActionButton("Release review");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction ready for review");
        await testharnessPage.verify_ActionButton("Start review");
        await testharnessPage.verify_SecondActionButton("Cancel",true);
    });

    test("Actions on Approve from Correction in review status", async ({page,}) => {
        await testharnessPage.createNewContentPage(); 
        await testharnessPage.click_ActionButton("Send for review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Approve();
        await testharnessPage.click_submitondialog();
        await testharnessPage.click_Close();
        await testharnessPage.click_ActionButton("Correction needed");
        await testharnessPage.click_ActionButton("Start review");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction in review");
        await testharnessPage.click_ActionButton("Approve");
        await testharnessPage.click_submitondialog(); //need to verify it
        await testharnessPage.verify_Status("Correction published");
        await testharnessPage.verify_reviewdisablebutton();
        await testharnessPage.verify_correctionNeededdisablebutton();
    });*/
});

