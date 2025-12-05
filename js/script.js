document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('header');
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 0);
        updateActiveLink();
    });

    
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.querySelector('i').classList.toggle('fa-bars');
        menuIcon.querySelector('i').classList.toggle('fa-times');
    });

    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.querySelector('i').classList.add('fa-bars');
                menuIcon.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    
    const typingElement = document.querySelector('.typing-animation');
    const originalText = typingElement ? typingElement.textContent : '';
    const nameAndTitle = originalText.trim().split('|');
    const name = nameAndTitle[0].trim();
    const title = nameAndTitle.length > 1 ? nameAndTitle[1].trim() : ''; 
    const fullText = name + ' | ' + title;
    let charIndex = 0;
    let isTypingName = true;
    const typingSpeed = 100;
    const pauseAfterName = 500;


    function typeEffect() {
        if (!typingElement) return;

        if (isTypingName) {
            
            if (charIndex < name.length) {
                typingElement.textContent = name.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeEffect, typingSpeed); 
            } else if (title) {
                
                isTypingName = false;
                charIndex = 0; 
                
                typingElement.textContent = name + ' | ';
                setTimeout(typeEffect, pauseAfterName);
            } else {
                
            }
        } else {
            
            if (charIndex < title.length) {
                const currentText = name + ' | ' + title.substring(0, charIndex + 1);
                typingElement.textContent = currentText;
                charIndex++;
                setTimeout(typeEffect, typingSpeed);
            } else {
                
            }
        }
    }
    
    
    typingElement ? (typingElement.textContent = '', setTimeout(typeEffect, 1000)) : null;


    
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    
    function applyTheme(isDark) {
        document.body.classList.toggle('light-mode', !isDark);
        themeToggle.querySelector('i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme === 'dark');
    } else {
        applyTheme(prefersDark.matches);
    }

    
    themeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('light-mode');
        applyTheme(!isDark);
    });


    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
            } else {
                
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    const skillBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.getElementById('skills');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress;
                    
                    const label = bar.parentElement.nextElementSibling;
                    const percentage = parseInt(progress.replace('%', ''));
                    let current = 0;
                    
                    const updateLabel = setInterval(() => {
                        if (current >= percentage) {
                            clearInterval(updateLabel);
                        } else {
                            current++;
                            label.textContent = `${current}%`;
                        }
                    }, 1000 / percentage); 
                });
                skillObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.5 }); 
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    const sections = document.querySelectorAll('main section');
    
    function updateActiveLink() {
        let current = '';
        const scrollY = window.scrollY + 150; 
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }


    document.getElementById('current-year').textContent = new Date().getFullYear();

    
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const name = document.getElementById('name') ? document.getElementById('name').value : 'Não Informado';
        const email = document.getElementById('email') ? document.getElementById('email').value : 'Não Informado';
        const message = document.getElementById('message') ? document.getElementById('message').value : 'Mensagem vazia.';

        
        const whatsappNumber = '5586994958300'; 

        
        let whatsappText = `Olá! Meu nome é ${name} e estou entrando em contato via seu portfólio.`;
        whatsappText += `\n\nMeu email é: ${email}`;
        whatsappText += `\n\nMensagem: ${message}`;

        
        const encodedText = encodeURIComponent(whatsappText);

        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        
        formMessage.textContent = 'Redirecionando para o WhatsApp...';
        formMessage.style.color = 'var(--main-color)'; 
        
        
        setTimeout(() => {
            
            window.open(whatsappUrl, '_blank');
            
            formMessage.textContent = 'Redirecionamento concluído. Verifique o WhatsApp!';
            contactForm.reset();
            formMessage.style.color = 'var(--main-color)'; 
        }, 1500);
    });

    
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    if (slider) {
        const totalCards = cards.length;

        function updateSlider() {
            
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateSlider();
        });

        
    }
});