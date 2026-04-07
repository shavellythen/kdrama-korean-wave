// Colors
const blue   = '#2B5BA8';
const red    = '#C0392B';
const gold   = '#C9922A';
const green  = '#3D7A4A';
const violet = '#6B3FA0';
const ink    = '#1C1810';
const muted  = '#7A6B5E';
const cream  = '#F2EDE4';
const blush  = '#F0D5C8';

const tooltip = document.getElementById('tooltip');

function showTooltip(e, html) {
  tooltip.innerHTML = html;
  tooltip.style.opacity = 1;
  tooltip.style.left = (e.clientX + 14) + 'px';
  tooltip.style.top  = (e.clientY - 28) + 'px';
}
function hideTooltip() { tooltip.style.opacity = 0; }

// Helper
function getChartWidth(container) {
  return container.clientWidth - 20;
}

// Duolingo
(function() {
  const data = [
    { year: 2019, ranking: 9 },
    { year: 2020, ranking: 7 },
    { year: 2021, ranking: 7 },
    { year: 2022, ranking: 7 },
    { year: 2023, ranking: 6 },
    { year: 2024, ranking: 7 },
    { year: 2025, ranking: 6 },
  ];

  const events = [
    { year: 2020, label: 'Parasite wins Oscar' },
    { year: 2021, label: 'Squid Game premieres' },
    { year: 2023, label: 'Overtakes Italian, a global language' },
  ];

  const container = document.getElementById('chart-timeline');
  const W = getChartWidth(container);
  const H = 280;
  const margin = { top: 20, right: 20, bottom: 36, left: 52 };
  const iW = W - margin.left - margin.right;
  const iH = H - margin.top - margin.bottom;

  const svg = d3.select('#chart-timeline')
    .append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([2019, 2025]).range([0, iW]);
  const y = d3.scaleLinear().domain([10.5, 4.5]).range([iH, 0]);

  // Gridlines
  g.append('g').selectAll('line').data([5, 6, 7, 8, 9, 10]).join('line')
    .attr('x1', 0).attr('x2', iW)
    .attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', '#e8ddd4');

  // Area
  g.append('path').datum(data)
    .attr('fill', blue).attr('fill-opacity', 0.12)
    .attr('d', d3.area().x(d => x(d.year)).y0(iH).y1(d => y(d.ranking)).curve(d3.curveCatmullRom));

  // Line
  g.append('path').datum(data)
    .attr('fill', 'none').attr('stroke', blue).attr('stroke-width', 2.5)
    .attr('d', d3.line().x(d => x(d.year)).y(d => y(d.ranking)).curve(d3.curveCatmullRom));

  // Event markers
  events.forEach(ev => {
    const xPos = x(ev.year);
    g.append('line')
      .attr('x1', xPos).attr('x2', xPos).attr('y1', 0).attr('y2', iH)
      .attr('stroke', gold).attr('stroke-dasharray', '3,3');
    g.append('text')
      .attr('x', xPos + 4).attr('y', 12).text(ev.label)
      .style('font-size', '9px').style('fill', gold).style('font-family', 'DM Sans');
  });

  // Dots
  g.selectAll('.dot').data(data).join('circle')
    .attr('cx', d => x(d.year)).attr('cy', d => y(d.ranking))
    .attr('r', 5).attr('fill', blue).attr('stroke', 'white').attr('stroke-width', 1.5)
    .style('cursor', 'pointer')
    .on('mousemove', (e, d) => showTooltip(e, `<strong>${d.year}</strong><br>Global Rank: <strong>#${d.ranking}</strong>`))
    .on('mouseleave', hideTooltip);

  // Axes
  g.append('g').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(x).tickFormat(d3.format('d')).ticks(7))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('text').style('font-size', '11px').style('fill', muted).style('font-family', 'DM Sans'));

  g.append('text').attr('transform', 'rotate(-90)')
    .attr('x', -iH / 2).attr('y', -38).attr('text-anchor', 'middle')
    .text('Global Ranking')
    .style('font-size', '10px').style('fill', muted).style('font-family', 'DM Sans');

  g.append('g')
    .call(d3.axisLeft(y).tickValues([10, 9, 8, 7, 6, 5]).tickFormat(d => '#' + d))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('text').style('font-size', '11px').style('fill', muted).style('font-family', 'DM Sans'))
    .call(a => a.selectAll('line').remove());

  // Legend
  const leg = document.getElementById('legend-timeline');
  const item = document.createElement('div');
  item.className = 'legend-item';
  item.innerHTML = `<div class="legend-dot" style="background:${blue}"></div>Korean Learning on Duolingo Over Time`;
  leg.appendChild(item);
})();

// Top 10
(function() {
  const data = [
    { title: "Squid Game",                      watchers: 350000, rating: 9,   episodes: 9,  year: 2021 },
    { title: "Goblin",                          watchers: 254985, rating: 8.8, episodes: 16, year: 2016 },
    { title: "Strong Woman Do Bong Soon",       watchers: 239773, rating: 8.7, episodes: 16, year: 2016 },
    { title: "It's Okay to Not Be Okay",        watchers: 215957, rating: 8.9, episodes: 16, year: 2020 },
    { title: "Descendants of the Sun",          watchers: 213187, rating: 8.6, episodes: 16, year: 2016 },
    { title: "What's Wrong with Secretary Kim", watchers: 212766, rating: 8.5, episodes: 16, year: 2018 },
    { title: "Weightlifting Fairy Kim Bok Joo", watchers: 212406, rating: 8.8, episodes: 16, year: 2016 },
    { title: "Crash Landing on You",            watchers: 208913, rating: 9.0, episodes: 16, year: 2019 },
    { title: "W",                               watchers: 199073, rating: 8.5, episodes: 16, year: 2016 },
    { title: "Hotel del Luna",                  watchers: 183598, rating: 8.6, episodes: 16, year: 2019 },
  ];

  const container = document.getElementById('chart-ratings');
  const W = getChartWidth(container);
  const H = 340;
  const margin = { top: 10, right: 60, bottom: 20, left: 190 };
  const iW = W - margin.left - margin.right;
  const iH = H - margin.top - margin.bottom;

  const svg = d3.select('#chart-ratings')
    .append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const y = d3.scaleBand().domain(data.map(d => d.title)).range([0, iH]).padding(0.3);
  const x = d3.scaleLinear().domain([0, 270000]).range([0, iW]);

  // Default colors
  const defaultFill = (d, i) => i === 0 ? red : blush;

  const bars = g.selectAll('rect').data(data).join('rect')
    .attr('y', d => y(d.title)).attr('x', 0)
    .attr('height', y.bandwidth()).attr('width', 0)
    .attr('fill', defaultFill)
    .attr('rx', 3)
    .style('cursor', 'pointer')
    .style('transition', 'fill 0.2s, opacity 0.2s');

  // Hover
  bars
    .on('mousemove', function(e, d) {
      bars.attr('fill', (bd, bi) => bd === d ? green : defaultFill(bd, bi))
          .attr('opacity', bd => bd === d ? 1 : 0.3);
      showTooltip(e, `
        <strong>${d.title}</strong><br>
        <span style="color:#999;font-size:11px">Rating</span>&nbsp;&nbsp;${d.rating}<br>
        <span style="color:#999;font-size:11px">Episodes</span>&nbsp;&nbsp;${d.episodes}<br>
        <span style="color:#999;font-size:11px">Year</span>&nbsp;&nbsp;${d.year}
      `);
    })
    .on('mouseleave', function() {
      bars.attr('fill', defaultFill).attr('opacity', 1);
      hideTooltip();
    });

  // Animate bars
  bars.transition().duration(800).delay((d, i) => i * 80)
    .attr('width', d => x(d.watchers));

  // Watcher count labels
  g.selectAll('.rlabel').data(data).join('text')
    .attr('class', 'rlabel')
    .attr('x', d => x(d.watchers) + 6)
    .attr('y', d => y(d.title) + y.bandwidth() / 2 + 4)
    .text(d => (d.watchers / 1000).toFixed(0) + 'K')
    .style('font-size', '12px').style('fill', muted).style('font-family', 'DM Sans');

  // Y axis (drama titles)
  g.append('g').call(d3.axisLeft(y))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('line').remove())
    .call(a => a.selectAll('text').style('font-size', '11px').style('fill', ink).style('font-family', 'DM Sans'));
})();

// Genre Chart
(function () {
  const genreData = [
    { genre: 'Romance',       pctAll: 0.802, pctTop: 0.933, note: 'Dominates both — the engine of every hit' },
    { genre: 'Comedy',        pctAll: 0.594, pctTop: 0.933, note: 'Even more essential in breakout hits' },
    { genre: 'Drama',         pctAll: 0.564, pctTop: 0.467, note: 'Common overall but less so in top hits' },
    { genre: 'Thriller',      pctAll: 0.208, pctTop: 0.067, note: 'Popular overall — rarely breaks through' },
    { genre: 'Fantasy',       pctAll: 0.198, pctTop: 0.200, note: 'Equally represented in both groups' },
    { genre: 'Life',          pctAll: 0.198, pctTop: 0.067, note: 'Popular overall — rarely breaks through' },
    { genre: 'Action',        pctAll: 0.178, pctTop: 0.133, note: 'Slightly underrepresented in top hits' },
    { genre: 'Melodrama',     pctAll: 0.139, pctTop: 0.133, note: 'Balanced across both groups' },
    { genre: 'Mystery',       pctAll: 0.139, pctTop: 0.067, note: 'Popular overall — rarely breaks through' },
    { genre: 'Youth',         pctAll: 0.129, pctTop: 0.067, note: 'Less common in cross-validated hits' },
    { genre: 'Supernatural',  pctAll: 0.119, pctTop: 0.267, note: 'Punches above its weight in top hits' },
    { genre: 'Psychological', pctAll: 0.079, pctTop: 0.067, note: 'Balanced across both groups' },
    { genre: 'Business',      pctAll: 0.069, pctTop: 0.067, note: 'Balanced across both groups' },
    { genre: 'Horror',        pctAll: 0.069, pctTop: 0.067, note: 'Balanced across both groups' },
    { genre: 'Crime',         pctAll: 0.069, pctTop: 0.067, note: 'Balanced across both groups' },
    { genre: 'Law',           pctAll: 0.059, pctTop: 0.067, note: 'Balanced across both groups' },
    { genre: 'Sci-Fi',        pctAll: 0.059, pctTop: 0.000, note: 'Absent from all cross-validated hits' },
  ].sort((a, b) => b.pctAll - a.pctAll);

  const container = document.getElementById('chart-genres');
  const W         = Math.max(container.clientWidth - 20, 340);
  const H         = Math.min(W * 0.92, 430);
  const CX        = W / 2;
  const CY        = H / 2 + 12;
  const INNER_R   = 30;
  const OUTER_R   = Math.min(CX, CY) - 62;
  const PAD_ANGLE = 0.014;
  const CORNER_R  = 5;
  const OFFSET_F  = 0.20;
  const LABEL_OFF = 11;

  const svg = d3.select('#chart-genres')
    .append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet')
    .style('overflow', 'visible');

  svg.append('defs').append('style').text(
    '.genre-label { paint-order: stroke fill; stroke: white; stroke-width: 1px; stroke-linejoin: round; pointer-events: none; }'
  );

  const chart = svg.append('g').attr('transform', `translate(${CX},${CY})`);

  const angle = d3.scaleBand().domain(genreData.map(d => d.genre)).range([0, Math.PI * 2]).padding(-0.05);
  const rAll  = d3.scaleLinear().domain([0, 1]).range([INNER_R, OUTER_R]);
  const rTop  = d3.scaleLinear().domain([0, 1]).range([INNER_R, OUTER_R]);

  // Guide rings
  [0.25, 0.50, 0.75, 1.0].forEach((pct, i) => {
    chart.append('circle').attr('r', rAll(pct))
      .attr('fill', 'none').attr('stroke', '#d4c8bc')
      .attr('stroke-width', i === 3 ? 1 : 0.5)
      .attr('stroke-dasharray', i === 3 ? 'none' : '3,5').attr('opacity', 0.55);
  });

  [{ pct: 0.25, label: '25%' }, { pct: 0.50, label: '50%' }, { pct: 0.75, label: '75%' }].forEach(({ pct, label }) => {
    chart.append('text').attr('x', rAll(pct) + 4).attr('y', -3)
      .style('font-size', '8px').style('fill', muted).style('font-family', 'DM Sans').text(label);
  });

  // Arc generators
  const outerArc = d3.arc()
    .innerRadius(INNER_R).outerRadius(d => rAll(d.pctAll))
    .startAngle(d => angle(d.genre)).endAngle(d => angle(d.genre) + angle.bandwidth())
    .cornerRadius(CORNER_R).padAngle(PAD_ANGLE);

  const innerArc = d3.arc()
    .innerRadius(INNER_R).outerRadius(d => rTop(d.pctTop))
    .startAngle(d => angle(d.genre) + angle.bandwidth() * OFFSET_F)
    .endAngle(d => angle(d.genre) + angle.bandwidth() * (1 - OFFSET_F))
    .cornerRadius(3).padAngle(PAD_ANGLE * 0.5);

  const zeroO = d => d3.arc().innerRadius(INNER_R).outerRadius(INNER_R)
    .startAngle(angle(d.genre)).endAngle(angle(d.genre) + angle.bandwidth())
    .cornerRadius(CORNER_R).padAngle(PAD_ANGLE)();

  const zeroI = d => d3.arc().innerRadius(INNER_R).outerRadius(INNER_R)
    .startAngle(angle(d.genre) + angle.bandwidth() * OFFSET_F)
    .endAngle(angle(d.genre) + angle.bandwidth() * (1 - OFFSET_F))
    .cornerRadius(3).padAngle(PAD_ANGLE * 0.5)();

  let activeGenre = null, activeView = 'both';

  const outerPetals = chart.append('g').selectAll('path').data(genreData).join('path')
    .attr('d', zeroO).attr('fill', red).attr('fill-opacity', 0.75)
    .attr('stroke', 'white').attr('stroke-width', 1).style('cursor', 'pointer');

  const innerPetals = chart.append('g').selectAll('path').data(genreData).join('path')
    .attr('d', zeroI).attr('fill', blue).attr('fill-opacity', 0.88)
    .attr('stroke', 'white').attr('stroke-width', 0.8).style('cursor', 'pointer');

  // Labels
  const labelGroup = chart.append('g');
  genreData.forEach(d => {
    const mid = angle(d.genre) + angle.bandwidth() / 2;
    const t = mid - Math.PI / 2;
    const flip = (t > Math.PI / 2 || t < -Math.PI / 2) ? 180 : 0;
    const r = Math.max(rAll(d.pctAll), rTop(d.pctTop));
    const lbl = labelGroup.append('text')
      .attr('class', 'genre-label')
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', flip ? 'end' : 'start')
      .attr('transform', `rotate(${t * 180 / Math.PI}) translate(${r + LABEL_OFF},0) rotate(${flip})`)
      .attr('opacity', 0);

    lbl.append('tspan').style('font-size', '10px').style('fill', ink).style('font-family', 'DM Sans').text(d.genre);
    lbl.append('tspan').style('font-size', '8px').style('font-weight', '500').style('fill', red)
      .style('font-family', 'DM Sans').text(` ${(d.pctAll * 100).toFixed(0)}%`);
    if (d.pctTop > 0) {
      lbl.append('tspan').style('font-size', '8px').style('font-weight', '700').style('fill', blue)
        .style('font-family', 'DM Sans').text(` · ${(d.pctTop * 100).toFixed(0)}%`);
    } else {
      lbl.append('tspan').style('font-size', '8px').style('fill', '#bbb')
        .style('font-family', 'DM Sans').text(' · —');
    }
  });

  // Center hub
  const centerGroup = chart.append('g');
  centerGroup.append('circle').attr('r', INNER_R - 2)
    .attr('fill', cream).attr('stroke', '#e0d4ca');
  centerGroup.append('text').attr('text-anchor', 'middle').attr('dy', '-0.5em')
    .style('font-family', 'Playfair Display, DM Serif Display').style('font-size', '11px').style('fill', ink).text('Genre');
  centerGroup.append('text').attr('text-anchor', 'middle').attr('dy', '0.85em')
    .style('font-family', 'DM Sans').style('font-size', '8px').style('fill', muted).text('breakdown');

  // Detail panel
  const detailPanel = chart.append('g').attr('opacity', 0);
  detailPanel.append('circle').attr('r', INNER_R - 2)
    .attr('fill', cream).attr('stroke', red).attr('stroke-width', 1.5);
  const dName = detailPanel.append('text').attr('text-anchor', 'middle').attr('dy', '-1.4em')
    .style('font-family', 'Playfair Display, DM Serif Display').style('font-size', '8.5px').style('fill', ink);
  const dAll = detailPanel.append('text').attr('text-anchor', 'middle').attr('dy', '-0.1em')
    .style('font-family', 'DM Sans').style('font-size', '7.5px').style('fill', red);
  const dTop = detailPanel.append('text').attr('text-anchor', 'middle').attr('dy', '1.2em')
    .style('font-family', 'DM Sans').style('font-size', '7.5px').style('fill', '#555');

  function handleHover(e, d) {
    showTooltip(e, `
      <strong>${d.genre}</strong><br>
      <span style="color:${red}">●</span> All 101 MDL dramas: <strong>${(d.pctAll * 100).toFixed(0)}%</strong><br>
      <span style="color:${blue}">●</span> Top 15 validated hits: <strong>${d.pctTop > 0 ? (d.pctTop * 100).toFixed(0) + '%' : 'Not present'}</strong><br>
      <em style="font-size:10px;color:#aaa">${d.note}</em>
    `);
    if (activeGenre !== d.genre) {
      outerPetals.attr('fill-opacity', p => p.genre === d.genre ? 1 : 0.3);
      innerPetals.attr('fill-opacity', p => p.genre === d.genre ? 1 : 0.2);
    }
  }

  function handleLeave() {
    hideTooltip();
    if (!activeGenre) {
      outerPetals.attr('fill-opacity', activeView === 'top' ? 0 : 0.75);
      innerPetals.attr('fill-opacity', activeView === 'all' ? 0 : 0.88);
    }
  }

  function handleClick(e, d) {
    if (activeGenre === d.genre) {
      activeGenre = null;
      outerPetals.attr('fill-opacity', activeView === 'top' ? 0 : 0.75).attr('stroke-width', 1);
      innerPetals.attr('fill-opacity', activeView === 'all' ? 0 : 0.88).attr('stroke-width', 0.8);
      centerGroup.transition().duration(180).attr('opacity', 1);
      detailPanel.transition().duration(180).attr('opacity', 0);
    } else {
      activeGenre = d.genre;
      outerPetals
        .attr('fill-opacity', p => p.genre === d.genre ? 1 : (activeView === 'top' ? 0 : 0.18))
        .attr('stroke-width', p => p.genre === d.genre ? 2 : 1);
      innerPetals
        .attr('fill-opacity', p => p.genre === d.genre ? 1 : (activeView === 'all' ? 0 : 0.12))
        .attr('stroke-width', p => p.genre === d.genre ? 1.5 : 0.8);
      centerGroup.transition().duration(180).attr('opacity', 0);
      dName.text(d.genre);
      dAll.text(`All: ${(d.pctAll * 100).toFixed(0)}%`);
      dTop.text(`Top 15: ${d.pctTop > 0 ? (d.pctTop * 100).toFixed(0) + '%' : 'none'}`);
      detailPanel.transition().duration(200).attr('opacity', 1);
    }
  }

  outerPetals.on('mousemove', handleHover).on('mouseleave', handleLeave).on('click', handleClick);
  innerPetals.on('mousemove', handleHover).on('mouseleave', handleLeave).on('click', handleClick);

  // Scroll animation
  let animated = false;
  function animateIn() {
    if (animated) return;
    animated = true;
    outerPetals.transition().duration(1000).delay((d, i) => i * 55)
      .ease(d3.easeBackOut.overshoot(0.5)).attr('d', outerArc);
    innerPetals.transition().duration(800).delay((d, i) => 250 + i * 55)
      .ease(d3.easeBackOut.overshoot(0.7)).attr('d', innerArc);
    labelGroup.selectAll('text').transition()
      .duration(350).delay((d, i) => 500 + i * 40).attr('opacity', 1);
  }
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) animateIn();
  }, { threshold: 0.25 }).observe(container);

  // Toggle buttons
  const toggleWrap = document.createElement('div');
  toggleWrap.style.cssText = 'display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;align-items:center;';
  const toggleLabel = document.createElement('span');
  toggleLabel.textContent = 'Show:';
  toggleLabel.style.cssText = `font-size:11px;color:${muted};font-family:'DM Sans',sans-serif;`;
  toggleWrap.appendChild(toggleLabel);

  [{ label: 'Both layers', id: 'both' }, { label: 'All 101 dramas', id: 'all' }, { label: 'Top 15 hits', id: 'top' }]
    .forEach(v => {
      const btn = document.createElement('button');
      btn.textContent = v.label;
      btn.dataset.view = v.id;
      btn.style.cssText = `
        padding:5px 13px;font-size:11px;font-family:'DM Sans',sans-serif;
        border:1px solid ${v.id === 'both' ? red : '#d4c0b8'};
        background:${v.id === 'both' ? red : 'transparent'};
        color:${v.id === 'both' ? 'white' : muted};
        border-radius:3px;cursor:pointer;letter-spacing:0.5px;transition:all 0.2s;
      `;
      btn.addEventListener('click', () => {
        activeView = v.id; activeGenre = null;
        centerGroup.attr('opacity', 1); detailPanel.attr('opacity', 0);
        outerPetals.attr('stroke-width', 1); innerPetals.attr('stroke-width', 0.8);
        toggleWrap.querySelectorAll('button').forEach(b => {
          const on = b.dataset.view === v.id;
          b.style.background  = on ? red : 'transparent';
          b.style.color       = on ? 'white' : muted;
          b.style.borderColor = on ? red : '#d4c0b8';
        });
        if (v.id === 'top') {
          outerPetals.transition().duration(500).attr('fill-opacity', 0).attr('d', zeroO);
          innerPetals.transition().duration(500).attr('fill-opacity', 0.88).attr('d', innerArc);
        } else if (v.id === 'all') {
          outerPetals.transition().duration(500).attr('fill-opacity', 0.75).attr('d', outerArc);
          innerPetals.transition().duration(500).attr('fill-opacity', 0).attr('d', zeroI);
        } else {
          outerPetals.transition().duration(500).attr('fill-opacity', 0.75).attr('d', outerArc);
          innerPetals.transition().duration(500).attr('fill-opacity', 0.88).attr('d', innerArc);
        }
      });
      toggleWrap.appendChild(btn);
    });
  container.appendChild(toggleWrap);

  // Legend
  const legendDiv = document.createElement('div');
  legendDiv.style.cssText = 'display:flex;gap:20px;margin-top:10px;flex-wrap:wrap;align-items:center;';
  legendDiv.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:${muted};font-family:'DM Sans',sans-serif;">
      <svg width="14" height="14"><rect width="14" height="14" rx="2" fill="${red}" fill-opacity="0.8"/></svg>
      All 101 MDL dramas (outer)
    </div>
    <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:${muted};font-family:'DM Sans',sans-serif;">
      <svg width="10" height="14"><rect width="10" height="14" rx="2" fill="${blue}" fill-opacity="0.85"/></svg>
      Top 15 cross-validated hits (inner)
    </div>
    <div style="font-size:10px;color:#bbb;font-family:'DM Sans',sans-serif;">
      Hover for details · Click petal to inspect
    </div>
  `;
  container.appendChild(legendDiv);
})();

// Cultural Impact
(function() {
  const shows = ['Crash Landing on You', 'Squid Game', 'Goblin', "It's OK to Not Be OK", 'Mr. Sunshine'];
  const categories = ['Korean Food', 'Korean Language', 'K-Pop', 'Korea Travel'];
  const catColors  = [gold, red, blue, green];

  const rawData = {
    'Crash Landing on You': [62, 44, 38, 71],
    'Squid Game':           [88, 92, 55, 45],
    'Goblin':               [48, 36, 58, 80],
    "It's OK to Not Be OK": [30, 28, 42, 36],
    'Mr. Sunshine':         [24, 32, 22, 92],
  };

  const data = shows.map(s => ({
    show: s,
    values: categories.map((c, i) => ({ cat: c, val: rawData[s][i] }))
  }));

  const container = document.getElementById('chart-impact');
  const W = getChartWidth(container);
  const H = 320;
  const margin = { top: 20, right: 20, bottom: 80, left: 52 };
  const iW = W - margin.left - margin.right;
  const iH = H - margin.top - margin.bottom;

  const svg = d3.select('#chart-impact')
    .append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const x0 = d3.scaleBand().domain(shows).range([0, iW]).padding(0.2);
  const x1 = d3.scaleBand().domain(categories).range([0, x0.bandwidth()]).padding(0.05);
  const y  = d3.scaleLinear().domain([0, 100]).range([iH, 0]);

  // Gridlines
  g.append('g').selectAll('line').data(y.ticks(5)).join('line')
    .attr('x1', 0).attr('x2', iW).attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', '#e8ddd4');

  const showGroups = g.selectAll('.show-group').data(data).join('g')
    .attr('class', 'show-group')
    .attr('transform', d => `translate(${x0(d.show)},0)`);

  showGroups.selectAll('rect').data(d => d.values).join('rect')
    .attr('x', d => x1(d.cat)).attr('y', iH).attr('width', x1.bandwidth()).attr('height', 0)
    .attr('fill', (d, i) => catColors[i]).attr('rx', 2)
    .style('cursor', 'pointer')
    .on('mousemove', (e, d) => showTooltip(e, `<strong>${d.cat}</strong><br>Search spike: +${d.val}%`))
    .on('mouseleave', hideTooltip)
    .transition().duration(700).delay((d, i) => i * 60)
    .attr('y', d => y(d.val)).attr('height', d => iH - y(d.val));

  // X axis
  g.append('g').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(x0))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('line').remove())
    .call(a => a.selectAll('text')
      .style('font-size', '11px').style('fill', ink).style('font-family', 'DM Sans')
      .attr('transform', 'rotate(-20)').attr('text-anchor', 'end').attr('dx', '-4').attr('dy', '8'));

  // Y axis
  g.append('g').call(d3.axisLeft(y).ticks(5).tickFormat(d => d + '%'))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('text').style('font-size', '11px').style('fill', muted).style('font-family', 'DM Sans'))
    .call(a => a.selectAll('line').remove());

  // Legend
  const legG = svg.append('g').attr('transform', `translate(${margin.left}, ${H - 10})`);
  categories.forEach((c, i) => {
    const lx = i * (iW / categories.length);
    legG.append('rect').attr('x', lx).attr('y', 0).attr('width', 10).attr('height', 10).attr('fill', catColors[i]).attr('rx', 2);
    legG.append('text').attr('x', lx + 14).attr('y', 9)
      .style('font-size', '11px').style('fill', muted).style('font-family', 'DM Sans').text(c);
  });
})();

// Fade-in
const fadeEls = document.querySelectorAll('.fade-in');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
fadeEls.forEach(el => obs.observe(el));
