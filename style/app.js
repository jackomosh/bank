document.addEventListener('DOMContentLoaded', () => {
            
            // --- Hero Slider Logic ---
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.slider-dots .dot');
            const prevBtn = document.querySelector('.slider-arrow.prev');
            const nextBtn = document.querySelector('.slider-arrow.next');
            
            let slideIndex = 0;
            let slideInterval;

            function showSlide(index) {
                if (index >= slides.length) slideIndex = 0;
                if (index < 0) slideIndex = slides.length - 1;

                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));

                slides[slideIndex].classList.add('active');
                dots[slideIndex].classList.add('active');
            }

            function nextSlide() {
                slideIndex++;
                showSlide(slideIndex);
            }

            function prevSlide() {
                slideIndex--;
                showSlide(slideIndex);
            }

            function startSlideShow() {
                slideInterval = setInterval(nextSlide, 6000); 
            }

            function resetInterval() {
                clearInterval(slideInterval);
                startSlideShow();
            }

            if (nextBtn && prevBtn) {
                nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
                prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    slideIndex = index;
                    showSlide(slideIndex);
                    resetInterval();
                });
            });

            if (slides.length > 0) {
                showSlide(slideIndex);
                startSlideShow();
            }

            window.currentSlide = function(index) {
                if (dots.length > 0) dots[index].click(); 
            };

            // --- Search Button Simulation ---
            const searchBtn = document.getElementById('searchBtn');
            if (searchBtn) {
                searchBtn.addEventListener('click', () => {
                    const originalText = searchBtn.innerText;
                    searchBtn.innerText = 'Searching...';
                    searchBtn.style.opacity = '0.7';

                    setTimeout(() => {
                        searchBtn.innerText = originalText;
                        searchBtn.style.opacity = '1';
                    }, 800);
                });
            }

            // --- Hamburger Menu Logic ---
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('nav-links');

            if (hamburger) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });
            }

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // --- Scroll Reveal Animation Logic ---
            const revealElements = document.querySelectorAll('.reveal');
            const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

            const revealOnScroll = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, revealOptions);

            revealElements.forEach(el => revealOnScroll.observe(el));

            // --- Navbar Shadow on Scroll ---
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                } else {
                    navbar.style.boxShadow = 'none';
                }
            });
        });