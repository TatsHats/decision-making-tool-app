import { createListOfOptions } from './components/list-of-options.js';
import { createDecisionPicker } from './components/decision-picker.js';

export enum Page {
  List = 'list',
  Picker = 'picker',
}

const appContainer = document.createElement('div');
document.body.append(appContainer);

export function changePage(page: Page, updateURL = true): void {
  appContainer.replaceChildren();

  if (page === Page.List) {
    appContainer.append(createListOfOptions());
  } else if (page === Page.Picker) {
    appContainer.append(createDecisionPicker());
  }

  if (updateURL && globalThis.window !== undefined) {
    globalThis.history.pushState({ page }, '', `?page=${page}`);
  }
}

function loadPageFromURL(): void {
  const urlParameters = new globalThis.URLSearchParams(
    globalThis.location.search,
  );
  const pageUrl = urlParameters.get('page');

  let page: Page = Page.List;
  if (pageUrl === Page.Picker || pageUrl === Page.List) {
    page = pageUrl;
  }
  changePage(page, false);
}

if (globalThis.window !== undefined) {
  globalThis.addEventListener('popstate', (event) => {
    if (event.state?.page) {
      changePage(event.state.page, false);
    }
  });

  loadPageFromURL();
}
