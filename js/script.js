// СКРИПТ ДЛЯ ПЛАВНОЙ ПРОКРУТКИ
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        // Плавный переход
        document.body.style.opacity = '0.9';
        setTimeout(() => {
            window.location.href = href;
        }, 150);
    });
});

// Автоматический подсчёт карточек
document.addEventListener('DOMContentLoaded', function() {
    const dishCards = document.querySelectorAll('.dish-card');
    const countElement = document.getElementById('dish-count');
    if (countElement && dishCards.length > 0) {
        countElement.textContent = dishCards.length;
    }
});

/*
// Простой поиск
document.getElementById('dish-search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.dish-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// УЛУЧШЕННЫЙ СКРИПТ ФИЛЬТРАЦИИ С ПОДСЧЕТОМ
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.tag-filter');
    const dishCards = document.querySelectorAll('.dish-card');
    const searchInput = document.getElementById('dish-search');
    const resultsCounter = document.getElementById('results-counter');
    
    // Функция обновления счетчика
    function updateResultsCounter() {
        const visibleCards = document.querySelectorAll('.dish-card[style*="display: block"], .dish-card:not([style*="display: none"])');
        if (resultsCounter) {
            resultsCounter.textContent = visibleCards.length;
        }
    }
    
    // Инициализация счетчика
    updateResultsCounter();
    
    // Фильтрация по тегам
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-tag');
            
            dishCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    const cardTags = card.getAttribute('data-tag');
                    if (cardTags && cardTags.includes(filterValue)) {
                        card.style.display = 'block';
                        card.classList.remove('hidden');
                    } else {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                    }
                }
            });
            
            updateResultsCounter();
        });
    });


    // Поиск
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            // Сбрасываем фильтры при поиске
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-tag') !== 'all') {
                    btn.classList.remove('active');
                }
            });
            document.querySelector('[data-tag="all"]').classList.add('active');
            
            dishCards.forEach(card => {
                const title = card.querySelector('.dish-title').textContent.toLowerCase();
                const description = card.querySelector('.dish-description').textContent.toLowerCase();
                const id = card.querySelector('.dish-id').textContent.toLowerCase();
                const tags = card.querySelectorAll('.tag');
                let tagText = '';
                tags.forEach(tag => tagText += tag.textContent.toLowerCase() + ' ');
                
                if (searchTerm === '' || 
                    title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    id.includes(searchTerm) ||
                    tagText.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
            
            updateResultsCounter();
        });
    }
});
*/

// ФИЛЬТРАЦИЯ ПО ТЕГАМ (БЕЗ ПОИСКА)
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.tag-filter');
    const dishCards = document.querySelectorAll('.dish-card');
    const resultsCounter = document.getElementById('results-counter');
    
    // Функция обновления счетчика видимых карточек
    function updateResultsCounter() {
        let visibleCount = 0;
        dishCards.forEach(card => {
            if (card.style.display !== 'none') {
                visibleCount++;
            }
        });
        
        if (resultsCounter) {
            resultsCounter.textContent = visibleCount;
        }
    }
    
    // Функция фильтрации
    function filterDishes(filterValue) {
        dishCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                // Плавное появление
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                const cardTags = card.getAttribute('data-tag');
                // Проверяем, содержит ли карточка нужный тег
                if (cardTags && cardTags.includes(filterValue)) {
                    card.style.display = 'block';
                    // Плавное появление
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                }
            }
        });
        
        updateResultsCounter();
    }
    
    // Обработчики кликов на кнопки фильтров
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-tag');
            filterDishes(filterValue);
        });
    });
    
    // Инициализация - показываем все блюда и обновляем счетчик
    updateResultsCounter();
});

/*
// ТАЙМЕР ОБРАТНОГО ОТСЧЁТА
function startCountdown() {
    // Устанавливаем время окончания (например, 16:00 сегодня)
    const endTime = new Date();
    endTime.setHours(16, 0, 0, 0); // 16:00 сегодня
    
    // Если уже позже 16:00, устанавливаем на завтра
    if (new Date() > endTime) {
        endTime.setDate(endTime.getDate() + 1);
    }
    
    function updateTimer() {
        const now = new Date();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            // Время вышло
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            document.querySelector('.timer-message').textContent = '⏰ ВРЕМЯ ВЫШЛО! Лаборатория света закрыта.';
            document.querySelector('.timer-message').style.color = '#ff4444';
            return;
        }
        
        // Вычисляем часы, минуты, секунды
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Форматируем с ведущими нулями
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Меняем цвет при малом времени
        if (hours === 0 && minutes < 30) {
            document.querySelector('.timer-display').style.borderColor = '#ff4444';
            document.querySelector('.time-value').forEach(el => el.style.color = '#ff4444');
        }
    }
    
    // Запускаем таймер сразу и каждую секунду
    updateTimer();
    setInterval(updateTimer, 1000);
}

*/

// Анимация появления при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Запускаем анимацию строк по очереди
            const lines = entry.target.querySelectorAll('.light-line');
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.animationPlayState = 'running';
                }, index * 500 + 500);
            });
            
            // Запускаем таймер
            startCountdown();
            
            // Можно остановить наблюдение после первого показа
            observer.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px' // Сработает чуть раньше
});

// ТАЙМЕР ОБРАТНОГО ОТСЧЁТА ДО КОНЦА ПРАЗДНИКА
function startCountdown() {
    // Фиксированная дата праздника
    const partyDate = new Date('2026-02-23T16:00:00'); // ⬅️ ИЗМЕНИ!
    
    if (new Date() > partyDate) {
        showFinishedState();
        return;
    }
    
    function updateTimer() {
        const now = new Date();
        const timeLeft = partyDate - now;
        
        if (timeLeft <= 0) {
            showFinishedState();
            return;
        }
        
        // Только часы, минуты, секунды (макс 23:59:59)
        const totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
        const hours = totalHours % 24; // Не показываем больше 23 часов
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Визуальные эффекты при малом времени
        if (timeLeft < 60 * 60 * 1000) {
            document.querySelector('.timer-display').style.animation = 'pulse 1s infinite';
        }
    }
    
    function showFinishedState() {
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        document.querySelector('.timer-header').innerHTML = 
            '<span class="timer-icon">⏰</span><h3>ЛАБОРАТОРИЯ СВЕТА ЗАКРЫТА</h3>';

        document.querySelector('.timer-message').innerHTML = 
            '🎉 ПРАЗДНИК ЗАВЕРШЁН!<br>Фотосессия light painting окончена.';
        
        // Останавливаем анимацию
        const timer = document.querySelector('.timer-display');
        if (timer) {
            timer.style.animation = 'none';
            timer.style.opacity = '0.5';
        }
    }
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    // Возвращаем interval для очистки
    return interval;
}

// Запускаем при загрузке
document.addEventListener('DOMContentLoaded', () => {
        const easter = document.querySelector('.light-painting-easter');
        if (easter) observer.observe(easter);
        
        // Добавляем звук при клике на примеры (опционально)
        document.querySelectorAll('.example').forEach(example => {
            example.addEventListener('click', function() {
                // Лёгкий звук клика
                const clickSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
                clickSound.volume = 0.1;
                clickSound.play().catch(() => {});
                
                // Эффект "копирования в буфер"
                this.style.background = '#00ff00';
                this.style.color = '#000';
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                }, 300);
            });
        });
    });