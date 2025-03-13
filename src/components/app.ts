import { createListSection } from './list-of-options.js'
import { createButtonSection } from './list-of-buttons.js'


// -------------- Application container, header and two sections -------------------
// ------------------- (left with table, right with buttons) -------------------
export function createApp(): void {
    const appContainer = document.createElement('div');
    appContainer.classList.add('appContainer');
  
    const listSection: HTMLElement = createListSection();
    appContainer.append(listSection);
  
    const buttonSection: HTMLElement = createButtonSection();
    appContainer.append(buttonSection);
  
    document.body.append(appContainer);
  }