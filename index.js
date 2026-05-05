console.log(`Created by IT Knight`);

(async () => {
    
    // Функция ожидания
    const wait = async function(ms) { return new Promise(r => { setTimeout(r, ms == true ? 999999999 : ms); }); };
    
    ((screenMax, screenMin) => { // Функция которая уменьшает сайт

        let ZoomBool = (() => { // true если zoom работает false если не работаетв
            const blockZoom = document.createElement('div');
            blockZoom.style = 'width: 1px; opacity: 0; position: fixed;top: 0px;left: 0px;';
            document.body.appendChild(blockZoom);
            const w = blockZoom.getBoundingClientRect().width;
            blockZoom.style.zoom = 5;
            return blockZoom.getBoundingClientRect().width !== w;
        })();

        const resize = function() {

            const clientWidth = document.documentElement.clientWidth;

            const screen = (clientWidth <= screenMax && clientWidth > screenMin ? screenMax : screenMin);
            
            let interest = ( document.documentElement.clientWidth / screen ); 

            if(ZoomBool) { // Если Zoom работает на андройд
                // 500 <= 1980 && 500 => 768
                if(clientWidth <= screen) {
                    document.body.style.zoom = interest;
                    document.body.style.transform = '';
                    document.body.style.transformOrigin = '';
                    document.body.style.width = '';
                    document.body.style.height = '';
                } else {
                    document.body.style.zoom = '1';
                    document.body.style.transform = '';
                    document.body.style.transformOrigin = '';
                    document.body.style.width = '';
                    document.body.style.height = '';
                }
            } else { // Если zoom не работает на айфонах
                if(clientWidth <= screen) {
                    document.body.style.transform = `scale(${interest})`;
                    document.body.style.transformOrigin = 'left top';
                    document.body.style.width = `calc(100% / ${interest})`;
                    document.body.style.height = `calc(100% / ${interest})`;
                    //
                    document.body.style.zoom = '';
                } else {
                    document.body.style.transform = `scale(${1})`;
                    document.body.style.transformOrigin = 'left top';
                    document.body.style.width = `calc(100% / ${1})`;
                    document.body.style.height = `calc(100% / ${1})`;
                    //
                    document.body.style.zoom = '';
                }
            }
        };

        resize();window.addEventListener('resize', resize);

    })(1920, 768); // Указываю что я хочу что бы с 360px у меня уменьшался сам сайт
    
    const menuFunction = (() => {

        const menu = document.querySelector('#menu');

        return {
            hidden: (b) => {
                if(b) {
                    if(!menu.style.transform || menu.style.transform == 'translateY(0%)') {
                        menu.style.transform = 'translateY(-100%)';
                        menu.style.opacity = '0';
                    }
                } else {
                    if(!menu.style.transform || menu.style.transform == 'translateY(-100%)') {
                        menu.style.transform = 'translateY(0%)';
                        menu.style.opacity = '1';
                    }
                }
            }, 

        }
    })();

    if(true) { // Скрытия меню при прокрутке

        let n = 0;

        let oldScroll = 0; 

        window.addEventListener('scroll', async function() {

            if(window.scrollY < oldScroll) {
                menuFunction.hidden(false);
            } else {
                menuFunction.hidden(true);
            }

            oldScroll = window.scrollY;

            n+=1; const num = n;

            await wait(5000);

            if(num == n) menuFunction.hidden(false);

        });
    }

    if(true) { // Интерактив меню

        (async () => {

            await wait(250);

            menuFunction.hidden(false);

            const mobile_menu = document.querySelector('#mobile-menu');

            document.querySelector('#open-menu').onclick = () => {
                mobile_menu.style.transform = 'translateX(0%)';
                mobile_menu.style.opacity = '1';
            };

            document.querySelector('#menu-close-button').onclick = () => {
                mobile_menu.style.transform = 'translateX(-100%)';
                mobile_menu.style.opacity = '0';
            }

            document.querySelectorAll('#button-info-1').forEach(_ => {_.onclick = () => {

                document.querySelector('#scroll-information').scrollIntoView({
                    behavior: 'smooth', block: 'start'
                });

                mobile_menu.style.transform = 'translateX(-100%)';
                mobile_menu.style.opacity = '0';

            }});

            document.querySelectorAll('#button-info-2').forEach(_ => {_.onclick = () => {

                document.querySelector('#scroll-news').scrollIntoView({
                    behavior: 'smooth', block: 'start'
                });

                mobile_menu.style.transform = 'translateX(-100%)';
                mobile_menu.style.opacity = '0';

            }});

            document.querySelectorAll('#button-info-3').forEach(_ => {_.onclick = () => {

                document.querySelector('#scroll-projects').scrollIntoView({
                    behavior: 'smooth', block: 'start'
                });

                mobile_menu.style.transform = 'translateX(-100%)';
                mobile_menu.style.opacity = '0';

            }});

            document.querySelectorAll('#button-info-4').forEach(_ => {_.onclick = () => {

                document.querySelector('#scroll-services').scrollIntoView({
                    behavior: 'smooth', block: 'start'
                });

                mobile_menu.style.transform = 'translateX(-100%)';
                mobile_menu.style.opacity = '0';

            }});

            document.querySelector('#button-watch').onclick = () => {
                document.querySelector('#scroll-services').scrollIntoView({
                    behavior: 'smooth', block: 'start'
                });
            }


        })();
    }

    if(true) { // Управление новостями по кликам

        // Блок новосного контента
        const nb = document.querySelectorAll('#news-block');

        // Создаем блоки новигаторы
        const navigator = [];
        const news_navigator = document.querySelector('#news-navigator');
        nb.forEach(newp => {
            const p = document.createElement('p');
            news_navigator.appendChild(p);
            navigator.push(p);
        });

        // Ставим гелеральные классы
        navigator[0].classList.add('news-general-navigator');
        nb[0].classList.add('news-block-general');

        // Блок скролл новостново контента
        const news_content = document.querySelector('#news-scroll');

        // Блок куда смотрят
        let numBlock = 0;

        // Ставим первый блок в центр
        news_content.scrollTo({
            left: ( nb[0].offsetLeft + ( nb[0].offsetWidth / 2 ) - ( ( news_content.offsetWidth / 2 ) ) ),
        });

        window.addEventListener('resize', () => {
            setTimeout(() => {
                news_content.scrollTo({
                    left: ( nb[numBlock].offsetLeft + ( nb[numBlock].offsetWidth / 2 ) - ( ( news_content.offsetWidth / 2 ) ) ),
                });
            }, 500);
        });

        // Переключаем новости
        const scrollingNews = (x) => {

            let oldNumBlock = numBlock;

            if(!x) {
                if(numBlock > 0) numBlock-=1;
            } else {
                if(numBlock < nb.length-1) numBlock+=1
            }

            navigator[numBlock].classList.add('news-general-navigator');
            nb[numBlock].classList.add('news-block-general');

            if(oldNumBlock !== numBlock) navigator[oldNumBlock].classList.remove('news-general-navigator');
            if(oldNumBlock !== numBlock) nb[oldNumBlock].classList.remove('news-block-general');

            news_content.scrollTo({
                left: ( nb[numBlock].offsetLeft + ( nb[numBlock].offsetWidth / 2 ) - ( ( news_content.offsetWidth / 2 ) ) ),
                behavior: 'smooth',
            });
            
        }

        // Кнопка налева
        document.querySelector('#news-left').onclick = () => {
            scrollingNews(false);
        }

        // Кнопка направа
        document.querySelector('#news-right').onclick = () => {
            scrollingNews(true);
        }

    }

})();

