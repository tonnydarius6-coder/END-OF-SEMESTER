const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const isActive = item.classList.toggle("active");

    button.setAttribute("aria-expanded", String(isActive));
    button.querySelector("span").textContent = isActive ? "−" : "+";
  });
});

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const parentName = document.getElementById("parentName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const classLevel = document.getElementById("classLevel").value;
    const message = document.getElementById("message").value.trim();
    const requiredFields = [
      document.getElementById("parentName"),
      document.getElementById("phone"),
      document.getElementById("message"),
    ];

    requiredFields.forEach((field) => {
      field.setCustomValidity(field.value.trim() ? "" : "Please complete this field.");
    });

    if (!contactForm.reportValidity()) {
      return;
    }

    const subject = `School inquiry: ${classLevel}`;
    const body = [
      `Parent / Guardian: ${parentName}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Class / inquiry: ${classLevel}`,
      "",
      "Message:",
      message,
    ].join("\n");
    const mailto = `mailto:info@stmarcellinoprimary.ac.ug?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const emailLink = document.createElement("a");
    emailLink.href = "mailto:info@stmarcellinoprimary.ac.ug";
    emailLink.textContent = "email the school office";
    formFeedback.replaceChildren(
      document.createTextNode("Your email app should open with the inquiry ready to send. If it does not, "),
      emailLink,
      document.createTextNode(".")
    );
    window.location.href = mailto;
  });

  contactForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => field.setCustomValidity(""));
  });
}

const thankYouSection = document.querySelector(".thank-you");

if (thankYouSection && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let applauseHasPlayed = false;

  const playApplause = () => {
    if (applauseHasPlayed) return;
    applauseHasPlayed = true;

    const applause = document.createElement("div");
    applause.className = "applause-fall";
    applause.setAttribute("aria-hidden", "true");

    for (let i = 0; i < 36; i += 1) {
      const hand = document.createElement("span");
      hand.className = "clapping-hand";
      hand.textContent = i % 3 === 0 ? "👏" : i % 3 === 1 ? "🙌" : "✨";
      hand.style.setProperty("--left", `${4 + Math.random() * 92}%`);
      hand.style.setProperty("--size", `${1.1 + Math.random() * 1.4}rem`);
      hand.style.setProperty("--duration", `${3.2 + Math.random() * 2.5}s`);
      hand.style.setProperty("--delay", `${Math.random() * 1.4}s`);
      hand.style.setProperty("--sway", `${-90 + Math.random() * 180}px`);
      applause.appendChild(hand);
    }

    document.body.appendChild(applause);
    window.setTimeout(() => applause.remove(), 7000);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        playApplause();
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(thankYouSection);
  } else {
    playApplause();
  }
}
