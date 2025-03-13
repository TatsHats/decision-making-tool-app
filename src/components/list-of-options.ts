 // ------------------- Left - List Section -------------------
 export function createListSection(): HTMLElement {
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

  const tableHead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  const idTask = document.createElement('th');
  idTask.textContent = 'ID';

  const titleTask = document.createElement('th');
  titleTask.textContent = 'Task title'

  const weightTask = document.createElement('th');
  weightTask.textContent = 'Task weight';

  headerRow.append(idTask, titleTask, weightTask);
  tableHead.append(headerRow);
  table.append(tableHead);

  const tableBody = document.createElement('tbody');

  for (let i = 0; i < 10; i++) {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    const titleCell = document.createElement('td');
    const weightCell = document.createElement('td');
  
    idCell.textContent = '';
    titleCell.textContent = '';
    weightCell.textContent = '';

    row.append(idCell, titleCell, weightCell);
    tableBody.appendChild(row);
  }

  table.append(tableBody);

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