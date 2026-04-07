// Ink Brush Scroll Engine — draws 한류 (Hallyu) as you scroll
(function () {
  const canvas = document.getElementById('inkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener('resize', () => { resize(); drawAll(lastProgress); });

  // Stroke definitions for 한 (left) and 류 (right)
  function buildStrokes() {
    // 한 bounding boxes
    var hL = 0.08, hR = 0.48, hT = 0.08, hB = 0.92;
    var conL = hL, conR = 0.32, conT = hT, conB = 0.52;
    var vowL = 0.34, vowR = hR, vowT = hT, vowB = hB;
    var finL = hL, finR = 0.32, finT = 0.55, finB = hB;

    // 류 bounding boxes
    var rL = 0.52, rR = 0.92, rT = 0.08, rB = 0.92;
    var rConL = rL, rConR = rR, rConT = rT, rConB = 0.52;
    var rVowL = rL, rVowR = rR, rVowT = 0.56, rVowB = rB;

    var idx = 0, total = 16, sliceLen = 1.0 / total;

    function t() {
      var s = idx * sliceLen * 0.88;
      var e = s + sliceLen * 1.4;
      idx++;
      return { startAt: Math.max(0, s), endAt: Math.min(1, e) };
    }

    function circle(cx, cy, rx, ry, n) {
      var pts = [];
      for (var k = 0; k <= n; k++) {
        var a = (k / n) * Math.PI * 2 - Math.PI / 2;
        pts.push({ x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) });
      }
      return pts;
    }

    return [
      // 한: ㅎ top bar
      { points: [{ x: conL + 0.03, y: conT + 0.03 }, { x: (conL + conR) / 2, y: conT + 0.015 }, { x: conR - 0.02, y: conT + 0.03 }], widthBase: 14, widthVar: 5, ...t() },
      // ㅎ circle
      { points: circle((conL + conR) / 2, (conT + conB) / 2 + 0.01, 0.055, 0.07, 28), widthBase: 9, widthVar: 4, ...t() },
      // ㅎ bottom bar
      { points: [{ x: conL + 0.02, y: conB - 0.01 }, { x: (conL + conR) / 2, y: conB - 0.025 }, { x: conR - 0.01, y: conB - 0.01 }], widthBase: 13, widthVar: 5, ...t() },
      // ㅏ vertical
      { points: [{ x: vowL + 0.02, y: vowT + 0.01 }, { x: vowL + 0.02, y: (vowT + vowB) * 0.5 }, { x: vowL + 0.02, y: vowB - 0.01 }], widthBase: 13, widthVar: 4, ...t() },
      // ㅏ horizontal tick
      { points: [{ x: vowL + 0.02, y: vowT + (vowB - vowT) * 0.36 }, { x: (vowL + vowR) / 2 + 0.02, y: vowT + (vowB - vowT) * 0.34 }, { x: vowR - 0.01, y: vowT + (vowB - vowT) * 0.35 }], widthBase: 11, widthVar: 4, ...t() },
      // ㄴ L-shape
      { points: [{ x: finL + 0.05, y: finT + 0.01 }, { x: finL + 0.05, y: (finT + finB) / 2 + 0.02 }, { x: finL + 0.06, y: finB - 0.03 }, { x: (finL + finR) / 2, y: finB - 0.015 }, { x: finR - 0.01, y: finB - 0.02 }], widthBase: 14, widthVar: 5, ...t() },

      // 류: ㄹ top horizontal
      { points: [{ x: rConL + 0.04, y: rConT + 0.03 }, { x: (rConL + rConR) / 2, y: rConT + 0.02 }, { x: rConR - 0.04, y: rConT + 0.03 }], widthBase: 13, widthVar: 5, ...t() },
      // ㄹ first descent
      { points: [{ x: rConR - 0.04, y: rConT + 0.03 }, { x: rConR - 0.08, y: rConT + 0.10 }, { x: rConL + 0.04, y: rConT + 0.13 }], widthBase: 11, widthVar: 4, ...t() },
      // ㄹ second horizontal
      { points: [{ x: rConL + 0.04, y: rConT + 0.13 }, { x: (rConL + rConR) / 2, y: rConT + 0.14 }, { x: rConR - 0.04, y: rConT + 0.13 }], widthBase: 11, widthVar: 4, ...t() },
      // ㄹ second descent
      { points: [{ x: rConR - 0.04, y: rConT + 0.13 }, { x: rConR - 0.08, y: rConT + 0.22 }, { x: rConL + 0.04, y: rConT + 0.26 }], widthBase: 11, widthVar: 4, ...t() },
      // ㄹ bottom horizontal
      { points: [{ x: rConL + 0.04, y: rConT + 0.26 }, { x: (rConL + rConR) / 2, y: rConB - 0.05 }, { x: rConR - 0.02, y: rConB - 0.03 }], widthBase: 14, widthVar: 5, ...t() },
      // ㅠ left tick
      { points: [{ x: rVowL + (rVowR - rVowL) * 0.30, y: rVowT + 0.02 }, { x: rVowL + (rVowR - rVowL) * 0.30, y: rVowT + (rVowB - rVowT) * 0.50 }], widthBase: 11, widthVar: 4, ...t() },
      // ㅠ right tick
      { points: [{ x: rVowL + (rVowR - rVowL) * 0.70, y: rVowT + 0.02 }, { x: rVowL + (rVowR - rVowL) * 0.70, y: rVowT + (rVowB - rVowT) * 0.50 }], widthBase: 11, widthVar: 4, ...t() },
      // ㅠ base
      { points: [{ x: rVowL + 0.03, y: rVowB - 0.04 }, { x: (rVowL + rVowR) / 2, y: rVowB - 0.025 }, { x: rVowR - 0.03, y: rVowB - 0.04 }], widthBase: 14, widthVar: 5, ...t() },
      // Decorative connector
      { points: [{ x: 0.44, y: 0.85 }, { x: 0.50, y: 0.82 }, { x: 0.56, y: 0.85 }], widthBase: 5, widthVar: 3, ...t() },
      // Bottom flourish
      { points: [{ x: 0.20, y: 0.95 }, { x: 0.50, y: 0.93 }, { x: 0.80, y: 0.95 }], widthBase: 4, widthVar: 3, ...t() },
    ];
  }

  var strokes = buildStrokes();

  // Catmull-Rom interpolation
  function catmullRomPoint(points, t) {
    var n = points.length;
    if (n < 2) return points[0];
    var total = n - 1;
    var segment = Math.min(Math.floor(t * total), total - 1);
    var local = (t * total) - segment;
    var p0 = points[Math.max(segment - 1, 0)];
    var p1 = points[segment];
    var p2 = points[Math.min(segment + 1, n - 1)];
    var p3 = points[Math.min(segment + 2, n - 1)];
    var tt = local, tt2 = tt * tt, tt3 = tt2 * tt;
    return {
      x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * tt + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * tt3),
      y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * tt + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * tt3),
    };
  }

  function seededRandom(seed) {
    var s = seed;
    return function () {
      s = (s * 16807 + 0) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function drawStroke(stroke, progress) {
    var range = stroke.endAt - stroke.startAt;
    if (range <= 0) return;
    var local = Math.max(0, Math.min(1, (progress - stroke.startAt) / range));
    if (local <= 0) return;

    var pts = stroke.points;
    var STEPS = 90;
    var drawn = Math.floor(local * STEPS);
    if (drawn < 2) return;

    var rand = seededRandom(Math.round(pts[0].x * 7777) + Math.round(pts[0].y * 3333));
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (var i = 1; i < drawn; i++) {
      var p0 = catmullRomPoint(pts, (i - 1) / STEPS);
      var p1 = catmullRomPoint(pts, i / STEPS);
      var along = i / STEPS;
      var taper = Math.sin(along * Math.PI);
      var width = Math.max(1.5, stroke.widthBase * (0.2 + 0.8 * taper) + (rand() - 0.5) * stroke.widthVar);
      var ox = (rand() - 0.5) * 0.7, oy = (rand() - 0.5) * 0.7;
      var alpha = Math.max(0.15, Math.min(1, 0.5 + 0.5 * taper + (rand() - 0.5) * 0.1));

      ctx.beginPath();
      ctx.moveTo(p0.x * W + ox, p0.y * H + oy);
      ctx.lineTo(p1.x * W + ox, p1.y * H + oy);
      ctx.strokeStyle = 'rgba(26, 18, 16, ' + alpha + ')';
      ctx.lineWidth = width;
      ctx.stroke();
    }

    // Ink splatter
    var splatCount = Math.floor(drawn * 0.025);
    for (var s = 0; s < splatCount; s++) {
      var sp = catmullRomPoint(pts, rand() * local);
      var sx = sp.x * W + (rand() - 0.5) * stroke.widthBase * 1.8;
      var sy = sp.y * H + (rand() - 0.5) * stroke.widthBase * 1.8;
      ctx.beginPath();
      ctx.arc(sx, sy, rand() * 1.5 + 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(26, 18, 16, ' + (0.08 + rand() * 0.15) + ')';
      ctx.fill();
    }
  }

  var lastProgress = 0;

  function drawAll(progress) {
    lastProgress = progress;
    ctx.clearRect(0, 0, W, H);

    // Rice-paper noise
    var rand = seededRandom(42);
    var dotCount = Math.floor(W * H * 0.0001);
    for (var i = 0; i < dotCount; i++) {
      ctx.beginPath();
      ctx.arc(rand() * W, rand() * H, rand() * 0.6 + 0.15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(26, 18, 16, ' + (0.015 + rand() * 0.03) + ')';
      ctx.fill();
    }

    for (var j = 0; j < strokes.length; j++) {
      drawStroke(strokes[j], progress);
    }
  }

  function getScrollProgress() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 0;
    return Math.max(0, Math.min(1, window.scrollY / docHeight));
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        drawAll(getScrollProgress());
        ticking = false;
      });
      ticking = true;
    }
  });

  drawAll(getScrollProgress());
})();
