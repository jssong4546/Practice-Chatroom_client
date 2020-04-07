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
        app.renderFilteredMessages();
        //setTimeout(app.fetch, 1000);
      });
  },
  messages: [],
  clearMessages: function () {
    let chats = document.querySelector('#chats');
    chats.innerHTML = '';
    document.querySelector('#username').value = '';
    document.querySelector('#message').value = '';
  },
  renderMessage: function (msg) {
    let comment = document.createElement('div');
    comment.className = 'chat';
    let chats = document.querySelector('#chats');

    let username = document.createElement('div');
    username.innerText = `${msg.username}:`;
    username.className = 'username';

    let message = document.createElement('div');
    message.innerText = `${msg.text}`;

    comment.prepend(username);
    comment.appendChild(message);
    chats.prepend(comment);
  },
  send: function (msg) {
    fetch(app.server, {
      method: 'POST',
      body: JSON.stringify(msg),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        app.clearMessages();
        app.messages.push(msg);
        app.renderFilteredMessages(msg.roomname);
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
  },
  selectRoom: function (event) {
    app.renderFilteredMessages(event.target.value);
  },
  renderFilteredMessages: function (room = '') {
    let rooms = document.querySelector('#rooms');
    let selected =
      room === '' ? rooms.options[rooms.selectedIndex].value : room;
    let filtered = app.messages.filter((ele) => ele.roomname === selected);

    let roomName = document.querySelector('#roomname');
    roomName.value = selected;

    app.clearMessages();
    filtered.forEach((ele) => app.renderMessage(ele));
  },
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
