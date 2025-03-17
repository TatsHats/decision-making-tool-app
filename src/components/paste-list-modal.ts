function openModal(modalWindow: HTMLDialogElement): void {
  document.body.append(modalWindow);
  modalWindow.showModal();
  document.body.style.overflow = 'hidden';
}

function closeModal(modalWindow: HTMLDialogElement): void {
  modalWindow.close();
  document.body.style.overflow = 'auto';
  modalWindow.remove();
}

export function createPasteListModal(): {
  openModal: () => void;
  closeModal: () => void;
} {
  const modalWindow = document.createElement('dialog');
  modalWindow.classList.add('modal');
  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow) {
      closeModal(modalWindow);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalWindow.open) {
      closeModal(modalWindow);
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
    addOptionsToList(parseCSV(pasteField.value));
    closeModal(modalWindow);
  });

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.classList.add('modalButton');
  cancelButton.addEventListener('click', () => {
    closeModal(modalWindow);
  });

  const modalButtons = document.createElement('div');
  modalButtons.classList.add('modalButtons');

  modalContent.append(pasteField, modalButtons);
  modalWindow.append(modalContent);
  modalButtons.append(confirmButton, cancelButton);

  return {
    openModal: () => openModal(modalWindow),
    closeModal: () => closeModal(modalWindow),
  };
}

const optionsList = [];

function addOptionsToList(options: { option: string; value: string }[]): void {
  optionsList.push(...options);
}

function parseCSV(csvText: string): { option: string; value: string }[] {
  return csvText
    .trim()
    .split('\n')
    .flatMap((line) => {
      const [option, value] = line.split(',').map((item) => item.trim());
      return option && value ? [{ option, value }] : [];
    });
}
