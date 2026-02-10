// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===================================
// Navigation Functionality
// ===================================
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===================================
// Hero Stats Counter Animation
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 16);
}

// Trigger counter animation when hero section is in view
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// Testimonials Slider
// ===================================
let currentTestimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const sliderDotsContainer = document.getElementById('sliderDots');

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    sliderDotsContainer.appendChild(dot);
});

const sliderDots = document.querySelectorAll('.slider-dot');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
    
    sliderDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function changeTestimonial(direction) {
    currentTestimonialIndex += direction;
    
    if (currentTestimonialIndex >= testimonialCards.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonialCards.length - 1;
    }
    
    showTestimonial(currentTestimonialIndex);
}

function goToTestimonial(index) {
    currentTestimonialIndex = index;
    showTestimonial(currentTestimonialIndex);
}

// Auto-play testimonials
let testimonialInterval = setInterval(() => {
    changeTestimonial(1);
}, 5000);

// Pause auto-play on hover
const testimonialsSlider = document.getElementById('testimonialsSlider');
testimonialsSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialsSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        changeTestimonial(1);
    }, 5000);
});

// ===================================
// FAQ Accordion
// ===================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Contact Form Data:', data);
    });
}

// ===================================
// Consultation Modal
// ===================================
const consultationModal = document.getElementById('consultationModal');
const consultationForm = document.getElementById('consultationForm');

function openConsultationModal() {
    consultationModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeConsultationModal() {
    consultationModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
consultationModal.addEventListener('click', (e) => {
    if (e.target === consultationModal) {
        closeConsultationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && consultationModal.classList.contains('show')) {
        closeConsultationModal();
    }
});

// Handle consultation form submission
if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(consultationForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        showNotification('تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة.', 'success');
        
        // Close modal and reset form
        closeConsultationModal();
        consultationForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Consultation Form Data:', data);
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#28a745' : '#dc3545',
        color: '#fff',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease',
        fontSize: '16px',
        fontWeight: '500'
    });
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===================================
// Newsletter Form
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        showNotification('تم الاشتراك بنجاح في النشرة البريدية!', 'success');
        newsletterForm.reset();
        
        console.log('Newsletter Email:', email);
    });
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Lazy Loading Images
// ===================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Practice Area Cards Animation
// ===================================
const practiceCards = document.querySelectorAll('.practice-card');

practiceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Smooth Reveal on Scroll
// ===================================
const revealSections = document.querySelectorAll('section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(section);
});

// ===================================
// Prevent Form Resubmission
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===================================
// Add Loading State to Buttons
// ===================================
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function(e) {
        const form = this.closest('form');
        if (form && form.checkValidity()) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            this.disabled = true;
            
            // Reset after 2 seconds (in real app, reset after server response)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// ===================================
// Dynamic Current Year in Footer
// ===================================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ===================================
// Improved Form Validation
// ===================================
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateInput(input);
            }
        });
    });
});

function validateInput(input) {
    if (input.checkValidity()) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        input.style.borderColor = '#28a745';
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        input.style.borderColor = '#dc3545';
    }
}

// ===================================
// Phone Number Formatting (Saudi Arabia)
// ===================================
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format: +966 50 123 4567
        if (value.startsWith('966')) {
            value = value.substring(3);
        } else if (value.startsWith('0')) {
            value = value.substring(1);
        }
        
        if (value.length > 0) {
            if (value.length <= 2) {
                e.target.value = value;
            } else if (value.length <= 5) {
                e.target.value = `${value.slice(0, 2)} ${value.slice(2)}`;
            } else {
                e.target.value = `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 9)}`;
            }
        }
    });
});

// ===================================
// Disable Right Click on Images (Optional)
// ===================================
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showNotification('حقوق الصور محفوظة', 'error');
    });
});
*/

// ===================================
// Print Page Functionality
// ===================================
function printPage() {
    window.print();
}

// ===================================
// Copy to Clipboard
// ===================================
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('تم النسخ بنجاح!', 'success');
    } catch (err) {
        console.error('Failed to copy:', err);
        showNotification('فشل النسخ', 'error');
    }
}

// ===================================
// Back to Previous Page
// ===================================
function goBack() {
    window.history.back();
}

// ===================================
// Check Internet Connection
// ===================================
window.addEventListener('online', () => {
    showNotification('تم الاتصال بالإنترنت', 'success');
});

window.addEventListener('offline', () => {
    showNotification('لا يوجد اتصال بالإنترنت', 'error');
});

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const optimizedScroll = debounce(() => {
    // Your scroll-based functions here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// Console Welcome Message
// ===================================
console.log('%c مرحباً بك في موقع المحامية نوف الثبيتي ', 'background: #C9A961; color: #fff; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c للتواصل: info@lawfirm.com ', 'background: #1a1a2e; color: #fff; font-size: 14px; padding: 5px;');

// ===================================
// Service Worker Registration (PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you create a service worker file
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
        */
    });
}

// ===================================
// Initialize Everything on Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ الموقع جاهز للاستخدام');
    
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Blog Article Modal
// ===================================
function openBlogArticle(event, articleId) {
    event.preventDefault();
    
    // Get article content
    const articleContent = document.getElementById(articleId);
    if (!articleContent) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'blog-modal';
    modal.id = 'blogModal';
    
    // Create modal content container
    const modalContent = document.createElement('div');
    modalContent.className = 'blog-modal-content';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'blog-modal-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.onclick = closeBlogArticle;
    
    // Clone article content
    const articleClone = articleContent.cloneNode(true);
    articleClone.style.display = 'block';
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(articleClone);
    modal.appendChild(modalContent);
    
    // Add to body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBlogArticle();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function closeBlogArticle() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeBlogArticle();
    }
}

// Add fadeOut animation to CSS (if not already added)
if (!document.querySelector('style[data-blog-modal]')) {
    const style = document.createElement('style');
    style.setAttribute('data-blog-modal', 'true');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// Export functions for global use
// ===================================
window.changeTestimonial = changeTestimonial;
window.openConsultationModal = openConsultationModal;
window.closeConsultationModal = closeConsultationModal;
window.showNotification = showNotification;
window.copyToClipboard = copyToClipboard;
window.goBack = goBack;
window.printPage = printPage;
window.openBlogArticle = openBlogArticle;
window.closeBlogArticle = closeBlogArticle;
