// ------------------- Right - Button Section -------------------
export function createButtonSection() {
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
    return buttonSection;
}
