console.log("Welcome to OZRacing Spares");

document.addEventListener("DOMContentLoaded", function(){

const btns = document.querySelectorAll(".btn");

btns.forEach(btn => {

btn.addEventListener("mouseover", () => {
btn.style.opacity = "0.8";
});

btn.addEventListener("mouseout", () => {
btn.style.opacity = "1";
});

});

});
