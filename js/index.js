/* let cardInside = document.querySelectorAll(".inner")
let countNumber = document.querySelectorAll(".countNumber")
let colorStripAdd = document.getElementById("colorStrip")
let totalCount = 0
let totalProgress = document.getElementById("totalProgress").innerHTML= totalCount + "%"
for(let i=0 ; i <cardInside.length; i++){
    cardInside[i].addEventListener("click", function(){
        cardInside[i].classList.toggle("border-card-inside-selected")
        cardInside[i].classList.toggle("bg-card-inside-selected")
        if(cardInside[i].classList.contains("border-card-inside-selected")){
            totalCount += Number(countNumber[i].innerHTML)
            document.getElementById("totalProgress").innerHTML= totalCount + "%"
            colorStripAdd.classList.add(`width-per-${totalCount}`)
        }else {
            colorStripAdd.classList.remove(`width-per-${totalCount}`)
            totalCount -= Number(countNumber[i].innerHTML)
            document.getElementById("totalProgress").innerHTML= totalCount + "%"
            colorStripAdd.classList.add(`width-per-${totalCount}`)
        }
    })
}
 */
let cardInside = document.querySelectorAll(".inner");
let countNumber = document.querySelectorAll(".countNumber")
let colorStripAdd = document.getElementById("colorStrip");
let totalProgress = document.getElementById("totalProgress");
// ========================================
// GET CURRENT SELECTED DATE
// ========================================
function getSelectedDate() {
  let dateInput = document.getElementById("today");
  // لو عندك calendar مخزن التاريخ في #today
  if (dateInput && dateInput.value) {
    return dateInput.value;
  }
  // fallback: تاريخ اليوم
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
// ========================================
// LOCAL STORAGE KEY
// ========================================
const STORAGE_KEY = "dailyCardProgress";
// ========================================
// GET ALL SAVED DAYS
// ========================================
function getAllDays() {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "{}"
  );
}
// ========================================
// SAVE CURRENT DAY
// ========================================
function saveCurrentDay() {
  let allDays = getAllDays();
  let currentDate = getSelectedDate();
  let selectedCards = [];
  cardInside.forEach((card, index) => {
    if (
      card.classList.contains(
        "border-card-inside-selected"
      )
    ) {
      selectedCards.push(index);
    }
  });
  allDays[currentDate] = {
    selectedCards: selectedCards,
    totalCount: totalCount
  };
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(allDays)
  );
}
// ========================================
// LOAD CURRENT DAY
// ========================================
function loadCurrentDay() {
  let allDays = getAllDays();
  let currentDate = getSelectedDate();
  let savedData = allDays[currentDate];
  // Reset everything first
  cardInside.forEach(card => {
    card.classList.remove(
      "border-card-inside-selected"
    );
    card.classList.remove(
      "bg-card-inside-selected"
    );
  });
  totalCount = 0;
  // لو مفيش بيانات لليوم
  if (!savedData) {
    updateProgress();
    return;
  }
  // Restore selected cards
  savedData.selectedCards.forEach(index => {
    if (cardInside[index]) {
      cardInside[index].classList.add(
        "border-card-inside-selected"
      );
      cardInside[index].classList.add(
        "bg-card-inside-selected"
      );
      totalCount += Number(
        countNumber[index].innerHTML
      );
    }
  });
  updateProgress();
}
// ========================================
// UPDATE PROGRESS
// ========================================
function updateProgress() {
  totalProgress.innerHTML =
    totalCount + "%";
  // Reset width classes
  colorStripAdd.className =
    colorStripAdd.className
      .replace(
        /\bwidth-per-\d+\b/g,
        ""
      );
  // Add current width
  colorStripAdd.classList.add(
    `width-per-${totalCount}`
  );
}
// ========================================
// CARD CLICK
// ========================================
for (
  let i = 0;
  i < cardInside.length;
  i++
) {
  cardInside[i].addEventListener(
    "click",
    function () {
      cardInside[i].classList.toggle(
        "border-card-inside-selected"
      );
      cardInside[i].classList.toggle(
        "bg-card-inside-selected"
      );
      if (
        cardInside[i].classList.contains(
          "border-card-inside-selected"
        )
      ) {
        totalCount += Number(
          countNumber[i].innerHTML
        );
      } else {
        totalCount -= Number(
          countNumber[i].innerHTML
        );
      }
      updateProgress();
      // Save immediately
      saveCurrentDay();
    }
  );
}
// ========================================
// WHEN DATE CHANGES
// ========================================
let dateInput =
  document.getElementById("today");
if (dateInput) {
  dateInput.addEventListener(
    "change",
    function () {
      loadCurrentDay();
    }
  );
}
// ========================================
// INITIAL LOAD
// ========================================
loadCurrentDay();