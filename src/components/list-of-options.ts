import { Page, changePage } from '../router.js';
import { createPasteListModal } from './paste-list-modal.js';
import { createAddValidOptionsModal } from './add-valid-options-modal.js';
import DataStorage from './storage-handler.js';

// ------------------------ global variables ---------------------------

let savedOptions: { id: number; title: string; weight: number }[] = [];
let tableBody: HTMLElement;

const storage = new DataStorage(localStorage);
const STORAGE_KEY = 'optionsData';

export let idOptionCount = 1;
export let optionsArray: {
  id: number;
  title: string;
  weight: number;
}[] = [];

// -------------- Application container, header and two sections -------------------
// ------------------- (left with table, right with buttons) -------------------
export function createListOfOptions(): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('appContainer');

  const listSection: HTMLElement = createListSection();
  container.append(listSection);

  const buttonSection: HTMLElement = createButtonSection();
  container.append(buttonSection);

  return container;
}

// ------------------- Left - List Section -------------------
function createListSection(): HTMLElement {
  const listSection = document.createElement('div');
  listSection.classList.add('listSection');

  const titleApp = document.createElement('h1');
  titleApp.textContent = 'Decision Making Tool';
  titleApp.classList.add('titleApp');
  listSection.append(titleApp);

  const taskTable: HTMLTableElement = createTable();
  listSection.append(taskTable);

  const addStartButtonSection: HTMLElement = createAddStartButtonSection();
  listSection.append(addStartButtonSection);

  return listSection;
}

// createTable
export function createTable(): HTMLTableElement {
  const table = document.createElement('table');
  table.classList.add('table');

  const tableHead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  const idTask = document.createElement('th');
  idTask.textContent = 'ID';

  const titleTask = document.createElement('th');
  titleTask.textContent = 'Task title';

  const weightTask = document.createElement('th');
  weightTask.textContent = 'Task weight';

  const deleteTask = document.createElement('th');
  deleteTask.textContent = '';

  headerRow.append(idTask, titleTask, weightTask, deleteTask);
  tableHead.append(headerRow);
  table.append(tableHead);

  tableBody = document.createElement('tbody');
  table.append(tableBody);

  if (Array.isArray(savedOptions) && savedOptions.length > 0) {
    for (const option of savedOptions) {
      tableBody.append(
        createRow(option.id, option.title, option.weight.toString()),
      );
    }
  } else {
    tableBody.append(createRow(idOptionCount, '', ''));
    idOptionCount += 1;
  }

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

  addOptionButton.addEventListener('click', () => {
    const newRow = createRow(idOptionCount);
    tableBody.append(newRow);
    idOptionCount += 1;
  });

  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.classList.add('startButton', 'button');
  addStartButtonSection.append(startButton);
  startButton.addEventListener('click', () => {
    optionsChecking();
  });

  return addStartButtonSection;
}

// create Rows
export function createRow(
  id: number,
  title: string = '',
  weight: string = '',
): HTMLTableRowElement {
  const row = document.createElement('tr');
  const idCell = document.createElement('td');
  idCell.textContent = id.toString();

  const titleCell = document.createElement('td');
  const titleInput = createInputElement('text', 'Title', title);
  titleInput.classList.add('title-input');
  titleCell.append(titleInput);

  const weightCell = document.createElement('td');
  const weightInput = createInputElement('number', 'Weight', weight.toString());
  weightInput.classList.add('weight-input');
  weightCell.append(weightInput);

  titleInput.addEventListener('input', () => {
    updateOptionsArray(
      id,
      titleInput.value,
      Number.parseInt(weightInput.value),
    );
  });

  weightInput.addEventListener('input', () => {
    updateOptionsArray(
      id,
      titleInput.value,
      Number.parseInt(weightInput.value),
    );
  });

  updateOptionsArray(id, titleInput.value, Number.parseInt(weightInput.value));

  const deleteCell = document.createElement('td');
  const deleteButton = createDeleteButton();
  deleteCell.append(deleteButton);

  row.append(idCell, titleCell, weightCell, deleteCell);

  deleteButton.addEventListener('click', () => {
    row.remove();
    removeOption(id);
  });

  return row;
}

function clearTable(): void {
  if (tableBody) {
    while (tableBody.firstChild) {
      tableBody.firstChild.remove();
    }

    optionsArray = [];
    storage.remove(STORAGE_KEY);
    idOptionCount = 1;
  }
}

function createInputElement(
  type: string,
  placeholder: string,
  value: string,
): HTMLInputElement {
  const input = document.createElement('input');
  input.classList.add('table-input');
  input.type = type;
  input.placeholder = placeholder;
  input.value = value;

  return input;
}

function createDeleteButton(): HTMLButtonElement {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.title = 'delete this task';
  deleteButton.classList.add('deleteButton');

  return deleteButton;
}

function updateOptionsArray(id: number, title: string, weight: number): void {
  const currentOption = optionsArray.find((element) => element.id === id);

  if (Number.isNaN(weight) || weight <= 0) return;

  if (currentOption) {
    currentOption.title = title;
    currentOption.weight = weight;
  } else {
    optionsArray.push({
      id: id,
      title: title,
      weight: weight,
    });
  }

  saveOptions();
  savedOptions = [...optionsArray];
}

function removeOption(id: number): void {
  optionsArray = optionsArray.filter((element) => element.id !== id);
  saveOptions();

  if (tableBody.children.length === 0) {
    idOptionCount = 1;
  }
}

function optionsChecking(): void {
  const validOptions = optionsArray.filter(
    (option) =>
      option.title.trim() && option.weight > 0 && !Number.isNaN(option.weight),
  );

  if (validOptions.length < 2) {
    const pasteAddModal = createAddValidOptionsModal();
    const { openModal } = pasteAddModal;
    openModal();
    return;
  }

  changePage(Page.Picker);
}

// ------------------- Right - Button Section -------------------
function createButtonSection(): HTMLElement {
  const buttonSection = document.createElement('div');
  buttonSection.classList.add('buttonSection');

  const pasteButton = document.createElement('button');
  pasteButton.textContent = 'Paste list';
  pasteButton.classList.add('pasteButton', 'button');
  buttonSection.append(pasteButton);

  const pasteListModal = createPasteListModal(createRow, tableBody);
  const { openModal } = pasteListModal;
  pasteButton.addEventListener('click', () => {
    openModal();
  });

  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear list';
  clearButton.classList.add('clearButton', 'button');
  buttonSection.append(clearButton);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save list to file';
  saveButton.classList.add('saveButton', 'button');
  buttonSection.append(saveButton);

  const loadButton = document.createElement('button');
  loadButton.textContent = 'Load list from file';
  loadButton.classList.add('loadButton', 'button');
  buttonSection.append(loadButton);

  clearButton.addEventListener('click', () => {
    clearTable();
  });

  return buttonSection;
}

function saveOptions(): void {
  storage.save(STORAGE_KEY, optionsArray);
}

savedOptions =
  storage.load(STORAGE_KEY, (data) => {
    if (Array.isArray(data)) {
      return data.filter(
        (item): item is { id: number; title: string; weight: number } =>
          typeof item.id === 'number' &&
          typeof item.title === 'string' &&
          typeof item.weight === 'number',
      );
    }

    return [];
  }) ?? [];

if (Array.isArray(savedOptions) && savedOptions.length > 0) {
  optionsArray = savedOptions;
  let maxId = 0;
  for (const option of optionsArray) {
    if (option.id > maxId) {
      maxId = option.id;
    }
  }
  idOptionCount = maxId + 1;
} else {
  optionsArray = [];
  idOptionCount = 1;
}

window.addEventListener('beforeunload', () => {
  console.log('Saving options...');
  storage.save(STORAGE_KEY, optionsArray);
});
