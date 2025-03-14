import { createListOfOptions } from './components/list-of-options.js';
import { createDecisionPicker } from './components/decision-picker.js';

export enum Page {
  List = 'list',
  Picker = 'picker',
}

const appContainer = document.createElement('div');
document.body.append(appContainer);

export function changePage(page: Page): void {
  appContainer.replaceChildren();

  if (page === Page.List) {
    console.log('Rendering List page');
    appContainer.append(createListOfOptions());
  } else if (page === Page.Picker) {
    console.log('Rendering Picker page');
    appContainer.append(createDecisionPicker());
  }
}
