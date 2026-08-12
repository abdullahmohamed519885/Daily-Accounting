// ===========================
// EMAILJS
// ===========================
emailjs.init("KQ3Us6JqBccQ2aZ-f");
const form = document.getElementById("contact-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = form.querySelector("button");
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "Sending...";
    emailjs.sendForm(
        "Abdullah_Mohamed_519885",
        "Abdullah_Mohamed_519885",
        this
    )
    .then(() => {
        btn.innerHTML = "✔ Message Sent";
        btn.style.background = "#16a34a";
        form.reset();
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = "";
            btn.disabled = false;
        },2500);
    })
    .catch((error)=>{
        console.log(error);
        btn.innerHTML = "Failed";
        btn.style.background = "#dc2626";
        setTimeout(()=>{
            btn.innerHTML = originalText;
            btn.style.background = "";
            btn.disabled = false;
        },2500);
    });
});