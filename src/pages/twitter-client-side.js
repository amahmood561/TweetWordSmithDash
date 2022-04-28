import jwt_decode from "jwt-decode";

function sendToLogin() {
    window.location.href = window.location.origin + '/#/';
}

export function decodeToken() {
    var existingToken =  localStorage.getItem("token");
    if(existingToken ===  'undefined' || existingToken ==  null)  {
        sendToLogin();
    }
    let decoded = jwt_decode(existingToken);
    return decoded;
}

function getProfile() {
    //https://api.twitter.com/1.1/lists/show.json
    var currentToken = decodeToken();
    return "";
}

function getTweetHistory() {
    var currentToken = decodeToken();
    return "";
}

function postTweet(message) {
    var currentToken = decodeToken();
    return "";
}
