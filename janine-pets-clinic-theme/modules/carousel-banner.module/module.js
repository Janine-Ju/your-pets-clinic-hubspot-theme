(function () {
  'use strict';

  document.querySelectorAll('.carousel-banner').forEach(function (banner) {
    var track    = banner.querySelector('.carousel-track');
    var slides   = banner.querySelectorAll('.carousel-slide');
    var dots     = banner.querySelectorAll('.carousel-dot');
    var prevBtn  = banner.querySelector('.carousel-arrow--prev');
    var nextBtn  = banner.querySelector('.carousel-arrow--next');
    var counter  = banner.querySelector('.carousel-counter');

    var total    = slides.length;
    var current  = 0;
    var autoplay = banner.dataset.autoplay === 'true';
    var speed    = parseInt(banner.dataset.speed, 10) || 5000;
    var timer    = null;

    if (total <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';

      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });

      if (counter) {
        counter.textContent = (current + 1) + ' / ' + total;
      }
    }

    function startAutoplay() {
      if (!autoplay) return;
      timer = setInterval(function () { goTo(current + 1); }, speed);
    }

    function resetAutoplay() {
      clearInterval(timer);
      startAutoplay();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(current - 1);
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(current + 1);
        resetAutoplay();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.dataset.index, 10));
        resetAutoplay();
      });
    });

    /* Touch/swipe support */
    var touchStartX = 0;
    banner.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    banner.addEventListener('touchend', function (e) {
      var delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        goTo(delta > 0 ? current + 1 : current - 1);
        resetAutoplay();
      }
    }, { passive: true });

    /* Init */
    goTo(0);
    startAutoplay();
  });
})();
