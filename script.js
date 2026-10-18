document.addEventListener("DOMContentLoaded", function () {
  (function () {
  /* ===== SEEDED RNG ===== */
  var S = 3;
  var rnd = function () { S = (S * 16807) % 2147483647; return S / 2147483647; };
  var R = function (a, b) { return a + rnd() * (b - a); };
  var N = "http://www.w3.org/2000/svg";
  var $ = function (i) { return document.getElementById(i); };

  function el(p, t, a) {
    var e = document.createElementNS(N, t);
    for (var k in a) e.setAttribute(k, a[k]);
    p.appendChild(e);
    return e;
  }

  /* ===== LEAF COLOURS ===== */
  var LC = ["#1c4a2e", "#2f6b3a", "#3f8a46", "#5aa34a", "#8bbf4a", "#d8c24a", "#e9d56b"];

  /* ===== LEAF CLUSTER ===== */
  function cluster(p, x, y, r, n) {
    var g = el(p, "g", {
      "class": "cl",
      style: "animation-delay:" + R(-3, 0).toFixed(2) + "s;animation-duration:" + R(2.4, 4).toFixed(2) + "s"
    });
    for (var i = 0; i < n; i++) {
      var a = R(0, 6.28);
      var d = Math.sqrt(rnd()) * r;
      var s = R(0.8, 1.7);
      var c = LC[rnd() < 0.28 ? 5 + (rnd() * 2 | 0) : (rnd() * 5 | 0)];
      el(g, "path", {
        d: "M0 0C7 -9 17 -9 24 0C17 9 7 9 0 0Z",
        fill: c,
        opacity: R(0.85, 1).toFixed(2),
        transform: "translate(" + (x + Math.cos(a) * d).toFixed(0) + " " + (y + Math.sin(a) * d * 0.7).toFixed(0) + ") rotate(" + (R(-70, 70) + 180).toFixed(0) + ") scale(" + s.toFixed(2) + ")"
      });
    }
  }

  /* ===== CUBIC BEZIER HELPER ===== */
  function bz(a, b, c, d, t) {
    var u = 1 - t;
    return [
      u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
      u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]
    ];
  }

  /* ===== BRANCH LEAVES ===== */
  var lf = $("lf");
  var A = [[958, 336], [890, 276], [790, 272], [700, 332]];
  var B = [[700, 332], [670, 352], [650, 380], [640, 412]];

  [0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1].forEach(function (t) {
    var p = bz(A[0], A[1], A[2], A[3], t);
    cluster(lf, p[0], p[1] - 8, 38, 14);
  });
  [0.35, 0.7, 1].forEach(function (t) {
    var p = bz(B[0], B[1], B[2], B[3], t);
    cluster(lf, p[0], p[1], 30, 12);
  });
  cluster(lf, 750, 236, 28, 10);
  cluster(lf, 706, 418, 26, 10);

  /* ===== CANOPY CLUSTERS ===== */
  var cn = $("cn");
  [[985, 215, 85], [890, 250, 60], [1085, 250, 65], [985, 150, 70], [930, 190, 60]].forEach(function (c) {
    cluster(cn, c[0], c[1], c[2], 28);
  });

  /* ===== BARK TEXTURE ===== */
  var bk = $("bk");
  for (var i = 0; i < 26; i++) {
    var x = R(940, 1030);
    var y0 = R(300, 700);
    el(bk, "path", {
      d: "M" + x + " " + y0 + "q" + R(-8, 8) + " 60 " + R(-6, 6) + " " + R(60, 150),
      stroke: rnd() < 0.5 ? "#241a16" : "#5b4637",
      fill: "none",
      "stroke-width": R(2, 6),
      opacity: 0.6
    });
  }

  /* ===== GRASS ===== */
  var gs = $("gs");
  var GC = ["#3f8a46", "#6aae4a", "#a8d46a", "#2d7a3a", "#e0dc7a"];
  for (i = 0; i < 420; i++) {
    var y = R(600, 900);
    var k = (y - 560) / 340;
    var x2 = R(-40, 1640);
    var h = R(8, 40) * (0.4 + k);
    el(gs, "path", {
      d: "M" + x2.toFixed(0) + " " + y.toFixed(0) + "q" + R(-4, 6).toFixed(0) + " " + (-h / 2).toFixed(0) + " " + R(-8, 12).toFixed(0) + " " + (-h).toFixed(0),
      stroke: GC[rnd() * 5 | 0],
      "stroke-width": (1.5 + k * 3.5).toFixed(1),
      fill: "none",
      opacity: R(0.5, 0.95).toFixed(2),
      "stroke-linecap": "round"
    });
  }

  /* ===== FOREGROUND BLADES ===== */
  var fg = $("fg");
  for (i = 0; i < 60; i++) {
    var bx = R(-20, 1620);
    var bh = R(60, 150);
    var w = R(7, 14);
    el(fg, "path", {
      "class": "bl",
      style: "animation-delay:" + R(-3, 0).toFixed(2) + "s;animation-duration:" + R(2.4, 4) + "s",
      d: "M" + bx.toFixed(0) + " 910Q" + (bx + w).toFixed(0) + " " + (910 - bh / 2).toFixed(0) + " " + (bx + R(-10, 30)).toFixed(0) + " " + (910 - bh).toFixed(0) + "Q" + (bx - w / 2).toFixed(0) + " " + (910 - bh / 2).toFixed(0) + " " + (bx - w).toFixed(0) + " 910Z",
      fill: ["#3f8a46", "#5aa653", "#8bbf4a", "#a8d46a"][rnd() * 4 | 0]
    });
  }

  /* ===== RESPONSIVE VIEWBOX ===== */
  var sv = $("sv");
  function vb() {
    sv.setAttribute("viewBox", innerWidth < 760 ? "480 140 640 760" : "0 0 1600 900");
  }
  vb();
  addEventListener("resize", vb);

  /* ===== PARALLAX ===== */
  var px = [].slice.call(document.querySelectorAll(".px"));
  var mx = 0, my = 0, cx = 0, cy = 0;
  addEventListener("mousemove", function (e) {
    mx = e.clientX / innerWidth - 0.5;
    my = e.clientY / innerHeight - 0.5;
  });
  (function tick() {
    cx += (mx - cx) * 0.06;
    cy += (my - cy) * 0.06;
    px.forEach(function (g) {
      var d = +g.dataset.d;
      g.setAttribute("transform", "translate(" + (-cx * d * 2).toFixed(2) + " " + (-cy * d).toFixed(2) + ")");
    });
    requestAnimationFrame(tick);
  })();

  /* ===== WIND LEAVES (canvas) ===== */
  var cv = $("lv");
  var cx2 = cv.getContext("2d");
  var W, H, P = [];
  var dp = Math.min(devicePixelRatio || 1, 2);
  var calm = matchMedia("(prefers-reduced-motion:reduce)").matches;

  function rs() {
    W = cv.width = innerWidth * dp;
    H = cv.height = cv.parentNode.offsetHeight * dp;
  }
  rs();
  addEventListener("resize", rs);

  function mk(init) {
    return {
      x: init ? R(0, W) : W + R(20, 300) * dp,
      y: R(0, H * 0.85),
      s: R(7, 17) * dp,
      vx: R(1.1, 2.8) * dp,
      vy: R(0.1, 0.55) * dp,
      r: R(0, 6.28),
      vr: R(-0.04, 0.04),
      ph: R(0, 6.28),
      c: LC[rnd() * 7 | 0]
    };
  }

  for (i = 0; i < (innerWidth < 760 ? 20 : 42); i++) P.push(mk(1));

  function dl(p) {
    cx2.save();
    cx2.translate(p.x, p.y);
    cx2.rotate(p.r);
    cx2.fillStyle = p.c;
    cx2.beginPath();
    cx2.moveTo(-p.s, 0);
    cx2.bezierCurveTo(-p.s / 3, -p.s / 1.8, p.s / 2, -p.s / 1.8, p.s, 0);
    cx2.bezierCurveTo(p.s / 2, p.s / 1.8, -p.s / 3, p.s / 1.8, -p.s, 0);
    cx2.fill();
    cx2.restore();
  }

  if (!calm) (function lp() {
    if (scrollY < innerHeight) {
      cx2.clearRect(0, 0, W, H);
      var t = Date.now() / 1000;
      P.forEach(function (p, j) {
        p.x -= p.vx * (1 + 0.5 * Math.sin(t * 0.6 + p.ph));
        p.y += p.vy + Math.sin(t * 1.4 + p.ph) * 0.9 * dp;
        p.r += p.vr;
        if (p.x < -40 * dp || p.y > H + 30 * dp) P[j] = mk(0);
        dl(p);
      });
    }
    requestAnimationFrame(lp);
  })();

  /* ===== LOAD SEQUENCE ===== */
  setTimeout(function () { document.body.classList.add("ready"); }, 2600);

  /* ===== SCROLL REVEAL ===== */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  [].forEach.call(document.querySelectorAll(".rv"), function (e) { io.observe(e); });
})();
  
})
    