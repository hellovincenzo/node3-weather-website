console.log("Client side js file is loaded.");

fetch("http://puzzle.mead.io/puzzle").then(res => {
  res.json().then(data => {
    console.log(data);
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("messageOne");
const messageTwo = document.getElementById("messageTwo");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  if (!location) {
    return (messageOne.textContent = "You must provide a location.");
  }

  fetch(`/weather?address=${location}`).then(res => {
    res.json().then(({ error, location, forecast }) => {
      if (error) {
        return (messageOne.textContent = error);
      }

      messageOne.textContent = `Location: ${location}`;
      messageTwo.textContent = `Forecast: ${forecast}`;
    });
  });
});
