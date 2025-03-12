// -------------- Application container, header and two sections -------------------
// ------------------- (left with table, right with buttons) -------------------
function createApp(): void {
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

// ------------------- Left - List Section -------------------
function createListSection(): HTMLElement {
  const listSection = document.createElement('div');
  listSection.classList.add('listSection');

  const taskTable: HTMLElement = createTable();
  listSection.append(taskTable);

  const addStartButtonSection: HTMLElement = createAddStartButtonSection();
  listSection.append(addStartButtonSection);

  return listSection;
}

// createTable
function createTable(): HTMLTableElement {
  const table = document.createElement('table');
  table.classList.add('table');
  return table;
}

// createAddOptionSection
function createAddStartButtonSection(): HTMLElement {
  const addStartButtonSection = document.createElement('div');
  addStartButtonSection.classList.add('addStartButtonSection');

  const addOptionButton = document.createElement('button');
  addOptionButton.textContent = 'Add Option';
  addOptionButton.classList.add('addOptionButton', 'button');
  addStartButtonSection.append(addOptionButton);

  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.classList.add('startButton', 'button');
  addStartButtonSection.append(startButton);

  return addStartButtonSection;
}

// ------------------- Right - Button Section -------------------
function createButtonSection(): HTMLElement {
  const buttonSection = document.createElement('div');
  buttonSection.classList.add('buttonSection');

  const pasteButton = document.createElement('button');
  pasteButton.textContent = 'paste';
  pasteButton.classList.add('pasteButton', 'button');
  buttonSection.append(pasteButton);

  const clearButton = document.createElement('button');
  clearButton.textContent = 'clear';
  clearButton.classList.add('clearButton', 'button');
  buttonSection.append(clearButton);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'save';
  saveButton.classList.add('saveButton', 'button');
  buttonSection.append(saveButton);

  const loadButton = document.createElement('button');
  loadButton.textContent = 'load';
  loadButton.classList.add('loadButton', 'button');
  buttonSection.append(loadButton);

  return buttonSection;
}

createApp();
