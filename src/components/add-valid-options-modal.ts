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

export function createAddValidOptionsModal(): {
  openModal: () => void;
  closeModal: () => void;
} {
  const modalWindow = document.createElement('dialog');
  modalWindow.classList.add('modalAddValid');
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
  modalContent.classList.add('modalAddValidContent');

  const modalLabel = document.createElement('label');
  modalLabel.textContent = 'Please add at least two valid lines';
  modalLabel.classList.add('modalLabel');

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.classList.add('modalButton');
  cancelButton.addEventListener('click', () => {
    closeModal(modalWindow);
  });

  modalContent.append(modalLabel, cancelButton);
  modalWindow.append(modalContent);

  return {
    openModal: () => openModal(modalWindow),
    closeModal: () => closeModal(modalWindow),
  };
}
