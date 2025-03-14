import { Page, changePage } from "../router.js";

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
let tableBody: HTMLElement;
let idOptionCount = 0;

function createListSection(): HTMLElement {
  const listSection = document.createElement('div');
  listSection.classList.add('listSection');

  const titleApp = document.createElement('h1');
  titleApp.textContent = 'Decision Making Tool';
  titleApp.classList.add('titleApp');
  listSection.append(titleApp);

  const taskTable: HTMLTableElement = createTable();
  listSection.append(taskTable);

  const addStartButtonSection: HTMLElement =
    createAddStartButtonSection(taskTable);
  listSection.append(addStartButtonSection);

  return listSection;
}

// createTable
function createTable(): HTMLTableElement {
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
  tableBody.append(createRow((idOptionCount += 1), true));

  return table;
}

// createAddOptionSection
function createAddStartButtonSection(table: HTMLTableElement): HTMLElement {
  const addStartButtonSection = document.createElement('div');
  addStartButtonSection.classList.add('addStartButtonSection');

  const addOptionButton = document.createElement('button');
  addOptionButton.textContent = 'Add Option';
  addOptionButton.classList.add('addOptionButton', 'button');
  addStartButtonSection.append(addOptionButton);

  addOptionButton.addEventListener('click', () => {
    const newRow = createRow((idOptionCount += 1), false);
    tableBody.append(newRow);
  });

  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.classList.add('startButton', 'button');
  addStartButtonSection.append(startButton);
  startButton.addEventListener('click', () => {
    changePage(Page.Picker);
  });
  
  return addStartButtonSection;
}

// create Rows
function createRow(id: number, isFirst: boolean): HTMLTableRowElement {
  const row = document.createElement('tr');
  const idCell = document.createElement('td');
  idCell.textContent = id.toString();

  const titleCell = document.createElement('td');
  const titleInput = createInputElement(
    'text',
    'Title',
    isFirst ? 'Title' : '',
  );
  titleInput.classList.add('title-input');
  titleCell.append(titleInput);

  const weightCell = document.createElement('td');
  const weightInput = createInputElement(
    'number',
    'Weight',
    isFirst ? 'Weight' : '',
  );
  weightInput.classList.add('weight-input');
  weightCell.append(weightInput);

  const deleteCell = document.createElement('td');
  const deleteButton = createDeleteButton();
  deleteCell.append(deleteButton);

  row.append(idCell, titleCell, weightCell, deleteCell);

  deleteButton.addEventListener('click', () => {
    row.remove();
  });

  return row;
}

export function createInputElement(
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

// ------------------- Right - Button Section -------------------
function createButtonSection(): HTMLElement {
  const buttonSection = document.createElement('div');
  buttonSection.classList.add('buttonSection');

  const pasteButton = document.createElement('button');
  pasteButton.textContent = 'Paste list';
  pasteButton.classList.add('pasteButton', 'button');
  buttonSection.append(pasteButton);

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

function clearTable(): void {
  if (tableBody) {
    while (tableBody.firstChild) {
      tableBody.firstChild.remove();
    }

    tableBody.append(createRow(1, true));
  }
}
