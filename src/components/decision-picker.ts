import { optionsArray } from './list-of-options.js';
import { Page, changePage } from '../router.js';

// ------------------------ global variables ---------------------------
let infoField: HTMLSpanElement = document.createElement('span');
infoField.textContent = 'Press start button';
infoField.classList.add('infoField');

let isSoundOn = true;
enum SoundType {
  Start = 'start',
  Finish = 'finish',
}
const sounds: Record<SoundType, HTMLAudioElement> = {
  [SoundType.Start]: new Audio('./assets/sounds/start.mp3'),
  [SoundType.Finish]: new Audio('./assets/sounds/finish.mp3'),
};

enum StateDecisionPicker {
  Initial = 'initial',
  Picking = 'picking',
  Picked = 'picked',
}
let currentState: StateDecisionPicker = StateDecisionPicker.Initial;

//-----------------------------------------------------------------------

export function createDecisionPicker(): HTMLElement {
  const sectionPicker = document.createElement('div');
  sectionPicker.classList.add('sectionPicker');

  const titleApp = document.createElement('h1');
  titleApp.textContent = 'Decision Making Tool';
  titleApp.classList.add('titleApp');

  const sectionPickerSettings = document.createElement('div');
  sectionPickerSettings.classList.add('sectionPickerSettings');

  const arrow = document.createElement('img');
  arrow.classList.add('imgArrow');
  arrow.src = './assets/img/arrow2.png';
  arrow.alt = 'Arrow immage';

  const wheelCanvas = document.createElement('canvas');
  wheelCanvas.classList.add('wheelCanvas');
  drawDiagram(wheelCanvas, optionsArray);

  // Back
  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.classList.add('buttonPicker');
  backButton.addEventListener('click', () => {
    changePage(Page.List);
  });

  // Input rotation time
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

  // Button spin diagram
  const spinButton = document.createElement('button');
  spinButton.textContent = 'Spin';
  spinButton.classList.add('buttonPicker', 'spinButton');
  spinButton.addEventListener('click', () => {
    changeState(
      StateDecisionPicker.Picking,
      spinButton,
      backButton,
      soundButton,
      input,
      label,
    );
    playAnimation(wheelCanvas, Number.parseFloat(input.value));
    setTimeout(
      () => {
        changeState(
          StateDecisionPicker.Picked,
          spinButton,
          backButton,
          soundButton,
          input,
          label,
        );
      },
      Number.parseFloat(input.value) * 1000,
    );
  });

  // button on/off sound
  const soundButton = document.createElement('button');
  soundButton.textContent = 'Sound';
  soundButton.classList.add('buttonPicker');
  soundButton.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    soundButton.textContent = isSoundOn ? 'Sound On' : 'Sound Off';
  });

  sectionPickerSettings.append(backButton, spinButton, soundButton);
  sectionPicker.append(
    titleApp,
    sectionPickerSettings,
    duration,
    infoField,
    arrow,
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
  let startSector = 0;
  const totalWeight = getTotalWeight(optionsArray);

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
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.arc(centerX, centerY, 20, 0, Math.PI * 2);
    context.stroke();

    // edge of the circle
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'white';
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.stroke();
  }
}

function playSound(soundType: SoundType): void {
  if (!isSoundOn) return;
  sounds[soundType]?.play();
}

function playAnimation(canvas: HTMLCanvasElement, duration: number): void {
  if (duration < 5) {
    return alert('The duration must be at least 5 seconds!');
  }

  playSound(SoundType.Start);

  const startAngle = Math.random() * 360;
  const totalRotation = 360 * 5 + Math.random() * 3600;

  canvas.style.transition = `transform ${duration}s ease-out`;
  canvas.style.transform = `rotate(${startAngle + totalRotation}deg)`;
  console.log(`${totalRotation} -||- ${canvas.style.transform}`);

  const endAngle = (startAngle + totalRotation) % 360;

  setTimeout(() => {
    playSound(SoundType.Finish);
    updateInfoField(infoField, endAngle);
  }, duration * 1000);
}

function updateInfoField(infoField: HTMLSpanElement, rotation: number): void {
  const totalWeight = getTotalWeight(optionsArray);
  let startSector = 0;
  const radian = (rotation % 360) * (Math.PI / 180);

  for (const option of optionsArray) {
    const sectorSize = Math.PI * 2 * (option.weight / totalWeight);
    const endSector = startSector + sectorSize;

    if (radian >= startSector && radian < endSector) {
      infoField.textContent = `${option.title}`;
      break;
    }

    startSector = endSector;
  }
}

function getTotalWeight(
  optionsArray: { title: string; weight: number }[],
): number {
  const totalWeight = optionsArray.reduce(
    (sum, element) => sum + element.weight,
    0,
  );

  return totalWeight;
}

function changeState(
  newState: StateDecisionPicker,
  spinButton: HTMLButtonElement,
  backButton: HTMLButtonElement,
  soundButton: HTMLButtonElement,
  input: HTMLInputElement,
  label: HTMLElement,
): void {
  currentState = newState;

  const isDisabled = currentState === StateDecisionPicker.Picking;

  spinButton.disabled = isDisabled;
  backButton.disabled = isDisabled;
  soundButton.disabled = isDisabled;
  input.disabled = isDisabled;
  label.classList.toggle('disabled', isDisabled);

  if (isDisabled) {
    spinButton.classList.add('disabled');
    backButton.classList.add('disabled');
    soundButton.classList.add('disabled');
    input.classList.add('disabled');
    label.classList.add('disabled');
  } else {
    spinButton.classList.remove('disabled');
    backButton.classList.remove('disabled');
    soundButton.classList.remove('disabled');
    input.classList.remove('disabled');
    label.classList.remove('disabled');
  }
}
