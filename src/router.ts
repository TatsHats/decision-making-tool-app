import { createApp } from './components/list-of-options.js';
import { createDecisionPicker } from './components/decision-picker.js';

enum Page {
  List = 'list',
  Picker = 'picker',
}

export function changePage(page: Page) {}
