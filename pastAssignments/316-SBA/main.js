import { signIn, textarea, add, chatInput } from './modules/domElements.js';
import validate from './modules/formValidation.js';
import { initializeBots } from './modules/bot.js';
import { keyDownHandler, submitHandler } from './modules/chat.js';

window.name = 'Private Room 1';
document.title = window.name;
document.querySelector('#title').textContent = window.name;

// Initialize bots
initializeBots();

// Form submission for chat
signIn.addEventListener('submit', validate);
chatInput.addEventListener('submit', submitHandler);
textarea.addEventListener('keydown', keyDownHandler);
textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset the height to auto
  this.style.height = this.scrollHeight + 'px'; // Set height based on scrollHeight

  // Adjust position to expand upwards
  const bottomOffset = window.innerHeight - (this.offsetTop + this.offsetHeight);
  this.style.bottom = `${bottomOffset}px`;
});
// Mouseover/mouseout effects
add.addEventListener('mouseover', () => {
  add.setAttribute('style', 'color: red;');
});
add.addEventListener('mouseout', () => {
  add.setAttribute('style', 'color: #05668d;');
})