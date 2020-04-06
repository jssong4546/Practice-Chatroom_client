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

  comment.appendChild(username);
  comment.appendChild(message);
  chats.appendChild(comment);

  //{id: 0, username: "이호용", text: "메시지가 리셋되었습니다", roomname: "코드스테이츠", date: "2020-02-25T04:43:10.113Z"}
}
