const ansiToHtml = require("ansi-to-html");
const convert = new ansiToHtml();
const $ = require('jquery');
const axios = require('axios');

var eventList = document.getElementById("logs-list");
var evtSource = new EventSource("/logs");
evtSource.onmessage = function (e) {
  console.log("received event");
  console.log(e);

  const messageHTML = convert.toHtml(e.data)
  var newElement = document.createElement("li");

  newElement.innerHTML = messageHTML;
  newElement.tabIndex = 1;
  eventList.appendChild(newElement);
  $('li').last().focus()
};

evtSource.onerror = function (e) {
  console.log("EventSource failed.");
};

console.log(evtSource);

const resetLoginButton = document.getElementsByClassName("reset-login")[0];
resetLoginButton.addEventListener('click', async () => {
    await axios.delete('/api/login')
})