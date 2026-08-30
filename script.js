document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.bg-folder, .c-folder, .id-badge');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2 // triggers when 20% of the element is visible
    });

    revealElements.forEach(el => observer.observe(el));
});