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
        console.log(res);
        res.forEach((element) => {
          this.renderMessage(element);
          this.makeRoom(element);
        });
      });
  },
  clearMessages: function () {
    let chats = document.querySelector('#chats');
    chats.innerHTML = '';
  },
  renderMessage: function (msg) {
    // render messages
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
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        // message sent!
      });
  },
  makeRoom: function (msg) {
    // show rooms
    let isIncluded = false;
    document.querySelectorAll('.room').forEach((ele) => {
      if (ele.value === msg.roomname) {
        isIncluded = true;
      }
    });
    if (!isIncluded) {
      let room = document.createElement('option');
      room.className = 'room';
      room.value = msg.roomname;
      room.innerHTML = msg.roomname;
      room.addEventListener('onchange', selectRoom);
      let rooms = document.querySelector('#rooms');
      rooms.appendChild(room);
    }
  },
};

app.init();

function inputData() {
  const message = {
    roomname: 'cs04',
  };
  let nameInput = document.querySelector('#username');
  let messageInput = document.querySelector('#message');

  message.username = nameInput.value;
  message.text = messageInput.value;

  app.send(message);
}

function selectRoom() {
  console.log('ddd');
}
