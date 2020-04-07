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
        this.messages = JSON.parse(JSON.stringify(res));
        res.forEach((element) => {
          this.renderMessage(element);
        });
        this.showRooms();
      });
  },
  messages: [],
  clearMessages: function () {
    let chats = document.querySelector("#chats");
    chats.innerHTML = '';
  },
  renderMessage: function (msg) {
    let comment = document.createElement('div');
    comment.className = 'chat';
    let chats = document.querySelector('#chats');

    let username = document.createElement('div');
    username.innerHTML = `${msg.username}:`;
    username.className = 'username';

    let message = document.createElement('div');
    message.innerHTML = `${msg.text}`;

    comment.appendChild(username);
    comment.appendChild(message);
    chats.appendChild(comment);
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
      console.log(json);
      // message sent!
    });
  },
  showRooms: function () {
    let allRoom = this.messages.map((ele) => {
      return ele.roomname;
    });
    let roomWithoutRepeat = Array.from(new Set(allRoom));

    roomWithoutRepeat.forEach((ele) => {
      let room = document.createElement('option');
      room.className = 'room';
      room.value = ele;
      room.innerHTML = ele;
      let rooms = document.querySelector('#rooms');
      rooms.addEventListener('change', selectRoom);
      rooms.appendChild(room);
    });
  },
};

app.init();

function inputData() {
  const message = {
    username: 'ingikim',
    text: 'hello',
    roomname: 'cs04'
  };
  app.send(message);
}

function selectRoom() {
  let rooms = document.querySelector('#rooms');
  let selected = rooms.options[rooms.selectedIndex].value;
  let filtered = app.messages.filter((ele) => ele.roomname === selected);
  app.clearMessages();
  filtered.forEach(ele => app.renderMessage(ele));
}