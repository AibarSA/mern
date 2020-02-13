import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

var modal = document.getElementById("myModal");
var myLogin = document.getElementById("myLogin");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

var login = document.getElementById("login");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var closeLogin = document.getElementsByClassName("closeLogin")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

login.onclick = function() {
  myLogin.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

closeLogin.onclick = function() {
  myLogin.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == myLogin) {
    myLogin.style.display = "none";
  }
}