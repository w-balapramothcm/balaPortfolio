
// Enable Bootstrap validation
(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

async function sendForm(event) {
  event.preventDefault();

  const form = document.getElementById("contactForm");
  if (!form.checkValidity()) return;

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  try {
    const response = await fetch("https://bdgt83z2dj.execute-api.us-east-1.amazonaws.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = "thankyou.html";  // SUCCESS PAGE
      return;
    } else {
      alert("Failed to send message!");
    }
  } catch (error) {
    alert("Something went wrong. Try again.");
  }

  submitBtn.disabled = false;
  submitBtn.innerText = "SEND MESSAGE";
}


document.querySelectorAll('.input-group-custom input, .input-group-custom textarea')
.forEach(field => {
  field.addEventListener('blur', () => {
    if (field.value !== "") {
        field.classList.add("filled");
    } else {
        field.classList.remove("filled");
    }
  });
});