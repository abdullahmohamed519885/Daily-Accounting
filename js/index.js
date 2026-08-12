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





// ---------------------------------------
let btnCloseButton = document.querySelectorAll(".btnCloseButton")
let remembrances1 = document.getElementById("remembrances1")
let btnRemembrances1 = document.getElementById("btnRemembrances1")
let remembrances2 = document.getElementById("remembrances2")
let btnRemembrances2 = document.getElementById("btnRemembrances2")
let remembrances3 = document.getElementById("remembrances3")
let btnRemembrances3 = document.getElementById("btnRemembrances3")
let remembrances4 = document.getElementById("remembrances4")
let btnRemembrances4 = document.getElementById("btnRemembrances4")
let remembrances5 = document.getElementById("remembrances5")
let btnRemembrances5 = document.getElementById("btnRemembrances5")
let remembrances6 = document.getElementById("remembrances6")
let btnRemembrances6 = document.getElementById("btnRemembrances6")
let remembrances7 = document.getElementById("remembrances7")
let btnRemembrances7 = document.getElementById("btnRemembrances7")
let remembrances8 = document.getElementById("remembrances8")
let btnRemembrances8 = document.getElementById("btnRemembrances8")
let remembrances9 = document.getElementById("remembrances9")
let btnRemembrances9 = document.getElementById("btnRemembrances9")
let remembrances10 = document.getElementById("remembrances10")
let btnRemembrances10 = document.getElementById("btnRemembrances10")
let remembrances11 = document.getElementById("remembrances11")
let btnRemembrances11 = document.getElementById("btnRemembrances11")
let remembrances12 = document.getElementById("remembrances12")
let btnRemembrances12 = document.getElementById("btnRemembrances12")
let remembrances13 = document.getElementById("remembrances13")
let btnRemembrances13 = document.getElementById("btnRemembrances13")
let remembrances14 = document.getElementById("remembrances14")
let btnRemembrances14 = document.getElementById("btnRemembrances14")
let remembrances15 = document.getElementById("remembrances15")
let btnRemembrances15 = document.getElementById("btnRemembrances15")
let remembrances16 = document.getElementById("remembrances16")
let btnRemembrances16 = document.getElementById("btnRemembrances16")
let remembrances17 = document.getElementById("remembrances17")
let btnRemembrances17 = document.getElementById("btnRemembrances17")
function contactAddInputs(){
    return  `
    <section class="vh-100 modal-body z-2000">
                <div class="add-contact h-100 add-contact-card-bg position-fixed inset-0 backdrop-filter">
                    <div class="container h-100 px-0">
                        <div class="inner h-100 d-flex-center position-fixed inset-0 overflow-hidden p-16">
                            <div class="card max-width-512 max-height-90 overflow-scroll scrollbar-width rounded-px-20 bg-white w-100 h-100">
                                <div class="titel d-flex-between p-16 main-addContact-titel-border-bottom">
                                    <div class="text">
                                        <h3 id="textHeaderInput" class="text-capitalize ain-titel-color fs-20 fw-bold">add new contact</h3>
                                    </div>
                                    <button id="btnCloseButton" class="width-px-36 height-px-36 rounded-px-8 d-flex-center main-addContact-card-icon-color main-addContact-card-icon-hover border-0 bg-white fs-14">
                                        <i class="fa-solid fa-x"></i>
                                    </button>
                                </div>
                                <div class="contact-info p-16">
                                </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </section>
    
    `
}
btnRemembrances1.addEventListener("click" , function(){
    remembrances1.classList.remove("d-none")
})
btnRemembrances2.addEventListener("click" , function(){
    remembrances2.classList.remove("d-none")
})
btnRemembrances3.addEventListener("click" , function(){
    remembrances3.classList.remove("d-none")
})
btnRemembrances4.addEventListener("click" , function(){
    remembrances4.classList.remove("d-none")
})
btnRemembrances5.addEventListener("click" , function(){
    remembrances5.classList.remove("d-none")
})
btnRemembrances6.addEventListener("click" , function(){
    remembrances6.classList.remove("d-none")
})
btnRemembrances7.addEventListener("click" , function(){
    remembrances7.classList.remove("d-none")
})
btnRemembrances8.addEventListener("click" , function(){
    remembrances8.classList.remove("d-none")
})
btnRemembrances9.addEventListener("click" , function(){
    remembrances9.classList.remove("d-none")
})
btnRemembrances10.addEventListener("click" , function(){
    remembrances10.classList.remove("d-none")
})
btnRemembrances11.addEventListener("click" , function(){
    remembrances11.classList.remove("d-none")
})
btnRemembrances12.addEventListener("click" , function(){
    remembrances12.classList.remove("d-none")
})
btnRemembrances13.addEventListener("click" , function(){
    remembrances13.classList.remove("d-none")
})
btnRemembrances14.addEventListener("click" , function(){
    remembrances14.classList.remove("d-none")
})
btnRemembrances15.addEventListener("click" , function(){
    remembrances15.classList.remove("d-none")
})
btnRemembrances16.addEventListener("click" , function(){
    remembrances16.classList.remove("d-none")
})
btnRemembrances17.addEventListener("click" , function(){
    remembrances17.classList.remove("d-none")
})
for(let i =0 ; i< btnCloseButton.length ; i++){
  btnCloseButton[i].addEventListener("click", function(){
    remembrances1.classList.add("d-none")
    remembrances2.classList.add("d-none")
    remembrances3.classList.add("d-none")
    remembrances4.classList.add("d-none")
    remembrances5.classList.add("d-none")
    remembrances6.classList.add("d-none")
    remembrances7.classList.add("d-none")
    remembrances8.classList.add("d-none")
    remembrances9.classList.add("d-none")
    remembrances10.classList.add("d-none")
    remembrances11.classList.add("d-none")
    remembrances12.classList.add("d-none")
    remembrances13.classList.add("d-none")
    remembrances14.classList.add("d-none")
    remembrances15.classList.add("d-none")
    remembrances16.classList.add("d-none")
    remembrances17.classList.add("d-none")
  })
}
// ========================================
// REMEMBRANCES LOCAL STORAGE
// ========================================
const REMEMBRANCE_STORAGE_KEY = "dailyRemembranceProgress";
// ========================================
// GET ALL SAVED REMEMBRANCES
// ========================================
function getAllRemembranceDays() {
    return JSON.parse(
        localStorage.getItem(REMEMBRANCE_STORAGE_KEY) || "{}"
    );
}
// ========================================
// GET ALL REMEMBRANCE CARDS
// ========================================
function getRemembranceCards() {
    return document.querySelectorAll(".inner-inside");
}
// ========================================
// SAVE REMEMBRANCES
// ========================================
function saveRemembrances() {
    const allDays = getAllRemembranceDays();
    const currentDate = getSelectedDate();
    const cards = getRemembranceCards();
    const savedCards = [];
    cards.forEach(function (card, index) {
        const counter = card.querySelector(".card-span-bg-select");
        if (!counter) return;
        const numbers = counter.textContent.match(/\d+/g);
        if (!numbers || numbers.length < 2) return;
        const current = Number(numbers[0]);
        const total = Number(numbers[1]);
        savedCards.push({
            index: index,
            current: current,
            total: total,
            completed: current >= total
        });
    });
    allDays[currentDate] = {
        cards: savedCards
    };
    localStorage.setItem(
        REMEMBRANCE_STORAGE_KEY,
        JSON.stringify(allDays)
    );
}
// ========================================
// UPDATE CARD UI
// ========================================
function updateRemembranceCard(card, current, total) {
    const counter = card.querySelector(
        ".card-span-bg-select"
    );
    const icon = card.querySelector(
        ".iconTrue"
    );
    if (!counter) return;
    // تحديث الرقم
    counter.textContent = `${current} / ${total}`;
    // ====================================
    // COMPLETE
    // ====================================
    if (current >= total) {
        // span
        counter.classList.add(
            "card-span-bg-select-complete",
            "card-span-color-select-complete"
        );
        // card
        card.classList.add(
            "bg-card-inside-selected",
            "border-card-inside-selected"
        );
        card.classList.remove(
            "bg-card",
            "border-card",
            "bg-card-popup-hover"
        );
        // icon
        if (icon) {
            icon.classList.remove("d-none");
            icon.classList.add(
                "card-icon-color-select"
            );
        }
    }
    // ====================================
    // NOT COMPLETE
    // ====================================
    else {
        // span
        counter.classList.remove(
            "card-span-bg-select-complete",
            "card-span-color-select-complete"
        );
        // card
        card.classList.remove(
            "bg-card-inside-selected",
            "border-card-inside-selected"
        );
        card.classList.add(
            "bg-card",
            "border-card",
            "bg-card-popup-hover"
        );
        // icon
        if (icon) {
            icon.classList.add("d-none");
            icon.classList.remove(
                "card-icon-color-select"
            );
        }
    }
}
// ========================================
// LOAD REMEMBRANCES
// ========================================
function loadRemembrances() {
    const allDays = getAllRemembranceDays();
    const currentDate = getSelectedDate();
    const savedData = allDays[currentDate];
    const cards = getRemembranceCards();
    // ====================================
    // RESET ALL CARDS
    // ====================================
    cards.forEach(function (card) {
        const counter = card.querySelector(
            ".card-span-bg-select"
        );
        const icon = card.querySelector(
            ".iconTrue"
        );
        if (!counter) return;
        const numbers = counter.textContent.match(/\d+/g);
        if (!numbers || numbers.length < 2) return;
        const total = Number(numbers[1]);
        // Reset counter
        counter.textContent = `0 / ${total}`;
        // Reset span
        counter.classList.remove(
            "card-span-bg-select-complete",
            "card-span-color-select-complete"
        );
        // Reset card
        card.classList.remove(
            "bg-card-inside-selected",
            "border-card-inside-selected"
        );
        card.classList.add(
            "bg-card",
            "border-card",
            "bg-card-popup-hover"
        );
        // Reset icon
        if (icon) {
            icon.classList.add("d-none");
            icon.classList.remove(
                "card-icon-color-select"
            );
        }
    });
    // ====================================
    // NO SAVED DATA
    // ====================================
    if (!savedData || !savedData.cards) {
        return;
    }
    // ====================================
    // RESTORE SAVED CARDS
    // ====================================
    savedData.cards.forEach(function (savedCard) {
        const card = cards[savedCard.index];
        if (!card) return;
        updateRemembranceCard(
            card,
            savedCard.current,
            savedCard.total
        );
    });
}
// ========================================
// CARD CLICK
// ========================================
document.addEventListener(
    "click",
    function (e) {
        const card = e.target.closest(
            ".inner-inside"
        );
        if (!card) return;
        const counter = card.querySelector(
            ".card-span-bg-select"
        );
        if (!counter) return;
        const numbers = counter.textContent.match(
            /\d+/g
        );
        if (!numbers || numbers.length < 2) {
            return;
        }
        let current = Number(numbers[0]);
        const total = Number(numbers[1]);
        // زيادة مرة واحدة
        if (current < total) {
            current++;
        }
        // تحديث الكارت
        updateRemembranceCard(
            card,
            current,
            total
        );
        // حفظ
        saveRemembrances();
    }
);
// ========================================
// DATE CHANGE
// ========================================
if (dateInput) {
    dateInput.addEventListener(
        "change",
        function () {
            loadCurrentDay();
            loadRemembrances();
        }
    );
}
// ========================================
// INITIAL LOAD
// ========================================
loadRemembrances();