import {
    SourceStateManager,
    NavigationButton,
} from "paperback-extensions-common";

import {
    setStateData
} from "./Common";

/* UI definition */

// NOTE: Submitted data won't be tested
export const serverSettingsMenu = (
    stateManager: SourceStateManager,
): NavigationButton => {
    return createNavigationButton({
        id: "server_settings",
        value: "",
        label: "Server Settings",
        form: createForm({
            onSubmit: async (values: any) => setStateData(stateManager, values),
            validate: async () => true,
            sections: async () => [
                // createSection({
                //     id: "serverSettings",
                //     header: "Server Settings",
                //     footer: "Minimal Komga version: v0.100.0",
                //     rows: async () => retrieveStateData(stateManager).then((values) => [
                //         createInputField({
                //             id: "serverAddress",
                //             label: "Server URL",
                //             placeholder: "http://127.0.0.1:8080",
                //             value: values.serverURL,
                //             maskInput: false,
                //         }),
                //         createInputField({
                //             id: "serverUsername",
                //             label: "Email",
                //             placeholder: "demo@komga.org",
                //             value: values.serverUsername,
                //             maskInput: false,
                //         }),
                //         // TS-Ignoring because this isnt documented yet
                //         // Fallback to default input field if the app version doesnt support
                //         // SecureInputField
                //         // @ts-ignore
                //         (typeof createSecureInputField == 'undefined' ? createInputField : createSecureInputField)({
                //             id: "serverPassword",
                //             label: "Password",
                //             placeholder: "Some Super Secret Password",
                //             value: values.serverPassword
                //         }),
                //     ]),
                // }),
                // createSection({
                //     id: "sourceOptions",
                //     header: "Source Options",
                //     footer: "",
                //     rows: async () => retrieveStateData(stateManager).then((values) => [
                //         createSwitch({
                //             id: 'showOnDeck',
                //             label: 'Show On Deck',
                //             value: values.showOnDeck,
                //         }),
                //         createSwitch({
                //             id: 'showContinueReading',
                //             label: 'Show Continue Reading',
                //             value: values.showContinueReading,
                //         }),
                //         createSwitch({
                //             id: 'orderResultsAlphabetically',
                //             label: 'Sort results alphabetically',
                //             value: values.orderResultsAlphabetically,
                //         }),
                //     ]),
                // }),
            ],
        }),
    });
};