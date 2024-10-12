import { chatLog, textarea } from './domElements.js';
import { resetBotTimeout, randomBotName, lastBotName } from './bot.js';
function addUser(user) {
  const frag = document.createDocumentFragment();
  const userNode = document.createElement('div');
  const userImage = document.createElement('img');
  const randomSeed = Math.floor(Math.random() * 10000);
  userImage.src = `https://avatar.iran.liara.run/public?seed=${randomSeed}`;

  const userName = document.createElement('div');
  userName.textContent = user;
  userNode.appendChild(userImage);
  userNode.appendChild(userName);
  userNode.classList.add('user');
  frag.appendChild(userNode);
  return frag;
}

function addChatNode(text) {
  const frag = document.createDocumentFragment();
  const chatNode = document.createElement('div');
  const atWordRegex = /(@\w+)(?=\s|$)/g; //match any word starting with @, and look ahead for the next space or end of string
  //REGEX SEEMS TO BE CAUSING ERRORS, WILL DO LATER FOR FUTURE IMPLEMENTATIONS
  // Replace matched words with a span element
  const formattedText = text.replace(atWordRegex, function(match) {
    const span = document.createElement('span');
    console.log(match);
    span.textContent = match;
    span.setAttribute('style', 'font-weight: bolder;'); 
    return span.outerHTML;
  });
  console.log(formattedText);
  chatNode.innerHTML = formattedText;
  chatNode.classList.add('message');
  chatNode.style.whiteSpace = 'pre-wrap'; // This will preserve spaces, tabs, and newlines
  frag.appendChild(chatNode);
  return frag;
}

function addGroupNode(sender, text) {
  let lastMessageGroup = chatLog.lastElementChild;
  let messageGroup;
  console.log('Sender:', sender);
  console.log('Random Bot Name:', randomBotName);
  console.log('Last Bot Name:', lastBotName);
  if (!lastMessageGroup || !lastMessageGroup.classList.contains(sender) ||(sender === 'others' && randomBotName !== lastBotName)) {
    console.log('creating our others group here...')
    messageGroup = document.createElement('div');
    messageGroup.classList.add(sender); // Add 'mine' or 'others' class
    chatLog.appendChild(messageGroup); // Append new message group
    lastMessageGroup = messageGroup;
  }
  console.log(lastMessageGroup);
  lastMessageGroup.appendChild(addChatNode(text)); // Add the chat node to the new message group

  // Scroll to the bottom of the chat log after adding a new message
  chatLog.scrollTop = chatLog.scrollHeight;
  return lastMessageGroup;
}

function createGroupNodeDetails(lastMessageGroup, image, name) {
  if(lastMessageGroup.classList.contains('others')){
    

    // Remove the image and name, but leave the message content
    const messages = [...lastMessageGroup.childNodes];
    messages.forEach((message) => {

      let child = message.firstChild;

      while (child) {
        let nextChild = child.nextSibling;  // Store reference to the next sibling before possibly removing the current one
        if (child.nodeType === Node.ELEMENT_NODE) {
          message.removeChild(child);
        }
        child = nextChild;
      }
    });
    
    lastMessageGroup.lastElementChild.appendChild(image.cloneNode(true));
    lastMessageGroup.lastElementChild.appendChild(name.cloneNode(true));
  }
  else if(lastMessageGroup.classList.contains('mine')){

    // Remove the image and name, but leave the message content
    const messages = [...lastMessageGroup.childNodes];
    messages.forEach((message) => {
      let child = message.firstChild;

      while (child) {
        let nextChild = child.nextSibling;  // Store reference to the next sibling before possibly removing the current one
        if (child.nodeType === Node.ELEMENT_NODE) {
          message.removeChild(child);
        }
        child = nextChild;
      }
    });

    const usersList = document.querySelectorAll('.user');
    const users = [...usersList];
    console.log(users);
    const user = users[users.length - 1]
    console.log(user);
    lastMessageGroup.lastElementChild.appendChild(user.querySelector('img').cloneNode(true));
    lastMessageGroup.lastElementChild.appendChild(user.querySelector('div').cloneNode(true)); 
  }
}



function submitHandler(e) {
  e.preventDefault();
  const lastMessageGroup = addGroupNode('mine', textarea.value);
  createGroupNodeDetails(lastMessageGroup);
  textarea.value = '';
  textarea.style.height = 'auto';
}

function keyDownHandler(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const lastMessageGroup = addGroupNode('mine', textarea.value);
    createGroupNodeDetails(lastMessageGroup);
    textarea.value = '';
    textarea.style.height = 'auto';
  } else if (e.key === 'Enter' && e.shiftKey) {
    e.preventDefault();
    const cursorPos = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorPos) + "\n" + textarea.value.slice(cursorPos);
    textarea.selectionEnd = cursorPos + 1;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    const bottomOffset = window.innerHeight - (textarea.offsetTop + textarea.offsetHeight);
    textarea.style.bottom = `${bottomOffset}px`;
  }

  // Reset bot timeout after user input
  resetBotTimeout();
}

export {
  addUser,
  addChatNode,
  addGroupNode,
  createGroupNodeDetails,
  submitHandler,
  keyDownHandler
}