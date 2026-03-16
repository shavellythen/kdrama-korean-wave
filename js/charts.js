const rose  = '#c9675e';
const blush = '#e8c4b8';
const gold  = '#c8a96e';
const ink   = '#1a1210';
const muted = '#8a7a70';

const tooltip = document.createElement('div');
tooltip.style.cssText = 'position:fixed;background:#1a1210;color:#fff;padding:8px 12px;border-radius:4px;font-size:12px;font-family:DM Sans,sans-serif;pointer-events:none;opacity:0;transition:opacity 0.15s;z-index:999';
document.body.appendChild(tooltip);

function showTooltip(e, html) {
  tooltip.innerHTML = html;
  tooltip.style.opacity = 1;
  tooltip.style.left = (e.clientX + 14) + 'px';
  tooltip.style.top  = (e.clientY - 28) + 'px';
}
function hideTooltip() { tooltip.style.opacity = 0; }

// CHART TOP 10
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
  const W = container.parentElement.clientWidth - 80;
  const H = 340;
  const margin = { top: 10, right: 80, bottom: 20, left: 210 };
  const iW = W - margin.left - margin.right;
  const iH = H - margin.top - margin.bottom;

  const svg = d3.select('#chart-ratings').append('svg').attr('width', W).attr('height', H);
  const g   = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const y = d3.scaleBand().domain(data.map(d => d.title)).range([0, iH]).padding(0.3);
  const x = d3.scaleLinear().domain([0, 270000]).range([0, iW]);

  g.selectAll('rect').data(data).join('rect')
    .attr('y', d => y(d.title))
    .attr('x', 0)
    .attr('height', y.bandwidth())
    .attr('width', 0)
    .attr('fill', (d, i) => i === 0 ? rose : blush)
    .attr('rx', 1)
    .style('cursor', 'pointer')
.on('mousemove', (e, d) => showTooltip(e, `
  <strong>${d.title}</strong><br>
  <span style="color:#999;font-size:11px">Rating</span>&nbsp;&nbsp;<span>${d.rating}</span><br>
  <span style="color:#999;font-size:11px">Episodes</span>&nbsp;&nbsp;<span>${d.episodes}</span><br>
  <span style="color:#999;font-size:11px">Year</span>&nbsp;&nbsp;<span>${d.year}</span>
`))
    .on('mouseleave', hideTooltip)
    .transition().duration(800).delay((d, i) => i * 80)
    .attr('width', d => x(d.watchers));

  g.selectAll('.rlabel').data(data).join('text')
    .attr('class', 'rlabel')
    .attr('x', d => x(d.watchers) + 6)
    .attr('y', d => y(d.title) + y.bandwidth() / 2 + 4)
    .text(d => (d.watchers / 1000).toFixed(0) + 'K')
    .style('font-size', '12px').style('fill', muted).style('font-family', 'DM Sans');

  g.append('g').call(d3.axisLeft(y))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('line').remove())
    .call(a => a.selectAll('text').style('font-size', '11px').style('fill', ink).style('font-family', 'DM Sans'));
})();

// CHART GENRE
(function() {
  const data = [
    { genre: 'Romance',  pct: 82 },
    { genre: 'Comedy',   pct: 61 },
    { genre: 'Drama',    pct: 57 },
    { genre: 'Fantasy',  pct: 20 },
    { genre: 'Thriller', pct: 20 },
    { genre: 'Other',    pct: 30 },
  ];

  const colors = [rose, gold, blush, '#8bbfb8', '#b8a8c8', '#d4c8bc'];

  const container = document.getElementById('chart-genres');
  const size = Math.min(container.parentElement.clientWidth - 80, 280);

  const svg = d3.select('#chart-genres').append('svg').attr('width', size).attr('height', size);
  const g   = svg.append('g').attr('transform', `translate(${size / 2},${size / 2})`);

  const R = size * 0.4;
  const r = size * 0.22;

  const pie  = d3.pie().value(d => d.pct).sort(null);
  const arc  = d3.arc().innerRadius(r).outerRadius(R);
  const arcH = d3.arc().innerRadius(r).outerRadius(R + 8);

  g.selectAll('path').data(pie(data)).join('path')
    .attr('fill', (d, i) => colors[i])
    .attr('stroke', 'white').attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('mousemove', (e, d) => showTooltip(e, `<strong>${d.data.genre}</strong><br>${d.data.pct} of 100 K-Dramas`))
    .on('mouseleave', function() { d3.select(this).attr('d', arc); hideTooltip(); })
    .on('mouseover',  function() { d3.select(this).attr('d', arcH); })
    .transition().duration(900).delay((d, i) => i * 80)
    .attrTween('d', function(d) {
      const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return t => arc(i(t));
    });

  g.append('text').attr('text-anchor', 'middle').attr('dy', '-0.2em')
    .style('font-family', 'DM Serif Display').style('font-size', '22px').style('fill', ink)
    .text('Genre');
  g.append('text').attr('text-anchor', 'middle').attr('dy', '1.2em')
    .style('font-family', 'DM Sans').style('font-size', '11px').style('fill', muted)
    .text('breakdown');
})();

// fade
const fadeEls = document.querySelectorAll('.fade-in');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
fadeEls.forEach(el => obs.observe(el));
