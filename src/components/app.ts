import { createListSection } from './list-of-options.js'
import { createButtonSection } from './list-of-buttons.js'


// -------------- Application container, header and two sections -------------------
// ------------------- (left with table, right with buttons) -------------------
export function createApp(): void {
    const appContainer = document.createElement('div');
    appContainer.classList.add('appContainer');
  
    const titleApp = document.createElement('h1');
    titleApp.textContent = 'Decision Making Tool';
    titleApp.classList.add('titleApp');
    appContainer.append(titleApp);
  
    const content = document.createElement('div');
    content.classList.add('content');
    appContainer.append(content);
  
    const listSection: HTMLElement = createListSection();
    content.append(listSection);
  
    const buttonSection: HTMLElement = createButtonSection();
    content.append(buttonSection);
  
    document.body.append(appContainer);
  }