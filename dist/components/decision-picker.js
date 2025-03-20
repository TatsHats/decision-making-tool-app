import { optionsArray } from './list-of-options.js';
import { Page, changePage } from '../router.js';
// ------------------------ global variables ---------------------------
var SoundType;
(function (SoundType) {
    SoundType["Start"] = "start";
    SoundType["Finish"] = "finish";
})(SoundType || (SoundType = {}));
export var StateDecisionPicker;
(function (StateDecisionPicker) {
    StateDecisionPicker["Initial"] = "initial";
    StateDecisionPicker["Picking"] = "picking";
    StateDecisionPicker["Picked"] = "picked";
})(StateDecisionPicker || (StateDecisionPicker = {}));
let currentState = StateDecisionPicker.Initial;
let isSoundOn = true;
let infoField = document.createElement('span');
infoField.textContent = 'Press start button';
infoField.classList.add('infoField');
const soundMuteState = localStorage.getItem('muteState');
const sounds = {
    [SoundType.Start]: new Audio('./assets/sounds/start.mp3'),
    [SoundType.Finish]: new Audio('./assets/sounds/finish.mp3'),
};
//-----------------------------------------------------------------------
if (soundMuteState !== null) {
    isSoundOn = soundMuteState === 'true';
}
export function createDecisionPicker() {
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
        changeState(StateDecisionPicker.Picking, spinButton, backButton, soundButton, input, label);
        playAnimation(wheelCanvas, Number.parseFloat(input.value));
        setTimeout(() => {
            changeState(StateDecisionPicker.Picked, spinButton, backButton, soundButton, input, label);
        }, Number.parseFloat(input.value) * 1000);
    });
    // button on/off sound
    const soundButton = document.createElement('button');
    updateSoundButtonState(soundButton);
    soundButton.classList.add('buttonPicker');
    soundButton.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        updateSoundButtonState(soundButton);
        localStorage.setItem('muteState', isSoundOn.toString());
    });
    sectionPickerSettings.append(backButton, spinButton, soundButton);
    sectionPicker.append(titleApp, sectionPickerSettings, duration, infoField, arrow, wheelCanvas);
    return sectionPicker;
}
function getRandomColor() {
    // dark colors for sectors are excluded
    return `rgb(
    ${Math.floor(Math.random() * 200) + 56}, 
    ${Math.floor(Math.random() * 200) + 56}, 
    ${Math.floor(Math.random() * 200) + 56}
  )`;
}
function drawDiagram(canvas, optionsArray) {
    const context = canvas.getContext('2d');
    const radius = 150;
    const diameter = 300;
    canvas.width = diameter;
    canvas.height = diameter;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let startSector = 0;
    const totalWeight = getTotalWeight(optionsArray);
    if (!context)
        return;
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
        const angleTitle = 0.7;
        const middleSector = startSector + sectorSize / 2;
        const textX = centerX + Math.cos(middleSector) * (radius * angleTitle);
        const textY = centerY + Math.sin(middleSector) * (radius * angleTitle);
        let title = option.title;
        while (context.measureText(title).width > radius * angleTitle) {
            title = title.slice(0, -2) + '…';
        }
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = '20px Birthstone-Regular';
        // white text + black text
        context.save();
        context.translate(textX, textY);
        context.rotate(middleSector);
        context.fillStyle = 'white';
        context.fillText(title, 0, 1);
        context.fillStyle = 'black';
        context.fillText(title, 0, 0);
        context.restore();
        // start for next sector
        startSector = endSector;
        // center of the circle
        const radiusCenter = 20;
        context.beginPath();
        context.fillStyle = 'white';
        context.arc(centerX, centerY, radiusCenter, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.arc(centerX, centerY, radiusCenter, 0, Math.PI * 2);
        context.stroke();
        // edge of the circle
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = 'white';
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.stroke();
    }
}
function playSound(soundType) {
    var _a;
    if (!isSoundOn)
        return;
    (_a = sounds[soundType]) === null || _a === void 0 ? void 0 : _a.play();
}
function playAnimation(canvas, duration) {
    playSound(SoundType.Start);
    canvas.style.transition = 'none';
    canvas.style.transform = 'rotate(0deg)';
    setTimeout(() => {
        const rotations = 5 + Math.random();
        const totalRotation = rotations * 360;
        const finalAngle = totalRotation;
        let animationCompleted = false;
        canvas.style.willChange = 'transform';
        canvas.style.transition = `transform ${duration}s ease-out`;
        canvas.style.transform = `rotate(${finalAngle}deg)`;
        const updateTitle = () => {
            if (animationCompleted)
                return;
            const computedStyle = globalThis.getComputedStyle(canvas);
            const matrix = new DOMMatrix(computedStyle.transform);
            let currentAngle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
            if (currentAngle < 0)
                currentAngle += 360;
            updateInfoField(infoField, currentAngle);
            requestAnimationFrame(updateTitle);
        };
        requestAnimationFrame(updateTitle);
        const end = () => {
            animationCompleted = true;
            canvas.removeEventListener('transitionend', end);
            const computedStyle = globalThis.getComputedStyle(canvas);
            const matrix = new DOMMatrix(computedStyle.transform);
            let finalComputedAngle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
            if (finalComputedAngle < 0)
                finalComputedAngle += 360;
            playSound(SoundType.Finish);
            updateInfoField(infoField, finalComputedAngle);
        };
        canvas.addEventListener('transitionend', end);
    }, 50);
}
function updateInfoField(infoField, rotation) {
    const totalWeight = getTotalWeight(optionsArray);
    let startSector = 0;
    const radian = ((rotation % 360) * Math.PI) / 180;
    for (const option of optionsArray) {
        const sectorSize = (Math.PI * 2 * option.weight) / totalWeight;
        const endSector = startSector + sectorSize;
        if (radian >= startSector && radian < endSector) {
            infoField.textContent = option.title;
            infoField.style.transition = '0.5s ease-in-out';
            infoField.style.textShadow = '0 0 5px white';
            let toggle = false;
            const blinkInterval = setInterval(() => {
                infoField.style.textShadow = toggle
                    ? '0 0 5px white'
                    : '0 0 15px white';
                toggle = !toggle;
            }, 500);
            setTimeout(() => {
                clearInterval(blinkInterval);
                infoField.style.textShadow = '';
            }, 7000);
            break;
        }
        startSector = endSector;
    }
}
function getTotalWeight(optionsArray) {
    const totalWeight = optionsArray.reduce((sum, element) => sum + element.weight, 0);
    return totalWeight;
}
function changeState(newState, spinButton, backButton, soundButton, input, label) {
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
    }
    else {
        spinButton.classList.remove('disabled');
        backButton.classList.remove('disabled');
        soundButton.classList.remove('disabled');
        input.classList.remove('disabled');
        label.classList.remove('disabled');
    }
}
function updateSoundButtonState(button) {
    button.textContent = isSoundOn ? 'Sound On' : 'Sound Off';
    button.classList.toggle('soundOn', isSoundOn);
    button.classList.toggle('soundOff', !isSoundOn);
}
