document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mascotRoot')) return;

    const mascot = document.createElement('div');
    mascot.className = 'mascot-container';
    mascot.id = 'mascotRoot';
    
    const isSubfolder = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/articles/');
    const basePath = isSubfolder ? '../' : '';

    mascot.innerHTML = `
        <div class="mascot-bubble" id="mascotBubble">
            <div id="bubbleText">Гав! Привет!</div>
        </div>
        <div class="mascot-avatar"><img src="${basePath}img/maskot.png" alt="Белка и Стрелка"></div>
    `;
    
    document.body.appendChild(mascot);

    const bubble = document.getElementById('mascotBubble');
    const bubbleText = document.getElementById('bubbleText');
    
    // --- ГЛОБАЛЬНАЯ ФУНКЦИЯ ОБЩЕНИЯ ---
    window.mascotSpeak = function(text, duration = 5000) {
        if (document.getElementById('tourNextBtn')) return; // Не перебиваем тур

        const audio = new Audio(basePath + 'img/gav.mp3');
        audio.volume = 0.4;
        audio.play().catch(e => {});

        bubbleText.innerHTML = text;
        mascot.classList.add('show-bubble');

        const avatar = mascot.querySelector('.mascot-avatar');
        if (avatar) {
            avatar.style.transform = 'scale(1.15) rotate(-5deg)';
            setTimeout(() => avatar.style.transform = 'scale(1.1) rotate(5deg)', 300);
        }

        clearTimeout(window.mascotMsgTimeout);
        window.mascotMsgTimeout = setTimeout(() => {
            mascot.classList.remove('show-bubble');
        }, duration);
    };

    // --- СЛОВАРИ ФРАЗ ---
    const phrases = {
        correct: [
            "Вау, правильно! Ты настоящий космонавт! 🌟",
            "Отличный ответ! Так держать! 🚀",
            "Блестяще! Ты знаешь космос на 5! 🏆",
            "Гав! Точно в цель! 🎯"
        ],
        wrong: [
            "Ой, не совсем. Но не сдавайся, попробуй еще! 🚀",
            "Почти получилось! Вспомни статью, там есть ответ. 📖",
            "Не расстраивайся, у всех бывают ошибки. Ты справишься! 💪"
        ],
        gameStart: [
            "Отличный выбор! Удачи в игре! 🎮",
            "Поехали! Собери все звезды! ⭐",
            "Вперед к победе! Гав! 🐾"
        ],
        mention: [
            "Гав! Это мы! Мы очень рады, что ты читаешь про нас! 🐶",
            "О, ты нашел упоминание о нас! Мы самые известные собаки в мире! 🌍",
            "Ты знал, что мы летали на корабле 'Спутник-5'? 🛰️",
            "Привет! Спасибо, что помнишь о нас! Мы гордимся, что были в космосе! 🚀",
            "Гав-гав! Мы очень любим, когда про нас читают! ❤️"
        ]
    };

    function getRandomPhrase(category) {
        const arr = phrases[category];
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // --- УМНЫЙ ПЕРЕХВАТЧИК КЛИКОВ ---
    document.addEventListener('click', (e) => {
        // 1. Ответы в квизе
        const optionBtn = e.target.closest('.option-btn');
        if (optionBtn) {
            setTimeout(() => {
                if (optionBtn.classList.contains('correct')) {
                    window.mascotSpeak(getRandomPhrase('correct'));
                } else if (optionBtn.classList.contains('wrong')) {
                    window.mascotSpeak(getRandomPhrase('wrong'));
                }
            }, 100);
        }

        // 2. Кнопки в играх
        const gameBtn = e.target.closest('.btn');
        if (gameBtn && (gameBtn.innerText.includes('Играть') || gameBtn.innerText.includes('Старт'))) {
            window.mascotSpeak(getRandomPhrase('gameStart'));
        }

        // 3. Пасхалка Леонова
        if (e.target.id === 'zero-g-btn') {
            window.mascotSpeak("Смотри, мы в невесомости! Все летает! 🌌", 7000);
        }

        // 4. Реакция на клик по упоминанию себя в тексте
        if (e.target.classList.contains('mascot-mention')) {
            window.mascotSpeak(getRandomPhrase('mention'));
        }
    });

    // --- АВТО-ПОИСК УПОМИНАНИЙ СЕБЯ В ТЕКСТЕ ---
    function wrapMentions() {
        const regex = /(Белка|Стрелка|Белки|Стрелки|собак[аи]|собаки|псы|пёс)/gi;
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Игнорируем скрипты, стили и уже обработанные элементы
                    if (['SCRIPT', 'STYLE', 'A', 'BUTTON', 'SPAN'].includes(node.parentNode.nodeName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        const nodesToReplace = [];
        while (node = walker.nextNode()) {
            if (node.nodeValue.match(regex)) {
                nodesToReplace.push(node);
            }
        }

        nodesToReplace.forEach(textNode => {
            const span = document.createElement('span');
            span.innerHTML = textNode.nodeValue.replace(regex, match => {
                return `<span class="mascot-mention" style="cursor:pointer; color:var(--accent); border-bottom:1px dashed var(--accent);" title="Нажми на меня!">${match}</span>`;
            });
            textNode.parentNode.replaceChild(span, textNode);
        });
    }

    // Запускаем поиск упоминаний через секунду после загрузки (чтобы подгрузился весь контент)
    setTimeout(wrapMentions, 1000);

    // --- ТУРЫ (БЕЗ ИЗМЕНЕНИЙ) ---
    const path = window.location.pathname;
    let pageId = 'home';
    if (path.includes('map')) pageId = 'map';
    else if (path.includes('games')) pageId = 'games';
    else if (path.includes('quiz')) pageId = 'quiz';
    else if (path.includes('heroes')) pageId = 'heroes';
    else if (path.includes('dictionary')) pageId = 'dictionary';
    else if (path.includes('device')) pageId = 'device';
    else pageId = 'home';

    const tours = {
        'home': [
            { target: 'header nav', text: "Смотри, это главное меню!", clickable: false },
            { target: '#searchContainer', text: "А это поиск. Напиши сюда 'Гагарин'!", clickable: false },
            { target: 'main .heroes-grid .card', text: "Тут живут герои. Нажми на любую карточку!", clickable: true }
        ],
        'heroes': [{ target: 'main .heroes-grid .card', text: "Выбирай героя и читай!", clickable: true }],
        'map': [{ target: '.map-container', text: "Это карта! Наведи на золотые точки!", clickable: false }],
        'games': [{ target: 'main .card', text: "Здесь наши игры!", clickable: true }],
        'quiz': [{ target: '.quiz-wrapper .btn, main .btn', text: "Это квиз! Нажми, чтобы начать.", clickable: true }],
        'dictionary': [{ target: 'details', text: "Это словарь. Нажми на слово!", clickable: false }],
        'device': [{ target: 'main .tabs', text: "Выбирай технику!", clickable: false }]
    };

    let highlightedElement = null;
    function runTour() {
        if (!tours[pageId]) return;
        let currentStep = 0;

        function startTour() {
            if (currentStep >= tours[pageId].length) { endTour(); return; }
            const step = tours[pageId][currentStep];
            const targetEl = document.querySelector(step.target);

            if (!targetEl) { currentStep++; startTour(); return; }

            if (highlightedElement) {
                highlightedElement.classList.remove('tour-highlight');
                highlightedElement.removeEventListener('click', nextStepHandler);
            }

            highlightedElement = targetEl;
            highlightedElement.classList.add('tour-highlight');
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

            bubbleText.innerHTML = `
                <div style="font-size:0.8rem; color:var(--accent); margin-bottom:5px;">Шаг ${currentStep + 1} из ${tours[pageId].length}</div>
                ${step.text} <br><br>
                <button id="tourNextBtn" style="background:var(--accent); color:#000; border:none; padding:8px 15px; border-radius:20px; font-weight:bold; cursor:pointer; font-family:inherit; width:100%;">
                    ${step.clickable ? 'Нажми на подсвеченный элемент 👆' : 'Дальше ➔'}
                </button>
            `;
            mascot.classList.add('show-bubble');

            if (step.clickable) {
                const btn = document.getElementById('tourNextBtn');
                if(btn) btn.style.display = 'none';
                highlightedElement.addEventListener('click', nextStepHandler);
            } else {
                const btn = document.getElementById('tourNextBtn');
                if(btn) btn.addEventListener('click', nextStepHandler);
            }
        }

        function nextStepHandler(e) { if (e) e.preventDefault(); currentStep++; startTour(); }

        function endTour() {
            if (highlightedElement) {
                highlightedElement.classList.remove('tour-highlight');
                highlightedElement.removeEventListener('click', nextStepHandler);
            }
            bubbleText.innerHTML = "Ура! Ты молодец! Теперь ты знаешь, как тут всё устроено.";
            setTimeout(() => { mascot.classList.remove('show-bubble'); localStorage.setItem('mascotTour_' + pageId, 'true'); }, 4000);
        }
        startTour();
    }

    if (!localStorage.getItem('mascotTour_' + pageId)) {
        setTimeout(runTour, 1000);
    }

    // Обычный клик (факты)
    const facts = ["Мы — Белка и Стрелка!", "В космосе космонавты вырастают на 5 см!", "Гагарин сказал «Поехали!»", "Скафандр весит 100 кг!"];
    mascot.addEventListener('click', () => {
        if (document.getElementById('tourNextBtn')) return;
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        bubbleText.innerHTML = `
            ${randomFact} <br><br>
            <button id="restartTourBtn" style="background:transparent; border:1px solid var(--border); color:var(--text-muted); padding:5px 10px; border-radius:10px; cursor:pointer; font-size:0.8rem; width:100%;">Показать обучение заново</button>
        `;
        mascot.classList.add('show-bubble');
        const restartBtn = document.getElementById('restartTourBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mascot.classList.remove('show-bubble');
                localStorage.removeItem('mascotTour_' + pageId);
                runTour();
            });
        }
    });
});