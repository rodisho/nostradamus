/*define user array that will be used*/
const users = [];

/**Connect to the chatroom */
function connectUser(id, nickname, chatRoom){
const user = {
    id,
    nickname,
    chatRoom
};
/* Push user to the array*/
users
.push(user);
// return array of users
return user;
}

/*capture active user*/

function getActiveUser(id){
    return users.find(user => user.id == id);
}


// triger once user exit
function userLeave(id){
    const negativeCondition = -1
    const index = users.findIndex(user => user.id == id);

    if(index !== negativeCondition) {
        return users.splice(index, 1)[0];
    }
}

// Capture chatroom for the user
function getRoomUsers(chatRoom){
    return users.filter(user => user.chatroom === chatRoom);
}

module.exports = {
    connectUser,
    getActiveUser,
    userLeave,
    getRoomUsers
}