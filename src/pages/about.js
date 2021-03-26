import "../assets/styles/reset.css";

import { saveAs } from 'file-saver';

document.querySelector("#btn").addEventListener('click', () => {
  const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "hello world.txt");
})
