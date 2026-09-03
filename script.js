document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.bg-folder, .c-folder, .id-badge');
    const tabs = document.querySelector('.tabs');
    const btns = document.querySelectorAll('.button');
    const articles = document.querySelectorAll('.content');
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
        document.getElementById(id).classList.add('live');
    }
});

    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && scrollDirection === 'down') {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // reveal once, stays visible after
            }
        });
    }, {
        threshold: 0.2
    });

    revealElements.forEach(el => observer.observe(el));
});