AOS.init({
  duration: 1000,
  once: false,
  easing: 'ease-in-out',
  mirror: true   // 👈 THIS makes animation trigger on scroll up nicely
});

  window.addEventListener("scroll", () => {
    document.querySelector(".navbar")
      .classList.toggle("scrolled", window.scrollY > 50);
  });

  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    let started = false;
    window.addEventListener('scroll', () => {
      const rect = counter.getBoundingClientRect();
      if (!started && rect.top < window.innerHeight) {
        started = true;
        const target = +counter.dataset.target;
        let count = 0;
        const inc = Math.ceil(target / 100);
        const interval = setInterval(() => {
          count += inc;
          if (count >= target) {
            counter.innerText = target;
            clearInterval(interval);
          } else {
            counter.innerText = count;
          }
        }, 30);
      }
    });
  });



  // Navbar scroll background
  window.addEventListener("scroll", () => {
    document.querySelector(".navbar")
      .classList.toggle("scrolled", window.scrollY > 50);
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });



  const items = document.querySelectorAll('.gallery-item');
  let visibleCount = 6;

  function showGalleryItems() {
    for (let i = 0; i < visibleCount && i < items.length; i++) {
      items[i].style.display = 'block';
    }
  }

  showGalleryItems();

  document.getElementById('loadMoreGallery').addEventListener('click', () => {
    visibleCount += 6;
    showGalleryItems();

    if (visibleCount >= items.length) {
      document.getElementById('loadMoreGallery').style.display = 'none';
    }
  });



  const modalImg = document.getElementById('galleryModalImg');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      new bootstrap.Modal(document.getElementById('galleryModal')).show();
    });
  });

  const carousel = document.getElementById('clientCarousel');

  carousel.addEventListener('mouseenter', () => {
    bootstrap.Carousel.getInstance(carousel).pause();
  });

  carousel.addEventListener('mouseleave', () => {
    bootstrap.Carousel.getInstance(carousel).cycle();
  });



const toggle = document.getElementById("chatbot-toggle");
const windowChat = document.getElementById("chatbot-window");
const closeBtn = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("chatbot-send");
const input = document.getElementById("chatbot-input");
const body = document.getElementById("chatbot-body");

toggle.onclick = () => windowChat.style.display = "flex";
closeBtn.onclick = () => windowChat.style.display = "none";

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  if (!input.value.trim()) return;

  addMessage(input.value, "user-msg");
  respond(input.value.toLowerCase());
  input.value = "";
}

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = className;
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function respond(msg) {
  let reply = "Thank you for reaching out! Our team will contact you shortly.";

  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hello 👋 How can I assist you today?";
  } else if (msg.includes("contact")) {
    reply = "You can reach us at info@belcastindustries.com 📧";
  } else if (msg.includes("location")) {
    reply = "We are located in Belagavi, Karnataka, India 📍";
  } else if (msg.includes("services")) {
    reply = "We manufacture high-quality cast iron and ductile iron components.";
  }

  setTimeout(() => addMessage(reply, "bot-msg"), 700);
}

