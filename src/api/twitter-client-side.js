import jwt_decode from "jwt-decode";

function sendToLogin() {
    window.location.href = window.location.origin + '/#/';
}

function decodeToken() {
    var existingToken =  localStorage.getItem("token");
    if(existingToken ===  'undefined')  {
        sendToLogin();
    }
    var decoded = jwt_decode(existingToken);
    console.log(decoded);
    return decoded;
}

function getProfile() {
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
