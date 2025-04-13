// ������� �������� ���������
document.addEventListener('DOMContentLoaded', function() {
    // ���������� ��� ���������
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
    
    // ����������� ����� ��� �������
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // ��������/������ ������ "������"
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // �������� ��������� ������� ��� �������
        animateSkillBars();
    });
    
    // ������� �������� ������� �������
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
    
    // ��������� ��� �������� ��������
    animateSkillBars();
    
    // ������� ��������� ��� ����� �� ������ ���������
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // ��������� ��������� ����
                nav.classList.remove('active');
                
                // ������� ��������� � ������
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ��������� ���� - �������
    navToggle.addEventListener('click', function() {
        nav.classList.add('active');
    });
    
    // ��������� ���� - �������
    closeNav.addEventListener('click', function() {
        nav.classList.remove('active');
    });
    
    // ���� ��� ���� ��������� ���
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && e.target !== navToggle) {
            nav.classList.remove('active');
        }
    });
    
    // ������ "������"
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ���������� ���������
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // ������� �������� ����� � ���� ������
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // ��������� �������� ����� ������� ������
            this.classList.add('active');
            
            // �������� ��������� ����������
            const filter = this.getAttribute('data-filter');
            
            // ��������� �������� ���������
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    
                    // �������� ���������
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    // �������� ����� ��������
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ��������� ����� �������� �����
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // �������� �������� �����
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // ����� ����� �������� ��������� �����
            if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
                showFormMessage('����������, ��������� ��� ����', 'error');
                return;
            }
            
            // �������� email
            if (!isValidEmail(email)) {
                showFormMessage('����������, ������� ���������� email', 'error');
                return;
            }
            
            // �������� �������� ����� (� �������� ������� ����� ����� AJAX ������)
            // ����� ������������ fetch API ��� �������� ������ �� ������
            
            // ���������� ��������� �� �������� ��������
            showFormMessage('���� ��������� ������� ����������!', 'success');
            
            // ������� �����
            contactForm.reset();
        });
    }
    
    // ����� ��������� �����
    function showFormMessage(message, type) {
        // ���������, ���������� �� ��� ������� ���������
        let messageElement = document.querySelector('.form-message');
        
        if (!messageElement) {
            // ������� ����� ������� ��� ���������
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }
        
        // ������������� ����� � ����� � ����������� �� ���� ���������
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        
        // ���������� ���������
        messageElement.style.display = 'block';
        
        // ������������� �������� ��������� ����� 4 �������
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 4000);
    }
    
    // ��������� email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // �������� ��� ��������� ��� �������
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
    checkAnimatedElements(); // ������ ��� ��������
    
    // ������� ��������� ������ ��� ��������
    const sections = document.querySelectorAll('section');
    
    function animateSections() {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 200);
        });
    }
    
    // ��������� �������� ������ ����� �������� ��������
    window.addEventListener('load', animateSections);
    
    // ��������� ����� ��� ��������
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
    
    // ��������� ���������� ��������� (������)
    const trackPortfolioViews = () => {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // ��� ������� �������� ��������� ��������� ������������ ����������
        portfolioItems.forEach((item, index) => {
            // ������� ������ ������ (��������� ��������)
            const viewBtn = item.querySelector('.portfolio-link:last-child');
            
            if (viewBtn) {
                viewBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // � �������� ������� ����� ����� ��������� ������ �� ������
                    console.log(`�������� ������� #${index + 1}`);
                    
                    // ���������� ��������� ���� � �������� �������
                    showProjectDetails(item);
                });
            }
        });
    };
    
    // ������� ��� ����������� ������� �������
    function showProjectDetails(item) {
        // �������� ���������� � �������
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const image = item.querySelector('img').src;
        
        // ������� ��������� ����
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        
        // ��������� ��������� ���� ����������
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${image}" alt="${title}">
                <h2>${title}</h2>
                <p>${description}</p>
                <div class="project-details">
                    <div class="detail-item">
                        <h4>������</h4>
                        <p>�������� ��������</p>
                    </div>
                    <div class="detail-item">
                        <h4>����</h4>
                        <p>���� 2025</p>
                    </div>
                    <div class="detail-item">
                        <h4>���������</h4>
                        <p>${item.getAttribute('data-category')}</p>
                    </div>
                </div>
                <a href="#" class="btn">���������� ������</a>
            </div>
        `;
        
        // ��������� ��������� ���� �� ��������
        document.body.appendChild(modal);
        
        // ������������� ��������� ��������
        document.body.style.overflow = 'hidden';
        
        // ���������� ��������� ���� � ���������
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // ���������� ��� �������� ���������� ����
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            
            // ��������� ��������� �������� ����� ��������
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        });
        
        // �������� ��� ����� ��� �����������
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal.click();
            }
        });
    }
    
    // ��������� ������������ ���������� ���������
    trackPortfolioViews();
    
    // ��������� ����� ��� ���������� ���� ��������
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