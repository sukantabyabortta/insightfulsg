$(function () {

    /* ===== ANCHOR SCROLL OFFSET (fixed header) ===== */
    $(document).on('click', 'a[href*="#"]', function (e) {
        var href = $(this).attr('href');
        var hash = href.indexOf('#') !== -1 ? '#' + href.split('#')[1] : null;
        if (!hash || $(hash).length === 0) return;
        // only offset if on same page
        if (href.indexOf('.html') === -1 || href.split('#')[0] === window.location.pathname.split('/').pop()) {
            e.preventDefault();
            var offset = $(hash).offset().top - 110;
            $('html, body').animate({ scrollTop: offset }, 700);
        }
    });

    /* on page load if there is a hash in URL, offset scroll */
    if (window.location.hash && $(window.location.hash).length) {
        setTimeout(function () {
            var offset = $(window.location.hash).offset().top - 110;
            $('html, body').scrollTop(offset);
        }, 100);
    }

    /* ===== HERO SLIDER ===== */
    $('#heroSlider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 900,
        fade: true,
        cssEase: 'ease-in-out',
        dots: true,
        arrows: true,
        pauseOnHover: false,
        prevArrow: '<button class="slick-prev slick-arrow"><i class="fa fa-chevron-left"></i></button>',
        nextArrow: '<button class="slick-next slick-arrow"><i class="fa fa-chevron-right"></i></button>'
    });

    /* ===== TESTIMONIALS CAROUSEL ===== */
    $('#testimonialsSlider').slick({
        autoplay: true,
        autoplaySpeed: 4500,
        speed: 700,
        dots: true,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: true,
        prevArrow: '<button class="slick-prev slick-arrow"><i class="fa fa-chevron-left"></i></button>',
        nextArrow: '<button class="slick-next slick-arrow"><i class="fa fa-chevron-right"></i></button>',
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640,  settings: { slidesToShow: 1, arrows: false } }
        ]
    });

    /* ===== HAMBURGER / MOBILE NAV ===== */
    $('#hamburger').on('click', function () {
        $('#mobileNav').addClass('open');
        $('#mobileNavOverlay').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    function closeMobileNav() {
        $('#mobileNav').removeClass('open');
        $('#mobileNavOverlay').removeClass('active');
        $('body').css('overflow', '');
    }

    $('#mobileNavClose, #mobileNavOverlay').on('click', closeMobileNav);

    /* ===== HEADER SCROLL ===== */
    $(window).on('scroll', function () {
        var scrollY = $(this).scrollTop();

        // sticky shadow
        $('#siteHeader').toggleClass('scrolled', scrollY > 50);

        // back to top visibility
        $('#backToTop').toggleClass('visible', scrollY > 400);

        // stat counter trigger
        var $statsEl = $('.stats-bar').length ? $('.stats-bar') : $('.stats-section');
        if ($statsEl.length && scrollY + $(window).height() >= $statsEl.offset().top + 80 && !$statsEl.hasClass('counted')) {
            $statsEl.addClass('counted');
            animateCounters();
        }
    });

    /* ===== BACK TO TOP ===== */
    $('#backToTop').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    /* ===== STAT COUNTER ===== */
    function animateCounters() {
        $('.stat-num').each(function () {
            var $el = $(this);
            var target = parseInt($el.data('count'), 10);
            $({ val: 0 }).animate({ val: target }, {
                duration: 1800,
                easing: 'swing',
                step: function () {
                    $el.text(Math.floor(this.val));
                },
                complete: function () {
                    $el.text(target);
                }
            });
        });
    }

    // trigger counter if stats already in view on load
    var $statsEl = $('.stats-bar').length ? $('.stats-bar') : $('.stats-section');
    if ($statsEl.length && $(window).scrollTop() + $(window).height() >= $statsEl.offset().top + 80) {
        $statsEl.addClass('counted');
        animateCounters();
    }

    /* ===== ACTIVE NAV LINK ON SCROLL ===== */
    var sections = $('section[id]');
    $(window).on('scroll.nav', function () {
        var scrollY = $(this).scrollTop() + 80;
        sections.each(function () {
            if (scrollY >= $(this).offset().top && scrollY < $(this).offset().top + $(this).outerHeight()) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href*="index"]').addClass('active');
            }
        });
    });

});
