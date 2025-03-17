import { optionsArray, idOptionCount } from './list-of-options.js';
function openModal(modalWindow) {
    document.body.append(modalWindow);
    modalWindow.showModal();
    document.body.style.overflow = 'hidden';
}
function closeModal(modalWindow, pasteField) {
    modalWindow.close();
    document.body.style.overflow = 'auto';
    modalWindow.remove();
    pasteField.value = '';
}
export function createPasteListModal(createRow, tableBody) {
    let localId = idOptionCount;
    const modalWindow = document.createElement('dialog');
    modalWindow.classList.add('modal');
    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow) {
            closeModal(modalWindow, pasteField);
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalWindow.open) {
            closeModal(modalWindow, pasteField);
        }
    });
    const modalContent = document.createElement('div');
    modalContent.classList.add('modalContent');
    const pasteField = document.createElement('textarea');
    pasteField.placeholder = 'Paste options (CSV format)';
    pasteField.classList.add('pasteField');
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.classList.add('modalButton');
    confirmButton.addEventListener('click', () => {
        const parsedOptions = parseCSV(pasteField.value);
        for (const option of parsedOptions) {
            if (isValidOption(option)) {
                localId = addOptionToTable(option, createRow, tableBody, localId);
            }
        }
        closeModal(modalWindow, pasteField);
    });
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('modalButton');
    cancelButton.addEventListener('click', () => {
        closeModal(modalWindow, pasteField);
    });
    const modalButtons = document.createElement('div');
    modalButtons.classList.add('modalButtons');
    modalContent.append(pasteField, modalButtons);
    modalWindow.append(modalContent);
    modalButtons.append(confirmButton, cancelButton);
    return {
        openModal: () => openModal(modalWindow),
        closeModal: () => closeModal(modalWindow, pasteField),
    };
}
function addOptionToTable(option, createRow, tableBody, idOptionCount) {
    const newId = idOptionCount + 1;
    const newOption = {
        id: newId,
        title: option.option,
        weight: Number(option.value),
    };
    optionsArray.push(newOption);
    const row = createRow(newOption.id, newOption.title, newOption.weight.toString());
    tableBody.append(row);
    return newId;
}
function parseCSV(csvText) {
    return csvText
        .trim()
        .split('\n')
        .flatMap((line) => {
        const [option, value] = line.split(',').map((item) => item.trim());
        return option && value ? [{ option, value }] : [];
    });
}
function isValidOption(option) {
    return (option.option.trim() !== '' &&
        !Number.isNaN(Number(option.value)) &&
        Number(option.value) > 0);
}
