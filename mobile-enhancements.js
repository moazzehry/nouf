// ===================================
// تحسينات إضافية لتجربة الموبايل
// ===================================

// منع التمرير عند فتح القائمة على الموبايل
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // منع التمرير عند فتح القائمة
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // إغلاق القائمة عند النقر على أي رابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
});

// تحسين التمرير السلس على الموبايل
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// تحسين أداء الأزرار العائمة على الموبايل
let lastScroll = 0;
const whatsappFloat = document.querySelector('.whatsapp-float');
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // إظهار/إخفاء زر WhatsApp بناءً على اتجاه التمرير
    if (window.innerWidth <= 576) {
        if (currentScroll > lastScroll && currentScroll > 300) {
            // التمرير للأسفل
            if (whatsappFloat) {
                whatsappFloat.style.transform = 'translateY(100px)';
                whatsappFloat.style.opacity = '0';
            }
        } else {
            // التمرير للأعلى
            if (whatsappFloat) {
                whatsappFloat.style.transform = 'translateY(0)';
                whatsappFloat.style.opacity = '1';
            }
        }
    }
    
    lastScroll = currentScroll;
});

// منع zoom عند النقر المزدوج على الموبايل
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// تحسين أداء carousel الشهادات على الموبايل
let touchStartX = 0;
let touchEndX = 0;

const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
    testimonialsSlider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    testimonialsSlider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next
            const nextBtn = document.querySelector('.slider-btn[onclick*="1"]');
            if (nextBtn) nextBtn.click();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous
            const prevBtn = document.querySelector('.slider-btn[onclick*="-1"]');
            if (prevBtn) prevBtn.click();
        }
    }
}

// تحسين تحميل الصور على الموبايل (Lazy Loading)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // مراقبة جميع الصور التي لديها data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// تحسين أداء Modal على الموبايل
function openBlogArticleMobile(event, articleId) {
    if (window.innerWidth <= 576) {
        event.preventDefault();
        const modal = document.getElementById('blogModal');
        if (modal) {
            // منع التمرير في الخلفية
            document.body.classList.add('modal-open');
            
            // التمرير إلى أعلى المودال
            setTimeout(() => {
                const modalContent = modal.querySelector('.blog-modal-content');
                if (modalContent) {
                    modalContent.scrollTop = 0;
                }
            }, 100);
        }
    }
}

// تحسين إغلاق Modal
function closeBlogArticleMobile() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        document.body.classList.remove('modal-open');
    }
}

// إضافة تأثير ripple للأزرار على الموبايل
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// إضافة ripple effect لجميع الأزرار
const buttons = document.querySelectorAll('.btn, button');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// CSS للـ ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn, button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// تحسين أداء النماذج على الموبايل
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // إخفاء لوحة المفاتيح عند الضغط على Enter
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
                e.preventDefault();
                input.blur();
            }
        });
        
        // تحسين التركيز على الحقول
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 576) {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
});

// اكتشاف نوع الجهاز
function detectDevice() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        document.body.classList.add('device-tablet');
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        document.body.classList.add('device-mobile');
    } else {
        document.body.classList.add('device-desktop');
    }
}

detectDevice();

// تحسين الأداء عند تغيير حجم النافذة
let resizeTimer;
window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// منع الرسوم المتحركة خلال تغيير الحجم
const resizeStyle = document.createElement('style');
resizeStyle.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(resizeStyle);

// تحسين التمرير للأقسام على الموبايل
if (window.innerWidth <= 576) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.scrollMarginTop = '70px';
    });
}

// إضافة مؤشر تحميل للصور
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s';
                this.style.opacity = '1';
            });
        }
    });
});

console.log('✅ تحسينات الموبايل تم تحميلها بنجاح');
