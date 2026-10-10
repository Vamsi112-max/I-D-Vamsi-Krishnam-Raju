// Main JavaScript for Vamsi Krishnam Raju Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initProjectFilters();
  initHeroSimulation();
  initAgentSimulator();
  initContactForm();
  initNavbarScroll();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// Navbar shadow on scroll
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-xl', 'shadow-black/40', 'bg-navy-950/95');
    } else {
      navbar.classList.remove('shadow-xl', 'shadow-black/40', 'bg-navy-950/95');
    }
  });
}

// Filter projects by category
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('#project-filters .filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Hero Terminal Simulation
function initHeroSimulation() {
  const btn = document.getElementById('hero-sim-btn');
  const logStream = document.getElementById('hero-log-stream');
  if (!btn || !logStream) return;

  const logs = [
    { time: '17:58:12', text: 'Ingesting cloud telemetry from 14 clusters...', color: 'text-slate-400' },
    { time: '17:58:13', text: 'Anomaly detected: p99 latency spiked to 4.2s (API Gateway)', color: 'text-yellow-300' },
    { time: '17:58:14', text: 'OmniRoot Root-Cause Engine: Found memory leak in Worker #4', color: 'text-purple-300' },
    { time: '17:58:15', text: 'Autonomous remediation triggered: Worker pod gracefully recycled & cached cleared. Issue resolved in 1.4s.', color: 'text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-500/30' }
  ];

  btn.addEventListener('click', () => {
    logStream.innerHTML = '<div class="text-cyan-400">> Restarting agent monitoring loop...</div>';
    btn.disabled = true;
    btn.textContent = 'Simulating...';

    logs.forEach((log, index) => {
      setTimeout(() => {
        const item = document.createElement('div');
        item.className = `${log.color} flex items-start gap-2`;
        item.innerHTML = `<span class="font-bold">[${log.time}]</span> <span>${log.text}</span>`;
        logStream.appendChild(item);

        if (index === logs.length - 1) {
          btn.disabled = false;
          btn.textContent = 'Re-run Simulation';
        }
      }, (index + 1) * 600);
    });
  });
}

// Multi-Agent Playground Simulator
function initAgentSimulator() {
  const scenarioBtns = document.querySelectorAll('.sim-scenario-btn');
  const runBtn = document.getElementById('sim-run-btn');
  const consoleEl = document.getElementById('sim-console');
  const statusLabel = document.getElementById('sim-status-label');
  const nodes = [
    document.getElementById('node-1'),
    document.getElementById('node-2'),
    document.getElementById('node-3'),
    document.getElementById('node-4'),
    document.getElementById('node-5'),
  ];

  let currentScenario = 'api-latency';
  let isRunning = false;

  const scenarios = {
    'api-latency': {
      title: 'High API Latency Spike',
      steps: [
        { node: 0, title: 'Ingestion Agent', status: 'ACTIVE', log: '[0.1s] Ingested 18,500 req/s metrics from AWS ALB. Detected p99 > 3800ms.', type: 'info' },
        { node: 1, title: 'Log Parser Agent', status: 'PARSING', log: '[0.4s] Vectorized error logs. Isolated 412 downstream timeout signatures in auth-svc.', type: 'info' },
        { node: 2, title: 'Root Cause Agent', status: 'DIAGNOSING', log: '[0.9s] Correlated stack trace: Connection pool exhaustion on primary Redis replica.', type: 'warning' },
        { node: 3, title: 'Policy Governor', status: 'AUDITING', log: '[1.2s] Evaluated Auto-Remediation Rule #A-44: High confidence (99.4%). Approved zero-downtime pool scale-up.', type: 'info' },
        { node: 4, title: 'Remediator Agent', status: 'RESOLVED', log: '[1.6s] Auto-remediation complete: Spawned 4 Redis read replicas & flushed deadlocked pool. Latency recovered to 42ms.', type: 'success' }
      ]
    },
    'db-deadlock': {
      title: 'PostgreSQL Deadlock',
      steps: [
        { node: 0, title: 'Ingestion Agent', status: 'ACTIVE', log: '[0.1s] Alert: Lock timeout threshold exceeded on table "transactions".', type: 'info' },
        { node: 1, title: 'Log Parser Agent', status: 'PARSING', log: '[0.5s] Extracted active PID locks and pg_stat_activity queries.', type: 'info' },
        { node: 2, title: 'Root Cause Agent', status: 'DIAGNOSING', log: '[0.8s] Identified circular lock condition between Batch Sync Job and Checkout API.', type: 'warning' },
        { node: 3, title: 'Policy Governor', status: 'AUDITING', log: '[1.1s] Policy check: Safe to terminate background sync worker without customer transaction loss.', type: 'info' },
        { node: 4, title: 'Remediator Agent', status: 'RESOLVED', log: '[1.5s] Gracefully killed blocking batch worker process and rescheduled for off-peak hours.', type: 'success' }
      ]
    },
    'security-breach': {
      title: 'Unusual Auth Burst',
      steps: [
        { node: 0, title: 'Ingestion Agent', status: 'ACTIVE', log: '[0.1s] High-frequency failed token exchanges detected from 24 unique IP ranges.', type: 'warning' },
        { node: 1, title: 'Log Parser Agent', status: 'PARSING', log: '[0.4s] Pattern recognized: Distributed credential stuffing attack on /v1/auth/login.', type: 'warning' },
        { node: 2, title: 'Root Cause Agent', status: 'DIAGNOSING', log: '[0.8s] Zero accounts compromised. Origin identified as proxy botnet.', type: 'info' },
        { node: 3, title: 'Policy Governor', status: 'AUDITING', log: '[1.1s] Compliance check: Enforcing Cloudflare WAF challenge & rate-limiting bucket.', type: 'info' },
        { node: 4, title: 'Remediator Agent', status: 'RESOLVED', log: '[1.4s] Updated edge firewall rules with dynamic IP ban list. Threat mitigated completely.', type: 'success' }
      ]
    }
  };

  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isRunning) return;
      scenarioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentScenario = btn.getAttribute('data-scenario');
      consoleEl.innerHTML = `<div class="text-slate-400">// Scenario selected: <span class="text-cyan-400">${scenarios[currentScenario].title}</span></div><div class="text-slate-400">> Click "Execute Multi-Agent Triage" to begin.</div>`;
      resetNodes();
    });
  });

  function resetNodes() {
    nodes.forEach(n => {
      if (!n) return;
      n.classList.remove('active-node', 'completed-node');
      const statusText = n.querySelector('.status-text');
      if (statusText) statusText.textContent = 'Standby';
    });
  }

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      runBtn.disabled = true;
      statusLabel.textContent = 'Orchestrating agents...';
      statusLabel.className = 'text-xs font-mono text-yellow-400 animate-pulse';

      consoleEl.innerHTML = `<div class="text-cyan-400 font-bold">> [0.0s] Triggering Incident: ${scenarios[currentScenario].title}...</div>`;
      resetNodes();

      const scenario = scenarios[currentScenario];

      scenario.steps.forEach((step, idx) => {
        setTimeout(() => {
          // Highlight active node
          nodes.forEach((n, i) => {
            if (!n) return;
            if (i < step.node) {
              n.classList.remove('active-node');
              n.classList.add('completed-node');
              n.querySelector('.status-text').textContent = 'DONE';
            } else if (i === step.node) {
              n.classList.add('active-node');
              n.querySelector('.status-text').textContent = step.status;
            }
          });

          // Log to console
          const logDiv = document.createElement('div');
          if (step.type === 'success') {
            logDiv.className = 'text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-500/30';
          } else if (step.type === 'warning') {
            logDiv.className = 'text-yellow-300';
          } else {
            logDiv.className = 'text-cyan-300';
          }
          logDiv.innerHTML = `<span class="font-bold">${step.title}:</span> ${step.log}`;
          consoleEl.appendChild(logDiv);
          consoleEl.scrollTop = consoleEl.scrollHeight;

          // Finished all steps
          if (idx === scenario.steps.length - 1) {
            setTimeout(() => {
              nodes[step.node].classList.remove('active-node');
              nodes[step.node].classList.add('completed-node');
              nodes[step.node].querySelector('.status-text').textContent = 'DONE';

              isRunning = false;
              runBtn.disabled = false;
              statusLabel.textContent = 'Incident Solved Autonomously ✓';
              statusLabel.className = 'text-xs font-mono text-emerald-400 font-bold';
            }, 600);
          }
        }, (idx + 1) * 800);
      });
    });
  }
}

// Contact form handling
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    status.classList.remove('hidden', 'text-red-400');
    status.classList.add('text-emerald-400');
    status.innerHTML = `✓ Thank you, ${name}! Your inquiry has been staged. Opening email client to send to vamsikrishnaraju01@gmail.com...`;

    // Construct mailto link
    const mailtoUri = `mailto:vamsikrishnaraju01@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Hi Vamsi,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUri;
    }, 1000);
  });
}
