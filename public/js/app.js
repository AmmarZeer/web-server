console.log("hello world!S");

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        p1.textContent = data.error;
      } else {
        p1.textContent = data.location;
        p2.textContent = data.forcaset;
      }
      console.log(data);
    });
  });
});
