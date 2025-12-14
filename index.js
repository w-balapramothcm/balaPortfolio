
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
// === Experience Auto-Calculation (HR-Accurate) === //
function calculateExperience(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  // If the current day is before the start day, the month is not completed
  if (end.getDate() < start.getDate()) {
    months--;
  }

  // Adjust if months become negative
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}

// === Animate Experience (Month-based animation) === //
function animateValue(element, startMonths, endMonths, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);

    const currentMonths = Math.floor(
      startMonths + (endMonths - startMonths) * progress
    );

    const years = Math.floor(currentMonths / 12);
    const months = currentMonths % 12;

    element.textContent = `${years}.${months} yrs`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// === Update Experience UI === //
function updateExperienceUI() {
  const today = new Date();

  // Career timeline
  const careerStart = new Date("2022-07-14");
  const azureEnd = new Date("2024-07-14");
  const awsStart = azureEnd;

  // Calculate experience
  const total = calculateExperience(careerStart, today);
  const azure = calculateExperience(careerStart, azureEnd);
  const aws = calculateExperience(awsStart, today);

  // Animate values (convert to months)
  animateValue(
    document.getElementById("totalExperience"),
    0,
    total.years * 12 + total.months,
    1800
  );

  animateValue(
    document.getElementById("azureExperience"),
    0,
    azure.years * 12 + azure.months,
    1800
  );

  animateValue(
    document.getElementById("awsExperience"),
    0,
    aws.years * 12 + aws.months,
    1800
  );
}

// Run after page load
document.addEventListener("DOMContentLoaded", updateExperienceUI);

// === Scroll To Top Button === //
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
document.querySelectorAll('#navlist .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navCollapse = document.getElementById('navlist');
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);

    if (bsCollapse) {
      bsCollapse.hide();
    }
  });
});
