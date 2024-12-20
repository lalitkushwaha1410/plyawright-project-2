interface AuthoringEnv {
    TestHarnessUrl: string;
    AuthoringUrl: string;
    AuthoringToggleUrl: string;
}

interface EnvSettings {
    systest: AuthoringEnv,
    staging: AuthoringEnv,
    performance: AuthoringEnv,
    integration: AuthoringEnv,
}


export const env: EnvSettings = {
    systest: {
        TestHarnessUrl: "https://authoring.systest.cha.rbxd.ds/workflow-test-harness/",
        AuthoringUrl: "https://authoring.systest.cha.rbxd.ds/content/intelligence/",
        AuthoringToggleUrl: "https://authoring.systest.cha.rbxd.ds/mfe/canvas/toggles"
    },
    staging: {
        TestHarnessUrl: "https://authoring.staging.cha.rbxd.ds/workflow-test-harness/",
        AuthoringUrl: "https://authoring.staging.cha.rbxd.ds/content/intelligence/",
        AuthoringToggleUrl: "https://authoring.staging.cha.rbxd.ds/mfe/canvas/toggles"
    },
    performance: {
        TestHarnessUrl: "https://authoring.performance.cha.rbxd.ds/workflow-test-harness/",
        AuthoringUrl: "https://authoring.performance.cha.rbxd.ds/content/intelligence/",
        AuthoringToggleUrl: "https://authoring.performance.cha.rbxd.ds/mfe/canvas/toggles"
    },
    integration: {
        TestHarnessUrl: "https://authoring.integration.cha.rbxd.ds/workflow-test-harness/",
        AuthoringUrl: "https://authoring.integration.cha.rbxd.ds/content/intelligence/",
        AuthoringToggleUrl: "https://authoring.integration.cha.rbxd.ds/mfe/canvas/toggles"
    },
};

export const getEnv = (): AuthoringEnv => {
    // @ts-ignore
    const envName = process.env.ENV_NAME ?? 'staging';
    return env[`${envName}`]
}

export const getBrowser = () => {
    const browserName = process.env.BROWSER ?? 'chromium';
    return browserName;
};