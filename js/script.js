document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    if (!header) return;
    // Функция управления классом active
    function updateHeaderClass() {
        const scrollY = window.scrollY;
        // Если скролл >= 70px - добавляем класс
        // Если скролл < 70px - убираем класс
        if (scrollY >= 70) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    }

    // Отслеживание скролла
    window.addEventListener('scroll', function () {
        updateHeaderClass();
    });

    // Первоначальная проверка при загрузке
    updateHeaderClass();
});



// Находим все элементы стрелок спойлеров
const spoilerArrows = document.querySelectorAll('.spoller-faq__title');

// Добавляем обработчик клика для каждой стрелки
spoilerArrows.forEach(arrow => {
    arrow.addEventListener('click', function () {
        // Находим родительский элемент спойлера
        const spoilerItem = this.closest('.spoller-faq');

        // Переключаем класс active
        spoilerItem.classList.toggle('active');

        // Находим блок с описанием
        const spoilerContent = spoilerItem.querySelector('.spoller-faq__desp');

        // Если спойлер активен, показываем содержимое, иначе скрываем
        if (spoilerItem.classList.contains('active')) {
            // Плавно показываем содержимое
            spoilerContent.style.maxHeight = spoilerContent.scrollHeight + 20 + 'px';
        } else {
            // Скрываем содержимое
            spoilerContent.style.maxHeight = '0px';
        }
    });

    // Также можно добавить возможность открыть спойлер, нажав на заголовок
    const spoilerTitles = document.querySelectorAll('.spoler-faq__title');

    spoilerTitles.forEach(title => {
        title.addEventListener('click', function () {
            // Находим родительский элемент спойлера
            const spoilerItem = this.closest('.spoler-faq');

            // Имитируем клик по стрелке
            const arrow = spoilerItem.querySelector('.spoler-faq__arrow');
            arrow.click();
        });
    });

    // Инициализация - скрываем все описания при загрузке страницы
    const spoilerContents = document.querySelectorAll('.spoler-faq__desp');
    spoilerContents.forEach(content => {
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
        content.style.transition = 'all 0.4s ease-in-out';
    });
});



const tabs = document.querySelectorAll('.why__tab');
const tabContents = document.querySelectorAll('.why__content-tab');

tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        // Убираем active у всех табов
        tabs.forEach(t => t.classList.remove('active'));

        // Убираем active у всех контентов
        tabContents.forEach(content => content.classList.remove('active'));

        // Добавляем active текущему табу
        this.classList.toggle('active');

        // Находим и показываем соответствующий контент
        const activeContent = document.querySelector(`.why__content-tab[data-tab-content="${tabId}"]`);
        if (activeContent) {
            activeContent.classList.toggle('active');
        }

    });
});


const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                if (!animItem.classList.contains('_active')) {
                    animItem.classList.add('_active');

                    // Проверяем, есть ли числа для анимации
                    const numbers = animItem.querySelectorAll('[data-number]');
                    if (numbers.length > 0) {
                        animateNumbers(animItem);
                    }
                }
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    // Функция анимации чисел (если нужна)
    function animateNumbers(element) {
        const numbers = element.querySelectorAll('[data-number]');

        numbers.forEach(numberElement => {
            const finalNumber = parseInt(numberElement.getAttribute('data-number'));
            const duration = 2000; // 2 секунды
            const startTime = performance.now();

            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);

                const currentNumber = Math.floor(easeOut * finalNumber);
                numberElement.textContent = currentNumber;

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    numberElement.textContent = finalNumber; // Устанавливаем финальное значение
                }
            }

            requestAnimationFrame(updateNumber);
        });
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}
// Навигация футера
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');

        if (href === '#missionBtn') {
            const sections = document.querySelectorAll('main section');
            const missionSection = sections[1]; // СОЦИАЛЬНАЯ МИССИЯ
            missionSection.scrollIntoView({ behavior: 'smooth' });
        } else if (href === '#aboutBtn') {
            const sections = document.querySelectorAll('main section');
            const conceptSection = sections[2]; // КОНЦЕПЦИЯ ПРОЕКТА
            conceptSection.scrollIntoView({ behavior: 'smooth' });
        } else if (href.startsWith('http') || href.endsWith('.php')) {
            // Перенаправление для внешних ссылок и страниц
            window.location.href = href;
        }
    });
});

// Added collapsible behavior
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".why__tab");
    const contents = document.querySelectorAll(".why__content-tabs");

    function closeAllContents() {
        contents.forEach(c => c.classList.remove("open"));
        contents.forEach(c => c.classList.remove("active"));
        contents.forEach(c => {
            const box = c.querySelector(".tab-content__conts");
            if (box) box.style.maxHeight = "0";
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const tabId = tab.getAttribute("data-tab");
            closeAllContents();
            const targetContent = document.querySelector(`.why__content-tab[data-tab-content="${tabId}"]`);
            targetContent.classList.toggle("open");
            const box = targetContent.querySelector(".tab-content__conts");
            if (box) box.style.maxHeight = "2000px";

        });
    });

    let appStore = document.getElementById('app-store').querySelector('img');
    let google = document.getElementById('google-play').querySelector('img');

    let modalGoogle = document.querySelector('.modal-google');
    // let modalContent = modalGoogle.querySelector('.modal-content') || modalGoogle;

    // Функция закрытия модального окна
    function closeModal() {
        modalGoogle.classList.remove('show', 'popap');
        modalGoogle.classList.add('none');
        document.removeEventListener('click', handleOutsideClick);
    }


    function openModal(modalClass) {
        // Закрываем предыдущее состояние
        modalGoogle.classList.remove('popap', 'popap-two');

        // Открываем с новым классом
        modalGoogle.classList.remove('none');
        modalGoogle.classList.add('show', modalClass);

        // Добавляем обработчик закрытия при клике вне окна
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
        }, 0);
    }

    // Обработчик клика вне модального окна
    function handleOutsideClick(event) {
        // Проверяем, был ли клик вне модального окна
        if (!modalGoogle.contains(event.target) &&
            event.target !== google &&
            event.target !== appStore &&
            !google.contains(event.target) &&
            !appStore.contains(event.target)) {
            closeModal();
        }
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape' && modalGoogle.classList.contains('show')) {
            closeModal();
        }
    }

    document.addEventListener('keydown', handleEscapeKey);

    google.addEventListener('click', (event) => {
        event.stopPropagation(); // Предотвращаем всплытие
        if (modalGoogle.classList.contains('show')) {
            closeModal();
        } else {
            modalGoogle.style.cssText = `
                    top: 36%;
                    left: 46.4%;
            `
            openModal('popap');
        }
    });

    appStore.addEventListener('click', (event) => {
        event.stopPropagation(); // Предотвращаем всплытие
        if (modalGoogle.classList.contains('show')) {
            closeModal();
        } else {
            modalGoogle.style.cssText = `
                    top: 36%;
                    left: 60.1%;
            `
            openModal('popap');
        }
    });
});

let tabOne = document.getElementById('why__tab__one')
let tabTwo = document.getElementById('why__tab__two')
let arrowtabOne = document.querySelector('.arrowtabOne')
let arrowtabTwo = document.querySelector('.arrowtabTwo')
let why__content = document.querySelectorAll('.why__content-tab')
let why__content__tab1 = document.querySelector('.why__content-tab1')
let why__content__tab2 = document.querySelector('.why__content-tab2')

tabOne.addEventListener('click', () => {
    tabTwo.querySelector('p').classList.remove('activTab')
    tabOne.querySelector('p').classList.toggle('activTab')
    arrowtabOne.classList.toggle('svgRotate')
    if (arrowtabOne.classList.contains('svgRotate')) {
        arrowtabOne.querySelector('path').style.fill = 'black'
        closeAllContents()
    } else {
        why__content__tab1.classList.toggle('active')
        arrowtabOne.querySelector('path').style.fill = '#75758E'
    }
})
tabTwo.addEventListener('click', () => {
    tabOne.querySelector('p').classList.remove('activTab')
    tabTwo.querySelector('p').classList.toggle('activTab')
    arrowtabTwo.classList.toggle('svgRotate')
    if (arrowtabTwo.classList.contains('svgRotate')) {
        arrowtabTwo.querySelector('path').style.fill = 'black'
    } else {
        why__content__tab2.classList.toggle('active')
        arrowtabTwo.querySelector('path').style.fill = '#75758E'
    }
})

document.querySelectorAll('.why__tab').forEach(tab => {
    tab.addEventListener('click', function () {
        if (tab.classList.contains('activTab')) {
            this.classList.remove('activTab');
        }
        tab.classList.toggle('active');
        document.querySelectorAll('.why__tab').forEach(t => {
            t.classList.remove('active');
        });
    });
});

let modalLink = document.querySelectorAll('.modal-link');
let modalOverlay = document.querySelector('.modal-overlay');
for (let item of modalLink) {
    item.addEventListener('click', (event) => {
        modalOverlay.classList.toggle('none')
        if (modalOverlay.style.display == 'none') {
            modalOverlay.style.display = 'flex'
        } else {
            modalOverlay.style.display = 'none'
        }
        if (event.key === 'Escape') {
            modalOverlay.style.display = 'none'
        }
    })
}





// На главной странице (index.html) добавьте этот скрипт
document.addEventListener('DOMContentLoaded', function () {
    // Проверяем, есть ли параметр reload в URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('reload')) {
        // Убираем параметр из URL без перезагрузки
        window.history.replaceState({}, document.title, window.location.pathname);

        // Опционально: можно принудительно перезагрузить некоторые элементы
        console.log('Страница была перезагружена');
    }
});


// document.addEventListener('DOMContentLoaded', function() {
//     // Функция для инициализации аккордеона
//     function initAccordion() {
//         const accordionItems = document.querySelectorAll('.footer-row2__item');
//         const windowWidth = window.innerWidth;
        
//         // Инициализируем только на мобильных (<= 900px)
//         if (windowWidth <= 900) {
//             accordionItems.forEach(item => {
//                 const header = item.querySelector('.footer-row2__header');
//                 const content = item.querySelector('.footer-row2__content');
                
//                 // Сначала скрываем все контенты
//                 content.style.display = 'none';
                
//                 header.addEventListener('click', function() {
//                     // Закрываем все другие элементы
//                     accordionItems.forEach(otherItem => {
//                         if (otherItem !== item) {
//                             otherItem.classList.remove('active');
//                             otherItem.querySelector('.footer-row2__content').style.display = 'none';
//                         }
//                     });
                    
//                     // Переключаем текущий элемент
//                     const isActive = item.classList.contains('active');
//                     item.classList.toggle('active');
                    
//                     if (item.classList.contains('active')) {
//                         content.style.display = 'flex';
//                     } else {
//                         content.style.display = 'none';
//                     }
//                 });
//             });
            
//             // По умолчанию открываем первый элемент
//             if (accordionItems.length > 0) {
//                 accordionItems[0].classList.add('active');
//                 accordionItems[0].querySelector('.footer-row2__content').style.display = 'flex';
//             }
//         } else {
//             // На десктопе показываем все элементы
//             accordionItems.forEach(item => {
//                 item.querySelector('.footer-row2__content').style.display = 'flex';
//                 item.classList.remove('active');
//             });
//         }
//     }
    
//     // Инициализируем при загрузке
//     initAccordion();
    
//     // Обновляем при изменении размера окна
//     let resizeTimer;
//     window.addEventListener('resize', function() {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(initAccordion, 250);
//     });
// });


// document.addEventListener('DOMContentLoaded', function() {
//     function initAccordion() {
//         const accordionItems = document.querySelectorAll('.footer-row2__item');
//         const windowWidth = window.innerWidth;
        
//         // Инициализируем только на мобильных (<= 900px)
//         if (windowWidth <= 900) {
//             accordionItems.forEach(item => {
//                 const header = item.querySelector('.footer-row2__header');
//                 const content = item.querySelector('.footer-row2__content');
//                 const links = content.querySelectorAll('footer-row2__item');
//                 links = links.querySelectorAll('a')
//                 console.log(links);
                
//                 // Сначала скрываем все контенты
//                 content.style.maxHeight = '0';
//                 content.style.opacity = '0';
//                 content.style.paddingBottom = '0';
                
//                 // Отключаем клики по ссылкам по умолчанию
//                 links.forEach(link => {
//                     link.style.pointerEvents = 'none';
//                     link.style.display= 'none';
//                 });
                
//                 header.addEventListener('click', function(e) {
//                     e.preventDefault();
//                     e.stopPropagation();
                    
//                     const isActive = item.classList.contains('active');
                    
//                     // Закрываем все другие элементы
//                     accordionItems.forEach(otherItem => {
//                         if (otherItem !== item) {
//                             otherItem.classList.remove('active');
//                             const otherContent = otherItem.querySelector('.footer-row2__content');
//                             const otherLinks = otherContent.querySelectorAll('a');
                            
//                             otherContent.style.maxHeight = '0';
//                             otherContent.style.opacity = '0';
//                             otherContent.style.paddingBottom = '0';
                            
//                             otherLinks.forEach(link => {
//                                 link.style.pointerEvents = 'none';
//                             });
//                         }
//                     });
                    
//                     // Переключаем текущий элемент
//                     item.classList.toggle('active');
                    
//                     if (item.classList.contains('active')) {
//                         content.style.maxHeight = content.scrollHeight + 'px';
//                         content.style.opacity = '1';
//                         content.style.paddingBottom = '15px';
                        
//                         // Включаем клики по ссылкам
//                         setTimeout(() => {
//                             links.forEach(link => {
//                                 link.style.pointerEvents = 'auto';
//                             });
//                         }, 300);
//                     } else {
//                         content.style.maxHeight = '0';
//                         content.style.opacity = '0';
//                         content.style.paddingBottom = '0';
                        
//                         // Отключаем клики по ссылкам
//                         links.forEach(link => {
//                             link.style.pointerEvents = 'none';
//                         });
//                     }
//                 });
//             });
//         } else {
//             // На десктопе показываем все элементы
//             accordionItems.forEach(item => {
//                 item.classList.remove('active');
//                 const content = item.querySelector('.footer-row2__content');
//                 const links = content.querySelectorAll('a');
                
//                 content.style.maxHeight = 'none';
//                 content.style.opacity = '1';
//                 content.style.paddingBottom = '0';
                
//                 // Включаем клики по ссылкам
//                 links.forEach(link => {
//                     link.style.pointerEvents = 'auto';
//                 });
//             });
//         }
//     }
    
//     // Инициализируем при загрузке
//     initAccordion();
    
//     // Обновляем при изменении размера окна
//     let resizeTimer;
//     window.addEventListener('resize', function() {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(initAccordion, 250);
//     });
// });