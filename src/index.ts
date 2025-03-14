import { changePage } from './router.js';
import { Page } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  changePage(Page.List);
  console.log(`page: ${Page.List}`);
});