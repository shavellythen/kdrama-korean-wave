(function () {

  const DATA = [
    {t:"Squid Game",w:350000,r:9.0,g:["Thriller","Drama","Sci-Fi"]},
    {t:"Goblin",w:254985,r:8.8,g:["Romance","Fantasy","Drama"]},
    {t:"Strong Woman Do Bong Soon",w:239773,r:8.7,g:["Romance","Comedy","Fantasy"]},
    {t:"It's Okay to Not Be Okay",w:215957,r:8.9,g:["Romance","Drama","Melodrama"]},
    {t:"Descendants of the Sun",w:213187,r:8.6,g:["Romance","Drama","Comedy"]},
    {t:"What's Wrong with Secretary Kim",w:212766,r:8.5,g:["Romance","Comedy"]},
    {t:"Weightlifting Fairy Kim Bok-joo",w:212406,r:8.8,g:["Romance","Comedy","Drama"]},
    {t:"Crash Landing on You",w:208913,r:9.0,g:["Romance","Drama","Comedy"]},
    {t:"W",w:199073,r:8.5,g:["Romance","Fantasy","Thriller"]},
    {t:"Hotel del Luna",w:183598,r:8.6,g:["Romance","Fantasy","Melodrama","Supernatural"]},
    {t:"My Love from the Star",w:162000,r:8.7,g:["Romance","Fantasy","Comedy"]},
    {t:"Reply 1988",w:158000,r:9.2,g:["Romance","Comedy","Melodrama","Drama"]},
    {t:"Mr. Sunshine",w:140000,r:8.9,g:["Romance","Drama","Melodrama","Action"]},
    {t:"Signal",w:128000,r:9.0,g:["Thriller","Drama","Fantasy","Mystery"]},
    {t:"Sky Castle",w:115000,r:8.8,g:["Drama","Thriller","Comedy"]},
    {t:"The King: Eternal Monarch",w:112000,r:8.3,g:["Romance","Fantasy","Thriller"]},
    {t:"Chicago Typewriter",w:108000,r:8.7,g:["Romance","Drama","Mystery"]},
    {t:"Healer",w:105000,r:8.9,g:["Romance","Action","Thriller","Mystery"]},
    {t:"Moon Lovers: Scarlet Heart Ryeo",w:103000,r:8.7,g:["Romance","Drama","Melodrama","Fantasy"]},
    {t:"Extraordinary Attorney Woo",w:101000,r:8.8,g:["Romance","Drama","Comedy"]},
    {t:"Kingdom",w:98000,r:8.7,g:["Thriller","Action","Mystery","Drama"]},
    {t:"Itaewon Class",w:96000,r:8.5,g:["Romance","Drama","Action"]},
    {t:"Twenty Five Twenty One",w:94000,r:8.7,g:["Romance","Drama","Melodrama"]},
    {t:"Our Beloved Summer",w:90000,r:8.6,g:["Romance","Comedy","Drama"]},
    {t:"Vincenzo",w:89000,r:8.7,g:["Drama","Action","Comedy","Thriller"]},
    {t:"Nevertheless",w:85000,r:7.8,g:["Romance","Drama","Melodrama"]},
    {t:"The Glory",w:83000,r:8.9,g:["Drama","Thriller","Melodrama","Mystery"]},
    {t:"Hometown Cha-Cha-Cha",w:80000,r:8.6,g:["Romance","Comedy","Drama"]},
    {t:"Business Proposal",w:79000,r:8.5,g:["Romance","Comedy"]},
    {t:"Sweet Home",w:76000,r:8.0,g:["Thriller","Drama","Supernatural","Action"]},
    {t:"Mystic Pop-up Bar",w:74000,r:8.6,g:["Romance","Fantasy","Comedy","Supernatural"]},
    {t:"My Mister",w:72000,r:9.1,g:["Drama","Melodrama"]},
    {t:"Doctor Romantic",w:70000,r:8.7,g:["Romance","Drama","Action"]},
    {t:"Mouse",w:68000,r:8.6,g:["Thriller","Mystery","Drama"]},
    {t:"Reborn Rich",w:66000,r:8.8,g:["Drama","Thriller","Fantasy"]},
    {t:"All of Us Are Dead",w:64000,r:8.1,g:["Thriller","Action","Drama"]},
    {t:"Hellbound",w:62000,r:7.9,g:["Thriller","Supernatural","Drama"]},
    {t:"My Girlfriend Is a Gumiho",w:60000,r:8.5,g:["Romance","Fantasy","Comedy","Supernatural"]},
    {t:"Run On",w:59000,r:8.4,g:["Romance","Drama","Melodrama"]},
    {t:"Record of Youth",w:57000,r:8.2,g:["Romance","Drama","Melodrama"]},
    {t:"Flower of Evil",w:56000,r:9.1,g:["Thriller","Drama","Mystery","Melodrama"]},
    {t:"Move to Heaven",w:54000,r:9.0,g:["Drama","Melodrama"]},
    {t:"Be Melodramatic",w:52000,r:8.8,g:["Comedy","Romance","Drama","Melodrama"]},
    {t:"Hospital Playlist",w:50000,r:9.0,g:["Drama","Comedy","Melodrama"]},
    {t:"Rookie Historian Goo Hae-ryung",w:48000,r:8.4,g:["Romance","Comedy","Drama"]},
    {t:"Alchemy of Souls",w:47000,r:8.8,g:["Romance","Fantasy","Action","Mystery"]},
    {t:"Pinocchio",w:46000,r:8.7,g:["Romance","Drama","Mystery"]},
    {t:"While You Were Sleeping",w:45000,r:8.7,g:["Romance","Drama","Fantasy","Mystery"]},
    {t:"Suspicious Partner",w:44000,r:8.6,g:["Romance","Thriller","Mystery","Comedy"]},
    {t:"Juvenile Justice",w:43000,r:8.8,g:["Drama","Thriller","Mystery"]},
    {t:"Start-Up",w:42000,r:8.4,g:["Romance","Drama","Comedy"]},
    {t:"Love in the Moonlight",w:41000,r:8.4,g:["Romance","Comedy","Drama","Fantasy"]},
    {t:"True Beauty",w:40000,r:8.3,g:["Romance","Comedy","Drama"]},
    {t:"The Red Sleeve",w:39000,r:9.0,g:["Romance","Drama","Melodrama","Fantasy"]},
    {t:"Strangers from Hell",w:38000,r:8.5,g:["Thriller","Mystery","Drama"]},
    {t:"Hi Bye, Mama!",w:37000,r:8.6,g:["Romance","Drama","Melodrama","Fantasy","Supernatural"]},
    {t:"Oh My Venus",w:36000,r:8.5,g:["Romance","Comedy","Drama"]},
    {t:"When the Camellia Blooms",w:35000,r:8.8,g:["Romance","Comedy","Mystery","Melodrama"]},
    {t:"My ID is Gangnam Beauty",w:34000,r:8.3,g:["Romance","Comedy","Drama"]},
    {t:"She Was Pretty",w:33000,r:8.4,g:["Romance","Comedy","Drama"]},
    {t:"Hwarang",w:32000,r:8.0,g:["Romance","Drama","Action","Fantasy"]},
    {t:"Tunnel",w:31000,r:8.8,g:["Thriller","Mystery","Drama","Fantasy"]},
    {t:"Misaeng: Incomplete Life",w:30000,r:9.0,g:["Drama","Melodrama"]},
    {t:"Secret Garden",w:29000,r:8.5,g:["Romance","Fantasy","Comedy","Drama"]},
    {t:"Boys Over Flowers",w:28500,r:7.9,g:["Romance","Drama","Comedy"]},
    {t:"49 Days",w:27000,r:8.6,g:["Romance","Fantasy","Drama","Melodrama","Supernatural"]},
    {t:"Master's Sun",w:26500,r:8.5,g:["Romance","Comedy","Supernatural","Drama"]},
    {t:"Fight My Way",w:26000,r:8.5,g:["Romance","Comedy","Drama"]},
    {t:"Because This Is My First Life",w:25000,r:8.7,g:["Romance","Comedy","Drama"]},
    {t:"Kill Me, Heal Me",w:24500,r:8.7,g:["Romance","Comedy","Drama","Melodrama"]},
    {t:"Pasta",w:24000,r:8.3,g:["Romance","Comedy","Drama"]},
    {t:"You're Beautiful",w:23500,r:8.3,g:["Romance","Comedy","Drama"]},
    {t:"I Hear Your Voice",w:23000,r:8.8,g:["Romance","Thriller","Fantasy","Mystery"]},
    {t:"Prosecutor Princess",w:22000,r:8.3,g:["Romance","Comedy","Drama"]},
    {t:"King of Dramas",w:21500,r:8.6,g:["Comedy","Drama"]},
    {t:"2521",w:21000,r:8.7,g:["Romance","Drama","Melodrama"]},
    {t:"Coffee Prince",w:20500,r:8.5,g:["Romance","Comedy","Drama"]},
    {t:"Touch Your Heart",w:20000,r:8.2,g:["Romance","Comedy","Drama"]},
    {t:"Her Private Life",w:19500,r:8.4,g:["Romance","Comedy","Drama"]},
    {t:"Melting Me Softly",w:18000,r:7.8,g:["Romance","Comedy","Sci-Fi"]},
    {t:"Terius Behind Me",w:17500,r:8.4,g:["Romance","Action","Thriller","Comedy"]},
    {t:"My Strange Hero",w:17000,r:8.2,g:["Romance","Comedy","Drama"]},
    {t:"The Package",w:16500,r:8.2,g:["Romance","Comedy","Drama"]},
    {t:"Possessed",w:16000,r:7.9,g:["Thriller","Mystery","Supernatural","Drama"]},
    {t:"Chocolate",w:15500,r:8.3,g:["Romance","Drama","Melodrama"]},
    {t:"Tale of the Nine-Tailed",w:15000,r:8.4,g:["Romance","Fantasy","Action","Supernatural"]},
    {t:"Beyond Evil",w:14500,r:9.1,g:["Thriller","Mystery","Drama"]},
    {t:"Mine",w:14000,r:8.5,g:["Drama","Thriller","Melodrama","Mystery"]},
    {t:"Bulgasal: Immortal Souls",w:13500,r:8.4,g:["Fantasy","Thriller","Supernatural","Action","Drama"]},
    {t:"Happiness",w:13000,r:8.4,g:["Thriller","Drama","Mystery"]},
    {t:"Taxi Driver",w:12500,r:8.7,g:["Drama","Action","Thriller","Mystery"]},
    {t:"Jirisan",w:12000,r:7.9,g:["Thriller","Mystery","Drama"]},
    {t:"One Spring Night",w:11500,r:8.7,g:["Romance","Drama","Melodrama"]},
    {t:"Something in the Rain",w:11000,r:8.5,g:["Romance","Drama","Melodrama"]},
    {t:"Memories of the Alhambra",w:10500,r:8.4,g:["Romance","Thriller","Fantasy","Action"]},
    {t:"Arthdal Chronicles",w:10000,r:8.2,g:["Fantasy","Action","Drama"]},
    {t:"The Penthouse",w:9500,r:8.3,g:["Drama","Thriller","Melodrama","Mystery"]},
    {t:"Doom at Your Service",w:9000,r:8.3,g:["Romance","Fantasy","Melodrama"]},
    {t:"D.P.",w:8000,r:8.7,g:["Drama","Action","Thriller"]},
    {t:"Hometown",w:7500,r:8.3,g:["Thriller","Mystery","Drama"]},
  ];

  const HEADLINES = {
    watchers:{
      All:"<em>Squid Game</em> leads all 101 dramas in total watchers",
      Romance:"<em>Goblin</em> is the most-watched romance drama",
      Comedy:"<em>Strong Woman Do Bong Soon</em> tops comedy watchers",
      Drama:"<em>Squid Game</em> leads the drama genre in watchers",
      Fantasy:"<em>Goblin</em> dominates fantasy with 255K watchers",
      Thriller:"<em>Squid Game</em> towers over all thrillers",
      Supernatural:"<em>Hotel del Luna</em> leads supernatural dramas",
      Melodrama:"<em>It's Okay to Not Be Okay</em> tops melodrama watchers",
      Action:"<em>Mr. Sunshine</em> leads action dramas in watchers",
      Mystery:"<em>Signal</em> is the most-watched mystery drama",
    },
    rating:{
      All:"<em>Reply 1988</em> holds the highest MDL rating — 9.2",
      Romance:"<em>Crash Landing on You</em> ties for top-rated romance at 9.0",
      Comedy:"<em>Reply 1988</em> is the highest-rated comedy (9.2)",
      Drama:"<em>My Mister</em> leads dramas with a 9.1 rating",
      Fantasy:"<em>Signal</em> leads fantasy-tagged dramas at 9.0",
      Thriller:"<em>Flower of Evil</em> leads thrillers with a 9.1 rating",
      Supernatural:"<em>Hi Bye, Mama!</em> tops supernatural dramas by rating",
      Melodrama:"<em>Flower of Evil</em> leads melodrama ratings at 9.1",
      Action:"<em>Healer</em> is the highest-rated action drama (8.9)",
      Mystery:"<em>Beyond Evil</em> leads mystery with a 9.1 rating",
    }
  };

  const CYCLE_MS = 4000;
  let metric = 'watchers', genre = 'All', autoTimer = null, paused = false;
  const margin = { top: 6, right: 8, bottom: 6, left: 4 };
  const BAR_H = 30, GAP = 7;

  function getIW(container) {
    return (container.clientWidth || 500) - margin.left - margin.right;
  }

  function filtered() {
    let arr = genre === 'All' ? [...DATA] : DATA.filter(d => d.g.includes(genre));
    return arr.sort((a, b) => metric === 'watchers' ? b.w - a.w : b.r - a.r).slice(0, 10);
  }

  function val(d) { return metric === 'watchers' ? d.w : d.r; }
  function fmt(v) {
    if (metric === 'watchers') return v >= 1000 ? (v / 1000).toFixed(0) + 'K' : v;
    return v.toFixed(1);
  }

  // call chartsReady
  window.initChartToggle = function() {
    const container = document.getElementById('chart-toggle');
    if (!container || container.dataset.initialized) return;
    container.dataset.initialized = 'true';

    // controls above the chart
    container.insertAdjacentHTML('beforebegin', `
      <div id="toggle-controls" style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap;">
        <select id="toggle-genre" style="font-family:'DM Sans',sans-serif;font-size:11px;padding:6px 12px;border-radius:3px;border:1px solid #D4A840;background:#F0E8D4;color:#2A2018;cursor:pointer;font-weight:500;">
          <option value="All">All genres</option>
          <option value="Romance">Romance</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Thriller">Thriller</option>
          <option value="Supernatural">Supernatural</option>
          <option value="Melodrama">Melodrama</option>
          <option value="Action">Action</option>
          <option value="Mystery">Mystery</option>
        </select>
        <div style="display:flex;border:1px solid #CCC0A8;border-radius:3px;overflow:hidden;">
          <button id="tab-watchers" data-m="watchers" style="font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;padding:6px 16px;border:none;background:#8b2e22;color:white;cursor:pointer;">Watchers</button>
          <button id="tab-rating" data-m="rating" style="font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;padding:6px 16px;border:none;border-left:1px solid #CCC0A8;background:transparent;color:#8A7E6E;cursor:pointer;">Rating</button>
        </div>
        <button id="toggle-pause" style="display:flex;align-items:center;gap:5px;font-family:'DM Sans',sans-serif;font-size:10px;padding:5px 12px;border:1px solid #CCC0A8;border-radius:3px;background:transparent;color:#8A7E6E;cursor:pointer;transition:all 0.2s;" title="Pause auto-cycling">
          <svg id="pause-icon" width="10" height="10" viewBox="0 0 10 10" style="fill:#8A7E6E;"><rect x="1" y="1" width="3" height="8" rx="0.5"/><rect x="6" y="1" width="3" height="8" rx="0.5"/></svg>
          <svg id="play-icon" width="10" height="10" viewBox="0 0 10 10" style="fill:#8A7E6E;display:none;"><polygon points="1,0 10,5 1,10"/></svg>
          <span id="toggle-pause-lbl">Pause</span>
        </button>
      </div>
      <div id="toggle-headline" style="font-family:'Playfair Display',serif;font-size:15px;color:#2A2018;min-height:22px;margin-bottom:14px;transition:opacity 0.3s;"></div>
      <div id="toggle-progress" style="height:2px;background:#CCC0A8;border-radius:1px;margin-bottom:8px;overflow:hidden;">
        <div id="toggle-prog-fill" style="height:100%;background:#8b2e22;border-radius:1px;width:0%;"></div>
      </div>
    `);

    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.style.width = '100%'; svgEl.style.display = 'block'; svgEl.style.overflow = 'visible';
    container.appendChild(svgEl);

    const svg = d3.select(svgEl);
    const gMain = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const x = d3.scaleLinear();

    function render(animate) {
      const iW = getIW(container);
      const data = filtered();
      if (!data.length) return;
      const maxV = val(data[0]);
      x.domain([0, maxV]).range([0, iW]);
      const H = data.length * (BAR_H + GAP) + margin.top + margin.bottom;
      const W = container.clientWidth || 500;
      svg.attr('viewBox', `0 0 ${W} ${H}`).attr('height', H);
      const DUR = animate ? 700 : 0;
      const topTitle = data[0]?.t;
      const key = d => d.t;

      // Ensure defs exist for clip paths
      let defs = svg.select('defs');
      if (defs.empty()) defs = svg.insert('defs', ':first-child');

      // One clipPath per bar row — clips label text to the bar width so nothing bleeds out
      const clipData = data.map((d, i) => ({ i, d }));
      defs.selectAll('.bar-clip').data(clipData, cd => cd.i)
        .join(
          enter => enter.append('clipPath').attr('class', 'bar-clip')
            .attr('id', cd => `kclip-${cd.i}`)
            .append('rect')
              .attr('x', 0).attr('y', cd => cd.i * (BAR_H + GAP))
              .attr('height', BAR_H).attr('width', 0),
          update => update,
          exit => exit.remove()
        )
        .select('rect')
        .attr('y', cd => cd.i * (BAR_H + GAP))
        .attr('height', BAR_H)
        .transition().duration(DUR).ease(d3.easeCubicInOut)
        .attr('width', cd => Math.max(0, x(val(cd.d)) - 8));

      const bars = gMain.selectAll('.kb').data(data, key);
      bars.enter().append('rect').attr('class', 'kb')
        .attr('x', 0).attr('y', (d, i) => i * (BAR_H + GAP))
        .attr('height', BAR_H).attr('width', 0).attr('rx', 3)
        .attr('fill', d => d.t === topTitle ? '#8b2e22' : '#B5A898').attr('opacity', 0.88)
        .merge(bars)
        .transition().duration(DUR).ease(d3.easeCubicInOut)
        .attr('y', (d, i) => i * (BAR_H + GAP)).attr('width', d => x(val(d)))
        .attr('fill', d => d.t === topTitle ? '#8b2e22' : '#B5A898');
      bars.exit().transition().duration(DUR).attr('width', 0).attr('opacity', 0).remove();

      // Title labels — always white inside bar, clipped to bar width
      const lbls = gMain.selectAll('.kl').data(data, key);
      lbls.enter().append('text').attr('class', 'kl')
        .attr('x', 8).attr('y', (d, i) => i * (BAR_H + GAP) + BAR_H / 2 + 5)
        .attr('text-anchor', 'start')
        .style('font-family', "'DM Sans',sans-serif").style('font-size', '11px')
        .style('fill', 'white').style('font-weight', '500').style('opacity', 0)
        .attr('clip-path', (d, i) => `url(#kclip-${i})`)
        .text(d => d.t)
        .merge(lbls)
        .attr('clip-path', (d, i) => `url(#kclip-${i})`)
        .transition().duration(DUR).ease(d3.easeCubicInOut)
        .attr('y', (d, i) => i * (BAR_H + GAP) + BAR_H / 2 + 5)
        .style('opacity', 1).text(d => d.t);
      lbls.exit().transition().duration(DUR).style('opacity', 0).remove();

      // Value labels — always white inside bar, right-aligned, clipped to bar width
      const vals = gMain.selectAll('.kv').data(data, key);
      vals.enter().append('text').attr('class', 'kv')
        .attr('x', d => x(val(d)) - 8).attr('y', (d, i) => i * (BAR_H + GAP) + BAR_H / 2 + 5)
        .attr('text-anchor', 'end')
        .style('font-family', "'DM Sans',sans-serif").style('font-size', '11px').style('font-weight', '700')
        .style('fill', 'white').style('opacity', 0)
        .attr('clip-path', (d, i) => `url(#kclip-${i})`)
        .text(d => fmt(val(d)))
        .merge(vals)
        .attr('clip-path', (d, i) => `url(#kclip-${i})`)
        .transition().duration(DUR).ease(d3.easeCubicInOut)
        .attr('x', d => x(val(d)) - 8).attr('y', (d, i) => i * (BAR_H + GAP) + BAR_H / 2 + 5)
        .style('opacity', 1)
        .tween('text', function (d) {
          const raw = this.textContent;
          const cur = raw.includes('.') ? parseFloat(raw) : (parseFloat(raw.replace('K', '')) * (raw.includes('K') ? 1000 : 1)) || 0;
          const interp = d3.interpolateNumber(cur, val(d));
          return t => d3.select(this).text(fmt(Math.round(interp(t) * 10) / 10));
        });
      vals.exit().transition().duration(DUR).style('opacity', 0).remove();
    }

    function setHeadline() {
      const h = (HEADLINES[metric] || {})[genre] || '';
      const el = document.getElementById('toggle-headline');
      el.style.opacity = 0;
      setTimeout(() => { el.innerHTML = h; el.style.opacity = 1; }, 180);
    }

    function setTabs() {
      const w = document.getElementById('tab-watchers');
      const r = document.getElementById('tab-rating');
      if (!w || !r) return;
      w.style.background = metric === 'watchers' ? '#8b2e22' : 'transparent';
      w.style.color      = metric === 'watchers' ? 'white'   : '#8A7E6E';
      r.style.background = metric === 'rating'   ? '#8b2e22' : 'transparent';
      r.style.color      = metric === 'rating'   ? 'white'   : '#8A7E6E';
    }

    function startProgress() {
      var fill = document.getElementById('toggle-prog-fill');
      if (!fill) return;
      fill.style.transition = 'none'; fill.style.width = '0%';
      setTimeout(function() {
        fill.style.transition = 'width ' + CYCLE_MS + 'ms linear';
        fill.style.width = '100%';
      }, 30);
    }

    function stopProgress() {
      var fill = document.getElementById('toggle-prog-fill');
      if (!fill) return;
      fill.style.transition = 'none';
      fill.style.width = '0%';
    }

    function startCycle() {
      if (paused) return;
      clearTimeout(autoTimer);
      startProgress();
      autoTimer = setTimeout(function() {
        metric = metric === 'watchers' ? 'rating' : 'watchers';
        setTabs(); setHeadline(); render(true); startCycle();
      }, CYCLE_MS);
    }

    function stopCycle() {
      clearTimeout(autoTimer);
      autoTimer = null;
      stopProgress();
    }

    function updatePauseUI() {
      var pauseIcon = document.getElementById('pause-icon');
      var playIcon = document.getElementById('play-icon');
      var pauseLbl = document.getElementById('toggle-pause-lbl');
      if (!pauseIcon || !playIcon || !pauseLbl) return;
      pauseIcon.style.display = paused ? 'none' : 'block';
      playIcon.style.display = paused ? 'block' : 'none';
      pauseLbl.textContent = paused ? 'Play' : 'Pause';
    }

    document.getElementById('toggle-pause').addEventListener('click', function() {
      paused = !paused;
      updatePauseUI();
      if (paused) {
        stopCycle();
      } else {
        startCycle();
      }
    });

    document.querySelectorAll('[data-m]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        metric = btn.dataset.m;
        setTabs(); setHeadline(); render(true);
        if (!paused) startCycle();
      });
    });

    document.getElementById('toggle-genre').addEventListener('change', function(e) {
      genre = e.target.value;
      setHeadline(); render(true);
      if (!paused) startCycle();
    });

    render(false); setHeadline(); setTabs(); startCycle();
  };

})();