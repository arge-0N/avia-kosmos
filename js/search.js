document.addEventListener("DOMContentLoaded", () => {
    const searchIndex = [
        { title: "Главная", url: "index.html", keywords: "главная дом старт" },
        { title: "Лента времени", url: "pages/timeline.html", keywords: "история даты события" },
        { title: "Личности", url: "pages/heroes.html", keywords: "герои космонавты летчики" },
        { title: "Карта героев", url: "pages/map.html", keywords: "карта география регионы" },
        { title: "Подготовка", url: "pages/training.html", keywords: "тренировки центрифуга" },
        { title: "Словарь", url: "pages/dictionary.html", keywords: "термины скафандр" },
        { title: "Игровая зона", url: "pages/games.html", keywords: "игры аркада конструктор" },
        { title: "Квиз", url: "pages/quiz.html", keywords: "тест вопросы викторина" },
        { title: "Устройство", url: "pages/device.html", keywords: "ракета самолет схема" },
        { title: "Достижения", url: "pages/achievements.html", keywords: "медали награды" },
        { title: "О сайте", url: "pages/parents.html", keywords: "информация автор" },
        { title: "Юрий Гагарин", url: "articles/gagarin.html", keywords: "первый космос поехали" },
        { title: "Сергей Королёв", url: "articles/korolev.html", keywords: "конструктор ракета" },
        { title: "Алексей Леонов", url: "articles/leonov.html", keywords: "выход открытый космос" },
        { title: "Валентина Терешкова", url: "articles/tereshkova.html", keywords: "женщина чайка" },
        { title: "Белка и Стрелка", url: "articles/belka_strelka.html", keywords: "собаки животные" }
    ];

    const input = document.getElementById('searchInput');
    const resultsBox = document.getElementById('searchResults');
    if (!input || !resultsBox) return;

    const isSubfolder = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/articles/');
    const basePath = isSubfolder ? '../' : '';

    input.addEventListener('input', function() {
        let query = this.value.toLowerCase().trim();
        resultsBox.innerHTML = '';
        
        if (query.length < 2) {
            resultsBox.style.display = 'none';
            return;
        }

        const filtered = searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) || item.keywords.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
            resultsBox.style.display = 'block';
            filtered.forEach(item => {
                const a = document.createElement('a');
                a.href = basePath + item.url;
                a.innerText = item.title;
                a.style.cssText = 'display:block; padding:10px 15px; color:#fff; text-decoration:none; border-bottom:1px solid rgba(255,255,255,0.1); font-size:1rem;';
                a.onmouseover = () => a.style.background = 'rgba(0, 210, 255, 0.2)';
                a.onmouseout = () => a.style.background = 'transparent';
                resultsBox.appendChild(a);
            });
        } else {
            resultsBox.style.display = 'block';
            resultsBox.innerHTML = '<div style="padding:10px; color:#94a3b8; text-align:center;">Ничего не найдено</div>';
        }
    });

    document.addEventListener('click', (e) => {
        if (!document.getElementById('searchContainer').contains(e.target)) {
            resultsBox.style.display = 'none';
        }
    });
});