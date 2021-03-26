import "../assets/styles/reset.css";
import "../assets/styles/style.css";

// https://stackoverflow.com/questions/53558916/babel-7-referenceerror-regeneratorruntime-is-not-defined
import "core-js/stable";
import "regenerator-runtime/runtime";

import { getYesNo } from "../service/yes-no";

function writeInDOM(text) {
  document.querySelector('#text').innerHTML = text;
}

document.querySelector("#app").innerHTML = "JS OK!";

getYesNo()
.then(res => {
  console.log(res);
  writeInDOM(res.answer);
})
.catch(error => {
  console.error(JSON.stringify(error));
  writeInDOM(res.answer);
})
