document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('header');
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const revealElements = document.querySelectorAll('.reveal');
    const themeToggle = document.getElementById('theme-toggle');
    const skillBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.getElementById('skills');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const typingElement = document.querySelector('.typing-animation');
    
    
    
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

    
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 0);
        updateActiveLink();
    });
    
    
    updateActiveLink(); 

    
  
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
    
    
   
    if (typingElement) {
        
        const originalText = typingElement.textContent.trim(); 
        let charIndex = 0;
        const typingSpeed = 100; 
        
        typingElement.textContent = ''; 

        function typeEffect() {
            if (charIndex < originalText.length) {
                typingElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, typingSpeed); 
            }
        }
        
        
        setTimeout(typeEffect, 1000);
    }
    
    
    
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

    
   
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
            } else {
               
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress'); 
                    
                    
                    bar.style.width = progress; 
                    
                    const label = bar.parentElement.nextElementSibling;
                    const percentage = parseInt(progress.replace('%', ''));
                    let current = 0;
                    
                    
                    const duration = 2000; 
                    const steps = percentage; 
                    const intervalTime = duration / steps;
                    
                    const updateLabel = setInterval(() => {
                        if (current >= percentage) {
                            clearInterval(updateLabel);
                            label.textContent = `${percentage}%`;
                            current++;
                            label.textContent = `${current}%`;
                        }
                    }, intervalTime); 
                });
                skillObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.5 }); 
    
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    
    document.getElementById('current-year').textContent = new Date().getFullYear();

    
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            
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
                formMessage.style.color = 'var(--main-color)';
                contactForm.reset();
                
            }, 1500);
        });
    }
    
    
});