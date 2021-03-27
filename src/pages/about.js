import "../assets/styles/reset.css";
import "../assets/styles/common.scss";
import "../assets/styles/button.scss";

// https://stackoverflow.com/questions/53558916/babel-7-referenceerror-regeneratorruntime-is-not-defined
import "core-js/stable";
import "regenerator-runtime/runtime";

document.querySelector("#btn").addEventListener('click', () => {
  const div = document.createElement('div');
  div.innerHTML = "JS OK!";
  document.querySelector('#text').appendChild(div);
})
