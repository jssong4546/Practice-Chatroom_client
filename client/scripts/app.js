// eslint-disable-next-line
/* eslint-disable */
const app = {
  server: 'http://52.78.206.149:3000/messages',
  init: function () {
    app.fetch();
  },
  fetch: function () {
    fetch(app.server)
      .then((res) => res.json())
      .then((res) => {
        app.messages = JSON.parse(JSON.stringify(res));
        app.makeRoomList();
        app.renderFilteredMessages(app.currentRoom);
        setTimeout(app.fetch, 1000);
      });
  },
  currentRoom: '',
  messages: [],
  clearMessages: function () {
    let chats = document.querySelector('#chats');
    chats.innerHTML = '';
  },
  renderMessage: function (msg) {
    let comment = document.createElement('div');
    comment.className = 'chat';
    let chats = document.querySelector('#chats');

    let username = document.createElement('div');
    username.textContent = `${msg.username}:`;
    username.className = 'username';

    let message = document.createElement('div');
    message.textContent = `${msg.text}`;

    comment.prepend(username);
    comment.appendChild(message);
    chats.prepend(comment);
  },
  send: function (msg) {
    fetch(app.server, {
      method: 'POST',
      body: JSON.stringify(msg),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      return response.json();
    }).then(json => {
      app.clearMessages();
      app.messages.push(msg);
      app.renderFilteredMessages(msg.roomname);
      document.querySelector('#username').value = '';
      document.querySelector('#message').value = '';
    });
  },
  makeRoomList: function () {
    let allRoom = this.messages.map((ele) => {
      return ele.roomname;
    });
    let roomWithoutRepeat = Array.from(new Set(allRoom));

    let rooms = document.querySelector('#rooms');
    rooms.innerHTML = '';
    roomWithoutRepeat.forEach((ele) => {
      let room = document.createElement('option');
      room.className = 'room';
      room.value = ele;
      room.innerHTML = ele;
      rooms.addEventListener('change', app.selectRoom);
      rooms.appendChild(room);
    });

    for(let i = 0; i < rooms.options.length; i++) {
      let option = rooms.options[i];
      if(option.value === app.currentRoom) {
        option.selected = true;
      }
    }
  },
  selectRoom: function (event) {
    let selected = event.target.value;
    let roomName = document.querySelector('#roomname');
    roomName.value = selected;
    app.renderFilteredMessages(selected);
  },
  renderFilteredMessages: function (room = '') {
    let rooms = document.querySelector('#rooms');
    let selected = room === '' ? rooms.options[rooms.selectedIndex].value : room;
    app.currentRoom = selected;
    let filtered = app.messages.filter((ele) => ele.roomname === selected);
    
    app.clearMessages();
    filtered.forEach(ele => app.renderMessage(ele));
  }
};

app.init();

function inputData() {
  const message = {};
  let nameInput = document.querySelector('#username');
  let messageInput = document.querySelector('#message');
  let roomInput = document.querySelector('#roomname');

  message.username = nameInput.value;
  message.text = messageInput.value;
  message.roomname = roomInput.value;

  app.send(message);
}
