let inputValue = document.querySelector(".qiymat");
let outputValue = document.querySelector(".natija");
let inputType = document.querySelector("#input-type");
let outputType = document.querySelector("#output-type");
let submit = document.querySelector(".submit");

let chiqarish = function (key, value) {
  html = `<option value="${key}">${key}    ${value}</option>`;
  inputType.insertAdjacentHTML("beforeend", html);
  outputType.insertAdjacentHTML("beforeend", html);
};

fetch("https://rapidapi.com/googlecloud/api/google-translate1/").then(
  (response) =>
    response.json().then((res) => {
      let myMap = new Map(Object.entries(res));
      myMap.forEach((key, value) => {
        chiqarish(value, key);
        console.log(key, value);
      });
    })
);

submit.addEventListener("click", function (e) {
  if (inputType.value != "null" || outputType.value != "null") {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${outputType.value}/${inputType.value}.json`
    ).then((response) =>
      response.json().then((res) => {
        let result = Object.keys(res).map((key) => [Number(key), res[key]]);
        outputValue.value = result[1][1] * inputValue.value;
      })
    );
  } else alert(`Odin so'zni kiriting!`);
});
