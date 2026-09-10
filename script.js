document.addEventListener('DOMContentLoaded', () => {
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

const projects = [
        {
            title: "Para Po! Application",
            badge: "OJT",
            image: "linear-gradient(135deg, #FD84BA, #E02434)",
            longDescription: "Led the full stack development of Para Po!, a mobile app designed to help commuters, especially those who are using public transportation to travel to an area that they are not familiar with.",
            tags: ["Flutter", "Dart", "SQLite"],
            link: "https://github.com/soleiia/ParaPoApp"
        },
        {
            title: "CTRL + Life UI",
            badge: "SCHOOL",
            image: "url('/images/ctrllifeUI.png')",
            longDescription: "Designed the UI of CTRL + Life, a visual novel incorporating the lessons in the subject Life and Career Skills in DepEd’s new SHS curriculum to enhance the students' learning experience.",
            tags: ["Figma", "UI design", "Research"],
            link: "https://www.figma.com/proto/fTja07Gwg4NdqT9WRdVISN/Ren-Py-GUI-Demo---CTRL---LIFE?node-id=0-1&t=o3vpjAN1y1HiOEvC-1"
        },
        {
            title: "Pizza Panic!",
            badge: "SCHOOL",
            image: "url('/images/pizzapanicUI.png')",
            longDescription: "Programmed and animated Pizza Panic!, a drag and drop pizza game created in adobe animate.",
            tags: ["Adobe Animate", "ActionScript", "Animation", "Performance task"],
            link: "https://drive.google.com/drive/u/1/folders/15tUsZdX4fCPHHPdGctCXfPtqid0LUCdb"
        }
    ];
 
    const pcTrack = document.getElementById("pcTrack");
    if (!pcTrack) {
        console.error("Project carousel: #pcTrack not found in the page.");
        return;
    }
 
    projects.forEach((project) => {
        const card = document.createElement("div");
        card.className = "pc-card";
 
        card.innerHTML = `
            <div class="pc-card__inner">
                <div class="pc-card__face pc-card__face--front">
                    <div class="pc-card__shine"></div>
                    ${project.badge ? `<div class="pc-card__badge">${project.badge}</div>` : ""}
                    <div class="pc-card__image" style="background:${project.image}"></div>
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
 