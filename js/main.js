// ========================
// Volts Soluções em Elétrica
// Site institucional - JS
// ========================

document.addEventListener('DOMContentLoaded', () => {

    // pegando os elementos da página
    const loader = document.getElementById('loader');
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const revealElements = document.querySelectorAll('[data-reveal]');
    const sections = document.querySelectorAll('section[id]');

    // tela de loading - some depois de 800ms
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 800);
    });

    // efeito de sombra no header quando rola a página
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    });

    // menu mobile - abre e fecha
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // fecha o menu quando clica num link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // deixa o link da nav destacado conforme a seção visível
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // animação de entrada quando o elemento aparece na tela
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // scroll suave até a seção
    function scrollToSection(href) {
        const target = document.querySelector(href);
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href'));
        });
    });

    // parallax nos orbs do hero - se move mais devagar que a página
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.hero__orb');
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.15;
            orb.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
        });
    });

    // marquee infinito - rola os serviços sem parar
    const marqueeTrack = document.getElementById('marquee');
    if (marqueeTrack) {
        const text = 'ADEQUAÇÃO ELÉTRICA <span class="marquee__dot">•</span> MONTAGEM DE PAINÉIS <span class="marquee__dot">•</span> INSTALAÇÃO RESIDENCIAL <span class="marquee__dot">•</span> ATERRAMENTO SPDA <span class="marquee__dot">•</span> CFTV <span class="marquee__dot">•</span> AR CONDICIONADO <span class="marquee__dot">•</span> ';
        const html = '<span class="marquee__content">' + text + '</span>';
        // duplico 6x pra nunca faltar texto na tela
        marqueeTrack.innerHTML = html + html + html + html + html + html;

        const blocos = marqueeTrack.querySelectorAll('.marquee__content');
        let pos = 0;

        function animate() {
            pos -= 1;
            // quando um bloco inteiro saiu, volta pra posição inicial
            if (pos <= -blocos[0].offsetWidth) {
                pos += blocos[0].offsetWidth;
            }
            marqueeTrack.style.transform = 'translateX(' + pos + 'px)';
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    // efeito magnético nos botões - segue o mouse de leve
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.05) + 'px, ' + (y * 0.05) + 'px)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // efeito tilt 3D nos cards de serviço
    document.querySelectorAll('.service').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = 'perspective(1000px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-4px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
        });
    });

    // botão voltar ao topo
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.pageYOffset > 400);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // bloqueia zoom duplo-toque no mobile (permite pinch-to-zoom com 2 dedos)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // glow que acompanha o cursor pelo site
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = 'position:fixed;width:300px;height:300px;background:radial-gradient(circle,var(--primary-glow) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:0;opacity:0;transition:opacity 0.3s;transform:translate(-50%,-50%)';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
});
