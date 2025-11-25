// ============================================
// Main JavaScript for Pathways to Progress
// ============================================

(function() {
    'use strict';

    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Navbar Active Link Highlighting
    // ============================================
    
    const sections = document.querySelectorAll('.section, #hero');
    const navbar = document.getElementById('navbar');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Special handling for hero section
        if (window.scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#hero') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial call

    // ============================================
    // Navbar Shadow on Scroll
    // ============================================
    
    function updateNavbarShadow() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', updateNavbarShadow);

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all week sections
    const weekSections = document.querySelectorAll('.week-section');
    weekSections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards and other elements
    const animatedElements = document.querySelectorAll('.intro-card, .sdg-card, .impact-card, .suggestion-card, .gallery-item, .timeline-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(element);
        
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        elementObserver.observe(element);
    });

    // ============================================
    // Video Lazy Loading
    // ============================================
    
    const videos = document.querySelectorAll('video[preload="metadata"]');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                // Load video when it comes into view
                video.load();
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });

    // ============================================
    // Handle Video Errors Gracefully
    // ============================================
    
    videos.forEach(video => {
        video.addEventListener('error', function() {
            const container = this.closest('.week-video, .gallery-item');
            if (container) {
                const placeholder = document.createElement('div');
                placeholder.className = 'video-placeholder';
                placeholder.style.cssText = `
                    width: 100%;
                    height: 200px;
                    background: linear-gradient(135deg, #e9ecef, #dee2e6);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6c757d;
                    font-size: 1.1rem;
                    border: 2px dashed #adb5bd;
                `;
                placeholder.textContent = 'Video will be available soon';
                this.parentNode.replaceChild(placeholder, this);
            }
        });
    });

    // ============================================
    // Smooth Scroll for "Start Presentation" Button
    // ============================================
    
    const startButton = document.querySelector('.btn-primary');
    if (startButton && startButton.getAttribute('href') === '#introduction') {
        startButton.addEventListener('click', (e) => {
            e.preventDefault();
            const introSection = document.getElementById('introduction');
            if (introSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = introSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ============================================
    // Add Loading Animation
    // ============================================
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // ============================================
    // Console Welcome Message
    // ============================================
    
    console.log('%cPathways to Progress', 'font-size: 20px; font-weight: bold; color: #DC143C;');
    console.log('%cPRCS x FAST-NUCES', 'font-size: 14px; color: #6c757d;');

    // ============================================
    // Modal Overlay System
    // ============================================
    
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    
    let currentModalId = null;
    
    // Define modal sequences for navigation
    const modalSequences = {
        introduction: ['project-overview', 'goals-objectives', 'need-assessment'],
        weekly: ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7', 'week8'],
        sdg: ['sdg3', 'sdg4'],
        impact: ['community-impact', 'personal-impact'],
        challenges: ['challenges', 'feedback'],
        suggestions: ['suggestions-prcs', 'suggestions-community']
    };
    
    // Modal content templates
    const modalContent = {
        'project-overview': {
            title: 'Clear Introduction to the Project',
            content: `
                <h2>Clear Introduction to the Project</h2>
                <div class="modal-text">
                    <p>Road safety is a major public-health challenge in Pakistan. Every year, thousands of preventable accidents result in deaths, injuries, and long-term disabilities. Many of these incidents are caused by lack of awareness, weak safety practices, poor pedestrian behavior, and limited first-aid knowledge. Recognizing this gap, our group initiated an 8-week community service project titled <strong>"Pathways to Progress"</strong>, in collaboration with the <strong>Pakistan Red Crescent Society (PRCS)</strong>.</p>
                    <p>The purpose of the project was to promote road safety and first aid awareness, educate schoolchildren and community members, and strengthen emergency preparedness. Through hands-on engagement, fieldwork, and educational activities, we aimed to create real, visible, and lasting impact on local communities.</p>
                    <p>Our project focused on practical, on-ground interventions in the H-8 sector of Islamabad, working directly with schools, traffic police, and local communities. We conducted field observations, surveys, and direct engagement activities to understand the specific safety challenges faced by residents, particularly around schools and high-traffic areas like Karachi Company and Allama Iqbal Open University.</p>
                </div>
            `
        },
        'goals-objectives': {
            title: 'Goals and Objectives',
            content: `
                <h2>Goals and Objectives</h2>
                <div class="modal-text">
                    <p><strong>Overall Goal:</strong></p>
                    <p>To improve road safety awareness and emergency preparedness in the community through education, demonstrations, and on-ground interventions.</p>
                    <p><strong>Specific Objectives:</strong></p>
                    <ul>
                        <li>Teach first aid basics to students and children through interactive demonstrations and hands-on training sessions at schools.</li>
                        <li>Promote helmet use, seatbelt safety, and proper road-crossing habits through live demonstrations, poster campaigns, and direct engagement with motorcyclists at traffic signals.</li>
                        <li>Increase public awareness of emergency contact numbers using custom-designed stickers that we printed, laminated, and distributed across shops, cars, and homes in the community.</li>
                        <li>Build and donate complete first-aid kits to schools, ensuring they have essential medical supplies and students understand how to use them.</li>
                        <li>Create zebra crossings at strategic locations near schools to improve pedestrian safety, particularly on Pitras Bukhari Road near The City School H-8.</li>
                        <li>Collaborate with the Islamabad Traffic Police for real-world traffic management experience, assisting officers at busy intersections and learning practical traffic control techniques.</li>
                        <li>Strengthen civic sense, leadership, communication, and teamwork through consistent community engagement and stakeholder coordination.</li>
                    </ul>
                </div>
            `
        },
        'need-assessment': {
            title: 'Need Assessment',
            content: `
                <h2>Need Assessment</h2>
                <div class="modal-text">
                    <p>Before starting our project, we conducted a comprehensive need assessment through direct observations, interviews, and community conversations. The evidence we gathered revealed critical safety gaps:</p>
                    <ul>
                        <li>Many students did not know how to cross the road safely. During our initial school visits, we observed children jaywalking and crossing without looking both ways, particularly near school entrances.</li>
                        <li>Large numbers of bikers did not strap helmets properly. Our observations at traffic signals showed that while some motorcyclists wore helmets, many either didn't wear them at all or wore them incorrectly without fastening the strap.</li>
                        <li>Community members did not know emergency numbers (1122 for ambulance, 15 for police, hospital numbers). When we interviewed shopkeepers and residents, most could not recall these critical numbers, which could delay emergency response.</li>
                        <li>Schools lacked proper first-aid kits and road-safety education. Our discussions with school administrators revealed that while schools had basic medical supplies, they didn't have comprehensive first-aid kits, and formal road safety education was minimal.</li>
                        <li>Roads near schools in H-8 had no zebra crossings, creating daily danger for children. We surveyed multiple locations around schools and found that high-traffic areas like Pitras Bukhari Road had no visible pedestrian crossings.</li>
                        <li>Traffic congestion around Karachi Company and Allama Iqbal Open University showed weak safety habits. Our field observations revealed chaotic traffic patterns with minimal adherence to traffic rules.</li>
                    </ul>
                    <p>Our project directly addressed these needs through structured weekly interventions, each designed to tackle specific issues we identified.</p>
                </div>
            `
        },
        'sdg3': {
            title: 'SDG 3 — Good Health & Well-Being',
            content: `
                <h2>SDG 3 — Good Health & Well-Being</h2>
                <div class="modal-text">
                    <p>Our project directly contributes to SDG 3 by promoting road safety, reducing accident risks, and enhancing emergency preparedness in the community:</p>
                    <ul>
                        <li><strong>Helmet-strapping demonstrations:</strong> We conducted live demonstrations near Allama Iqbal Open University, showing proper helmet strapping techniques to motorcyclists. We created bilingual (Urdu and English) posters explaining the importance of helmets and distributed them during our sessions.</li>
                        <li><strong>First-aid training:</strong> We provided comprehensive first-aid training to students at Roots International School, demonstrating each item in the first-aid kit and explaining its use. We taught basic first-aid procedures and donated a complete first-aid kit to the school.</li>
                        <li><strong>Emergency-number awareness:</strong> We designed, printed, and distributed over 100 emergency contact stickers featuring critical numbers (1122 for ambulance, 15 for police, and local hospital contacts). These stickers were distributed in shops, cars, and homes.</li>
                        <li><strong>Pedestrian safety sessions:</strong> We conducted road-crossing demonstrations with students, teaching them proper techniques. We also created and maintained a zebra crossing near a school entrance, providing a safe crossing point for pedestrians.</li>
                    </ul>
                    <p>These interventions directly reduce the risk of road traffic injuries and fatalities, which is a key target of SDG 3.6.</p>
                </div>
            `
        },
        'sdg4': {
            title: 'SDG 4 — Quality Education',
            content: `
                <h2>SDG 4 — Quality Education</h2>
                <div class="modal-text">
                    <p>Our project addressed SDG 4 by providing practical, life-saving education to students and community members through interactive and engaging methods:</p>
                    <ul>
                        <li><strong>Interactive school sessions:</strong> At Roots International School, we conducted comprehensive sessions that included live demonstrations, hands-on activities, and student participation. We showed students how to cross roads safely, demonstrated first-aid procedures, and engaged them in Q&A sessions.</li>
                        <li><strong>Visual learning through posters:</strong> We designed and created educational posters in both Urdu and English covering road safety rules, helmet importance, and emergency procedures. These posters were displayed in schools and during our public demonstrations.</li>
                        <li><strong>Drawing & poster activities (indirect):</strong> While students observed our poster designs and safety demonstrations, they indirectly learned about visual communication and safety awareness.</li>
                        <li><strong>Role-plays and student Q&A:</strong> During our school sessions, we facilitated interactive Q&A sessions where students could ask questions about road safety, first-aid procedures, and emergency response.</li>
                    </ul>
                    <p><strong>Purpose:</strong> To create healthier, safer, more informed communities through practical education that students can immediately apply in their daily lives.</p>
                </div>
            `
        },
        'community-impact': {
            title: 'Community Impact',
            content: `
                <h2>Community Impact</h2>
                <div class="modal-text">
                    <p>Our project created measurable impact in the community through various interventions:</p>
                    <ul>
                        <li>Increased awareness of helmet safety among bikers through live demonstrations and direct engagement at traffic signals near Allama Iqbal Open University.</li>
                        <li>Students gained real knowledge of how to cross roads safely through interactive sessions at Roots International School, where we demonstrated proper crossing techniques.</li>
                        <li>Emergency-number stickers now visible in shops and cars across the community, with over 100 stickers distributed making critical numbers easily accessible.</li>
                        <li>Zebra crossing improved safety at a school entrance on Pitras Bukhari Road, providing a safe crossing point for students and pedestrians.</li>
                        <li>Schools obtained usable first-aid kits, with Roots International receiving a complete kit along with training on how to use it.</li>
                    </ul>
                </div>
            `
        },
        'personal-impact': {
            title: 'Personal Impact',
            content: `
                <h2>Personal Impact</h2>
                <div class="modal-text">
                    <p>This project provided valuable personal and professional development opportunities:</p>
                    <ul>
                        <li>Improved confidence in public speaking through multiple presentations, demonstrations, and community interactions at schools and public spaces.</li>
                        <li>Stronger leadership and teamwork abilities developed through coordinating with PRCS, schools, and ITP, managing project timelines, and working as a cohesive team.</li>
                        <li>Adaptability improved through repeated rescheduling of activities due to weather, school midterms, and other challenges, teaching us to be flexible and persistent.</li>
                        <li>Enhanced real-world communication skills with public institutions like PRCS, ITP, and school administrations, learning to navigate different organizational cultures.</li>
                    </ul>
                </div>
            `
        },
        'challenges': {
            title: 'Challenges Faced',
            content: `
                <h2>Challenges Faced</h2>
                <div class="modal-text">
                    <p>Throughout the 8-week project, we encountered several challenges that required problem-solving and adaptability:</p>
                    <ul>
                        <li>Printing and cutting stickers accurately - we faced alignment issues during printing and had to manually cut and prepare approximately 100 stickers, which was time-consuming but ensured quality.</li>
                        <li>Finding a suitable location for zebra crossing - we surveyed multiple H-sector areas before finalizing Pitras Bukhari Road near The City School H-8, which required coordination with local authorities.</li>
                        <li>Difficulty gathering a crowd in public settings - during our helmet demonstration near AIOU, we had to be proactive in engaging passersby and motorcyclists to create awareness.</li>
                        <li>School session postponed multiple times due to midterms - we had to reschedule our Roots International session several times, requiring flexibility and persistent communication.</li>
                        <li>Short time window (11 AM to 1 PM) due to university classes - we had to carefully plan activities to fit within this limited timeframe while maximizing impact.</li>
                        <li>Weather conditions affected outdoor activities - rain and adverse weather forced us to reschedule zebra crossing painting and other outdoor work, teaching us to monitor forecasts and maintain flexible schedules.</li>
                    </ul>
                </div>
            `
        },
        'feedback': {
            title: 'Feedback',
            content: `
                <h2>Feedback</h2>
                <div class="modal-text">
                    <div class="feedback-grid">
                        <div class="feedback-item">
                            <h5>From Schools</h5>
                            <p>"The session was very informative. Students learned practical safety skills that they can apply in daily life."</p>
                        </div>
                        <div class="feedback-item">
                            <h5>From Community</h5>
                            <p>"The emergency stickers are very helpful. We appreciate the initiative to make our area safer."</p>
                        </div>
                        <div class="feedback-item">
                            <h5>From PRCS</h5>
                            <p>"Excellent collaboration. The project demonstrates strong community engagement and practical impact."</p>
                        </div>
                        <div class="feedback-item">
                            <h5>From ITP</h5>
                            <p>"Good learning experience for students. Real-world traffic management exposure is valuable."</p>
                        </div>
                    </div>
                </div>
            `
        },
        'suggestions-prcs': {
            title: 'Suggestions for PRCS',
            content: `
                <h2>Suggestions for PRCS</h2>
                <div class="modal-text">
                    <p>Based on our collaboration experience, we suggest:</p>
                    <ul>
                        <li>Expand school awareness programs nationwide - our successful session at Roots International demonstrated the value of interactive safety education in schools, which could be replicated across Pakistan.</li>
                        <li>Provide more printed safety materials (posters, stickers) - the emergency stickers we distributed were highly appreciated and could be standardized and distributed more widely through PRCS networks.</li>
                        <li>Organize monthly helmet-awareness camps - regular awareness campaigns at traffic signals and public spaces could sustain the impact of helmet safety education.</li>
                        <li>Partner with more schools for safe-crossing training - establishing partnerships with multiple schools for ongoing road safety education would create lasting community impact.</li>
                    </ul>
                </div>
            `
        },
        'suggestions-community': {
            title: 'Suggestions for the Community',
            content: `
                <h2>Suggestions for the Community</h2>
                <div class="modal-text">
                    <p>For continued safety improvement, we recommend:</p>
                    <ul>
                        <li>Always wear and strap helmets properly - our demonstrations showed that proper helmet strapping is crucial for protection, and this should become a non-negotiable habit for all motorcyclists.</li>
                        <li>Teach children safe-crossing rules early - parents and schools should reinforce road safety education from an early age, teaching children to use zebra crossings and look both ways.</li>
                        <li>Display emergency stickers in every car - keeping emergency contact numbers visible in vehicles and homes ensures quick access during emergencies, potentially saving lives.</li>
                        <li>Volunteer in local safety programs - community members can support and participate in safety initiatives, creating a culture of collective responsibility for road safety.</li>
                        <li>Encourage others to follow road rules - by setting examples and gently reminding others about safety practices, we can create a ripple effect of positive behavior change.</li>
                    </ul>
                </div>
            `
        },
        'week1': {
            title: 'Week 1 — Foundations & Materials',
            content: `
                <h2>Week 1 — Foundations & Materials</h2>
                <div class="modal-text">
                    <h4>Key Activities:</h4>
                    <ul>
                        <li>Designed posters on road safety and first aid.</li>
                        <li>Created emergency contact sticker.</li>
                        <li>Collected materials for first-aid kit.</li>
                        <li>Coordinated with PRCS staff.</li>
                        <li>Conducted online meeting with school principal (Educators School H-8).</li>
                        <li>Learned first aid basics and kit assembly.</li>
                    </ul>
                </div>
            `
        },
        'week2': {
            title: 'Week 2 — Emergency Sticker Printing',
            content: `
                <h2>Week 2 — Emergency Sticker Printing</h2>
                <div class="modal-text">
                    <h4>Key Activities:</h4>
                    <ul>
                        <li>Printed and laminated emergency stickers.</li>
                        <li>Cut and prepared ~100 stickers manually.</li>
                        <li>Faced printing alignment issues.</li>
                        <li>Distributed stickers in shops, cars, and homes.</li>
                    </ul>
                </div>
            `
        },
        'week3': {
            title: 'Week 3 — Awareness Interviews',
            content: `
                <h2>Week 3 — Awareness Interviews</h2>
                <div class="modal-text">
                    <h4>Key Activities:</h4>
                    <ul>
                        <li>Conducted interviews about road safety experiences.</li>
                        <li>Collected public opinions on sticker usefulness.</li>
                        <li>Most community members lacked knowledge of emergency numbers.</li>
                        <li>Simplified explanations for Urdu speakers.</li>
                    </ul>
                </div>
            `
        },
        'week4': {
            title: 'Week 4 — Helmet Safety Demonstration',
            content: `
                <h2>Week 4 — Helmet Safety Demonstration</h2>
                <div class="modal-text">
                    <h4>Key Activities:</h4>
                    <ul>
                        <li>Script writing and rehearsal.</li>
                        <li>Designed Urdu + English posters.</li>
                        <li>Conducted live helmet demo near Allama Iqbal Open University.</li>
                        <li>Demonstrated correct helmet strapping.</li>
                        <li>Educated bikers about prevention of head injuries.</li>
                    </ul>
                </div>
            `
        },
        'week5': {
            title: 'Week 5 — Zebra Crossing (Part 1)',
            content: `
                <h2>Week 5 — Zebra Crossing (Part 1)</h2>
                <div class="modal-text">
                    <h4>Key Activities:</h4>
                    <ul>
                        <li>Gathered painting materials: rollers, brushes, paints.</li>
                        <li>Surveyed multiple H-sector areas.</li>
                        <li>Finalized Pitras Bukhari Road near The City School H-8.</li>
                        <li>Painted half of the zebra crossing.</li>
                        <li>Cleaned nearby road signs to improve visibility.</li>
                    </ul>
                </div>
            `
        },
        'week6': {
            title: 'Week 6 — School Session at Roots International',
            content: `
                <h2>Week 6 — School Session at Roots International</h2>
                <div class="modal-text">
                    <h4>Key Activities:</h4>
                    <ul>
                        <li>Road-crossing demonstration with students.</li>
                        <li>First-aid kit demonstration (item-by-item explanation).</li>
                        <li>Poster showcase.</li>
                        <li>Student Q&A session.</li>
                        <li>Donated a complete first-aid kit to the school.</li>
                        <li>Took group photos with PRCS representatives.</li>
                    </ul>
                </div>
            `
        },
        'week7': {
            title: 'Week 7 — Completing Zebra Crossing (Part 2)',
            content: `
                <h2>Week 7 — Completing Zebra Crossing (Part 2)</h2>
                <div class="modal-text">
                    <h4>Key Activities:</h4>
                    <ul>
                        <li>Returned to finish the remaining half of the zebra crossing.</li>
                        <li>Ensured alignment of stripes and consistent paint thickness.</li>
                        <li>Checked visibility from vehicle height.</li>
                    </ul>
                </div>
            `
        },
        'week8': {
            title: 'Week 8 — Traffic Work with Islamabad Traffic Police (ITP)',
            content: `
                <h2>Week 8 — Traffic Work with Islamabad Traffic Police (ITP)</h2>
                <div class="modal-text">
                    <h4>Key Activities:</h4>
                    <ul>
                        <li>Assisted ITP officers at a busy signal.</li>
                        <li>Reminded bikers to wear and strap helmets.</li>
                        <li>Helped maintain lane discipline.</li>
                        <li>Observed live traffic control techniques.</li>
                        <li>Learned practical importance of road discipline.</li>
                    </ul>
                </div>
            `
        }
    };
    
    // Find which sequence a modal belongs to
    function findModalSequence(modalId) {
        for (const [sequenceName, modals] of Object.entries(modalSequences)) {
            if (modals.includes(modalId)) {
                return { sequenceName, modals };
            }
        }
        return null;
    }
    
    // Get next modal in sequence (loops around)
    function getNextModal(currentModalId) {
        const sequence = findModalSequence(currentModalId);
        if (!sequence) return null;
        
        const currentIndex = sequence.modals.indexOf(currentModalId);
        if (currentIndex < sequence.modals.length - 1) {
            return sequence.modals[currentIndex + 1];
        }
        // Loop to first
        return sequence.modals[0];
    }
    
    // Get previous modal in sequence (loops around)
    function getPrevModal(currentModalId) {
        const sequence = findModalSequence(currentModalId);
        if (!sequence) return null;
        
        const currentIndex = sequence.modals.indexOf(currentModalId);
        if (currentIndex > 0) {
            return sequence.modals[currentIndex - 1];
        }
        // Loop to last
        return sequence.modals[sequence.modals.length - 1];
    }
    
    // Update navigation buttons visibility (always show, loop around)
    function updateNavButtons() {
        // Always show navigation buttons - they will loop around
        if (modalPrev) modalPrev.classList.remove('hidden');
        if (modalNext) modalNext.classList.remove('hidden');
    }
    
    function openModal(modalId) {
        if (modalContent[modalId]) {
            currentModalId = modalId;
            modalBody.innerHTML = modalContent[modalId].content;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateNavButtons();
        }
    }
    
    function navigateNext() {
        const nextModal = getNextModal(currentModalId);
        if (nextModal) {
            openModal(nextModal);
        }
    }
    
    function navigatePrev() {
        const prevModal = getPrevModal(currentModalId);
        if (prevModal) {
            openModal(prevModal);
        }
    }
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentModalId = null;
    }
    
    // Touch swipe navigation for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                navigateNext();
            } else {
                // Swipe right - previous
                navigatePrev();
            }
        }
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        modalOverlay.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    // Add click handlers to clickable cards
    document.querySelectorAll('.clickable-card').forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            if (modalId) {
                openModal(modalId);
            }
        });
        
        // Add cursor pointer
        card.style.cursor = 'pointer';
    });
    
    // Close modal handlers (only if elements exist - not on media.html)
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Navigation handlers (only if elements exist)
    if (modalNext) {
        modalNext.addEventListener('click', navigateNext);
    }
    if (modalPrev) {
        modalPrev.addEventListener('click', navigatePrev);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modalOverlay && modalOverlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                navigateNext();
            } else if (e.key === 'ArrowLeft') {
                navigatePrev();
            }
        }
    });

    // Quiz functionality is now handled by quiz.js

    // ============================================
    // Image Overlay for Design Items (Media Page)
    // ============================================
    
    const imageOverlay = document.getElementById('image-overlay');
    const overlayImage = document.getElementById('overlay-image');
    const imageClose = document.getElementById('image-close');
    const imagePrev = document.getElementById('image-prev');
    const imageNext = document.getElementById('image-next');
    const viewImageBtns = document.querySelectorAll('.view-image-btn');
    const designItems = document.querySelectorAll('.design-item');
    
    let currentImageIndex = 0;
    let imageArray = [];
    
    // Build array of images from design items
    if (designItems.length > 0) {
        designItems.forEach(item => {
            const imagePath = item.getAttribute('data-image');
            if (imagePath) {
                imageArray.push(imagePath);
            }
        });
    }
    
    // Open image overlay
    function openImageOverlay(imagePath) {
        if (overlayImage && imageOverlay) {
            overlayImage.src = imagePath;
            imageOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateImageNavButtons();
        }
    }
    
    // Close image overlay
    function closeImageOverlay() {
        if (imageOverlay) {
            imageOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Update navigation buttons visibility
    function updateImageNavButtons() {
        if (imageArray.length <= 1) {
            if (imagePrev) imagePrev.classList.add('hidden');
            if (imageNext) imageNext.classList.add('hidden');
        } else {
            if (imagePrev) imagePrev.classList.remove('hidden');
            if (imageNext) imageNext.classList.remove('hidden');
        }
    }
    
    // Navigate to next image
    function navigateImageNext() {
        if (currentImageIndex < imageArray.length - 1) {
            currentImageIndex++;
            overlayImage.src = imageArray[currentImageIndex];
        } else {
            currentImageIndex = 0;
            overlayImage.src = imageArray[currentImageIndex];
        }
    }
    
    // Navigate to previous image
    function navigateImagePrev() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            overlayImage.src = imageArray[currentImageIndex];
        } else {
            currentImageIndex = imageArray.length - 1;
            overlayImage.src = imageArray[currentImageIndex];
        }
    }
    
    // Event listeners for image overlay
    if (viewImageBtns.length > 0) {
        viewImageBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const designItem = btn.closest('.design-item');
                if (designItem) {
                    const imagePath = designItem.getAttribute('data-image');
                    currentImageIndex = index;
                    openImageOverlay(imagePath);
                }
            });
        });
    }
    
    if (imageClose) {
        imageClose.addEventListener('click', closeImageOverlay);
    }
    
    if (imageNext) {
        imageNext.addEventListener('click', navigateImageNext);
    }
    
    if (imagePrev) {
        imagePrev.addEventListener('click', navigateImagePrev);
    }
    
    // Close overlay when clicking outside the image
    if (imageOverlay) {
        imageOverlay.addEventListener('click', (e) => {
            if (e.target === imageOverlay) {
                closeImageOverlay();
            }
        });
    }
    
    // Keyboard navigation for image overlay
    document.addEventListener('keydown', (e) => {
        if (imageOverlay && imageOverlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeImageOverlay();
            } else if (e.key === 'ArrowRight') {
                navigateImageNext();
            } else if (e.key === 'ArrowLeft') {
                navigateImagePrev();
            }
        }
    });

    // ============================================
    // PDF Export Functionality
    // ============================================
    
    const exportPdfBtn = document.getElementById('export-pdf');
    
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            // Hide elements that shouldn't be in PDF
            const modalOverlay = document.getElementById('modal-overlay');
            const navToggle = document.getElementById('nav-toggle');
            const exportBtn = exportPdfBtn;
            
            const originalModalDisplay = modalOverlay ? modalOverlay.style.display : '';
            const originalNavToggleDisplay = navToggle ? navToggle.style.display : '';
            const originalExportBtnDisplay = exportBtn.style.display;
            
            if (modalOverlay) modalOverlay.style.display = 'none';
            if (navToggle) navToggle.style.display = 'none';
            exportBtn.style.display = 'none';
            
            // Use browser's print functionality
            window.print();
            
            // Restore elements after a delay
            setTimeout(() => {
                if (modalOverlay) modalOverlay.style.display = originalModalDisplay;
                if (navToggle) navToggle.style.display = originalNavToggleDisplay;
                exportBtn.style.display = originalExportBtnDisplay;
            }, 1000);
        });
    }
    
    // Add print styles
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            body {
                background: white !important;
            }
            .navbar {
                position: static !important;
                box-shadow: none !important;
            }
            .nav-toggle {
                display: none !important;
            }
            #modal-overlay {
                display: none !important;
            }
            #export-pdf {
                display: none !important;
            }
            .section {
                page-break-inside: avoid;
                margin-bottom: 2rem;
            }
            .hero {
                page-break-after: always;
            }
        }
    `;
    document.head.appendChild(printStyle);

})();

