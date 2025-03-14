import { createListOfOptions } from './components/list-of-options.js';
import { createDecisionPicker } from './components/decision-picker.js';
export var Page;
(function (Page) {
    Page["List"] = "list";
    Page["Picker"] = "picker";
})(Page || (Page = {}));
const appContainer = document.createElement('div');
document.body.append(appContainer);
export function changePage(page) {
    appContainer.replaceChildren();
    if (page === Page.List) {
        console.log('Rendering List page');
        appContainer.append(createListOfOptions());
    }
    else if (page === Page.Picker) {
        console.log('Rendering Picker page');
        appContainer.append(createDecisionPicker());
    }
}
