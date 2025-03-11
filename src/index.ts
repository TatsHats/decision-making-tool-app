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

  const listSection = createListSection();
  content.append(listSection);

  const buttonSection = createButtonSection();
  content.append(buttonSection);

  document.body.append(appContainer);
}

// ------------------- Left - List Section -------------------
function createListSection(): HTMLElement {
  const listSection = document.createElement('div');
  listSection.classList.add('listSection');

  const taskTable = createTable();
  listSection.append(taskTable);

  const addOptionSection = createAddOptionSection();
  listSection.append(addOptionSection);

  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.classList.add('startButton', 'button');
  listSection.append(startButton);

  return listSection;
}

// createTable
function createTable() {
  const table = document.createElement('table');
  table.classList.add('table');
  return table;
}

// createAddOptionSection
function createAddOptionSection() {
  const addOptionSection = document.createElement('div');
  
  const addOptionTitle = document.createElement('h3');
  addOptionTitle.textContent = 'Add Option';
  addOptionTitle.classList.add('title');

  const addButton = document.createElement('button');
  addButton.textContent = '+';
  addButton.classList.add('addButton');
  return addOptionSection;
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
