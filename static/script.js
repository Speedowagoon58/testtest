const api = "https://api.adviceslip.com/advice";
const dice = document.getElementById('icon');
const time = document.getElementById('time');

function updateTime() {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0'); // Ensure 2 digits
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    time.innerText = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);
updateTime();


dice.addEventListener('click', () => {
  setTimeout(getAdvice, 300); // Add a 0.3-second delay before executing getAdvice
});

function getAdvice() {
  fetch(api)
    .then((response) => {
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error("can't get advice");
      }
      return response.json(); // Parse the JSON data
    })
    .then((data) => {
      // Access the specific advice text
      const advice = data.slip.advice;
      const id = data.slip.id;

      // Select the container where data will be displayed
      const adv = document.getElementById("adv");
      const num = document.getElementById("num");

      // Display the advice text
      adv.innerText = `“ ${advice} ”`;
      num.innerText = `Advice #${id}`;

      console.log(advice);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
