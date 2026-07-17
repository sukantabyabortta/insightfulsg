$(function () {
  const HEADER_OFFSET = 110;

  /* Smooth Scroll */
  $('a[href*="#"]').on("click", function (e) {
    const hash = this.hash;

    if (!hash || !$(hash).length) return;

    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - HEADER_OFFSET,
      },
      700,
    );
  });

  /* Scroll to Hash on Page Load */
  if (location.hash && $(location.hash).length) {
    setTimeout(() => {
      $("html, body").scrollTop($(location.hash).offset().top - HEADER_OFFSET);
    }, 100);
  }

  /* Mobile Menu */
  $("#hamburger").click(() => {
    $("#mobileNav").addClass("open");
    $("#mobileNavOverlay").addClass("active");
    $("body").css("overflow", "hidden");
  });

  $("#mobileNavClose, #mobileNavOverlay").click(() => {
    $("#mobileNav").removeClass("open");
    $("#mobileNavOverlay").removeClass("active");
    $("body").css("overflow", "");
  });

  /* Counter */
  function animateCounters() {
    $(".stat-num").each(function () {
      const target = $(this).data("count");

      $({ num: 0 }).animate(
        { num: target },
        {
          duration: 1800,
          step: (now) => $(this).text(Math.floor(now)),
          complete: () => $(this).text(target),
        },
      );
    });
  }

  const $stats = $(".stats-bar, .stats-section").first();

  /* Window Scroll */
  $(window)
    .on("scroll", function () {
      const scroll = $(this).scrollTop();

      $("#siteHeader").toggleClass("scrolled", scroll > 50);
      $("#backToTop").toggleClass("visible", scroll > 400);

      if (
        $stats.length &&
        !$stats.hasClass("counted") &&
        scroll + $(window).height() >= $stats.offset().top + 80
      ) {
        $stats.addClass("counted");
        animateCounters();
      }
    })
    .trigger("scroll");

  /* FAQ Accordion */
  $(".faq-content").hide();
  $(".faq-item.active .faq-content").show();

  $(".faq-title").on("click", function () {
    var item = $(this).parent();

    if (item.hasClass("active")) {
      item.removeClass("active");
      item.find(".faq-content").slideUp(300);
    } else {
      $(".faq-item").removeClass("active");
      $(".faq-content").slideUp(300);

      item.addClass("active");
      item.find(".faq-content").slideDown(300);
    }
  });

  /* Back To Top */
  $("#backToTop").click(function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  /* Hero Slider */
  $("#heroSlider").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 900,
    fade: true,
    dots: false,
    arrows: true,
    pauseOnHover: false,
    prevArrow:
      '<button class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
    nextArrow:
      '<button class="slick-next"><i class="fa fa-chevron-right"></i></button>',
  });
});

/* ==========================
     AOS
  ========================== */
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    mirror: false,
    disable: "mobile",
  });

  setTimeout(function () {
    AOS.refresh();
  }, 500);
}

/* ==========================
     Refresh on Resize
  ========================== */
$window.on("resize", function () {
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});
