// NusaStats charts — draws every chart as inline SVG from data.js.
// No libraries, no network. Functions: barChart, lineChart, seriesChart (bar/line
// switchable), donutChart, horizontalBars. All charts get a <title> for screen readers
// and a text fallback list of values underneath for accessibility.

(function () {
  'use strict';

  var TEAL = '#0f4c4c';
  var AMBER = '#e8a33d';
  var SLATE = '#22303a';
  var GRID = '#e3ddd0';
  var BAR = '#17807a';
  var NEG = '#b4452f';

  function svgEl(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function niceMax(values) {
    var m = Math.max.apply(null, values.map(Math.abs));
    if (m <= 0) return 1;
    var step = Math.pow(10, Math.floor(Math.log10(m)));
    return Math.ceil(m / step) * step;
  }

  function niceStep(v) {
    var pow = Math.pow(10, Math.floor(Math.log10(v)));
    var f = v / pow;
    var step = f <= 1 ? 1 : f <= 2.5 ? 2 : f <= 5 ? 5 : 10;
    return step * pow;
  }

  function fmt(v) {
    return (Math.round(v * 100) / 100).toString();
  }

  // Shared frame: returns {svg, plotW, plotH, x0, y0, scale} for a value series.
  // opts.padded lets a line chart zoom its vertical axis when all values sit far
  // from zero (life expectancy near 71 years), so small changes stay visible.
  // Bar charts always start at zero, so a bar's height never misleads.
  function frame(container, title, width, height, values, labels, opts) {
    opts = opts || {};
    container.innerHTML = '';
    var svg = svgEl('svg', {
      viewBox: '0 0 ' + width + ' ' + height,
      width: '100%',
      role: 'img',
      'aria-label': title,
    });
    var t = svgEl('title', {});
    t.textContent = title;
    svg.appendChild(t);
    var margin = { top: 14, right: 12, bottom: 30, left: 44 };
    var plotW = width - margin.left - margin.right;
    var plotH = height - margin.top - margin.bottom;
    var max = niceMax(values);
    var min = Math.min(0, Math.min.apply(null, values));
    if (opts.padded) {
      var dMin = Math.min.apply(null, values);
      var dMax = Math.max.apply(null, values);
      if (dMin > 0 && (dMax - dMin) / dMax < 0.2) {
        var pad = (dMax - dMin) * 0.25;
        min = Math.floor((dMin - pad) * 10) / 10;
        max = Math.ceil((dMax + pad) * 10) / 10;
      }
    }
    var span = max - min;
    // Snap the axis to round numbers when it runs below zero (the 2020 GDP dip)
    // or when a padded line chart zooms in (life expectancy near 71), so the
    // tick labels read cleanly instead of 3.98 / 1.97 / -0.05.
    if (min < 0 || opts.padded) {
      var step = niceStep(span / 4);
      min = Math.floor(min / step) * step;
      max = Math.ceil(max / step) * step;
      span = max - min;
    }
    var y0 = margin.top;
    var x0 = margin.left;
    function y(v) { return y0 + plotH - ((v - min) / span) * plotH; }
    function x(i) { return x0 + (i + 0.5) * (plotW / values.length); }
    // Gridlines + y labels.
    var ticks = 4;
    for (var gi = 0; gi <= ticks; gi++) {
      var gv = min + (span * gi) / ticks;
      var gy = y(gv);
      svg.appendChild(svgEl('line', { x1: x0, y1: gy, x2: x0 + plotW, y2: gy, stroke: GRID, 'stroke-width': 1 }));
      var lab = svgEl('text', { x: x0 - 6, y: gy + 4, 'text-anchor': 'end', 'font-size': 11, fill: SLATE });
      lab.textContent = fmt(gv);
      svg.appendChild(lab);
    }
    // Zero line.
    svg.appendChild(svgEl('line', { x1: x0, y1: y(0), x2: x0 + plotW, y2: y(0), stroke: SLATE, 'stroke-width': 1 }));
    // X labels (every year).
    labels.forEach(function (lb, i) {
      var xl = svgEl('text', { x: x(i), y: height - 8, 'text-anchor': 'middle', 'font-size': 11, fill: SLATE });
      xl.textContent = lb;
      svg.appendChild(xl);
    });
    container.appendChild(svg);
    return { svg: svg, plotW: plotW, plotH: plotH, x0: x0, y0: y0, x: x, y: y, max: max, min: min };
  }

  function barChart(container, values, labels, opts) {
    opts = opts || {};
    var f = frame(container, opts.title || 'Bar chart', 640, 300, values, labels);
    var bw = (f.plotW / values.length) * 0.62;
    values.forEach(function (v, i) {
      var bx = f.x(i) - bw / 2;
      var top = Math.min(f.y(v), f.y(0));
      var h = Math.abs(f.y(v) - f.y(0));
      var bar = svgEl('rect', {
        x: bx, y: top, width: bw, height: Math.max(h, 1.5),
        fill: opts.highlight === i ? AMBER : (v < 0 ? NEG : BAR),
        rx: 3,
      });
      f.svg.appendChild(bar);
      var vl = svgEl('text', { x: f.x(i), y: top - 5, 'text-anchor': 'middle', 'font-size': 11, fill: SLATE, 'font-weight': 600 });
      vl.textContent = fmt(v);
      f.svg.appendChild(vl);
    });
  }

  function lineChart(container, values, labels, opts) {
    opts = opts || {};
    var f = frame(container, opts.title || 'Line chart', 640, 300, values, labels, { padded: true });
    var pts = values.map(function (v, i) { return f.x(i) + ',' + f.y(v); }).join(' ');
    f.svg.appendChild(svgEl('polyline', { points: pts, fill: 'none', stroke: BAR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }));
    values.forEach(function (v, i) {
      var c = svgEl('circle', {
        cx: f.x(i), cy: f.y(v), r: opts.highlight === i ? 6.5 : 4,
        fill: opts.highlight === i ? AMBER : BAR, stroke: '#ffffff', 'stroke-width': 1.5,
      });
      f.svg.appendChild(c);
      var vl = svgEl('text', { x: f.x(i), y: f.y(v) - 10, 'text-anchor': 'middle', 'font-size': 11, fill: SLATE, 'font-weight': 600 });
      vl.textContent = fmt(v);
      f.svg.appendChild(vl);
    });
  }

  // Switchable bar/line chart for a yearly series.
  function seriesChart(container, values, labels, opts) {
    if (opts.type === 'line') lineChart(container, values, labels, opts);
    else barChart(container, values, labels, opts);
  }

  function donutChart(container, items, opts) {
    opts = opts || {};
    container.innerHTML = '';
    var size = 300, cx = 150, cy = 150, r = 105, inner = 62;
    var total = items.reduce(function (s, it) { return s + it.share; }, 0);
    var svg = svgEl('svg', { viewBox: '0 0 300 300', width: '100%', role: 'img', 'aria-label': opts.title || 'Donut chart' });
    var t = svgEl('title', {});
    t.textContent = opts.title || 'Donut chart';
    svg.appendChild(t);
    var colors = ['#0f4c4c', '#17807a', '#2a9d8f', '#e8a33d', '#d97b29', '#8a6d3b', '#5b7fa6', '#7d5ba6', '#9aa5b1'];
    var angle = -Math.PI / 2;
    items.forEach(function (it, i) {
      var frac = it.share / total;
      var a0 = angle, a1 = angle + frac * Math.PI * 2;
      angle = a1;
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
      var xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
      var d = 'M ' + x0 + ' ' + y0 + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1 + ' ' + y1 +
        ' L ' + xi1 + ' ' + yi1 + ' A ' + inner + ' ' + inner + ' 0 ' + large + ' 0 ' + xi0 + ' ' + yi0 + ' Z';
      svg.appendChild(svgEl('path', { d: d, fill: colors[i % colors.length] }));
      // Label outside for larger slices.
      if (frac >= 0.07) {
        var mid = (a0 + a1) / 2;
        var lx = cx + (r + 26) * Math.cos(mid), ly = cy + (r + 26) * Math.sin(mid);
        var lab = svgEl('text', { x: lx, y: ly, 'text-anchor': 'middle', 'font-size': 11, fill: SLATE });
        lab.textContent = it.name + ' ' + it.share + '%';
        svg.appendChild(lab);
      }
    });
    var center = svgEl('text', { x: cx, y: cy - 4, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: TEAL });
    center.textContent = opts.centerLabel || '';
    svg.appendChild(center);
    var center2 = svgEl('text', { x: cx, y: cy + 16, 'text-anchor': 'middle', 'font-size': 11, fill: SLATE });
    center2.textContent = opts.centerSub || '';
    svg.appendChild(center2);
    container.appendChild(svg);
    // Legend list under the chart.
    var ul = document.createElement('ul');
    ul.className = 'legend';
    items.forEach(function (it, i) {
      var li = document.createElement('li');
      var sw = document.createElement('span');
      sw.className = 'swatch';
      sw.style.background = colors[i % colors.length];
      li.appendChild(sw);
      li.appendChild(document.createTextNode(it.name + ' — ' + it.share + '%'));
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  function horizontalBars(container, items, opts) {
    opts = opts || {};
    container.innerHTML = '';
    var svg = svgEl('svg', { viewBox: '0 0 640 220', width: '100%', role: 'img', 'aria-label': opts.title || 'Horizontal bar chart' });
    var t = svgEl('title', {});
    t.textContent = opts.title || 'Horizontal bar chart';
    svg.appendChild(t);
    var max = niceMax(items.map(function (it) { return it.share; }));
    var rowH = 200 / items.length;
    items.forEach(function (it, i) {
      var yTop = 16 + i * rowH;
      var lab = svgEl('text', { x: 0, y: yTop + 16, 'font-size': 13, fill: SLATE });
      lab.textContent = it.group;
      svg.appendChild(lab);
      var barX = 150, barW = 400 * (it.share / max);
      svg.appendChild(svgEl('rect', { x: barX, y: yTop, width: barW, height: 22, fill: i === 1 ? AMBER : BAR, rx: 4 }));
      var vl = svgEl('text', { x: barX + barW + 10, y: yTop + 16, 'font-size': 13, 'font-weight': 700, fill: TEAL });
      vl.textContent = it.share + '%';
      svg.appendChild(vl);
    });
    container.appendChild(svg);
  }

  window.NusaCharts = {
    barChart: barChart,
    lineChart: lineChart,
    seriesChart: seriesChart,
    donutChart: donutChart,
    horizontalBars: horizontalBars,
  };
})();
