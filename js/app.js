// select control and display
const totalBill = document.querySelector("#total-bill");
const noOfPeople = document.querySelector("#no-of-people");
const tipPerc = document.querySelectorAll(".controls-tip__tips__input");
const customTip = document.querySelector("#custom-tip");

const displayTip = document.querySelector("#result-tip");
const displayTotal = document.querySelector("#result-total");

const calcReset = document.querySelector("#reset-calc-btn");

const totalErrorMsg = document.querySelector("#total-error");
const peopleErrorMsg = document.querySelector("#people-error");

// listen to and update
let total = 0;
let people = 0;
let tip = 0;
let restrictedKey = false;

totalBill.addEventListener("keydown", function(e) {
  if (e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 69) {
    restrictedKey = true;
  } else {
    restrictedKey = false;
  }
});

totalBill.addEventListener("input", function(e) {
  if (restrictedKey) {
    totalBill.value = total;
  } else {
    total = Number(parseFloat(totalBill.value).toFixed(2));
    noZero(totalBill.value, totalErrorMsg);
  }
  calculateTip(total, tip, people);
});

noOfPeople.addEventListener("keydown", function(e) {
  if (e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 69) {
    restrictedKey = true;
  } else {
    restrictedKey = false;
  }
});

noOfPeople.addEventListener("input", function(e) {
  if (restrictedKey) {
    noOfPeople.value = people;
  } else {
    people = parseInt(noOfPeople.value);
    noZero(noOfPeople.value, peopleErrorMsg);
  }
  calculateTip(total, tip, people);
});

tipPerc.forEach(el =>
  el.addEventListener("click", function(e) {
    tip = Number(el.value);
    calculateTip(total, tip, people);
    tipPerc.forEach(el => {
      el.classList.remove("selected-tip");
    });
    e.target.classList.add("selected-tip");
  })
);

customTip.addEventListener("keydown", function(e) {
  if (e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 69) {
    restrictedKey = true;
  } else {
    restrictedKey = false;
  }
});

customTip.addEventListener("input", function(e) {
  if (restrictedKey) {
    customTip.value = tip;
  } else {
    tip = Number(parseFloat(customTip.value).toFixed(2));
  }
  calculateTip(total, tip, people);
});

// show results
let tipPerPerson = 0;
let totalPerPerson = 0;

function calculateTip(total, tip, people) {
  if (total > 0 && tip >= 0 && people > 0) {
    const totalTips = total * tip / 100;
    const totalWTips = total + totalTips;
    const totalAmountPP = totalWTips / people;
    const totalTipPP = totalTips / people;
    displayTip.innerText = parseFloat(totalTipPP).toFixed(2);
    displayTotal.innerText = parseFloat(totalAmountPP).toFixed(2);
  }
}

// reset
calcReset.addEventListener("click", function(e) {
  e.preventDefault();
  displayTip.innerText = parseFloat(0.0).toFixed(2);
  displayTotal.innerText = parseFloat(0.0).toFixed(2);
  tipPerc.forEach(el => {
    el.classList.remove("selected-tip");
  });
  customTip.value = "";
  total = 0;
  totalBill.value = "";
  people = 0;
  noOfPeople.value = "";
  tip = 0;
});

// check for zero and display error message
function noZero(val, inst) {
  if (val == 0) {
    inst.classList.remove("hide");
  } else {
    inst.classList.add("hide");
  }
}
