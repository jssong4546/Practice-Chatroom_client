// eslint-disable-next-line
const app = {
  server: 'http://52.78.206.149:3000/messages',
  init: function () {
    app.fetch();
  },
  fetch: function () {
    fetch(app.server)
      .then((res) => res.json())
      .then((res) => {
        res.forEach((element) => {
          addComment(element);
        });
      });
  },
  clearMessages: function () {
    let allChats = document.querySelector('#chats');
    allChats.innerHTML = '';
  },
  renderMessage: function (message) {
    addComment(message);
  },
  send: function (message) {
    fetch('http://52.78.206.149:3000/messages', {
      method: 'POST',
      body: JSON.stringify(message),
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
};

app.init();

function addComment(user) {
  let comment = document.createElement('div');
  comment.className = 'chat';
  let chats = document.querySelector('#chats');

  let username = document.createElement('div');
  username.innerHTML = `${user.username}:`;
  username.className = 'username';

  let message = document.createElement('div');
  message.innerHTML = `${user.text}`;

  let select = document.querySelector('#roonName');
  let roomname = document.createElement('option');
  roomname.className = 'room';
  roomname.innerHTML = user.roomname;
  roomname.value = user.roomname;

  select.appendChild(roomname);
  comment.appendChild(username);
  comment.appendChild(message);
  chats.appendChild(comment);

  //{id: 0, username: "이호용", text: "메시지가 리셋되었습니다", roomname: "코드스테이츠", date: "2020-02-25T04:43:10.113Z"}
}

function inputData() {
  //아래 message형식으로 만들어 send 메소드를 실행시킨다. message를 만들어서 서버로
  //보내주는 함수
  let message = {
    username: 'ingikim',
    text: 'hello',
    roomname: 'cs04',
  };
  send(message);
}
/*
room list 만들기, 입력 창 만들기(입력 형식, let message = {
  username: 'ingikim',
  text: 'hello',
  roomname: 'cs04'
};), 제출 버튼 클릭
*/
