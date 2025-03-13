 // ------------------- Left - List Section -------------------
 export let tableBody: HTMLElement;
 let idOptionCount = 0;
 
 export function createListSection(): HTMLElement {
  const listSection = document.createElement('div');
  listSection.classList.add('listSection');
  
  const titleApp = document.createElement('h1');
  titleApp.textContent = 'Decision Making Tool';
  titleApp.classList.add('titleApp');
  listSection.append(titleApp);

  const taskTable: HTMLTableElement = createTable();
  listSection.append(taskTable);

  const addStartButtonSection: HTMLElement = createAddStartButtonSection(taskTable);
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
  titleTask.textContent = 'Task title'

  const weightTask = document.createElement('th');
  weightTask.textContent = 'Task weight';

  const deleteTask = document.createElement('th');
  deleteTask.textContent = '';

  headerRow.append(idTask, titleTask, weightTask, deleteTask);
  tableHead.append(headerRow);
  table.append(tableHead);

  tableBody = document.createElement('tbody');
  table.append(tableBody);
  tableBody.append(createRow(idOptionCount += 1, true));

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
    const newRow = createRow(idOptionCount += 1, false);
    tableBody.appendChild(newRow);
  });

  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.classList.add('startButton', 'button');
  addStartButtonSection.append(startButton);

  return addStartButtonSection;
}

// create Rows
export function createRow(id: number, isFirst: boolean): HTMLTableRowElement {
    const row = document.createElement("tr");
    const idCell = document.createElement('td');
    idCell.textContent = id.toString();

    const titleCell = document.createElement('td');
    const titleInput = createInputElement("text", "Title", isFirst ? "Title" : "");
    titleInput.classList.add("title-input");
    titleCell.appendChild(titleInput);

    const weightCell = document.createElement('td');
    const weightInput = createInputElement("number", "Weight", isFirst ? "Weight" : "");
    weightInput.classList.add("weight-input");
    weightCell.appendChild(weightInput);

    const deleteCell = document.createElement('td');
    const deleteButton = createDeleteButton();
    deleteCell.appendChild(deleteButton);

    row.append(idCell, titleCell, weightCell, deleteCell);

    deleteButton.addEventListener('click', () => {
        row.remove();
    });

    return row;
}

function createInputElement(type: string, placeholder: string, value: string): HTMLInputElement {
    const input = document.createElement("input");
    input.classList.add("table-input");
    input.type = type;
    input.placeholder = placeholder;
    input.value = value;

    return input;
}

function createDeleteButton(): HTMLButtonElement {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.title = "delete this task";
    deleteButton.classList.add("deleteButton");

    return deleteButton;
}
