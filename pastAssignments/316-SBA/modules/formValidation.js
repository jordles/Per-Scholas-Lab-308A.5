// validation.js
import { error, users } from './domElements.js';
import { addUser } from './chat.js';

export default function validate(e) {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const password = document.querySelector('#password').value;
  
  if (name.trim() === '') {
    errorHandler('Name cannot be blank!');
  } else if (password.trim() === '') {
    errorHandler('Password cannot be blank!');
  } else if (password !== 'corn304') {
    errorHandler('Incorrect password!');
  } else {
    this.style.display = 'none';
    users.appendChild(addUser(name));
    showWelcomeMessage();
  }
}

function errorHandler(err) {
  error.textContent = err;
  error.style.display = 'block';
  setTimeout(() => error.style.display = 'none', 2000);
}

function showWelcomeMessage() {
  setTimeout(() => alert(`
    Remember! When chatting in a lobby:
    Be civil and respectful
    Stick to the topic
    Questions welcome
    No self-promotion or spam

    - The Root Team
  `), 1000);
}