(function () {
  'use strict';

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
  });

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  var wrapper = document.getElementById('parallaxWrapper');
  var content = document.getElementById('parallaxContent');
  var scene   = document.getElementById('parallaxScene');
  var label   = document.getElementById('curtainLabel');
  if (!wrapper || !content || !scene) return;

  var leftPanels  = ['.pL1', '.pL2', '.pL3'];
  var rightPanels = ['.pR1', '.pR2', '.pR3'];

  // ─── Mobile fallback ───
  if (window.innerWidth < 901) {
    content.classList.add('active');
    document.dispatchEvent(new CustomEvent('chartsReady'));
    return;
  }

  
  window.scrollTo(0, 0);
  document.dispatchEvent(new CustomEvent('chartsReady'));

  
  gsap.set(leftPanels.concat(rightPanels), {
    x: 0,
    force3D: true,
    willChange: 'transform'
  });

  function buildScrollTrigger() {

    var st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      pin: scene,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,

      onUpdate: function (self) {
        var p = self.progress;


var p1 = clamp((p - 0.00) / 0.50);
var p2 = clamp((p - 0.05) / 0.50);
var p3 = clamp((p - 0.20) / 0.50); 

        var e1 = smoothstep(p1);
        var e2 = smoothstep(p2);
        var e3 = smoothstep(p3);

        setX('.pL1',  -62 * e1); setX('.pR1',  62 * e1);
        setX('.pL2',  -80 * e2); setX('.pR2',  80 * e2);
        setX('.pL3', -92 * e3); setX('.pR3', 92 * e3);

        // Curtain label fades out as the curtain opens.
        if (label) {
          label.style.opacity = (0.85 * (1 - clamp(p / 0.30))).toFixed(3);
        }

        var revealStart = 0.45;
        var revealEnd   = 0.65;
        var reveal = clamp((p - revealStart) / (revealEnd - revealStart));
        content.style.opacity = reveal.toFixed(3);


        if (reveal > 0.5) content.classList.add('active');
        else              content.classList.remove('active');
      },

      onLeaveBack: function () {
        // Scrolled fully above reset
        resetPanels();
      },

      onRefresh: function () {
        // After refresh
        if (st.progress < 0.001) resetPanels();
      }
    });

    // Initial paint at progress 0
    resetPanels();

    return st;
  }

  function resetPanels() {
    setX('.pL1', 0); setX('.pR1', 0);
    setX('.pL2', 0); setX('.pR2', 0);
    setX('.pL3', 0); setX('.pR3', 0);
    content.style.opacity = '0';
    content.classList.remove('active');
    if (label) label.style.opacity = '0.85';
  }

  function setX(sel, pct) {
    var el = document.querySelector(sel);
    if (!el) return;
    el.style.transform = 'translate3d(' + pct + '%, 0, 0)';
  }

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  
  function smoothstep(t) { return t * t * (3 - 2 * t); }

  
  function start() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        buildScrollTrigger();
      });
    });
  }

  if (document.readyState === 'complete') {
    start();
  } else {
    window.addEventListener('load', start);
  }

  
  var resizeTimer;
  var lastIsMobile = window.innerWidth < 901;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var isMobile = window.innerWidth < 901;
      if (isMobile !== lastIsMobile) {
        // Mobile/desktop strategies differ
        window.location.reload();
        return;
      }
      ScrollTrigger.refresh();
    }, 250);
  });

})();
