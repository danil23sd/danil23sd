// Äîæä¸ìñÿ çàãðóçêè äîêóìåíòà
document.addEventListener('DOMContentLoaded', function() {
    // Ïåðåìåííûå äëÿ ýëåìåíòîâ
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    const navToggle = document.getElementById('navToggle');
    const closeNav = document.getElementById('closeNav');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const skillBars = document.querySelectorAll('.skill-progress');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');
    
    // Ïðèëèïàþùàÿ øàïêà ïðè ñêðîëëå
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ïîêàçàòü/ñêðûòü êíîïêó "Íàâåðõ"
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Àíèìàöèÿ ïðîãðåññà íàâûêîâ ïðè ñêðîëëå
        animateSkillBars();
    });
    
    // Ôóíêöèÿ àíèìàöèè ïîëîñîê íàâûêîâ
    function animateSkillBars() {
        const triggerBottom = window.innerHeight * 0.8;
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const width = bar.getAttribute('data-width');
            
            if (barTop < triggerBottom) {
                bar.style.width = width + '%';
            }
        });
    }
    
    // Çàïóñêàåì ïðè çàãðóçêå ñòðàíèöû
    animateSkillBars();
    
    // Ïëàâíàÿ ïðîêðóòêà ïðè êëèêå íà ññûëêè íàâèãàöèè
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Çàêðûâàåì ìîáèëüíîå ìåíþ
                nav.classList.remove('active');
                
                // Ïëàâíàÿ ïðîêðóòêà ê ñåêöèè
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ìîáèëüíîå ìåíþ - îòêðûòü
    navToggle.addEventListener('click', function() {
        nav.classList.add('active');
    });
    
    // Ìîáèëüíîå ìåíþ - çàêðûòü
    closeNav.addEventListener('click', function() {
        nav.classList.remove('active');
    });
    
    // Êëèê âíå ìåíþ çàêðûâàåò åãî
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && e.target !== navToggle) {
            nav.classList.remove('active');
        }
    });
    
    // Êíîïêà "Íàâåðõ"
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Ôèëüòðàöèÿ ïîðòôîëèî
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Óäàëÿåì àêòèâíûé êëàññ ó âñåõ êíîïîê
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Äîáàâëÿåì àêòèâíûé êëàññ òåêóùåé êíîïêå
            this.classList.add('active');
            
            // Ïîëó÷àåì êàòåãîðèþ ôèëüòðàöèè
            const filter = this.getAttribute('data-filter');
            
            // Ôèëüòðóåì ýëåìåíòû ïîðòôîëèî
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    
                    // Àíèìàöèÿ ïîÿâëåíèÿ
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    // Ñêðûâàåì ïîñëå àíèìàöèè
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Îáðàáîòêà ôîðìû îáðàòíîé ñâÿçè
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ïîëó÷àåì çíà÷åíèÿ ïîëåé
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Çäåñü ìîæíî äîáàâèòü âàëèäàöèþ ôîðìû
            if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
                showFormMessage('Ïîæàëóéñòà, çàïîëíèòå âñå ïîëÿ', 'error');
                return;
            }
            
            // Ïðîâåðêà email
            if (!isValidEmail(email)) {
                showFormMessage('Ïîæàëóéñòà, ââåäèòå êîððåêòíûé email', 'error');
                return;
            }
            
            // Èìèòàöèÿ îòïðàâêè ôîðìû (â ðåàëüíîì ïðîåêòå çäåñü áóäåò AJAX çàïðîñ)
            // Ìîæíî èñïîëüçîâàòü fetch API äëÿ îòïðàâêè äàííûõ íà ñåðâåð
            
            // Ïîêàçûâàåì ñîîáùåíèå îá óñïåøíîé îòïðàâêå
            showFormMessage('Âàøå ñîîáùåíèå óñïåøíî îòïðàâëåíî!', 'success');
            
            // Î÷èùàåì ôîðìó
            contactForm.reset();
        });
    }
    
    // Ïîêàç ñîîáùåíèÿ ôîðìû
    function showFormMessage(message, type) {
        // Ïðîâåðÿåì, ñóùåñòâóåò ëè óæå ýëåìåíò ñîîáùåíèÿ
        let messageElement = document.querySelector('.form-message');
        
        if (!messageElement) {
            // Ñîçäàåì íîâûé ýëåìåíò äëÿ ñîîáùåíèÿ
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }
        
        // Óñòàíàâëèâàåì òåêñò è êëàññ â çàâèñèìîñòè îò òèïà ñîîáùåíèÿ
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        
        // Ïîêàçûâàåì ñîîáùåíèå
        messageElement.style.display = 'block';
        
        // Àâòîìàòè÷åñêè ñêðûâàåì ñîîáùåíèå ÷åðåç 4 ñåêóíäû
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 4000);
    }
    
    // Âàëèäàöèÿ email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Àíèìàöèÿ äëÿ ýëåìåíòîâ ïðè ñêðîëëå
    const animatedElements = document.querySelectorAll('.service-item, .portfolio-item, .contact-item');
    
    function checkAnimatedElements() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimatedElements);
    checkAnimatedElements(); // Çàïóñê ïðè çàãðóçêå
    
    // Ïëàâíîå ïîÿâëåíèå ñåêöèé ïðè çàãðóçêå
    const sections = document.querySelectorAll('section');
    
    function animateSections() {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 200);
        });
    }
    
    // Çàïóñêàåì àíèìàöèþ ñåêöèé ïîñëå çàãðóçêè ñòðàíèöû
    window.addEventListener('load', animateSections);
    
    // Äîáàâëÿåì ñòèëè äëÿ àíèìàöèé
    const style = document.createElement('style');
    style.textContent = `
        .service-item, .portfolio-item, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-item.animate, .portfolio-item.animate, .contact-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        section {
            opacity: 0;
            transition: opacity 0.8s ease;
        }
        
        section.visible {
            opacity: 1;
        }
        
        .form-message {
            padding: 10px 15px;
            margin-top: 15px;
            border-radius: 4px;
            display: none;
        }
        
        .form-message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .form-message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    `;
    document.head.appendChild(style);
    
    // Àíàëèòèêà ïðîñìîòðîâ ïîðòôîëèî (ïðèìåð)
    const trackPortfolioViews = () => {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // Äëÿ êàæäîãî ýëåìåíòà ïîðòôîëèî äîáàâëÿåì îòñëåæèâàíèå ïðîñìîòðîâ
        portfolioItems.forEach((item, index) => {
            // Íàõîäèì èêîíêó ïîèñêà (ïîäðîáíûé ïðîñìîòð)
            const viewBtn = item.querySelector('.portfolio-link:last-child');
            
            if (viewBtn) {
                viewBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Â ðåàëüíîì ïðîåêòå çäåñü ìîæíî îòïðàâèòü äàííûå íà ñåðâåð
                    console.log(`Ïðîñìîòð ïðîåêòà #${index + 1}`);
                    
                    // Ïîêàçûâàåì ìîäàëüíîå îêíî ñ äåòàëÿìè ïðîåêòà
                    showProjectDetails(item);
                });
            }
        });
    };
    
    // Ôóíêöèÿ äëÿ îòîáðàæåíèÿ äåòàëåé ïðîåêòà
    function showProjectDetails(item) {
        // Ïîëó÷àåì èíôîðìàöèþ î ïðîåêòå
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const image = item.querySelector('img').src;
        
        // Ñîçäàåì ìîäàëüíîå îêíî
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        
        // Íàïîëíÿåì ìîäàëüíîå îêíî ñîäåðæèìûì
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${image}" alt="${title}">
                <h2>${title}</h2>
                <p>${description}</p>
                <div class="project-details">
                    <div class="detail-item">
                        <h4>Êëèåíò</h4>
                        <p>Íàçâàíèå êîìïàíèè</p>
                    </div>
                    <div class="detail-item">
                        <h4>Äàòà</h4>
                        <p>Ìàðò 2025</p>
                    </div>
                    <div class="detail-item">
                        <h4>Êàòåãîðèÿ</h4>
                        <p>${item.getAttribute('data-category')}</p>
                    </div>
                </div>
                <a href="#" class="btn">Ïîñìîòðåòü ïðîåêò</a>
            </div>
        `;
        
        // Äîáàâëÿåì ìîäàëüíîå îêíî íà ñòðàíèöó
        document.body.appendChild(modal);
        
        // Ïðåäîòâðàùàåì ïðîêðóòêó ñòðàíèöû
        document.body.style.overflow = 'hidden';
        
        // Ïîêàçûâàåì ìîäàëüíîå îêíî ñ àíèìàöèåé
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Îáðàáîò÷èê äëÿ çàêðûòèÿ ìîäàëüíîãî îêíà
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            
            // Ðàçðåøàåì ïðîêðóòêó ñòðàíèöû ïîñëå çàêðûòèÿ
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        });
        
        // Çàêðûòèå ïðè êëèêå âíå ñîäåðæèìîãî
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal.click();
            }
        });
    }
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Прямой способ сделать каждый элемент портфолио кликабельным
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            // Находим URL внутри этого элемента (в кнопке или другом месте)
            let url = '';
            
            // Сначала проверяем, есть ли кнопка с адресом
            const button = item.querySelector('button[onclick]');
            if (button && button.getAttribute('onclick')) {
                const onclickAttr = button.getAttribute('onclick');
                // Извлекаем URL из строки onclick="window.location.href='URL';"
                const match = onclickAttr.match(/window\.location\.href='([^']+)'/);
                if (match && match[1]) {
                    url = match[1];
                }
            }
            
            // Если URL не найден в кнопке, ищем первую ссылку
            if (!url) {
                const link = item.querySelector('.portfolio-link');
                if (link && link.getAttribute('href') && link.getAttribute('href') !== '#') {
                    url = link.getAttribute('href');
                }
            }
            
            // Если URL найден, делаем весь элемент кликабельным
            if (url && url !== '#') {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function(e) {
                    // Если клик не на ссылке или кнопке, перенаправляем
                    if (!e.target.closest('a') && !e.target.closest('button')) {
                        window.open(url, '_blank');
                    }
                });
                
                // Добавляем хорошо заметную кнопку перехода
                const overlay = item.querySelector('.portfolio-overlay');
                if (overlay) {
                    // Удаляем существующую кнопку, если есть
                    const existingBtn = overlay.querySelector('button[onclick]');
                    if (existingBtn) {
                        existingBtn.remove();
                    }
                    
                    // Создаем новую кнопку
                    const visitButton = document.createElement('a');
                    visitButton.href = url;
                    visitButton.target = '_blank';
                    visitButton.textContent = 'Перейти на сайт';
                    visitButton.classList.add('portfolio-visit-btn');
                    visitButton.style.display = 'inline-block';
                    visitButton.style.backgroundColor = '#3498db';
                    visitButton.style.color = 'white';
                    visitButton.style.padding = '10px 20px';
                    visitButton.style.borderRadius = '4px';
                    visitButton.style.margin = '15px 0';
                    visitButton.style.textDecoration = 'none';
                    visitButton.style.fontWeight = 'bold';
                    visitButton.style.transition = 'all 0.3s ease';
                    
                    visitButton.onmouseover = function() {
                        this.style.backgroundColor = '#2980b9';
                        this.style.transform = 'translateY(-3px)';
                        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                    };
                    
                    visitButton.onmouseout = function() {
                        this.style.backgroundColor = '#3498db';
                        this.style.transform = 'translateY(0)';
                        this.style.boxShadow = 'none';
                    };
                    
                    overlay.appendChild(visitButton);
                }
            }
        });
    });
</script>
    
    // Çàïóñêàåì îòñëåæèâàíèå ïðîñìîòðîâ ïîðòôîëèî
    trackPortfolioViews();
    
    // Äîáàâëÿåì ñòèëè äëÿ ìîäàëüíîãî îêíà ïðîåêòîâ
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1100;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .project-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background-color: white;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
            border-radius: 6px;
            position: relative;
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }
        
        .project-modal.show .modal-content {
            transform: translateY(0);
        }
        
        .close-modal {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #999;
            transition: color 0.3s ease;
        }
        
        .close-modal:hover {
            color: #333;
        }
        
        .modal-content img {
            width: 100%;
            height: auto;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        
        .modal-content h2 {
            color: var(--secondary-color);
            margin-bottom: 15px;
        }
        
        .project-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 30px 0;
        }
        
        .detail-item h4 {
            color: var(--secondary-color);
            margin-bottom: 5px;
        }
        
        @media (max-width: 768px) {
            .project-details {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(modalStyle);
});
