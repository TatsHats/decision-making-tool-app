import { optionsArray } from './list-of-options.js';

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
  drawDiagram(wheelCanvas, optionsArray);

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
  // dark colors for sectors are excluded
  return `rgb(
    ${Math.floor(Math.random() * 200) + 56}, 
    ${Math.floor(Math.random() * 200) + 56}, 
    ${Math.floor(Math.random() * 200) + 56}
    )`;
}

function drawDiagram(
  canvas: HTMLCanvasElement,
  optionsArray: { title: string; weight: number }[],
): void {
  const context = canvas.getContext('2d');
  const radius = 150;
  canvas.width = 300;
  canvas.height = 300;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const totalWeight = optionsArray.reduce(
    (sum, element) => sum + element.weight,
    0,
  );
  let startSector = 0;

  if (!context) return;
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const option of optionsArray) {
    // value for sector
    const sectorSize = Math.PI * 2 * (option.weight / totalWeight);
    const endSector = startSector + sectorSize;

    // draw a sector
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.fillStyle = getRandomColor();
    context.arc(centerX, centerY, radius, startSector, endSector);
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = 'white';
    context.stroke();

    // title for sector
    const middleSector = startSector + sectorSize / 2;
    const textX = centerX + Math.cos(middleSector) * (radius / 2);
    const textY = centerY + Math.sin(middleSector) * (radius / 2);
    const textWidth = context.measureText(option.title).width;
    context.fillStyle = 'black';
    context.font = '14px Birthstone-Regular';
    context.fillText(option.title, textX - textWidth / 2, textY);

    // start for next sector
    startSector = endSector;

    // center of the circle
    context.beginPath();
    context.fillStyle = 'white';
    context.arc(centerX, centerY, 20, 0, Math.PI * 2);
    context.fill();

    // edge of the circle
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'white';
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.stroke();
  }
}
