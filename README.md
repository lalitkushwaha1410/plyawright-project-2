# Workflow automation test suite overview

This README file provides an overview of the workflow automation suite using playwright. The suite includes component, visual regression as well as end-to-end (E2E) tests -

`Component tests`- It covers almost all workflow scenerios on test harness.

`Visual tests`- It covers visual regression tests covering all scenerios where we need to match designs from figma. Approach is to compare actual screenshots with provided baseline screenshots.

`E2E tests`- It cover basic workflow publish and update journeys when integrated with Canvas.

And it also includes the instructions on how to run it using GitLab pipelines.


### Running in Gitlab pipeline

Here is Gitlab pipeline- https://gitlab.cha.rbxd.ds/icis/workflow/automation-test-suite/workflow-component-tests/-/pipelines

To run the playwright test suite using GitLab pipelines, you can utilize  variables: `ENV`,  `BROWSER`, `CLASSNAME`


### Environment Variable (`ENV`)

The `ENV` variable specifies the target environment for the tests. It can take the following values:

- `staging`: (default): Tests against the staging test environment.
- `systest`: Tests against the systest environment.
- `performance`: Tests focused on performance testing.
- `integration`: Tests for integration scenarios.

You can choose the desired environment by setting the `ENV` variable accordingly in your GitLab pipeline configuration.

### Browser Variable (`BROWSER`)

The `BROWSER` variable determines the browser in which the tests will be executed. It can take the following values:

- `chromium` (default): Runs the tests in the Google Chrome browser.
- `webkit`: Runs the tests in the Microsoft Edge browser.
- `firefox`: Runs the tests in the Mozilla Firefox browser.

You can specify the desired browser by setting the `BROWSER` variable accordingly in your GitLab pipeline configuration.

### Classname Variable (`CLASSNAME`)

The `CLASSNAME` variable specifies the target class to be run. It can take the following values:
- `component_topics.spec.ts` (default): Runs the component tests for topics in test harness.
- `component_pricing.spec.ts`: Runs the component tests for pricing in test harness.
- `E2E_workflow.spec.ts`: Runs the E2E tests integrated with canvas.
- `workflow.spec.ts`: Runs both E2E and component tests.
- `visual_tests.spec.ts`: Run visual regression tests.

We can keep on adding more classes as and when desired and control execution using this variable.

### Steps to run in local

To run the workflow test suite from system, you can use the following command :

 - yarn install -- to Install dependencies
 - yarn tc:test -- to run all tests
 - yarn test:comp-topics -- to run topics component tests
 - yarn test:comp-pricing -- to run pricing component tests
 - yarn test:visual -- to run visual regression tests
 - yarn test:e2e -- to run E2E tests
 - yarn test:comp-all -- to run all component tests
 - yarn test:all -- to run all tests

 To run in debug mode, use command:
 - yarn debug

To run in parallel mode, use command:
- yarn parallel-run, this will run 3 instances at time. To increase/decrease workers, we can update command and set number of workers.


### To capture baseline snapshots for Visual regression tests in local

Baseline screenshots are already saved under folder tests > visual_tests.spec.ts-snapshots. In case, we need to update baseline snapshots-  
Run command- .\run_functionaltests.sh. 

This will create docker container and run all tests within it. After running, it will copy snapshots to baseline snapshot path.
Now push these snapshots to gitlab.


### Reporting

We are generating HTML as well as allure reports.

To generate and open allure report after test run, use command-
- yarn generateAllure
- yarn allure:open


### Additional features

We are using concept of `Re-use state and Re-use authentication` feature provided by playwright where we are saving login storage state in `LoginAuth.json` file which is used to maintain a consistent state across multiple browser instances or test runs. By using storageState(), we ensure that our tests start with a consistent browser state, making them more predictable and reliable. Also it indirectly contribute to saving time by reducing the need for repetitive setup steps.


Happy testing!
