        // LEGENDARY INTRO SYSTEM
        // ========================================
        
        (function() {
            'use strict';
            
            // Check if intro has been seen
            const hasSeenIntro = localStorage.getItem('legendaryIntroSeen');
            const introContainer = document.getElementById('legendaryIntro');
            const skipBtn = document.getElementById('skipIntroBtn');
            
            // Configuration
            const config = {
                introDuration: 13000, // 13 seconds
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                isLowEnd: navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4,
                prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            };
            
            // Adjust for mobile and reduced motion
            if (config.isMobile) {
                config.introDuration = 10000; // 10 seconds for mobile
                config.particleCount = 50;
            } else if (config.isLowEnd) {
                config.particleCount = 100; // Reduced for low-end devices
            } else {
                config.particleCount = 200;
            }
            
            if (config.prefersReducedMotion) {
                config.introDuration = 1000; // 1 second for reduced motion
            }
            
            // Skip intro if already seen (unless testing)
            if (hasSeenIntro && !window.location.hash.includes('intro')) {
                skipToPortfolio();
                return;
            }
            
            // Lock scroll during intro
            document.body.style.overflow = 'hidden';
            
            // Legendary Sound System
            class LegendarySoundSystem {
                constructor() {
                    this.context = null;
                    this.sounds = {};
                    this.isMuted = localStorage.getItem('introMuted') === 'true';
                    this.masterVolume = 0.3;
                    this.initialized = false;
                }
                
                init() {
                    if (this.initialized || !window.AudioContext && !window.webkitAudioContext) {
                        return;
                    }
                    
                    try {
                        this.context = new (window.AudioContext || window.webkitAudioContext)();
                        this.initialized = true;
                    } catch (e) {
                        console.log('Web Audio API not supported');
                    }
                }
                
                // Synthesize simple beep sounds
                play(type, time = 0) {
                    if (!this.initialized || this.isMuted || !this.context) return;
                    
                    try {
                        const oscillator = this.context.createOscillator();
                        const gainNode = this.context.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(this.context.destination);
                        
                        const now = this.context.currentTime + time / 1000;
                        
                        // Different sounds for different effects
                        switch(type) {
                            case 'bootBeep':
                                oscillator.frequency.value = 800;
                                gainNode.gain.setValueAtTime(this.masterVolume * 0.3, now);
                                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                                oscillator.start(now);
                                oscillator.stop(now + 0.1);
                                break;
                            case 'whoosh':
                                oscillator.frequency.setValueAtTime(400, now);
                                oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);
                                gainNode.gain.setValueAtTime(this.masterVolume * 0.2, now);
                                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                                oscillator.start(now);
                                oscillator.stop(now + 0.3);
                                break;
                            case 'letterForm':
                                oscillator.frequency.value = 600;
                                gainNode.gain.setValueAtTime(this.masterVolume * 0.15, now);
                                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                                oscillator.start(now);
                                oscillator.stop(now + 0.15);
                                break;
                            case 'bassDrop':
                                oscillator.frequency.value = 60;
                                oscillator.type = 'sawtooth';
                                gainNode.gain.setValueAtTime(this.masterVolume * 0.5, now);
                                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                                oscillator.start(now);
                                oscillator.stop(now + 0.5);
                                break;
                            case 'portalCharge':
                                oscillator.frequency.setValueAtTime(100, now);
                                oscillator.frequency.exponentialRampToValueAtTime(500, now + 1);
                                gainNode.gain.setValueAtTime(this.masterVolume * 0.3, now);
                                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1);
                                oscillator.start(now);
                                oscillator.stop(now + 1);
                                break;
                            case 'successChime':
                                oscillator.frequency.value = 1200;
                                gainNode.gain.setValueAtTime(this.masterVolume * 0.2, now);
                                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                                oscillator.start(now);
                                oscillator.stop(now + 0.2);
                                break;
                        }
                    } catch (e) {
                        console.log('Sound playback error:', e);
                    }
                }
            }
            
            const soundSystem = new LegendarySoundSystem();
            
            // Particle System for Intro
            class IntroParticle {
                constructor(canvas, phase = 1) {
                    this.canvas = canvas;
                    this.phase = phase;
                    this.reset();
                }
                
                reset() {
                    const centerX = this.canvas.width / 2;
                    const centerY = this.canvas.height / 2;
                    
                    if (this.phase === 1) {
                        // Spiral converging particles
                        const angle = Math.random() * Math.PI * 2;
                        const distance = Math.random() * 500 + 300;
                        this.x = centerX + Math.cos(angle) * distance;
                        this.y = centerY + Math.sin(angle) * distance;
                        this.targetX = centerX;
                        this.targetY = centerY;
                        this.spiralSpeed = 0.02;
                        this.angle = angle;
                    } else if (this.phase === 3) {
                        // Orbiting particles
                        this.angle = Math.random() * Math.PI * 2;
                        this.distance = 150 + Math.random() * 100;
                        this.orbitSpeed = (Math.random() - 0.5) * 0.02;
                        this.x = centerX + Math.cos(this.angle) * this.distance;
                        this.y = centerY + Math.sin(this.angle) * this.distance;
                    }
                    
                    this.size = Math.random() * 4 + 2;
                    this.colors = ['#00f3ff', '#ff006e', '#ff0080', '#8b00ff'];
                    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
                    this.life = 1;
                    this.decay = Math.random() * 0.005 + 0.002;
                }
                
                update() {
                    const centerX = this.canvas.width / 2;
                    const centerY = this.canvas.height / 2;
                    
                    if (this.phase === 1) {
                        // Spiral toward center
                        const dx = this.targetX - this.x;
                        const dy = this.targetY - this.y;
                        this.angle += this.spiralSpeed;
                        this.x += dx * 0.02 + Math.cos(this.angle) * 2;
                        this.y += dy * 0.02 + Math.sin(this.angle) * 2;
                        
                        // Reset if reached center
                        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
                            this.life -= this.decay * 3;
                        }
                    } else if (this.phase === 3) {
                        // Orbit around center
                        this.angle += this.orbitSpeed;
                        this.x = centerX + Math.cos(this.angle) * this.distance;
                        this.y = centerY + Math.sin(this.angle) * this.distance;
                    }
                    
                    this.life -= this.decay;
                    if (this.life <= 0) {
                        this.reset();
                    }
                }
                
                draw(ctx) {
                    ctx.save();
                    ctx.globalAlpha = this.life;
                    ctx.fillStyle = this.color;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }
            
            // Matrix Rain Effect
            class MatrixRain {
                constructor(canvas) {
                    this.canvas = canvas;
                    this.ctx = canvas.getContext('2d');
                    this.columns = Math.floor(canvas.width / 20);
                    this.drops = [];
                    this.glyphs = '▓░▒█▄▀◆●';
                    
                    for (let i = 0; i < this.columns; i++) {
                        this.drops.push(Math.random() * -100);
                    }
                }
                
                draw() {
                    this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
                    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                    
                    this.ctx.fillStyle = '#00f3ff';
                    this.ctx.font = '15px monospace';
                    
                    for (let i = 0; i < this.drops.length; i++) {
                        const text = this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
                        const x = i * 20;
                        const y = this.drops[i] * 20;
                        
                        this.ctx.globalAlpha = 0.8;
                        this.ctx.fillText(text, x, y);
                        
                        this.drops[i]++;
                        
                        if (y > this.canvas.height && Math.random() > 0.95) {
                            this.drops[i] = 0;
                        }
                    }
                }
            }
            
            // Initialize canvases
            const introCanvas = document.getElementById('intro-canvas');
            const matrixCanvas = document.getElementById('matrix-rain');
            const ctx = introCanvas.getContext('2d');
            
            function resizeCanvases() {
                introCanvas.width = window.innerWidth;
                introCanvas.height = window.innerHeight;
                matrixCanvas.width = window.innerWidth;
                matrixCanvas.height = window.innerHeight;
            }
            resizeCanvases();
            window.addEventListener('resize', resizeCanvases);
            
            // Initialize systems
            const particles = [];
            const matrixRain = new MatrixRain(matrixCanvas);
            let currentPhase = 1;
            let particlePhase = 1;
            
            // Create initial particles
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(new IntroParticle(introCanvas, particlePhase));
            }
            
            // Animation loop for particles and matrix
            function animateIntro() {
                // Clear canvas
                ctx.clearRect(0, 0, introCanvas.width, introCanvas.height);
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.update();
                    particle.draw(ctx);
                });
                
                // Draw matrix rain
                matrixRain.draw();
                
                requestAnimationFrame(animateIntro);
            }
            animateIntro();
            
            // Intro Timeline
            const timeline = [
                // Phase 1: System Awakening (0-3s)
                { time: 0, action: () => {
                    soundSystem.init();
                    soundSystem.play('bootBeep', 500);
                    particlePhase = 1;
                    particles.forEach(p => p.phase = 1);
                }},
                { time: 1000, action: () => soundSystem.play('whoosh') },
                { time: 2000, action: () => soundSystem.play('whoosh') },
                
                // Phase 2: Identity Formation (3-6s)
                { time: 3000, action: () => {
                    // Show skip button
                    skipBtn.classList.add('show');
                    
                    // Hide phase 1 elements
                    document.getElementById('faviconCenter').style.display = 'none';
                    document.getElementById('text1').style.display = 'none';
                    document.getElementById('text2').style.display = 'none';
                    document.getElementById('text3').style.display = 'none';
                    
                    // Materialize PRO SAMKING
                    const proSamking = document.getElementById('proSamking');
                    proSamking.style.opacity = '1';
                    const letters = proSamking.querySelectorAll('span');
                    letters.forEach((letter, index) => {
                        setTimeout(() => {
                            letter.classList.add('materialize');
                            soundSystem.play('letterForm');
                            setTimeout(() => {
                                letter.style.animation = 'letterPulse 1s ease-in-out';
                            }, 500);
                        }, index * 100);
                    });
                    
                    // Change background color
                    introContainer.style.background = 'linear-gradient(135deg, #1a0a2e, #0f3057)';
                    introContainer.style.transition = 'background 3s';
                }},
                
                // Phase 3: METHEELEGEND Reveal (6-9s)
                { time: 6000, action: () => {
                    soundSystem.play('bassDrop');
                    
                    // Hide PRO SAMKING
                    document.getElementById('proSamking').style.opacity = '0';
                    document.getElementById('proSamking').style.transition = 'opacity 0.5s';
                    
                    // Show avatar and activate it
                    const avatar = document.getElementById('legendaryAvatar');
                    avatar.classList.add('active');
                    avatar.style.opacity = '1';
                    
                    // Show METHEELEGEND text
                    const metheelegend = document.getElementById('metheelegendText');
                    metheelegend.classList.add('active');
                    
                    // Activate nebula background
                    const nebula = document.getElementById('nebulaBg');
                    nebula.classList.add('active');
                    
                    // Update particles to orbit
                    particlePhase = 3;
                    particles.forEach(p => {
                        p.phase = 3;
                        p.reset();
                    });
                }},
                
                // Phase 4: Portal Activation (9-11s)
                { time: 9000, action: () => {
                    soundSystem.play('portalCharge');
                    
                    // Hide avatar and text
                    document.getElementById('legendaryAvatar').style.opacity = '0';
                    document.getElementById('metheelegendText').style.opacity = '0';
                    document.getElementById('nebulaBg').style.opacity = '0';
                    
                    // Show portal
                    const portal = document.getElementById('hexagonalPortal');
                    portal.classList.add('active');
                    
                    // Reality tear effect
                    const tear = document.getElementById('realityTear');
                    tear.classList.add('active');
                }},
                
                // Phase 5: Dimensional Entry (11-13s)
                { time: 11000, action: () => {
                    // Show ENTER THE LEGEND
                    const enterText = document.getElementById('enterLegendText');
                    enterText.classList.add('active');
                }},
                
                { time: 12000, action: () => {
                    // Begin transition
                    introContainer.style.opacity = '0';
                }},
                
                { time: 13000, action: () => {
                    soundSystem.play('successChime');
                    completeIntro();
                }}
            ];
            
            // Execute timeline
            timeline.forEach(event => {
                setTimeout(event.action, event.time);
            });
            
            // Skip button functionality
            skipBtn.addEventListener('click', () => {
                soundSystem.play('successChime');
                skipToPortfolio();
            });
            
            function skipToPortfolio() {
                introContainer.classList.add('hidden');
                skipBtn.style.display = 'none';
                document.body.style.overflow = '';
                localStorage.setItem('legendaryIntroSeen', 'true');
                
                setTimeout(() => {
                    introContainer.classList.add('complete');
                }, 1000);
            }
            
            function completeIntro() {
                skipToPortfolio();
            }
            
            // Keyboard accessibility for skip button
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                    if (skipBtn.classList.contains('show')) {
                        skipToPortfolio();
                    }
                }
            });
            
        })();
        
        // ========================================
        // PORTFOLIO ANIMATIONS (Original Code)
        // ========================================
        
        // Custom Cursor
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const diffX = mouseX - cursorX;
            const diffY = mouseY - cursorY;
            cursorX += diffX * 0.1;
            cursorY += diffY * 0.1;

            const diffDotX = mouseX - dotX;
            const diffDotY = mouseY - dotY;
            dotX += diffDotX * 0.2;
            dotY += diffDotY * 0.2;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .neon-btn, .project-card, .skill-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.borderColor = 'var(--neon-pink)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--neon-blue)';
            });
        });

        // Scroll Progress
        window.addEventListener('scroll', () => {
            const scrollProgress = document.querySelector('.scroll-progress');
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (window.pageYOffset / scrollTotal) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        });

        // Navigation Active State
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Scroll Reveal Animation
        const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
        
        const elementInView = (el, percentageScroll = 100) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= 
                (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
            );
        };

        const displayScrollElement = (element) => {
            element.classList.add('active');
        };

        const handleScrollAnimation = () => {
            scrollRevealElements.forEach((el) => {
                if (elementInView(el, 80)) {
                    displayScrollElement(el);
                }
            });
        };

        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation(); // Initial check

        // Stats Counter Animation
        const statNumbers = document.querySelectorAll('.stat-number');
        let hasAnimated = false;

        const animateCounters = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        stat.textContent = target + '+';
                    }
                };
                updateCounter();
            });
        };

        window.addEventListener('scroll', () => {
            const aboutSection = document.querySelector('#about');
            if (!hasAnimated && elementInView(aboutSection, 70)) {
                animateCounters();
                hasAnimated = true;
            }
        });

        // Back to Top Button
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Ripple Effect on Buttons
        document.querySelectorAll('.neon-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Enhanced Particle System
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = this.randomColor();
            }

            randomColor() {
                const colors = ['#00f3ff', '#ff006e', '#8b00ff', '#39ff14', '#ff6600'];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 60;

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let mouseParticleX = 0;
        let mouseParticleY = 0;

        canvas.addEventListener('mousemove', (e) => {
            mouseParticleX = e.clientX;
            mouseParticleY = e.clientY;
        });

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                const dxMouse = particles[i].x - mouseParticleX;
                const dyMouse = particles[i].y - mouseParticleY;
                const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distanceMouse < 150) {
                    ctx.strokeStyle = `rgba(255, 0, 110, ${1 - distanceMouse / 150})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseParticleX, mouseParticleY);
                    ctx.stroke();
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        animateParticles();

        // Form Submission Handler
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.style.background = 'linear-gradient(90deg, var(--neon-green), var(--cyber-purple))';
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = 'linear-gradient(90deg, var(--neon-green), var(--neon-green))';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(90deg, var(--neon-blue), var(--neon-pink))';
                    e.target.reset();
                }, 2000);
            }, 1500);
        });

        // Add glitch effect randomly to title
        const heroTitle = document.querySelector('.hero-title');
        setInterval(() => {
            if (Math.random() > 0.95) {
                heroTitle.style.animation = 'none';
                setTimeout(() => {
                    heroTitle.style.animation = 'gradientFlow 5s linear infinite, glitch 3s infinite';
                }, 10);
            }
        }, 3000);

        // ========================================
        // SYNTHESIZED MUSIC ENGINE (FALLBACK)
        // ========================================
        class SynthMusicEngine {
            constructor() {
                this.ctx = null;
                this.masterGain = null;
                this.isPlaying = false;
                this.INTRO_DURATION = 13000; // Default intro duration
                this.NOTE_INTERVAL = 325; // ms between notes
            }
            
            init() {
                if (!this.ctx) {
                    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                    this.masterGain = this.ctx.createGain();
                    this.masterGain.gain.value = 0.3;
                    this.masterGain.connect(this.ctx.destination);
                }
            }
            
            playIntro(introDuration = this.INTRO_DURATION) {
                this.init();
                // Simple ascending arpeggio
                const notes = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
                let noteIndex = 0;
                const maxNotes = Math.floor(introDuration / this.NOTE_INTERVAL);
                
                const playNote = () => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    
                    osc.frequency.value = notes[noteIndex % notes.length];
                    osc.type = 'sine';
                    
                    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
                    
                    osc.connect(gain);
                    gain.connect(this.masterGain);
                    
                    osc.start();
                    osc.stop(this.ctx.currentTime + 0.5);
                    
                    noteIndex++;
                    if (noteIndex < maxNotes) {
                        setTimeout(playNote, this.NOTE_INTERVAL);
                    }
                };
                
                playNote();
            }
            
            playBackgroundLoop() {
                this.init();
                if (this.isPlaying) return;
                this.isPlaying = true;
                
                // Epic synth pad progression
                const chords = [
                    [261.63, 329.63, 392.00], // C major
                    [349.23, 440.00, 523.25], // F major
                    [392.00, 493.88, 587.33], // G major
                    [220.00, 261.63, 329.63]  // A minor
                ];
                
                let chordIndex = 0;
                
                const playChord = () => {
                    if (!this.isPlaying) return;
                    
                    const chord = chords[chordIndex];
                    
                    chord.forEach((freq, i) => {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        
                        osc.type = 'sine';
                        osc.frequency.value = freq;
                        
                        gain.gain.setValueAtTime(0, this.ctx.currentTime);
                        gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.5);
                        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 3.5);
                        
                        osc.connect(gain);
                        gain.connect(this.masterGain);
                        
                        osc.start(this.ctx.currentTime);
                        osc.stop(this.ctx.currentTime + 4);
                    });
                    
                    chordIndex = (chordIndex + 1) % chords.length;
                    setTimeout(playChord, 4000); // Next chord in 4 seconds
                };
                
                playChord();
            }
            
            stop() {
                this.isPlaying = false;
            }
        }

        // ========================================
        // LEGENDARY MUSIC SYSTEM
        // ========================================
        class LegendaryMusicSystem {
            constructor() {
                // Configuration constants
                this.BACKGROUND_VOLUME = 0.3;
                this.CROSSFADE_START_TIME = 11000; // Start crossfade 2s before intro ends
                this.FADE_STEPS = 20;
                this.FADE_INTERVAL = 100; // ms
                
                this.introTrack = new Audio('sounds/deaf-kev-invincible-pt2.mp3');
                this.backgroundTrack = new Audio('sounds/elektronomia-sky-high.mp3');
                this.synthEngine = new SynthMusicEngine();
                this.isUsingFiles = true;
                
                // CRITICAL: Set loop BEFORE playing
                this.backgroundTrack.loop = true;
                this.backgroundTrack.volume = 0; // Start silent for crossfade
                
                this.isMuted = localStorage.getItem('musicMuted') === 'true';
                this.hasStarted = false;
                this.initialized = true;
                
                // Mute if previously muted
                if (this.isMuted) {
                    this.introTrack.muted = true;
                    this.backgroundTrack.muted = true;
                }
                
                // Error handling - switch to synthesized audio on error
                this.introTrack.addEventListener('error', () => {
                    console.log('Intro track not found. Using synthesized audio fallback.');
                    this.isUsingFiles = false;
                });
                
                this.backgroundTrack.addEventListener('error', () => {
                    console.log('Background track not found. Using synthesized audio fallback.');
                    this.isUsingFiles = false;
                });
            }
            
            async playIntro() {
                if (this.isMuted) return;
                
                try {
                    // Try playing audio files first
                    await this.introTrack.play();
                    
                    // CRITICAL: Preload background track
                    this.backgroundTrack.load();
                    
                    // CRITICAL: Start background music at 11 seconds (2s before intro ends)
                    setTimeout(() => {
                        this.startBackgroundMusic();
                    }, this.CROSSFADE_START_TIME);
                    
                } catch (error) {
                    console.warn('Music autoplay blocked or files missing:', error);
                    // Fallback to synthesized audio
                    this.isUsingFiles = false;
                    this.playSynthIntro();
                }
            }
            
            playSynthIntro() {
                if (!this.isMuted) {
                    this.synthEngine.playIntro(this.CROSSFADE_START_TIME + 2000); // Match intro duration
                    // Start background loop after intro
                    setTimeout(() => {
                        if (!this.isMuted) {
                            this.synthEngine.playBackgroundLoop();
                        }
                    }, this.CROSSFADE_START_TIME + 2000); // Use configurable duration
                }
            }
            
            startBackgroundMusic() {
                if (!this.isUsingFiles) {
                    // Already using synth engine
                    return;
                }
                
                // CRITICAL: Start background track playing (silent)
                this.backgroundTrack.play().then(() => {
                    // Crossfade over 2 seconds
                    this.crossfade();
                }).catch(error => {
                    console.warn('Background music failed to start, using synth fallback:', error);
                    this.isUsingFiles = false;
                    this.synthEngine.playBackgroundLoop();
                });
            }
            
            crossfade() {
                let step = 0;
                
                const fade = setInterval(() => {
                    step++;
                    const progress = step / this.FADE_STEPS;
                    
                    // Fade intro OUT
                    this.introTrack.volume = Math.max(0, 1 - progress);
                    
                    // Fade background IN to target volume
                    this.backgroundTrack.volume = Math.min(this.BACKGROUND_VOLUME, progress * this.BACKGROUND_VOLUME);
                    
                    if (step >= this.FADE_STEPS) {
                        clearInterval(fade);
                        this.introTrack.pause();
                        this.introTrack.currentTime = 0;
                    }
                }, this.FADE_INTERVAL);
            }
            
            showUnmutePrompt() {
                // Show overlay button to enable music if autoplay blocked
                const prompt = document.createElement('div');
                prompt.id = 'unmute-prompt';
                prompt.innerHTML = `
                    <button class="legendary-unmute-btn">
                        🔊 Click to Enable Epic Music
                    </button>
                `;
                prompt.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 100000;
                    background: var(--glass-bg);
                    padding: 15px 30px;
                    border-radius: 50px;
                    border: 2px solid var(--neon-blue);
                    box-shadow: 0 0 30px var(--neon-blue);
                `;
                
                document.body.appendChild(prompt);
                
                prompt.querySelector('button').addEventListener('click', () => {
                    this.playIntro();
                    prompt.remove();
                });
            }
            
            toggleMute() {
                this.isMuted = !this.isMuted;
                
                if (this.initialized) {
                    if (this.introTrack) this.introTrack.muted = this.isMuted;
                    if (this.backgroundTrack) this.backgroundTrack.muted = this.isMuted;
                    
                    // Handle synth engine
                    if (this.isMuted && this.synthEngine) {
                        this.synthEngine.stop();
                    } else if (!this.isMuted && !this.isUsingFiles && this.hasStarted && this.synthEngine) {
                        // Resume synth if it was muted
                        this.synthEngine.playBackgroundLoop();
                    }
                }
                
                // Also mute interactive sounds
                if (window.interactiveSounds) {
                    window.interactiveSounds.isMuted = this.isMuted;
                }
                
                localStorage.setItem('musicMuted', this.isMuted);
                return this.isMuted;
            }
        }
        
        // CRITICAL: Initialize and start music on page load
        const musicSystem = new LegendaryMusicSystem();
        
        // Wait for user interaction to avoid autoplay block
        document.body.addEventListener('click', () => {
            if (!musicSystem.hasStarted) {
                musicSystem.playIntro();
                musicSystem.hasStarted = true;
            }
        }, { once: true });

        // ========================================
        // SCROLL-FOLLOWING AVATAR SYSTEM
        // ========================================
        class ScrollFollowingAvatar {
            constructor() {
                // Configuration constants
                this.INTRO_DURATION = 13000; // Match intro system duration
                this.AVATAR_SIZE = 250; // Viewport offset for avatar
                this.SCROLL_SENSITIVITY = 10; // Scroll speed multiplier divisor
                this.SPRING_STRENGTH = 0.1;
                this.DAMPING = 0.8;
                
                this.avatar = document.getElementById('scrollAvatar');
                this.targetY = -300; // Start above viewport
                this.currentY = -300;
                this.velocity = 0;
                this.lastScrollY = 0;
                this.scrollVelocity = 0;
                this.isAnimating = false;
                this.animationFrame = null;
            }
            
            init() {
                // Wait for intro to complete before showing avatar
                setTimeout(() => this.dropAvatar(), this.INTRO_DURATION);
                
                // Track scroll
                window.addEventListener('scroll', () => this.onScroll(), { passive: true });
            }
            
            dropAvatar() {
                // Make avatar visible
                this.avatar.classList.add('active');
                
                // Fall from top with gravity
                const startY = -300;
                const landingY = 100; // Land 100px from top
                const duration = 1500;
                const startTime = Date.now();
                
                const drop = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease-in (gravity acceleration)
                    const easeProgress = progress * progress;
                    this.currentY = startY + (landingY - startY) * easeProgress;
                    
                    this.avatar.style.top = this.currentY + 'px';
                    
                    if (progress < 1) {
                        requestAnimationFrame(drop);
                    } else {
                        // Bounce on landing
                        this.bounce();
                        // Start animation loop for scroll following
                        this.isAnimating = true;
                        this.animate();
                    }
                };
                
                drop();
            }
            
            bounce() {
                this.avatar.classList.add('bouncing');
                setTimeout(() => {
                    this.avatar.classList.remove('bouncing');
                }, 600);
            }
            
            onScroll() {
                if (!this.isAnimating) return;
                
                const scrollY = window.scrollY;
                this.scrollVelocity = scrollY - this.lastScrollY;
                this.lastScrollY = scrollY;
                
                // Calculate target position (parallax effect)
                const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);
                const maxY = window.innerHeight - this.AVATAR_SIZE;
                this.targetY = 100 + scrollProgress * (maxY - 100);
                
                // If user scrolls fast, avatar moves faster
                const speedMultiplier = Math.abs(this.scrollVelocity) / this.SCROLL_SENSITIVITY;
                this.targetY += this.scrollVelocity * speedMultiplier;
                
                // Clamp to viewport
                this.targetY = Math.max(50, Math.min(maxY, this.targetY));
            }
            
            animate() {
                if (!this.isAnimating) return;
                
                // Smooth following with spring physics
                const diff = this.targetY - this.currentY;
                
                this.velocity += diff * this.SPRING_STRENGTH;
                this.velocity *= this.DAMPING;
                this.velocity += diff * spring;
                this.velocity *= damping;
                this.currentY += this.velocity;
                
                this.avatar.style.top = this.currentY + 'px';
                
                // Bounce when scroll stops (velocity near zero)
                if (Math.abs(this.velocity) > 0.5 && Math.abs(this.velocity) < 1 && Math.abs(diff) < 5) {
                    if (!this.avatar.classList.contains('bouncing')) {
                        this.bounce();
                    }
                }
                
                this.animationFrame = requestAnimationFrame(() => this.animate());
            }
        }

        // Initialize scroll-following avatar
        const scrollAvatar = new ScrollFollowingAvatar();
        scrollAvatar.init();

        // ========================================
        // INTERACTIVE SOUND SYSTEM
        // ========================================
        class InteractiveSoundSystem {
            constructor() {
                this.context = null;
                this.isMuted = localStorage.getItem('musicMuted') === 'true';
                this.masterVolume = 0.5;
                this.initialized = false;
                this.init();
            }
            
            init() {
                if (!window.AudioContext && !window.webkitAudioContext) {
                    return;
                }
                
                try {
                    this.context = new (window.AudioContext || window.webkitAudioContext)();
                    this.initialized = true;
                } catch (e) {
                    console.log('Web Audio API not supported');
                }
            }
            
            // Synthesize various sound effects
            play(type, delay = 0) {
                if (!this.initialized || this.isMuted || !this.context) return;
                
                try {
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.context.destination);
                    
                    const now = this.context.currentTime + delay / 1000;
                    
                    switch(type) {
                        case 'hover': // Navigation link hover
                            oscillator.frequency.value = 200;
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.2, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                            oscillator.start(now);
                            oscillator.stop(now + 0.05);
                            break;
                            
                        case 'click': // Navigation link click
                            oscillator.frequency.value = 400;
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.3, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                            oscillator.start(now);
                            oscillator.stop(now + 0.1);
                            break;
                            
                        case 'buttonHover': // Button hover - rising whoosh
                            oscillator.frequency.setValueAtTime(200, now);
                            oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.15);
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.25, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                            oscillator.start(now);
                            oscillator.stop(now + 0.15);
                            break;
                            
                        case 'buttonClick': // Button click - cymbal + synth
                            oscillator.frequency.value = 800;
                            oscillator.type = 'triangle';
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.4, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                            oscillator.start(now);
                            oscillator.stop(now + 0.1);
                            break;
                            
                        case 'cardHover': // Card hover - soft whoosh
                            oscillator.frequency.setValueAtTime(150, now);
                            oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.2);
                            oscillator.type = 'sine';
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.15, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                            oscillator.start(now);
                            oscillator.stop(now + 0.2);
                            break;
                            
                        case 'cardClick': // Card click - mechanical flip
                            oscillator.frequency.value = 300;
                            oscillator.type = 'square';
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.25, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                            oscillator.start(now);
                            oscillator.stop(now + 0.08);
                            break;
                            
                        case 'toggleOn': // Toggle on - switch up + beep
                            oscillator.frequency.value = 1000;
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.3, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                            oscillator.start(now);
                            oscillator.stop(now + 0.1);
                            break;
                            
                        case 'toggleOff': // Toggle off - switch down
                            oscillator.frequency.value = 500;
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.3, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                            oscillator.start(now);
                            oscillator.stop(now + 0.1);
                            break;
                            
                        case 'skipHover': // Skip button hover - power-up charge
                            oscillator.frequency.setValueAtTime(300, now);
                            oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.2);
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.25, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                            oscillator.start(now);
                            oscillator.stop(now + 0.2);
                            break;
                            
                        case 'skipClick': // Skip button click - success chime
                            oscillator.frequency.value = 1200;
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.3, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                            oscillator.start(now);
                            oscillator.stop(now + 0.2);
                            break;
                            
                        case 'legendaryActivate': // Legendary mode - epic power-up
                            oscillator.frequency.setValueAtTime(100, now);
                            oscillator.frequency.exponentialRampToValueAtTime(1000, now + 0.5);
                            oscillator.type = 'sawtooth';
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.5, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                            oscillator.start(now);
                            oscillator.stop(now + 0.5);
                            break;
                            
                        case 'rocketLaunch': // Back to top - rocket launch
                            oscillator.frequency.setValueAtTime(50, now);
                            oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.4);
                            oscillator.type = 'sawtooth';
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.35, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                            oscillator.start(now);
                            oscillator.stop(now + 0.4);
                            break;
                            
                        case 'notificationBeep': // Social icon hover
                            oscillator.frequency.value = 600;
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.2, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                            oscillator.start(now);
                            oscillator.stop(now + 0.05);
                            break;
                            
                        case 'pop': // Social icon click
                            oscillator.frequency.value = 1000;
                            oscillator.type = 'sine';
                            gainNode.gain.setValueAtTime(this.masterVolume * 0.3, now);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                            oscillator.start(now);
                            oscillator.stop(now + 0.05);
                            break;
                    }
                } catch (e) {
                    console.log('Sound playback error:', e);
                }
            }
        }
        
        // Initialize interactive sounds
        const interactiveSounds = new InteractiveSoundSystem();
        window.interactiveSounds = interactiveSounds;
        
        // Attach sounds to navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => interactiveSounds.play('hover'));
            link.addEventListener('click', () => interactiveSounds.play('click'));
        });
        
        // Attach sounds to buttons
        document.querySelectorAll('.neon-btn, .submit-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => interactiveSounds.play('buttonHover'));
            btn.addEventListener('click', () => interactiveSounds.play('buttonClick'));
        });
        
        // Attach sounds to cards
        document.querySelectorAll('.skill-card, .project-card, .stat-card').forEach(card => {
            card.addEventListener('mouseenter', () => interactiveSounds.play('cardHover'));
            card.addEventListener('click', () => interactiveSounds.play('cardClick'));
        });
        
        // Attach sounds to skip button
        const skipIntroBtn = document.getElementById('skipIntroBtn');
        if (skipIntroBtn) {
            skipIntroBtn.addEventListener('mouseenter', () => interactiveSounds.play('skipHover'));
            skipIntroBtn.addEventListener('click', () => interactiveSounds.play('skipClick'));
        }
        
        // Attach sounds to back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => interactiveSounds.play('rocketLaunch'));
        }
        
        // Attach sounds to social icons
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => interactiveSounds.play('notificationBeep'));
            icon.addEventListener('click', () => interactiveSounds.play('pop'));
        });
        
        // Mute button functionality
        const muteBtn = document.getElementById('muteBtn');
        const unmutedIcon = muteBtn.querySelector('.audio-icon-unmuted');
        const mutedIcon = muteBtn.querySelector('.audio-icon-muted');
        
        // Set initial state
        if (musicSystem.isMuted) {
            muteBtn.classList.add('muted');
            unmutedIcon.style.display = 'none';
            mutedIcon.style.display = 'block';
        }
        
        muteBtn.addEventListener('click', () => {
            const isMuted = musicSystem.toggleMute();
            
            if (isMuted) {
                muteBtn.classList.add('muted');
                unmutedIcon.style.display = 'none';
                mutedIcon.style.display = 'block';
            } else {
                muteBtn.classList.remove('muted');
                unmutedIcon.style.display = 'block';
                mutedIcon.style.display = 'none';
            }
            
            interactiveSounds.play('toggleOn');
        });

        // ========================================
        // ANIMATED CREDITS SYSTEM
        // ========================================
        class EnhancedCreditTextShatter {
            constructor(textElement) {
                // Configuration constants
                this.PARTICLES_PER_LETTER = 30;
                this.ANIMATION_REPEAT_DELAY = 8000; // ms
                this.ORBIT_ROTATIONS = 4; // Number of rotations (2 full circles)
                
                this.element = textElement;
                this.particles = [];
                this.isAnimating = false;
            }
            
            async startAnimation() {
                if (this.isAnimating) return;
                this.isAnimating = true;
                
                // Phase 1: Slide in from left (2s)
                await this.slideIn();
                
                // Phase 2: Hold at center with pulse (2s)
                await this.holdAndPulse();
                
                // Phase 3: SHATTER into particles (1s)
                await this.shatter();
                
                // Phase 4: Particles grow from tiny and orbit (2s)
                await this.orbitParticles();
                
                // Phase 5: Reform text from particles (1s)
                await this.reformText();
                
                this.isAnimating = false;
                
                // Repeat cycle
                setTimeout(() => this.startAnimation(), this.ANIMATION_REPEAT_DELAY);
            }
            
            slideIn() {
                return new Promise(resolve => {
                    this.element.style.opacity = '1';
                    this.element.style.transform = 'translateX(-100%)';
                    
                    setTimeout(() => {
                        this.element.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        this.element.style.transform = 'translateX(0)';
                        
                        setTimeout(resolve, 2000);
                    }, 100);
                });
            }
            
            holdAndPulse() {
                return new Promise(resolve => {
                    let pulseCount = 0;
                    const pulseInterval = setInterval(() => {
                        this.element.style.filter = pulseCount % 2 === 0 
                            ? 'drop-shadow(0 0 30px var(--neon-pink))'
                            : 'drop-shadow(0 0 10px var(--neon-blue))';
                        pulseCount++;
                    }, 500);
                    
                    setTimeout(() => {
                        clearInterval(pulseInterval);
                        resolve();
                    }, 2000);
                });
            }
            
            shatter() {
                return new Promise(resolve => {
                    const text = this.element.textContent;
                    const rect = this.element.getBoundingClientRect();
                    
                    // CRITICAL: Hide original text IMMEDIATELY
                    this.element.style.opacity = '0';
                    this.element.style.visibility = 'hidden';
                    
                    // Get letter positions before hiding
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    ctx.font = window.getComputedStyle(this.element).font;
                    
                    let currentX = rect.left;
                    const centerY = rect.top + rect.height / 2;
                    
                    text.split('').forEach((letter, letterIndex) => {
                        if (letter === ' ') {
                            currentX += ctx.measureText(letter).width;
                            return;
                        }
                        
                        const letterWidth = ctx.measureText(letter).width;
                        const letterCenterX = currentX + letterWidth / 2;
                        
                        // Create particles per letter
                        for (let i = 0; i < this.PARTICLES_PER_LETTER; i++) {
                            const particle = document.createElement('div');
                            particle.className = 'credit-particle-enhanced';
                            
                            // Random angle for explosion
                            const angle = (Math.PI * 2 * i) / this.PARTICLES_PER_LETTER + (Math.random() - 0.5) * 0.5;
                            const speed = 2 + Math.random() * 4;
                            
                            particle.dataset.vx = (Math.cos(angle) * speed).toString();
                            particle.dataset.vy = (Math.sin(angle) * speed).toString();
                            particle.dataset.originalX = letterCenterX.toString();
                            particle.dataset.originalY = centerY.toString();
                            particle.dataset.letter = letter;
                            
                            // CRITICAL: Start particles as TINY (scale 0)
                            particle.style.cssText = `
                                position: fixed;
                                left: ${letterCenterX}px;
                                top: ${centerY}px;
                                font-size: 8px;
                                color: hsl(${(letterIndex * 60) % 360}, 100%, 60%);
                                pointer-events: none;
                                z-index: 10000;
                                transform: scale(0);
                                opacity: 0;
                                font-family: 'Orbitron', sans-serif;
                                font-weight: bold;
                                text-shadow: 0 0 10px currentColor;
                            `;
                            
                            particle.textContent = letter;
                            document.body.appendChild(particle);
                            this.particles.push(particle);
                            
                            // CRITICAL: Grow from tiny to full size
                            setTimeout(() => {
                                particle.style.transition = 'transform 0.3s, opacity 0.3s';
                                particle.style.transform = 'scale(1)';
                                particle.style.opacity = '1';
                            }, i * 10); // Stagger growth
                        }
                        
                        currentX += letterWidth;
                    });
                    
                    setTimeout(resolve, 1000);
                });
            }
            
            orbitParticles() {
                return new Promise(resolve => {
                    const duration = 2000;
                    const startTime = Date.now();
                    
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = elapsed / duration;
                        
                        if (progress >= 1) {
                            resolve();
                            return;
                        }
                        
                        // Orbital motion
                        const angle = progress * Math.PI * this.ORBIT_ROTATIONS;
                        const radius = 150 * (1 - progress * 0.5); // Spiral inward
                        
                        this.particles.forEach((particle, index) => {
                            const originalX = parseFloat(particle.dataset.originalX);
                            const originalY = parseFloat(particle.dataset.originalY);
                            const offset = (Math.PI * 2 * index) / this.particles.length;
                            
                            const x = originalX + Math.cos(angle + offset) * radius;
                            const y = originalY + Math.sin(angle + offset) * radius;
                            
                            particle.style.left = x + 'px';
                            particle.style.top = y + 'px';
                            
                            // Color cycle
                            const hue = ((index * 10 + progress * 360) % 360);
                            particle.style.color = `hsl(${hue}, 100%, 60%)`;
                        });
                        
                        requestAnimationFrame(animate);
                    };
                    
                    animate();
                });
            }
            
            reformText() {
                return new Promise(resolve => {
                    const duration = 1000;
                    const startTime = Date.now();
                    
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = elapsed / duration;
                        
                        if (progress >= 1) {
                            // CRITICAL: Clean up particles completely
                            this.particles.forEach(p => p.remove());
                            this.particles = [];
                            
                            // CRITICAL: Show original text again
                            this.element.style.visibility = 'visible';
                            this.element.style.opacity = '1';
                            this.element.style.transform = 'translateX(0) scale(1)';
                            this.element.style.filter = 'drop-shadow(0 0 20px var(--neon-blue))';
                            
                            resolve();
                            return;
                        }
                        
                        // Converge particles back to original positions
                        this.particles.forEach(particle => {
                            const currentX = parseFloat(particle.style.left);
                            const currentY = parseFloat(particle.style.top);
                            const targetX = parseFloat(particle.dataset.originalX);
                            const targetY = parseFloat(particle.dataset.originalY);
                            
                            const x = currentX + (targetX - currentX) * progress;
                            const y = currentY + (targetY - currentY) * progress;
                            
                            particle.style.left = x + 'px';
                            particle.style.top = y + 'px';
                            particle.style.opacity = (1 - progress).toString();
                        });
                        
                        // Fade in original text as particles converge
                        this.element.style.opacity = progress.toString();
                        
                        requestAnimationFrame(animate);
                    };
                    
                    animate();
                });
            }
        }
        
        // Initialize enhanced credit animations
        document.addEventListener('DOMContentLoaded', () => {
            const creditTexts = document.querySelectorAll('.animated-credit-text');
            
            creditTexts.forEach((textElement, index) => {
                const animator = new EnhancedCreditTextShatter(textElement);
                
                // Stagger start times
                setTimeout(() => {
                    animator.startAnimation();
                }, index * 2000);
            });
        });

        console.log('%c🔥 LEGENDARY PORTFOLIO LOADED 🔥', 'color: #00f3ff; font-size: 20px; font-weight: bold;');
        console.log('%cWelcome to the cyberpunk dimension!', 'color: #ff006e; font-size: 14px;');
        console.log('%c🎵 Music System Ready! Toggle sound with the button in bottom-right corner.', 'color: #39ff14; font-size: 12px;');
    </script>
</body>
</html>
