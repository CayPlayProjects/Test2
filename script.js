// Этот файл содержит общий JavaScript для всех страниц

document.addEventListener('DOMContentLoaded', function() {
    // Подсветка активной ссылки в навигации
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Обработка FAQ на странице помощи
    const faqQuestions = document.querySelectorAll('.question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                // Закрываем все остальные ответы
                document.querySelectorAll('.answer').forEach(item => {
                    if (item !== answer) {
                        item.classList.remove('active');
                        const otherIcon = item.previousElementSibling.querySelector('i');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                    }
                });
                
                // Переключаем текущий ответ
                answer.classList.toggle('active');
                
                // Меняем иконку
                if (answer.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });
        
        // Открываем первый вопрос по умолчанию
        if (faqQuestions.length > 0) {
            const firstAnswer = faqQuestions[0].nextElementSibling;
            const firstIcon = faqQuestions[0].querySelector('i');
            firstAnswer.classList.add('active');
            firstIcon.classList.remove('fa-chevron-down');
            firstIcon.classList.add('fa-chevron-up');
        }
    }
    
    // Обработка формы обратной связи
    const supportForm = document.getElementById('support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем значения формы
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const category = document.getElementById('category').value;
            const message = document.getElementById('message').value;
            
            // Валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все обязательные поля.');
                return;
            }
            
            // В реальном приложении здесь был бы код отправки данных на сервер
            // Для примера просто покажем сообщение об успехе
            alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы ответим вам на ${email} в ближайшее время.`);
            
            // Очищаем форму
            supportForm.reset();
        });
    }
    
    // Анимация при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .team-member, .value-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация анимации
    const animatedElements = document.querySelectorAll('.feature, .team-member, .value-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Запускаем один раз при загрузке
    animateOnScroll();
});
