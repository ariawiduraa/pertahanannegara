// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Function to scroll to specific section (called by CTA button)
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = [
        '.defense-content',
        '.participation-card',
        '.recommendation-item',
        '.diplomacy-content',
        '.stat-item'
    ];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const waves = document.querySelectorAll('.wave');
    const patternDots = document.querySelectorAll('.pattern-dot');
    
    if (hero && waves.length > 0) {
        const rate = scrolled * -0.5;
        waves.forEach((wave, index) => {
            const speed = 0.5 + (index * 0.1);
            wave.style.transform = `translateX(${rate * speed}px)`;
        });
    }
    
    if (patternDots.length > 0) {
        patternDots.forEach((dot, index) => {
            const speed = 0.3 + (index * 0.1);
            dot.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isNumber = target.includes(',');
        
        let finalNumber;
        if (isPercentage) {
            finalNumber = parseFloat(target);
        } else if (isNumber) {
            finalNumber = parseInt(target.replace(',', ''));
        } else {
            finalNumber = parseInt(target);
        }
        
        let current = 0;
        const increment = finalNumber / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                counter.textContent = Math.floor(current) + '%';
            } else if (isNumber) {
                counter.textContent = Math.floor(current).toLocaleString();
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Initialize counter animation when stats section comes into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.defense-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Smooth reveal animation for cards
function revealCards() {
    const cards = document.querySelectorAll('.participation-card, .recommendation-item');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize card animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.participation-card, .recommendation-item');
    
    // Set initial state
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Reveal cards when they come into view
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        cardObserver.observe(card);
    });
});

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // CTA Button hover effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // Card hover effects
    const cards = document.querySelectorAll('.participation-card, .recommendation-item, .stat-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Allow Enter key to trigger CTA button
    if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
        scrollToSection('politik-pertahanan');
    }
    
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #d32f2f, #ff5722);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add smooth reveal animation for sections
function revealSections() {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        section.classList.add('fade-in');
        sectionObserver.observe(section);
    });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', revealSections);

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize ripple effects
document.addEventListener('DOMContentLoaded', addRippleEffect);

// Add floating animation to world map elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.country, .arrow, .element');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize floating animations
document.addEventListener('DOMContentLoaded', addFloatingAnimation);

// Add interactive hover effects for diplomacy section
function addDiplomacyInteractions() {
    const arrows = document.querySelectorAll('.arrow');
    const countries = document.querySelectorAll('.country');
    
    arrows.forEach(arrow => {
        arrow.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.2)';
            this.style.opacity = '1';
        });
        
        arrow.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            this.style.opacity = '0.7';
        });
    });
    
    countries.forEach(country => {
        country.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = '#ff5722';
        });
        
        country.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#d32f2f';
        });
    });
}

// Initialize diplomacy interactions
document.addEventListener('DOMContentLoaded', addDiplomacyInteractions);

// FAQ Interactive functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Initialize FAQ functionality
document.addEventListener('DOMContentLoaded', initFAQ);

// Animate threat level bars
function animateThreatLevels() {
    const levelFills = document.querySelectorAll('.level-fill');
    
    levelFills.forEach(fill => {
        const level = fill.getAttribute('data-level');
        setTimeout(() => {
            fill.style.width = level + '%';
        }, 500);
    });
}

// Initialize threat level animation
document.addEventListener('DOMContentLoaded', function() {
    const threatObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateThreatLevels();
                threatObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const challengesSection = document.querySelector('.challenges-section');
    if (challengesSection) {
        threatObserver.observe(challengesSection);
    }
});

// Animate capacity meters
function animateCapacityMeters() {
    const meterFills = document.querySelectorAll('.meter-fill');
    
    meterFills.forEach(fill => {
        const percentage = fill.getAttribute('data-percentage');
        setTimeout(() => {
            fill.style.width = percentage + '%';
        }, 500);
    });
}

// Initialize capacity meter animation
document.addEventListener('DOMContentLoaded', function() {
    const meterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCapacityMeters();
                meterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const dashboardSection = document.querySelector('.dashboard-section');
    if (dashboardSection) {
        meterObserver.observe(dashboardSection);
    }
});

// Create interactive chart
function createBudgetChart() {
    const canvas = document.getElementById('budgetChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = {
        labels: ['Alutsista', 'Personel', 'Operasi'],
        datasets: [{
            data: [45, 35, 20],
            backgroundColor: ['#d32f2f', '#ff5722', '#4caf50'],
            borderWidth: 0
        }]
    };
    
    // Simple pie chart implementation
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    let currentAngle = 0;
    
    data.datasets[0].data.forEach((value, index) => {
        const sliceAngle = (value / 100) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = data.datasets[0].backgroundColor[index];
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
}

// Initialize chart when dashboard comes into view
document.addEventListener('DOMContentLoaded', function() {
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createBudgetChart();
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const dashboardSection = document.querySelector('.dashboard-section');
    if (dashboardSection) {
        chartObserver.observe(dashboardSection);
    }
});

// Add interactive hover effects for strategy phases
function addStrategyInteractions() {
    const strategyPhases = document.querySelectorAll('.strategy-phase');
    
    strategyPhases.forEach(phase => {
        phase.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        phase.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Initialize strategy interactions
document.addEventListener('DOMContentLoaded', addStrategyInteractions);

// Add particle animation to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        hero.appendChild(particle);
    }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Add scroll-triggered animations
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.challenge-card, .strategy-phase, .dashboard-card, .faq-item');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        animationObserver.observe(element);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Add interactive tooltips
function addTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', addTooltips);
