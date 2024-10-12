import { addUser,addGroupNode, createGroupNodeDetails } from './chat.js';
import { users, chatLog } from './domElements.js';

let bots = ['Julia', 'Karen', 'Dave', 'Jason'];

let randomBotName;
let randomBotImage, botTimeout,  findBotName;
let lastBotName = '';
function initializeBots() {
  bots.forEach(bot => users.appendChild(addUser(bot)));
}

function simulateBotResponse() {
  const userNames = document.querySelectorAll('.user > div');
  console.log(userNames);
  randomBotName = bots[Math.floor(Math.random() * bots.length)]; // Pick a random bot
  console.log(randomBotName);
  findBotName = [...userNames].find(name =>{ if(name.textContent === randomBotName) return name.previousElementSibling; });
  console.log(findBotName);
  randomBotImage = findBotName.previousElementSibling;
  console.log(randomBotImage);
  const messageCount = Math.floor(Math.random() * 3) + 1;
  let messageSent = 0;

  const sendBotMessage = () => {
    let lastMessageGroup = chatLog.lastElementChild;
    if (randomBotName !== lastBotName || !lastMessageGroup || !lastMessageGroup.classList.contains('others')) {
      lastMessageGroup = addGroupNode('others', `Bot Message from ${randomBotName}`); // Create new bot group
      createGroupNodeDetails(lastMessageGroup, randomBotImage, findBotName);
      lastBotName = randomBotName; // Update the last bot name
    } else {
      // Add message to the existing bot group
      lastMessageGroup = addGroupNode('others', `Bot Message from ${randomBotName}`); 
      createGroupNodeDetails(lastMessageGroup, randomBotImage, findBotName);
    }

    // Increment the message sent counter
    messageSent++;

    // If the bot has sent all messages, clear the interval
    if (messageSent >= messageCount) {
        clearInterval(botMessageInterval);
    }
  };

  const botMessageInterval = setInterval(sendBotMessage, 800);
}

function resetBotTimeout() {
  clearTimeout(botTimeout);
  botTimeout = setTimeout(() => simulateBotResponse(), Math.floor(Math.random() * 3000) + 1000);
}

export{
  randomBotName,
  lastBotName,
  initializeBots,
  simulateBotResponse,
  resetBotTimeout
}