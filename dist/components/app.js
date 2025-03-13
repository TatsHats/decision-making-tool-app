import { createListSection } from './list-of-options.js';
import { createButtonSection } from './list-of-buttons.js';
// -------------- Application container, header and two sections -------------------
// ------------------- (left with table, right with buttons) -------------------
export function createApp() {
    const appContainer = document.createElement('div');
    appContainer.classList.add('appContainer');
    const listSection = createListSection();
    appContainer.append(listSection);
    const buttonSection = createButtonSection();
    appContainer.append(buttonSection);
    document.body.append(appContainer);
}
