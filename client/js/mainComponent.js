const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chatroom-text");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

/* Obtain the users nicknames
 and space from captured URL*/
const { nickname, chatRoom } = 
    Qs.parse(location.search, {

  /*Clear any extra symboles */
  ignorQueryPrefix: true,
});

// define socket variable from io method
const socket = io();

/*emit join room based on user nickname and chatroom name*/
socket.emit("connectChatRoom", { nickname, chatRoom });

/**
 * capture the chatroom and the user form user entry
 */
socket.on("roomUsers",
 ({ chatroom, users }) => 
 {
  outputChatroom(chatroom);
  outputUsers(users);
});

/**Capture message send from the sever side */
socket.on("userMessage", (message) => {
  console.log(message);
  outputMessage(message);

  /* Fix scroll positioning 
       after chat screen is fed
       with new messages.
    */
  
});

/**Capture event listener */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  /** get text from user */
  const msg = e.target.elements.msg.value;

  // bubble message to the server from client
  socket.emit("chatMessage", msg);

  // Clear userInput after each time
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

/**Diplay user text to the UI side */
function outputMessage(message) {
  const div = document.createElement("div");

  div.classList.add("userMessage");
  div.innerHTML = `<p class="meta">${message.nickname}
   <span>${message.timeStamp}</span></p>
        <p class="text">
            ${message.txt}
            </p>`;
  /**Render div section for each text message created */
  document.querySelector(".chatroom-text").appendChild(div);
}

/**Inser the chatroom into the html section element */
function outputChatroom(chatRoom) {
  roomName.innerText = chatRoom;
}

/**Inser list of chat users into the html element */
function outputUsers(users) {
  userList.innerHTML = `
        ${users.map((user) =>
           `<li>${user.nickname}</li>`).join("")}
    `;
}
