export function createDecisionPicker(): HTMLElement {
  const sectionPicker = document.createElement('div');
  sectionPicker.classList.add('sectionPicker');

  const titleApp = document.createElement('h1');
  titleApp.textContent = 'Decision Making Tool';
  titleApp.classList.add('titleApp');

  const sectionPickerSettings = document.createElement('div');
  sectionPickerSettings.classList.add('sectionPickerSettings');

  const wheelCanvas = document.createElement('canvas');
  wheelCanvas.classList.add('wheelCanvas');

  // Buttons
  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.classList.add('buttonPicker');
  backButton.addEventListener('click', () => {});

  const spinButton = document.createElement('button');
  spinButton.textContent = 'Spin';
  spinButton.classList.add('buttonPicker', 'spinButton');
  spinButton.addEventListener('click', () => {});

  const soundButton = document.createElement('button');
  soundButton.textContent = 'Sound';
  soundButton.classList.add('buttonPicker');
  soundButton.addEventListener('click', () => {});

  // Input time
  const duration = document.createElement('div');
  duration.classList.add('duration');
  const label = document.createElement('label');
  label.textContent = 'Duration: ';
  label.setAttribute('for', 'duration');
  const input = document.createElement('input');
  input.classList.add('durationInput');
  input.id = 'duration';
  input.type = 'number';
  input.placeholder = 'sec';
  input.value = '10';
  duration.append(label, input);

  // info field
  const infoField = document.createElement('span');
  infoField.textContent = 'Press start button';
  infoField.classList.add('infoField');

  sectionPickerSettings.append(backButton, spinButton, soundButton);
  sectionPicker.append(
    titleApp,
    sectionPickerSettings,
    duration,
    infoField,
    wheelCanvas,
  );

  return sectionPicker;
}

function getRandomColor(): string {
  return `rgb(
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)}
    )`;
}
