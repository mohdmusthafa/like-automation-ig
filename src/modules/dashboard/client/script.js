const ansiToHtml = require("ansi-to-html");
const convert = new ansiToHtml();
const $ = require('jquery');

var eventList = document.getElementById("logs-list");
var evtSource = new EventSource("http://localhost:3000/logs");
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