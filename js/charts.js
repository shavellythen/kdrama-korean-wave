const green   = '#1a6b5a';
const red    = '#8b2e22';
const gold   = '#b8892a';
const blue  = '#1e4a7a';
const ink    = '#2A2018';
const muted  = '#8A7E6E';
const cream  = '#F0E8D4';

const tooltip = document.getElementById('tooltip');

function showTooltip(e, html) {
  tooltip.innerHTML = html;
  tooltip.style.opacity = 1;
  tooltip.style.left = (e.clientX + 14) + 'px';
  tooltip.style.top  = (e.clientY - 28) + 'px';
}
function hideTooltip() { tooltip.style.opacity = 0; }

function getChartWidth(container) {
  return container.clientWidth - 20;
}



// CHART: Genres
function initGenreChart() {
  const container = document.getElementById('chart-genres');
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = 'true';

  const fnt = "'DM Sans',sans-serif";
  const dspFnt = "'Playfair Display',serif";

  const genreData = [
    { genre: 'Romance',       pctAll: 0.802, pctTop: 0.933, note: 'Dominates both' },
    { genre: 'Comedy',        pctAll: 0.594, pctTop: 0.933, note: 'Even more essential in breakout hits' },
    { genre: 'Drama',         pctAll: 0.564, pctTop: 0.467, note: 'Common overall, less so in top hits' },
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

  const W = Math.max(container.clientWidth - 20, 340);
  const H = Math.min(W * 0.92, 430);
  const CX = W / 2, CY = H / 2 + 12;
  const INNER_R = 30, OUTER_R = Math.min(CX, CY) - 62;
  const PAD_ANGLE = 0.014, CORNER_R = 5, OFFSET_F = 0.20, LABEL_OFF = 11;

  const svg = d3.select('#chart-genres')
    .append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet')
    .style('overflow', 'visible');

  svg.append('defs').append('style').text(
    `.genre-label { paint-order: stroke fill; stroke: ${cream}; stroke-width: 1px; stroke-linejoin: round; pointer-events: none; }`
  );

  const chart = svg.append('g').attr('transform', `translate(${CX},${CY})`);
  const angle = d3.scaleBand().domain(genreData.map(d => d.genre)).range([0, Math.PI * 2]).padding(-0.05);
  const rAll = d3.scaleLinear().domain([0, 1]).range([INNER_R, OUTER_R]);
  const rTop = d3.scaleLinear().domain([0, 1]).range([INNER_R, OUTER_R]);

  [0.25, 0.50, 0.75, 1.0].forEach((pct, i) => {
    chart.append('circle').attr('r', rAll(pct))
      .attr('fill', 'none').attr('stroke', '#DDD0B8')
      .attr('stroke-width', i === 3 ? 0.8 : 0.4)
      .attr('stroke-dasharray', i === 3 ? 'none' : '3,5').attr('opacity', 0.6);
  });

  [{ pct: 0.25, label: '25%' }, { pct: 0.50, label: '50%' }, { pct: 0.75, label: '75%' }].forEach(({ pct, label }) => {
    chart.append('text').attr('x', rAll(pct) + 4).attr('y', -3)
      .style('font-size', '8px').style('fill', muted).style('font-family', fnt).text(label);
  });

  const outerArc = d3.arc().innerRadius(INNER_R).outerRadius(d => rAll(d.pctAll))
    .startAngle(d => angle(d.genre)).endAngle(d => angle(d.genre) + angle.bandwidth())
    .cornerRadius(CORNER_R).padAngle(PAD_ANGLE);
  const innerArc = d3.arc().innerRadius(INNER_R).outerRadius(d => rTop(d.pctTop))
    .startAngle(d => angle(d.genre) + angle.bandwidth() * OFFSET_F)
    .endAngle(d => angle(d.genre) + angle.bandwidth() * (1 - OFFSET_F))
    .cornerRadius(3).padAngle(PAD_ANGLE * 0.5);
  const zeroO = d => d3.arc().innerRadius(INNER_R).outerRadius(INNER_R)
    .startAngle(angle(d.genre)).endAngle(angle(d.genre) + angle.bandwidth()).cornerRadius(CORNER_R).padAngle(PAD_ANGLE)();
  const zeroI = d => d3.arc().innerRadius(INNER_R).outerRadius(INNER_R)
    .startAngle(angle(d.genre) + angle.bandwidth() * OFFSET_F)
    .endAngle(angle(d.genre) + angle.bandwidth() * (1 - OFFSET_F)).cornerRadius(3).padAngle(PAD_ANGLE * 0.5)();

  let activeGenre = null, activeView = 'both';

  const outerPetals = chart.append('g').selectAll('path').data(genreData).join('path')
    .attr('d', zeroO).attr('fill', gold).attr('fill-opacity', 0.75)
    .attr('stroke', cream).attr('stroke-width', 1).style('cursor', 'pointer');
  const innerPetals = chart.append('g').selectAll('path').data(genreData).join('path')
    .attr('d', zeroI).attr('fill', green).attr('fill-opacity', 0.88)
    .attr('stroke', cream).attr('stroke-width', 0.8).style('cursor', 'pointer');

  const labelGroup = chart.append('g');
  genreData.forEach(d => {
    const mid = angle(d.genre) + angle.bandwidth() / 2;
    const t = mid - Math.PI / 2;
    const flip = (t > Math.PI / 2 || t < -Math.PI / 2) ? 180 : 0;
    const r = Math.max(rAll(d.pctAll), rTop(d.pctTop));
    const lbl = labelGroup.append('text').attr('class', 'genre-label')
      .attr('dominant-baseline', 'middle').attr('text-anchor', flip ? 'end' : 'start')
      .attr('transform', `rotate(${t * 180 / Math.PI}) translate(${r + LABEL_OFF},0) rotate(${flip})`)
      .attr('opacity', 0);
    lbl.append('tspan').style('font-size', '10px').style('fill', ink).style('font-family', fnt).text(d.genre);
    lbl.append('tspan').style('font-size', '8px').style('font-weight', '500').style('fill', red).style('font-family', fnt).text(` ${(d.pctAll * 100).toFixed(0)}%`);
    if (d.pctTop > 0) lbl.append('tspan').style('font-size', '8px').style('font-weight', '600').style('fill', green).style('font-family', fnt).text(` · ${(d.pctTop * 100).toFixed(0)}%`);
    else lbl.append('tspan').style('font-size', '8px').style('fill', '#bbb').style('font-family', fnt).text(' · —');
  });

  const centerGroup = chart.append('g');
  centerGroup.append('circle').attr('r', INNER_R - 2).attr('fill', cream).attr('stroke', '#DDD0B8');
  centerGroup.append('text').attr('text-anchor', 'middle').attr('dy', '-0.5em').style('font-family', dspFnt).style('font-size', '11px').style('fill', ink).text('Genre');
  centerGroup.append('text').attr('text-anchor', 'middle').attr('dy', '0.85em').style('font-family', fnt).style('font-size', '8px').style('fill', muted).text('breakdown');

  const detailPanel = chart.append('g').attr('opacity', 0);
  detailPanel.append('circle').attr('r', INNER_R - 2).attr('fill', cream).attr('stroke', red).attr('stroke-width', 1.5);
  const dName = detailPanel.append('text').attr('text-anchor', 'middle').attr('dy', '-1.4em').style('font-family', dspFnt).style('font-size', '8.5px').style('fill', ink);
  const dAll  = detailPanel.append('text').attr('text-anchor', 'middle').attr('dy', '-0.1em').style('font-family', fnt).style('font-size', '7.5px').style('fill', red);
  const dTop  = detailPanel.append('text').attr('text-anchor', 'middle').attr('dy', '1.2em').style('font-family', fnt).style('font-size', '7.5px').style('fill', '#555');

  function handleHover(e, d) {
    showTooltip(e, `<strong>${d.genre}</strong><br><span style="color:${gold}">●</span> All 101: <strong>${(d.pctAll * 100).toFixed(0)}%</strong><br><span style="color:${green}">●</span> Top 15: <strong>${d.pctTop > 0 ? (d.pctTop * 100).toFixed(0) + '%' : '—'}</strong><br><em style="font-size:10px;color:#999">${d.note}</em>`);
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
      outerPetals.attr('fill-opacity', p => p.genre === d.genre ? 1 : (activeView === 'top' ? 0 : 0.18)).attr('stroke-width', p => p.genre === d.genre ? 2 : 1);
      innerPetals.attr('fill-opacity', p => p.genre === d.genre ? 1 : (activeView === 'all' ? 0 : 0.12)).attr('stroke-width', p => p.genre === d.genre ? 1.5 : 0.8);
      centerGroup.transition().duration(180).attr('opacity', 0);
      dName.text(d.genre); dAll.text(`All: ${(d.pctAll * 100).toFixed(0)}%`);
      dTop.text(`Top 15: ${d.pctTop > 0 ? (d.pctTop * 100).toFixed(0) + '%' : 'none'}`);
      detailPanel.transition().duration(200).attr('opacity', 1);
    }
  }

  outerPetals.on('mousemove', handleHover).on('mouseleave', handleLeave).on('click', handleClick);
  innerPetals.on('mousemove', handleHover).on('mouseleave', handleLeave).on('click', handleClick);

  // Animate in on intersection
  let animated = false;
  function animateIn() {
    if (animated) return; animated = true;
    outerPetals.transition().duration(1000).delay((d, i) => i * 55).ease(d3.easeBackOut.overshoot(0.5)).attr('d', outerArc);
    innerPetals.transition().duration(800).delay((d, i) => 250 + i * 55).ease(d3.easeBackOut.overshoot(0.7)).attr('d', innerArc);
    labelGroup.selectAll('text').transition().duration(350).delay((d, i) => 500 + i * 40).attr('opacity', 1);
  }
  new IntersectionObserver(entries => { if (entries[0].isIntersecting) animateIn(); }, { threshold: 0.25 }).observe(container);

  // Toggle controls
  const toggleWrap = document.createElement('div');
  toggleWrap.style.cssText = 'display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;align-items:center;';
  const toggleLabel = document.createElement('span');
  toggleLabel.textContent = 'Show:';
  toggleLabel.style.cssText = `font-size:11px;color:${muted};font-family:${fnt};`;
  toggleWrap.appendChild(toggleLabel);
  [{ label: 'Both', id: 'both' }, { label: 'All 101', id: 'all' }, { label: 'Top 15', id: 'top' }].forEach(v => {
    const btn = document.createElement('button');
    btn.textContent = v.label; btn.dataset.view = v.id;
    btn.style.cssText = `padding:4px 12px;font-size:10px;font-family:${fnt};border:1px solid ${v.id === 'both' ? gold : '#CCC0A8'};background:${v.id === 'both' ? gold : 'transparent'};color:${v.id === 'both' ? cream : muted};border-radius:1px;cursor:pointer;transition:all 0.2s;`;
    btn.addEventListener('click', () => {
      activeView = v.id; activeGenre = null;
      centerGroup.attr('opacity', 1); detailPanel.attr('opacity', 0);
      outerPetals.attr('stroke-width', 1); innerPetals.attr('stroke-width', 0.8);
      toggleWrap.querySelectorAll('button').forEach(b => {
        const on = b.dataset.view === v.id;
        b.style.background = on ? gold : 'transparent';
        b.style.color = on ? cream : muted;
        b.style.borderColor = on ? gold : '#CCC0A8';
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

  const legendDiv = document.createElement('div');
  legendDiv.style.cssText = 'display:flex;gap:16px;margin-top:10px;flex-wrap:wrap;';
  legendDiv.innerHTML = `<div style="display:flex;align-items:center;gap:5px;font-size:10px;color:${muted};font-family:${fnt};"><svg width="12" height="12"><rect width="12" height="12" rx="1" fill="${gold}" fill-opacity="0.8"/></svg>All 101 (outer)</div><div style="display:flex;align-items:center;gap:5px;font-size:10px;color:${muted};font-family:${fnt};"><svg width="9" height="12"><rect width="9" height="12" rx="1" fill="${green}" fill-opacity="0.85"/></svg>Top 15 (inner)</div>`;
  container.appendChild(legendDiv);
}


// CHART: Duolingo

(function() {
  const container = document.getElementById('chart-timeline');
  if (!container) return;

  const fnt = "'DM Sans',sans-serif";

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
    { year: 2023, label: 'Overtakes Italian' },
  ];

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

  g.append('g').selectAll('line').data([5,6,7,8,9,10]).join('line')
    .attr('x1', 0).attr('x2', iW)
    .attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', '#DDD0B8').attr('stroke-width', 0.5);

  g.append('path').datum(data)
    .attr('fill', blue).attr('fill-opacity', 0.1)
    .attr('d', d3.area().x(d => x(d.year)).y0(iH).y1(d => y(d.ranking)).curve(d3.curveCatmullRom));

  g.append('path').datum(data)
    .attr('fill', 'none').attr('stroke', blue).attr('stroke-width', 2.5)
    .attr('d', d3.line().x(d => x(d.year)).y(d => y(d.ranking)).curve(d3.curveCatmullRom));

  events.forEach(ev => {
    const xPos = x(ev.year);
    g.append('line').attr('x1', xPos).attr('x2', xPos).attr('y1', 0).attr('y2', iH)
      .attr('stroke', gold).attr('stroke-dasharray', '3,3').attr('stroke-width', 0.8);
    g.append('text').attr('x', xPos + 5).attr('y', 12).text(ev.label)
      .style('font-size', '9px').style('fill', gold).style('font-family', fnt);
  });

  g.selectAll('.dot').data(data).join('circle')
    .attr('cx', d => x(d.year)).attr('cy', d => y(d.ranking))
    .attr('r', 5).attr('fill', red).attr('stroke', cream).attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('mousemove', (e, d) => showTooltip(e, `<strong>${d.year}</strong><br>Global Rank: <strong>#${d.ranking}</strong>`))
    .on('mouseleave', hideTooltip);

  g.append('g').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(x).tickFormat(d3.format('d')).ticks(7))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('text').style('font-size', '11px').style('fill', muted).style('font-family', fnt));

  g.append('text').attr('transform', 'rotate(-90)')
    .attr('x', -iH / 2).attr('y', -38).attr('text-anchor', 'middle')
    .text('Global Ranking')
    .style('font-size', '10px').style('fill', muted).style('font-family', fnt);

  g.append('g')
    .call(d3.axisLeft(y).tickValues([10,9,8,7,6,5]).tickFormat(d => '#' + d))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('text').style('font-size', '11px').style('fill', muted).style('font-family', fnt))
    .call(a => a.selectAll('line').remove());

  const leg = document.getElementById('legend-timeline');
  if (leg) {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<div class="legend-dot" style="background:${red}"></div>Korean on Duolingo Global Ranking`;
    leg.appendChild(item);
  }
})();


// CHART: Grouped Bars

(function() {
  const container = document.getElementById('chart-impact');
  if (!container) return;

  const fnt = "'DM Sans',sans-serif";
  const shows = ['Goblin', 'Descendants of the Sun', 'Crash Landing on You', "It's OK to Not Be OK", 'Squid Game'];
  const categories = ['Korean Food', 'Korean Language', 'K-Pop', 'Korea Travel'];
  const catColors = [gold, red, blue, green];
const rawData = {
    'Goblin':                  [45, 67, 73, 71],
    'Descendants of the Sun':  [42, 58, 27, 114],
    'Crash Landing on You':    [25, 11, 21, 67],
    "It's OK to Not Be OK":    [46, 58, 57,  3],
    'Squid Game':              [47,  0,  7, 100],
  };
  const shortNames = {
    'Goblin':                  'Goblin',
    'Descendants of the Sun':  'Descendants',
    'Crash Landing on You':    'Crash Landing',
    "It's OK to Not Be OK":    "It's OK...",
    'Squid Game':              'Squid Game'
  };
  const tooltipNotes = {
    'Squid Game': {
      'Korean Language': '⚠ No Google Trends spike, but Duolingo reported +40% Korean course sign-ups post-premiere.'
    }
  };
  const data = shows.map(s => ({ show: s, values: categories.map((c, i) => ({ cat: c, val: rawData[s][i], show: s })) }));

  const W = getChartWidth(container), H = 320;
  const margin = { top: 20, right: 20, bottom: 100, left: 52 };
  const iW = W - margin.left - margin.right;
  const iH = H - margin.top - margin.bottom;

  const svg = d3.select('#chart-impact').append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const x0 = d3.scaleBand().domain(shows).range([0, iW]).padding(0.2);
  const x1 = d3.scaleBand().domain(categories).range([0, x0.bandwidth()]).padding(0.05);
  const y  = d3.scaleLinear().domain([0, 125]).range([iH, 0]);

  g.append('g').selectAll('line').data(y.ticks(6)).join('line')
    .attr('x1', 0).attr('x2', iW).attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', '#DDD0B8').attr('stroke-width', 0.4);

  const showGroups = g.selectAll('.show-group').data(data).join('g')
    .attr('class', 'show-group').attr('transform', d => `translate(${x0(d.show)},0)`);

  showGroups.selectAll('rect').data(d => d.values).join('rect')
    .attr('x', d => x1(d.cat)).attr('y', iH).attr('width', x1.bandwidth()).attr('height', 0)
    .attr('fill', (d, i) => catColors[i]).attr('rx', 2).style('cursor', 'pointer')
    .on('mousemove', (e, d) => {
      const note = (tooltipNotes[d.show] || {})[d.cat];
      const valLine = d.val === 0
        ? '<span style="color:#aaa">No measurable spike</span>'
        : 'Search spike: <strong>+' + d.val + '%</strong>';
      const noteLine = note ? '<br><em style="font-size:10px;color:#E8B84B">' + note + '</em>' : '';
      showTooltip(e, '<strong>' + d.cat + '</strong><br>' + valLine + noteLine);
    })
    .on('mouseleave', hideTooltip)
    .transition().duration(700).delay((d, i) => i * 60)
    .attr('y', d => d.val === 0 ? y(1) : y(d.val))
.attr('height', d => d.val === 0 ? iH - y(1) : iH - y(d.val));

  g.append('g').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(x0).tickFormat(d => shortNames[d] || d))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('line').remove())
    .call(a => a.selectAll('text').style('font-size', '10px').style('fill', ink).style('font-family', fnt)
      .attr('transform', 'rotate(0)').attr('text-anchor', 'middle').attr('dx', '0').attr('dy', '12'));

  g.append('g')
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + '%'))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('text').style('font-size', '11px').style('fill', muted).style('font-family', fnt))
    .call(a => a.selectAll('line').remove());

  const legG = svg.append('g').attr('transform', `translate(${margin.left}, ${H - 10})`);
  categories.forEach((c, i) => {
    const lx = i * (iW / categories.length);
    legG.append('rect').attr('x', lx).attr('y', 0).attr('width', 10).attr('height', 10).attr('fill', catColors[i]).attr('rx', 2);
    legG.append('text').attr('x', lx + 14).attr('y', 9).style('font-size', '10px').style('fill', muted).style('font-family', fnt).text(c);
  });
})();

document.addEventListener('chartsReady', function() {
  initGenreChart();
  if (window.initChartToggle) window.initChartToggle();
});

document.addEventListener('DOMContentLoaded', function() {
  initGenreChart();
  if (window.initChartToggle) window.initChartToggle();
});
