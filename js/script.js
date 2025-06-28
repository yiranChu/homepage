// Make header smaller when scrolling
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        document.querySelector('.header-content').style.padding = '0 20px';
        document.querySelector('.logo h1').style.fontSize = '1.2rem';
    } else {
        header.style.padding = '15px 0';
        document.querySelector('.header-content').style.padding = '15px 30px';
        document.querySelector('.logo h1').style.fontSize = '1.5rem';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                window.location.hash = targetId;
            }
        }
    });
});

// Highlight current section in navigation
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            document.querySelectorAll('#main-nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Mobile menu toggle (for smaller screens)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.style.display = 'none';
    
    const headerContent = document.querySelector('.header-content');
    headerContent.prepend(mobileMenuButton);
    
    function toggleMobileMenu() {
        const nav = document.getElementById('main-nav');
        nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
    }
    
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuButton.style.display = 'block';
            document.getElementById('main-nav').style.display = 'none';
        } else {
            mobileMenuButton.style.display = 'none';
            document.getElementById('main-nav').style.display = 'block';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});
