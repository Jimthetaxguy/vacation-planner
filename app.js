// ═══════════════════════════════════════════
// GETAWAY — App Logic
// ═══════════════════════════════════════════

(function() {
  'use strict';

  // ─── DARK MODE ───
  const html = document.documentElement;
  const toggle = document.getElementById('modeToggle');
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  updateToggleIcon();

  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    updateToggleIcon();
    // Redraw charts if they exist
    if (tempChartInstance) renderCompareCharts();
  });

  function updateToggleIcon() {
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ─── HAMBURGER ───
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { navLinks.classList.remove('open'); hamburger.classList.remove('active'); });
  });

  // ─── LUCIDE ICONS ───
  lucide.createIcons();

  // ─── SHORTLIST STATE ───
  let shortlist = [];

  function updateShortlistUI() {
    const el = document.getElementById('shortlist');
    if (shortlist.length === 0) {
      el.innerHTML = '<p class="shortlist-empty">Click the bookmark icon on any destination to add it here.</p>';
      return;
    }
    el.innerHTML = shortlist.map(item => `
      <div class="shortlist-item">
        <div>
          <div class="shortlist-item-name">${item.name}</div>
          <div class="shortlist-item-type">${item.type === 'snow' ? '❄ Snow' : '☀ Warm'}</div>
        </div>
        <button class="shortlist-remove" onclick="window._removeShortlist('${item.id}')">
          <i data-lucide="x"></i>
        </button>
      </div>
    `).join('');
    lucide.createIcons();
  }

  function toggleShortlist(id, name, type) {
    const idx = shortlist.findIndex(s => s.id === id);
    if (idx >= 0) {
      shortlist.splice(idx, 1);
    } else {
      shortlist.push({ id, name, type });
    }
    updateShortlistUI();
    // Update all bookmark buttons
    document.querySelectorAll(`.bookmark-btn[data-id="${id}"]`).forEach(btn => {
      btn.classList.toggle('active', shortlist.some(s => s.id === id));
    });
  }

  window._toggleShortlist = function(id, name, type) { toggleShortlist(id, name, type); };
  window._removeShortlist = function(id) {
    shortlist = shortlist.filter(s => s.id !== id);
    updateShortlistUI();
    document.querySelectorAll(`.bookmark-btn[data-id="${id}"]`).forEach(btn => btn.classList.remove('active'));
  };

  // ─── MAP ───
  const map = L.map('map', { scrollWheelZoom: false }).setView([30, -30], 3);

  // Tile layer — use a warm-toned style
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 18
  }).addTo(map);

  const snowIcon = L.divIcon({ className: '', html: '<div style="background:#2a7ab5;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.2);border:2px solid #fff;">❄</div>', iconSize: [28, 28], iconAnchor: [14, 14] });
  const warmIcon = L.divIcon({ className: '', html: '<div style="background:#c26a30;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.2);border:2px solid #fff;">☀</div>', iconSize: [28, 28], iconAnchor: [14, 14] });

  const snowMarkers = [];
  const warmMarkers = [];

  SNOW_DESTINATIONS.forEach(d => {
    const marker = L.marker([d.lat, d.lng], { icon: snowIcon })
      .bindPopup(`<div class="map-popup"><span class="popup-tag popup-tag--snow">Snow · ${d.ikonAccess}</span><h4>${d.name}</h4><p>${d.location}<br>Base: ${d.base.depth}${d.base.unit} · ${d.lifts.open}/${d.lifts.total} lifts<br>Season total: ${typeof d.season.total === 'number' ? d.season.total + '"' : d.season.total}</p></div>`);
    marker.addTo(map);
    snowMarkers.push(marker);
  });

  WARM_DESTINATIONS.forEach(d => {
    const marker = L.marker([d.lat, d.lng], { icon: warmIcon })
      .bindPopup(`<div class="map-popup"><span class="popup-tag popup-tag--warm">Warm · ${d.region}</span><h4>${d.name}</h4><p>${d.weather.highF}°F · ${d.weather.rain}<br>${d.flights.airline}<br>${d.flights.est}</p></div>`);
    marker.addTo(map);
    warmMarkers.push(marker);
  });

  // Map filter
  document.querySelectorAll('.map-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      snowMarkers.forEach(m => { filter === 'warm' ? map.removeLayer(m) : m.addTo(map); });
      warmMarkers.forEach(m => { filter === 'snow' ? map.removeLayer(m) : m.addTo(map); });
      // Fit bounds
      const visible = [];
      if (filter !== 'warm') snowMarkers.forEach(m => visible.push(m.getLatLng()));
      if (filter !== 'snow') warmMarkers.forEach(m => visible.push(m.getLatLng()));
      if (visible.length) map.fitBounds(L.latLngBounds(visible).pad(0.15));
    });
  });

  // ─── SNOW DESTINATIONS TABS ───
  const snowTabs = document.getElementById('snowTabs');
  const snowContent = document.getElementById('snowContent');

  SNOW_DESTINATIONS.forEach((d, i) => {
    const tab = document.createElement('button');
    tab.className = 'dest-tab' + (i === 0 ? ' active' : '');
    tab.textContent = d.name;
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dest-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSnowCard(d);
    });
    snowTabs.appendChild(tab);
  });

  function renderSnowCard(d) {
    const isBookmarked = shortlist.some(s => s.id === d.id);
    snowContent.innerHTML = `
      <div class="snow-card">
        <div class="snow-card-header">
          <div>
            <div class="snow-card-title">${d.name}</div>
            <div class="snow-card-location">${d.location} · Ikon: ${d.ikonAccess} · Closes: ${d.closingDate}</div>
          </div>
          <div class="snow-card-actions">
            <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${d.id}" onclick="window._toggleShortlist('${d.id}','${d.name}','snow')">
              <i data-lucide="bookmark"></i>
            </button>
          </div>
        </div>

        <div class="snow-stats">
          <div class="snow-stat"><div class="snow-stat-val">${d.base.depth}"</div><div class="snow-stat-label">${d.base.label} Depth</div></div>
          <div class="snow-stat"><div class="snow-stat-val">${typeof d.season.total === 'number' ? d.season.total + '"' : d.season.total}</div><div class="snow-stat-label">Season Total</div></div>
          <div class="snow-stat"><div class="snow-stat-val">${d.lifts.open !== null ? d.lifts.open + '/' + d.lifts.total : 'N/A'}</div><div class="snow-stat-label">Lifts Open</div></div>
          <div class="snow-stat"><div class="snow-stat-val">${d.trails.pctOpen !== null ? d.trails.pctOpen + '%' : 'N/A'}</div><div class="snow-stat-label">Terrain Open</div></div>
          ${d.tempF.mid !== null ? `<div class="snow-stat"><div class="snow-stat-val">${d.tempF.mid}°F</div><div class="snow-stat-label">Mid-Mountain</div></div>` : ''}
          ${d.tempF.base !== null ? `<div class="snow-stat"><div class="snow-stat-val">${d.tempF.base}°F</div><div class="snow-stat-label">Base Temp</div></div>` : ''}
        </div>

        <div class="snow-details">
          <h4>Conditions & Forecast</h4>
          <p><strong>Surface:</strong> ${d.conditions}</p>
          <p style="margin-top:var(--space-2)"><strong>Forecast:</strong> ${d.forecast}</p>
        </div>

        <div class="snow-details">
          <h4>Getting There & Staying</h4>
          <ul>
            <li><span>Flights</span><span>${d.flights.est} (${d.flights.airline})</span></li>
            ${d.hotels.map(h => `<li><span>${h.name} ${h.bonvoy ? '★ Bonvoy' : ''}</span><span>${h.rate}</span></li>`).join('')}
          </ul>
          <h4 style="margin-top:var(--space-4)">Village & Dining</h4>
          <p>${d.village}</p>
          <p style="margin-top:var(--space-2)"><strong>Restaurants:</strong> ${d.dining}</p>
        </div>

        <div class="snow-notes">${d.notes}</div>
      </div>
    `;
    lucide.createIcons();
  }

  renderSnowCard(SNOW_DESTINATIONS[0]);

  // ─── WARM DESTINATIONS GRID ───
  const warmGrid = document.getElementById('warmGrid');
  const warmDetail = document.getElementById('warmDetail');

  function renderWarmGrid(region) {
    const filtered = region === 'all' ? WARM_DESTINATIONS : WARM_DESTINATIONS.filter(d => d.region === region);
    warmGrid.innerHTML = filtered.map(d => `
      <div class="warm-card" data-id="${d.id}" onclick="window._showWarmDetail('${d.id}')">
        <div class="warm-card-header">
          <div>
            <div class="warm-card-name">${d.name}</div>
            <div class="warm-card-region">${d.region}</div>
          </div>
          <button class="bookmark-btn ${shortlist.some(s => s.id === d.id) ? 'active' : ''}" data-id="${d.id}" onclick="event.stopPropagation(); window._toggleShortlist('${d.id}','${d.name}','warm')">
            <i data-lucide="bookmark"></i>
          </button>
        </div>
        <div class="warm-card-summary">${d.summary}</div>
        <div class="warm-card-meta">
          <div class="warm-card-meta-item"><i data-lucide="thermometer"></i> <strong>${d.weather.highF}°F</strong></div>
          <div class="warm-card-meta-item"><i data-lucide="plane"></i> ${d.flights.time}</div>
          <div class="warm-card-meta-item"><i data-lucide="dollar-sign"></i> ${d.flights.est}</div>
          ${d.flights.companionCert ? '<div class="warm-card-meta-item"><i data-lucide="ticket"></i> Companion Cert</div>' : ''}
        </div>
      </div>
    `).join('');
    lucide.createIcons();
  }

  renderWarmGrid('all');

  // Region filter
  document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWarmGrid(btn.dataset.region);
      warmDetail.style.display = 'none';
    });
  });

  // Warm detail
  window._showWarmDetail = function(id) {
    const d = WARM_DESTINATIONS.find(w => w.id === id);
    if (!d) return;
    const isBookmarked = shortlist.some(s => s.id === d.id);
    warmDetail.innerHTML = `
      <button class="warm-detail-close" onclick="document.getElementById('warmDetail').style.display='none'"><i data-lucide="x"></i></button>
      <div class="warm-detail-title">${d.name}</div>
      <div class="warm-detail-region">${d.region} · ${d.bestFor}</div>

      <div class="warm-weather-bar">
        <div class="warm-weather-item"><div class="warm-weather-val">${d.weather.highF}°F</div><div class="warm-weather-label">High</div></div>
        <div class="warm-weather-item"><div class="warm-weather-val">${d.weather.lowF}°F</div><div class="warm-weather-label">Low</div></div>
        ${d.weather.oceanF ? `<div class="warm-weather-item"><div class="warm-weather-val">${d.weather.oceanF}°F</div><div class="warm-weather-label">Ocean</div></div>` : ''}
        <div class="warm-weather-item"><div class="warm-weather-val">${d.weather.rain}</div><div class="warm-weather-label">Rain</div></div>
      </div>

      <div class="warm-detail-grid">
        <div class="warm-detail-section">
          <h4>Flights</h4>
          <p>${d.flights.airline} · ${d.flights.time}</p>
          <p><strong>${d.flights.est}</strong> ${d.flights.companionCert ? '· ✓ Delta Companion Cert eligible' : '· ✗ Companion Cert not eligible'}</p>
        </div>
        <div class="warm-detail-section">
          <h4>Hotels</h4>
          <ul>
            ${d.hotels.map(h => `<li>${h.name} ${h.bonvoy ? '<strong>(Bonvoy)</strong>' : ''} — ${h.rate}</li>`).join('')}
          </ul>
        </div>
        <div class="warm-detail-section">
          <h4>Dining</h4>
          <p>${d.dining}</p>
        </div>
        <div class="warm-detail-section">
          <h4>Activities</h4>
          <p>${d.activities}</p>
        </div>
      </div>
      <p style="margin-top:var(--space-4);font-size:var(--text-sm);color:var(--color-text-muted);">${d.summary}</p>
      <button style="margin-top:var(--space-4)" class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${d.id}" onclick="window._toggleShortlist('${d.id}','${d.name}','warm')">
        <i data-lucide="bookmark"></i> <span style="margin-left:4px;font-size:var(--text-sm)">${isBookmarked ? 'Saved' : 'Save to Shortlist'}</span>
      </button>
    `;
    warmDetail.style.display = 'block';
    warmDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    lucide.createIcons();
  };

  // ─── COMPARE ───
  const selects = [document.getElementById('compare1'), document.getElementById('compare2'), document.getElementById('compare3')];
  const budgetDest = document.getElementById('budgetDest');

  // Populate selects
  ALL_DESTINATIONS.forEach(d => {
    const opt = `<option value="${d.id}">${d.type === 'snow' ? '❄' : '☀'} ${d.name}</option>`;
    selects.forEach(sel => sel.innerHTML += opt);
    budgetDest.innerHTML += opt;
  });

  let tempChartInstance = null;
  let flightChartInstance = null;

  function renderCompareCharts() {
    const selected = selects.map(s => ALL_DESTINATIONS.find(d => d.id === s.value)).filter(Boolean);
    if (selected.length === 0) return;

    const labels = selected.map(d => d.name);
    const temps = selected.map(d => d.type === 'snow' ? (d.tempF.base || d.tempF.mid || 30) : d.weather.highF);
    const flights = selected.map(d => d.estFlightPP || 0);

    const style = getComputedStyle(document.documentElement);
    const snowColor = style.getPropertyValue('--color-snow').trim();
    const warmColor = style.getPropertyValue('--color-warm').trim();
    const textMuted = style.getPropertyValue('--color-text-muted').trim();
    const divider = style.getPropertyValue('--color-divider').trim();

    const bgColors = selected.map(d => d.type === 'snow' ? snowColor : warmColor);

    // Temperature chart
    const tempCtx = document.getElementById('tempChart');
    if (tempChartInstance) tempChartInstance.destroy();
    tempChartInstance = new Chart(tempCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{ label: 'Temp °F', data: temps, backgroundColor: bgColors, borderRadius: 6, barPercentage: 0.6 }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: divider }, ticks: { color: textMuted, font: { family: "'Satoshi'" } } },
          x: { grid: { display: false }, ticks: { color: textMuted, font: { family: "'Satoshi'" } } }
        }
      }
    });

    // Flight chart
    const flightCtx = document.getElementById('flightChart');
    if (flightChartInstance) flightChartInstance.destroy();
    flightChartInstance = new Chart(flightCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{ label: 'Flight $', data: flights, backgroundColor: bgColors, borderRadius: 6, barPercentage: 0.6 }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: divider }, ticks: { color: textMuted, callback: v => '$' + v, font: { family: "'Satoshi'" } } },
          x: { grid: { display: false }, ticks: { color: textMuted, font: { family: "'Satoshi'" } } }
        }
      }
    });
  }

  function renderCompareTable() {
    const selected = selects.map(s => ALL_DESTINATIONS.find(d => d.id === s.value)).filter(Boolean);
    const wrap = document.getElementById('compareTable');

    if (selected.length === 0) {
      wrap.innerHTML = '<p class="compare-empty">Select destinations above to compare.</p>';
      return;
    }

    const rows = [
      { label: 'Type', fn: d => d.type === 'snow' ? '❄ Ski Resort' : '☀ Warm Destination' },
      { label: 'Temperature', fn: d => d.type === 'snow' ? `${d.tempF.base || d.tempF.mid || 'N/A'}°F` : `${d.weather.highF}°F high` },
      { label: 'Flights (RT/pp)', fn: d => d.type === 'snow' ? d.flights.est : d.flights.est },
      { label: 'Flight Time', fn: d => d.type === 'snow' ? d.flights.time : d.flights.time },
      { label: 'Companion Cert', fn: d => {
        if (d.type === 'snow') return d.notes.includes('NOT valid') ? '✗ No' : '✓ Yes';
        return d.flights.companionCert ? '✓ Yes' : '✗ No';
      }},
      { label: 'Bonvoy Hotel', fn: d => {
        const h = d.hotels.find(h => h.bonvoy);
        return h ? `✓ ${h.name}` : '✗ None found';
      }},
      { label: 'Ikon Access', fn: d => d.type === 'snow' ? d.ikonAccess : 'N/A' },
      { label: 'Est. $/Night', fn: d => `$${d.estBudgetPerNight}` },
      { label: 'Best For', fn: d => d.type === 'snow' ? d.village.split('.')[0] : d.bestFor },
    ];

    wrap.innerHTML = `
      <table>
        <thead><tr><th></th>${selected.map(d => `<th>${d.name}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(r => `<tr><td style="font-weight:600;white-space:nowrap">${r.label}</td>${selected.map(d => `<td>${r.fn(d)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    `;
  }

  selects.forEach(sel => {
    sel.addEventListener('change', () => {
      renderCompareTable();
      renderCompareCharts();
    });
  });

  // ─── BUDGET ESTIMATOR ───
  function calcBudget() {
    const dest = ALL_DESTINATIONS.find(d => d.id === budgetDest.value);
    const nights = parseInt(document.getElementById('budgetNights').value) || 6;
    const daily = parseInt(document.getElementById('budgetDaily').value) || 250;
    const result = document.getElementById('budgetResult');

    if (!dest) {
      result.innerHTML = '<p style="color:var(--color-text-faint)">Select a destination to estimate.</p>';
      return;
    }

    const flightTotal = (dest.estFlightPP || 500) * 2;
    const hotelTotal = (dest.estBudgetPerNight || 500) * nights;
    const dailyTotal = daily * nights;
    const grand = flightTotal + hotelTotal + dailyTotal;

    result.innerHTML = `
      <div class="budget-total">~$${grand.toLocaleString()}</div>
      <div class="budget-line"><span>Flights (2 people)</span><span>$${flightTotal.toLocaleString()}</span></div>
      <div class="budget-line"><span>Hotel (${nights} nights)</span><span>$${hotelTotal.toLocaleString()}</span></div>
      <div class="budget-line"><span>Food & Activities (${nights} days)</span><span>$${dailyTotal.toLocaleString()}</span></div>
      <div class="budget-line"><span>Total Estimate</span><span>$${grand.toLocaleString()}</span></div>
    `;
  }

  budgetDest.addEventListener('change', calcBudget);
  document.getElementById('budgetNights').addEventListener('input', calcBudget);
  document.getElementById('budgetDaily').addEventListener('input', calcBudget);
  calcBudget();

  // ─── FADE-IN ANIMATION ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-header, .overview-card, .chart-box').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // ─── NAV SCROLL EFFECT ───
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    const scroll = window.scrollY;
    if (scroll > 100) {
      nav.style.boxShadow = 'var(--shadow-sm)';
    } else {
      nav.style.boxShadow = 'none';
    }
    lastScroll = scroll;
  });

})();
