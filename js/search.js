document.addEventListener("DOMContentLoaded", () => {
    // 1. Индекс всех страниц для поиска
    const searchIndex = [
        { title: "Главная", url: "index.html", keywords: "главная дом старт" },
        { title: "Лента времени", url: "pages/timeline.html", keywords: "история даты события хронология" },
        { title: "Личности", url: "pages/heroes.html", keywords: "герои космонавты летчики" },
        { title: "Карта героев", url: "pages/map.html", keywords: "карта география регионы родина" },
        { title: "Подготовка", url: "pages/training.html", keywords: "тренировки центрифуга невесомость" },
        { title: "Словарь", url: "pages/dictionary.html", keywords: "термины скафандр орбита невесомость" },
        { title: "Игровая зона", url: "pages/games.html", keywords: "игры аркада конструктор" },
        { title: "Квиз", url: "pages/quiz.html", keywords: "тест вопросы викторина" },
        { title: "Устройство техники", url: "pages/device.html", keywords: "ракета самолет луноход схема" },
        { title: "Достижения", url: "pages/achievements.html", keywords: "медали награды ачивки" },
        { title: "О сайте", url: "pages/parents.html", keywords: "информация автор проект" },
        { title: "Юрий Гагарин", url: "articles/gagarin.html", keywords: "первый космос поехали" },
        { title: "Сергей Королёв", url: "articles/korolev.html", keywords: "конструктор ракета главный" },
        { title: "Алексей Леонов", url: "articles/leonov.html", keywords: "выход открытый космос" },
        { title: "Валентина Терешкова", url: "articles/tereshkova.html", keywords: "женщина чайка" },
        { title: "Герман Титов", url: "articles/titov.html", keywords: "сутки молодой" },
        { title: "Белка и Стрелка", url: "articles/belka_strelka.html", keywords: "собаки животные" },
        { title: "Валерий Чкалов", url: "articles/chkalov.html", keywords: "летчик полюс перелет" },
        { title: "Павел Сухой", url: "articles/sukhoi.html", keywords: "конструктор су самолет" },
        { title: "Игорь Сикорский", url: "articles/sikorsky.html", keywords: "витязь вертолет" },
        { title: "Тимур Энеев", url: "articles/eneev.html", keywords: "ученый баллистика расчеты" },
        { title: "Светлана Савицкая", url: "articles/savitskaya.html", keywords: "женщина открытый космос" },
        { title: "Геннадий Падалка", url: "articles/padalka.html", keywords: "рекорд время" },
        { title: "Валерий Поляков", url: "articles/polyakov.html", keywords: "рекорд долгий полет" }
    ];

    // 2. Добавляем HTML строку поиска в шапку
    const nav = document.querySelector('header nav');
    if (nav && !document.getElementById('searchContainer')) {
        const searchContainer = document.createElement('div');
        searchContainer.id = 'searchContainer';
        searchContainer.innerHTML = `
            <input type="text" id="searchInput" placeholder="Поиск..." autocomplete="off">
            <div id="searchResults"></div>
        `;
        nav.parentNode.insertBefore(searchContainer, nav);
        
        const isSubfolder = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/articles/');
        const basePath = isSubfolder ? '../' : '';

        const input = document.getElementById('searchInput');
        const resultsBox = document.getElementById('searchResults');

        input.addEventListener('input', function() {
            let query = this.value.toLowerCase().trim();
            resultsBox.innerHTML = '';
            
            // ==========================================
                                    // ПАСХАЛКА: НЕВЕСОМОСТЬ
            if (query === 'невесомость' || query === 'невисомость') {
                document.body.style.userSelect = 'none';
                const elements = document.querySelectorAll('main p, main h1, main h2, main h3, main li, main img, main .card, header a, header button, footer p');
                elements.forEach(el => {
                    const delay = Math.random() * 2;
                    const duration = 3 + Math.random() * 3;
                    const rot = (Math.random() * 10 - 5).toFixed(1);
                    const x = (Math.random() * 40 - 20).toFixed(1);
                    const y = (Math.random() * 40 - 20).toFixed(1);
                    el.style.setProperty('--delay', `${delay}s`);
                    el.style.setProperty('--duration', `${duration}s`);
                    el.style.setProperty('--rot', `${rot}deg`);
                    el.style.setProperty('--x', `${x}px`);
                    el.style.setProperty('--y', `${y}px`);
                    el.classList.add('floating-element');
                });
                setTimeout(() => {
                    elements.forEach(el => {
                        el.classList.remove('floating-element');
                        el.style.removeProperty('--delay');
                        el.style.removeProperty('--duration');
                        el.style.removeProperty('--rot');
                        el.style.removeProperty('--x');
                        el.style.removeProperty('--y');
                    });
                    document.body.style.userSelect = '';
                }, 7000);
                input.value = '';
                resultsBox.style.display = 'none';
                return;
            }
// ПАСХАЛКА: ЗВЕЗДОПАД
            // ==========================================
            if (query === 'звезда' || query === 'звезды') {
                for (let i = 0; i < 15; i++) {
                    const star = document.createElement('div');
                    star.innerText = '⭐';
                    star.style.cssText = `position:fixed; top:-50px; left:${Math.random()*100}vw; font-size:${Math.random()*20+15}px; z-index:9999; transition: transform ${Math.random()*2+1}s linear; pointer-events:none;`;
                    document.body.appendChild(star);
                    setTimeout(() => star.style.transform = `translateY(110vh) rotate(${Math.random()*360}deg)`, 50);
                    setTimeout(() => star.remove(), 4000);
                }
                input.value = ''; // Очищаем поле после активации
                resultsBox.style.display = 'none';
                return;
            }

            // ==========================================
            // ОБЫЧНЫЙ ПОИСК
            // ==========================================
            if (query.length < 2) {
                resultsBox.style.display = 'none';
                return;
            }

            const filtered = searchIndex.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.keywords.toLowerCase().includes(query)
            );

            if (filtered.length > 0) {
                resultsBox.style.display = 'block';
                filtered.forEach(item => {
                    const a = document.createElement('a');
                    a.href = basePath + item.url;
                    a.innerText = item.title;
                    resultsBox.appendChild(a);
                });
            } else {
                resultsBox.style.display = 'block';
                resultsBox.innerHTML = '<div style="padding:10px; color:#9aa4c7; text-align:center;">Ничего не найдено</div>';
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) resultsBox.style.display = 'none';
        });
    }

    // ПАСХАЛКА ДЛЯ БЕЛКИ И СТРЕЛКИ (клик по фото)
    if (window.location.pathname.includes('belka_strelka.html')) {
        const img = document.querySelector('article img');
        if (img) {
            img.style.cursor = 'pointer';
            img.title = 'Нажми на меня!';
            img.addEventListener('click', () => {
                const audio = new Audio('../img/gav.mp3');
                audio.play().catch(e => alert('Гав-гав! (Скачайте файл gav.mp3 в папку img)'));
            });
        }
    }
});