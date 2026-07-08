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

        // --- Live Location Logic ---
const locationDisplay = document.getElementById('live-location');
const getLocationBtn = document.getElementById('getLocationBtn');

function getLiveLocation() {
    if (navigator.geolocation) {
        locationDisplay.innerText = "Locating...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // In a real app, you'd use a reverse geocoding API here 
                // to turn these coordinates into a readable city name.
                locationDisplay.innerText = `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`;
            },
            (error) => {
                locationDisplay.innerText = "Location access denied.";
            }
        );
    } else {
        locationDisplay.innerText = "Geolocation not supported.";
    }
}

// Initial call
getLiveLocation();

// Manual Refresh
if (getLocationBtn) {
    getLocationBtn.addEventListener('click', getLiveLocation);
}

// Function to initiate a request
window.requestDonation = function(donorName, btn) {
    // 1. Update the Button UI
    btn.innerText = 'Requested';
    btn.style.backgroundColor = '#6c757d'; // Muted grey
    btn.style.borderColor = '#6c757d';
    btn.style.color = 'white';
    btn.style.cursor = 'default';
    btn.disabled = true; // Prevents multiple clicks

    // 2. Logic to save to storage
    const newRequest = {
        id: Date.now(),
        donor: donorName,
        status: 'pending',
        timestamp: new Date().toLocaleDateString()
    };

    let requests = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
    requests.push(newRequest);
    localStorage.setItem('bloodRequests', JSON.stringify(requests));

    // 3. Custom Toast UI
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span style="color: var(--primary); font-size: 1.2rem;">✓</span>
        <div>
            <strong>Request Sent!</strong><br>
            <small>Status: Pending for ${donorName}</small>
        </div>
    `;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
};

// This function moves status from 'pending' to 'accepted'
window.acceptDonation = function(requestId) {
    let requests = JSON.parse(localStorage.getItem('bloodRequests'));
    
    const requestIndex = requests.findIndex(r => r.id === requestId);
    if (requestIndex !== -1) {
        requests[requestIndex].status = 'accepted';
        localStorage.setItem('bloodRequests', JSON.stringify(requests));
        renderAdminDashboard(); // Re-draw the table
    }
}

function renderAdminDashboard() {
    const container = document.getElementById('admin-table-body');
    const requests = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
    
    container.innerHTML = requests.map(r => `
        <tr>
            <td>${r.donor}</td>
            <td>${r.status}</td>
            <td>
                ${r.status === 'pending' ? 
                  `<button onclick="acceptDonation(${r.id})">Approve Donation</button>` : 
                  'Confirmed'}
            </td>
        </tr>
    `).join('');
}
function showView(viewId) {
            document.getElementById('login-view').style.display = 'none';
            document.getElementById('signup-view').style.display = 'none';
            document.getElementById('forgot-view').style.display = 'none';
            document.getElementById(viewId).style.display = 'block';
        }