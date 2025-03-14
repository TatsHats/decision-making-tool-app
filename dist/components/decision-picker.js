import { createInputElement } from './list-of-options.js';
export function createDecisionPicker() {
    const sectionPicker = document.createElement('div');
    sectionPicker.classList.add('sectionPicker');
    const titleApp = document.createElement('h1');
    titleApp.textContent = 'Decision Making Tool';
    titleApp.classList.add('titleApp');
    const sectionPickerSettings = document.createElement('div');
    sectionPickerSettings.classList.add('sectionPickerButtons');
    const wheelCanvas = document.createElement('canvas');
    wheelCanvas.classList.add('wheelCanvas');
    // Buttons
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => { });
    const soundButton = document.createElement('button');
    backButton.textContent = 'Sound';
    backButton.addEventListener('click', () => { });
    const spinButton = document.createElement('button');
    spinButton.textContent = 'Spin';
    spinButton.addEventListener('click', () => { });
    // Input time
    const duration = createInputElement('number', 'sec', '10');
    const infoField = document.createElement('span');
    backButton.textContent = 'Press stat button';
    infoField.classList.add('infoField');
    sectionPickerSettings.append(backButton, soundButton, spinButton, duration);
    sectionPicker.append(titleApp, sectionPickerSettings, infoField, wheelCanvas);
    return sectionPicker;
}
