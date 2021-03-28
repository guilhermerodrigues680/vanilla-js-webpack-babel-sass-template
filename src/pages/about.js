import "../assets/styles/reset.css";
import "../assets/styles/common.scss";
import "../assets/styles/button.scss";

document.querySelector("#btn").addEventListener('click', () => {
  const div = document.createElement('div');
  div.innerHTML = "JS OK!";
  document.querySelector('#text').appendChild(div);
})
