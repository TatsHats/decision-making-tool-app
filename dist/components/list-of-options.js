import { Page, changePage } from '../router.js';
import { createPasteListModal } from './paste-list-modal.js';
// -------------- Application container, header and two sections -------------------
// ------------------- (left with table, right with buttons) -------------------
export function createListOfOptions() {
    const container = document.createElement('div');
    container.classList.add('appContainer');
    const listSection = createListSection();
    container.append(listSection);
    const buttonSection = createButtonSection();
    container.append(buttonSection);
    return container;
}
// ------------------- Left - List Section -------------------
let tableBody;
let idOptionCount = 1;
export let optionsArray = [];
function createListSection() {
    const listSection = document.createElement('div');
    listSection.classList.add('listSection');
    const titleApp = document.createElement('h1');
    titleApp.textContent = 'Decision Making Tool';
    titleApp.classList.add('titleApp');
    listSection.append(titleApp);
    const taskTable = createTable();
    listSection.append(taskTable);
    const addStartButtonSection = createAddStartButtonSection();
    listSection.append(addStartButtonSection);
    return listSection;
}
// createTable
function createTable() {
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
    tableBody.append(createRow(idOptionCount, true));
    return table;
}
// createAddOptionSection
function createAddStartButtonSection() {
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
        optionsChecking();
    });
    return addStartButtonSection;
}
// create Rows
function createRow(id, isFirst) {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = id.toString();
    const titleCell = document.createElement('td');
    const titleInput = createInputElement('text', 'Title', isFirst ? 'Title' : '');
    titleInput.classList.add('title-input');
    titleCell.append(titleInput);
    const weightCell = document.createElement('td');
    const weightInput = createInputElement('number', 'Weight', isFirst ? 'Weight' : '');
    weightInput.classList.add('weight-input');
    weightCell.append(weightInput);
    titleInput.addEventListener('input', () => {
        updateoptionsArray(id, titleInput.value, Number.parseInt(weightInput.value));
    });
    weightInput.addEventListener('input', () => {
        updateoptionsArray(id, titleInput.value, Number.parseInt(weightInput.value));
    });
    updateoptionsArray(id, titleInput.value, Number.parseInt(weightInput.value));
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
function clearTable() {
    if (tableBody) {
        while (tableBody.firstChild) {
            tableBody.firstChild.remove();
        }
        optionsArray = [];
        tableBody.append(createRow(1, true));
    }
}
function createInputElement(type, placeholder, value) {
    const input = document.createElement('input');
    input.classList.add('table-input');
    input.type = type;
    input.placeholder = placeholder;
    input.value = value;
    return input;
}
function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.title = 'delete this task';
    deleteButton.classList.add('deleteButton');
    return deleteButton;
}
function updateoptionsArray(id, title, weight) {
    const currentOption = optionsArray.find((element) => element.id === id);
    if (Number.isNaN(weight) || weight <= 0)
        return;
    if (currentOption) {
        currentOption.title = title;
        currentOption.weight = weight;
    }
    else {
        optionsArray.push({
            id: id,
            title: title,
            weight: weight,
        });
    }
}
function removeOption(id) {
    optionsArray = optionsArray.filter((element) => element.id !== id);
}
function optionsChecking() {
    const validOptions = optionsArray.filter((option) => option.title.trim() && option.weight > 0 && !Number.isNaN(option.weight));
    if (validOptions.length < 2) {
        alert('Please fill options.');
        return;
    }
    changePage(Page.Picker);
}
// ------------------- Right - Button Section -------------------
function createButtonSection() {
    const buttonSection = document.createElement('div');
    buttonSection.classList.add('buttonSection');
    const pasteButton = document.createElement('button');
    pasteButton.textContent = 'Paste list';
    pasteButton.classList.add('pasteButton', 'button');
    buttonSection.append(pasteButton);
    const pasteListModal = createPasteListModal();
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
