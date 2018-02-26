const Aframe = require('aframe');
const $ = (query) => document.querySelector(query);

const saturn = document.querySelectorAll(".saturn");

saturn[0].addEventListener("click", function(){
	saturn[1].click();
});
saturn[1].addEventListener("click", function(){
	saturn[0].click();
});