// --- Premium Custom Cursor ---
const initCursor = () => {
    if ('ontouchstart' in window) return; // Disable on touch devices
    
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    
    if (!cursor || !dot) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
    });
    
    // Add hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .chat-option-btn, .glass-card');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });
};

// --- Canvas Interactive Particle Network ---
const initParticles = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        radius: 120
    };
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Get colors based on theme
    const getParticleColor = () => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        return isLight ? 'rgba(9, 9, 11, 0.08)' : 'rgba(255, 255, 255, 0.07)';
    };
    
    const getLineColor = (alpha) => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        return isLight ? `rgba(37, 99, 235, ${alpha * 0.15})` : `rgba(168, 85, 247, ${alpha * 0.18})`;
    };
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.baseSize = this.size;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary collision
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            
            // Interact with mouse
            if (mouse.x !== null && mouse.y !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = dx / distance;
                    let directionY = dy / distance;
                    
                    this.x += directionX * force * 2;
                    this.y += directionY * force * 2;
                    this.size = this.baseSize * (1 + force * 1.5);
                } else {
                    if (this.size > this.baseSize) {
                        this.size -= 0.1;
                    }
                }
            } else {
                if (this.size > this.baseSize) {
                    this.size -= 0.1;
                }
            }
        }
        
        draw() {
            ctx.fillStyle = getParticleColor();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    const init = () => {
        particlesArray = [];
        // Particle count based on screen size
        const count = Math.floor((canvas.width * canvas.height) / 10000);
        for (let i = 0; i < Math.min(count, 120); i++) {
            particlesArray.push(new Particle());
        }
    };
    
    const connectParticles = () => {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 130) {
                    let alpha = (130 - distance) / 130;
                    ctx.strokeStyle = getLineColor(alpha);
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    };
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    // Reinitialize on theme change to update colors instantly
    window.addEventListener('themeChanged', () => {
        init();
    });
};

// --- Theme Management ---
const initTheme = () => {
    const themeBtn = document.querySelector('.theme-toggle-btn');
    if (!themeBtn) return;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Dispatch custom event to notify other modules
        window.dispatchEvent(new Event('themeChanged'));
    });
};

// --- Interactive Card 3D Tilt Effect ---
const initCardTilt = () => {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element
            const y = e.clientY - rect.top;  // y position within element
            
            // Set custom properties for hover glows
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Apply slight 3D rotate
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 12; // vertical rotate amount
            const rotateY = (x - centerX) / 12; // horizontal rotate amount
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
};

// --- Scroll Reveal Animations ---
const initScrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 120;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    revealOnScroll();
};

// --- Stats Counter Animation ---
const initStatsCounter = () => {
    const statsContainer = document.querySelector('.stats-grid');
    if (!statsContainer) return;
    
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 40; // speed adjustments
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            updateCounter();
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsContainer);
};

// --- AI Chat Assistant (Tanuj's AI Twin) ---
const initAIAssistant = () => {
    const widget = document.getElementById('ai-widget');
    const toggleBtn = document.querySelector('.ai-toggle-btn');
    const sendBtn = document.querySelector('.ai-chat-send');
    const chatInput = document.querySelector('.ai-chat-input');
    const chatMessages = document.querySelector('.ai-chat-messages');
    const optionBtns = document.querySelectorAll('.chat-option-btn');
    
    if (!widget || !toggleBtn) return;
    
    // Toggle Chat Window
    toggleBtn.addEventListener('click', () => {
        widget.classList.toggle('open');
        if (widget.classList.contains('open')) {
            chatInput.focus();
            // Scroll to bottom
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 300);
        }
    });
    
    // Dialog Database
    const responses = {
        greeting: "Hi there! I'm Tanuj's AI Twin. Ask me anything about his experience, projects, skills, backend work, or availability! How can I help you today?",
        skills: "Tanuj specializes in building agentic systems. His tech stack includes:\n\n• **AI & Agents**: LangChain, LangGraph, CrewAI, RAG, LangSmith, Prompt Engineering, MCP\n• **Backend**: FastAPI, Django, Python, REST APIs\n• **Machine Learning**: PyTorch, Scikit-learn, Pandas, NumPy\n• **DevOps & DBs**: Docker, Redis, Kubernetes, MongoDB, MySQL, Vector DBs",
        projects: "Here are some of Tanuj's featured projects:\n\n1. **AI Research Agent**: A LangGraph multi-agent system that plans, searches, critiques, and writes research papers.\n2. **WhatsApp Lead Qualifier**: A FastAPI automation qualifying leads and logs customer parameters.\n3. **RAG QA System**: Documents parser and question-answering with vector retrieval.\n4. **Semantic Recommendation**: Intent mapping recommender system.",
        experience: "Tanuj has professional hands-on industry experience building AI systems:\n\n1. **Saral One** (AI Automation & Chatbot Intern | May 2026 - Present):\nBuilding a WhatsApp AI Lead Qualification System to automate engagement workflows. Developing conversational logic to capture, score, and route leads.\n\n2. **Metry AI** (AI Developer Intern | Dec 2025 - Mar 2026):\nDesigned appointment booking chatbots for salon and beauty SMBs using FastAPI and LangGraph. Built structured multi-step state management flows.",
        availability: "Tanuj is currently a third-year CS student and is actively looking for:\n\n• **AI Engineering Internships** (Fall 2026/Winter 2027)\n• **Freelance Projects** (AI Agent design, automation pipelines, APIs)\n• **Collaboration** on open-source AI projects.\n\n📧 worktanujrajput@gmail.com",
        default: "That's an interesting question! While I'm just a twin simulator, Tanuj can answer that in detail. You can shoot him an email at **worktanujrajput@gmail.com** or connect on LinkedIn!"
    };
    
    // Simulate Typing & Response
    const addMessage = (text, sender) => {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-message', sender);
        bubble.innerHTML = text.replace(/\n/g, '<br>');
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    
    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.classList.add('chat-message', 'system', 'typing-indicator');
        indicator.innerHTML = `
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    };
    
    const generateAgentResponse = (userInput) => {
        const indicator = showTypingIndicator();
        const cleanedInput = userInput.toLowerCase();
        
        setTimeout(() => {
            // Remove indicator
            indicator.remove();
            
            let responseText = responses.default;
            if (cleanedInput.includes('skill') || cleanedInput.includes('tech') || cleanedInput.includes('stack')) {
                responseText = responses.skills;
            } else if (cleanedInput.includes('experience') || cleanedInput.includes('job') || cleanedInput.includes('intern') || cleanedInput.includes('metry') || cleanedInput.includes('saral')) {
                responseText = responses.experience;
            } else if (cleanedInput.includes('project') || cleanedInput.includes('work') || cleanedInput.includes('build')) {
                responseText = responses.projects;
            } else if (cleanedInput.includes('avail') || cleanedInput.includes('contact') || cleanedInput.includes('hire')) {
                responseText = responses.availability;
            } else if (cleanedInput.includes('hello') || cleanedInput.includes('hi') || cleanedInput.includes('hey')) {
                responseText = responses.greeting;
            }
            
            addMessage(responseText, 'system');
        }, 1200); // Simulate natural latency
    };
    
    // Option buttons trigger
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            addMessage(question, 'user');
            generateAgentResponse(question);
        });
    });
    
    // User manual inputs
    const handleSend = () => {
        const text = chatInput.value.trim();
        if (!text) return;
        
        addMessage(text, 'user');
        chatInput.value = '';
        generateAgentResponse(text);
    };
    
    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
    
    // Initial welcome message
    setTimeout(() => {
        addMessage(responses.greeting, 'system');
    }, 2000);
};

// --- Mobile Navigation Menu ---
const initMobileMenu = () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (!mobileBtn || !navLinks) return;
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        mobileBtn.innerHTML = navLinks.classList.contains('open') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
};

// --- Main Application Lifecycle ---
document.addEventListener('DOMContentLoaded', () => {
    // Hide Loading Screen
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1800); // boot sequences
    }
    
    // Initialization Subroutines
    initTheme();
    initCursor();
    initParticles();
    initCardTilt();
    initScrollReveal();
    initStatsCounter();
    initAIAssistant();
    initMobileMenu();
});
