document.addEventListener('DOMContentLoaded', () => {
    // --- MODAL POPUP LOGIC ---
    const contactBtn = document.getElementById('contactBtn');
    const contactModal = document.getElementById('contactModal');
    const closeContactBtn = document.getElementById('closeContactBtn');

    if (contactBtn && contactModal && closeContactBtn) {
        // Open Modal
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the link from jumping to the top of the page
            contactModal.classList.add('active');
        });

        // Close Modal via X button
        closeContactBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });

        // Close Modal by clicking outside of the white box
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
            }
        });
    }

    // --- REVEAL ELEMENTS LOGIC ---
    const revealElements = document.querySelectorAll('.bg-folder, .c-folder, .id-badge');
    const tabs = document.querySelector('.tabs');
    const btns = document.querySelectorAll('.button');
    const articles = document.querySelectorAll('.content');
 
    if (tabs) {
        tabs.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (id) {
                btns.forEach(function(btn) {
                    btn.classList.remove('live');
                });
                e.target.classList.add('live');
 
                articles.forEach(function(article) {
                    article.classList.remove('live');
                });
                const target = document.getElementById(id);
                if (target) target.classList.add('live');
            }
        });
    }
 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // reveal once, stays visible after
            }
        });
    }, {
        threshold: 0.2
    });
 
    revealElements.forEach(el => observer.observe(el));
 
    // --- PROJECTS CAROUSEL LOGIC ---
    const projects = [
        {
            title: "Para Po!",
            badge: "OJT",
            image: "url(images/parapopic.png)",
            longDescription: "Led the full stack development of Para Po!, a mobile app designed to help commuters, especially those who are using public transportation to travel to an area that they are not familiar with.",
            tags: ["Flutter", "Dart", "SQLite"],
            link: "https://github.com/soleiia/ParaPoApp"
        },
        {
            title: "CTRL + Life UI",
            badge: "School - SHS",
            image: "url('images/ctrllifeUI.png')",
            longDescription: "Designed the UI of CTRL + Life, a visual novel incorporating the lessons in the subject Life and Career Skills in DepEd’s new SHS curriculum to enhance the students' learning experience.",
            tags: ["Figma", "UI Design"],
            link: "https://www.figma.com/proto/fTja07Gwg4NdqT9WRdVISN/Ren-Py-GUI-Demo---CTRL---LIFE?node-id=0-1&t=LcKnNKqKvnKrjzBp-1"
        },
        {
            title: "Pizza Panic!",
            badge: "School - SHS",
            image: "url('images/pizzapanicUI.png')",
            longDescription: "Programmed, created the elements, and animated Pizza Panic!, a drag and drop pizza game created in Adobe Animate.",
            tags: ["Adobe Animate", "ActionScript", "Animation", "Drawing"],
            link: "https://drive.google.com/drive/folders/1XKEbUrFXbSpYimAr1GUQvBI_eWnR16Dz?usp=sharing"
        }
    ];
 
    const pcTrack = document.getElementById("pcTrack");
    if (!pcTrack) {
        console.error("Project carousel: #pcTrack not found in the page.");
        return;
    }
 
    // A single lightbox shared by all cards, for viewing the full image.
    let pcLightbox = document.getElementById("pcLightbox");
    if (!pcLightbox) {
        pcLightbox = document.createElement("div");
        pcLightbox.className = "pc-lightbox";
        pcLightbox.id = "pcLightbox";
        pcLightbox.innerHTML = `
            <button class="pc-lightbox__close" aria-label="Close image">&times;</button>
            <div class="pc-lightbox__frame"></div>
        `;
        document.body.appendChild(pcLightbox);
 
        pcLightbox.addEventListener("click", (e) => {
            if (e.target === pcLightbox) closeLightbox();
        });
        pcLightbox.querySelector(".pc-lightbox__close").addEventListener("click", closeLightbox);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightbox();
        });
    }
 
    function openLightbox(image) {
        pcLightbox.querySelector(".pc-lightbox__frame").style.backgroundImage = image;
        pcLightbox.classList.add("is-open");
    }
 
    function closeLightbox() {
        pcLightbox.classList.remove("is-open");
    }
 
    projects.forEach((project) => {
        const card = document.createElement("div");
        card.className = "pc-card";
 
        card.innerHTML = `
            <div class="pc-card__inner">
                <div class="pc-card__face pc-card__face--front">
                    <div class="pc-card__shine"></div>
                    ${project.badge ? `<div class="pc-card__badge">${project.badge}</div>` : ""}
                    <div class="pc-card__image" style="background-image:${project.image}">
                        <span class="pc-card__zoom" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="7"/>
                                <path d="M11 8v6M8 11h6"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        </span>
                    </div>
                    <div class="pc-card__text">
                        <p class="pc-card__title">${project.title}</p>
                    </div>
                    <div class="pc-card__footer">
                        <span class="pc-card__tag-preview">${project.tags[0] || ""}</span>
                        <button class="pc-card__link" aria-label="Open ${project.title}" title="Open project">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 17L17 7M9 7h8v8"/>
                            </svg>
                        </button>
                    </div>
                </div>
 
                <div class="pc-card__face pc-card__face--back">
                    <p class="pc-card__back-title">${project.title}</p>
                    <p class="pc-card__back-desc">${project.longDescription}</p>
                    <div class="pc-card__tags">
                        ${project.tags.map(t => `<span class="pc-card__tag">${t}</span>`).join("")}
                    </div>
                    <button class="pc-card__visit" title="Open project">
                        Visit project
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 17L17 7M9 7h8v8"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
 
        // Clicking the card flips it to reveal more info.
        card.addEventListener("click", () => {
            card.classList.toggle("is-flipped");
        });
 
        // Clicking the image opens the full, uncropped image instead of flipping the card.
        card.querySelector(".pc-card__image").addEventListener("click", (e) => {
            e.stopPropagation();
            openLightbox(project.image);
        });
 
        // The front arrow button opens the project link without flipping the card.
        card.querySelector(".pc-card__link").addEventListener("click", (e) => {
            e.stopPropagation();
            window.open(project.link, "_blank");
        });
 
        // The back "Visit project" button also opens the link.
        card.querySelector(".pc-card__visit").addEventListener("click", (e) => {
            e.stopPropagation();
            window.open(project.link, "_blank");
        });
 
        pcTrack.appendChild(card);
    });
 
    function pcScroll(direction) {
        const card = pcTrack.querySelector(".pc-card");
        if (!card) return;
        const gap = parseFloat(getComputedStyle(pcTrack).gap) || 24;
        pcTrack.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
    }
 
    const pcPrev = document.getElementById("pcPrev");
    const pcNext = document.getElementById("pcNext");
    if (pcPrev) pcPrev.addEventListener("click", () => pcScroll(-1));
    if (pcNext) pcNext.addEventListener("click", () => pcScroll(1));
});


// --- FORM VALIDATION & SUBMISSION LOGIC ---
(function () {
  "use strict";
  /*
   * Form Validation
   */

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          form.querySelectorAll(":invalid")[0].focus();
        } else {
          /*
           * Form Submission using fetch()
           */

          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";
          result.style.color = "#888"; // Reset color to neutral while loading

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
          })
            .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.style.color = "#28a745"; // Success green
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.style.color = "#E02434"; // Your brand red for errors
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
              result.style.color = "#E02434"; // Your brand red for errors
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none";
              }, 5000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();


