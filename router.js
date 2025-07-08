import { createListOfOptions } from './components/list-of-options.js';
import { createDecisionPicker } from './components/decision-picker.js';
export var Page;
(function (Page) {
    Page["List"] = "list";
    Page["Picker"] = "picker";
})(Page || (Page = {}));
const appContainer = document.createElement('div');
document.body.append(appContainer);
export function changePage(page, updateURL = true) {
    appContainer.replaceChildren();
    if (page === Page.List) {
        appContainer.append(createListOfOptions());
    }
    else if (page === Page.Picker) {
        appContainer.append(createDecisionPicker());
    }
    if (updateURL && globalThis.window !== undefined) {
        globalThis.history.pushState({ page }, '', `?page=${page}`);
    }
}
function loadPageFromURL() {
    const urlParameters = new globalThis.URLSearchParams(globalThis.location.search);
    const pageUrl = urlParameters.get('page');
    let page = Page.List;
    if (pageUrl === Page.Picker || pageUrl === Page.List) {
        page = pageUrl;
    }
    changePage(page, false);
}
if (globalThis.window !== undefined) {
    globalThis.addEventListener('popstate', (event) => {
        var _a;
        if ((_a = event.state) === null || _a === void 0 ? void 0 : _a.page) {
            changePage(event.state.page, false);
        }
    });
    loadPageFromURL();
}
