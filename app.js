let bundles = {};
let selectedBundle = null;
let API_READY = false;

async function init() {
  const res = await fetch('/api/hubtel');
  if(res.status === 500) {
    document.getElementById('apiAlert').innerHTML = `<div class="alert">⚠️ SYSTEM OFFLINE: Admin must add HUBTEL_CLIENT_ID and HUBTEL_CLIENT_SECRET in Netlify</div>`;
    document.querySelectorAll('.btn-buy,.tab').forEach(btn => btn.disabled = true);
    API_READY = false;
    return;
  }
  API_READY = true;
  loadBundles();
}

async function loadBundles() {
  const res = await fetch('/data/bundles.json');
  bundles = await res.json();
  renderBundles('Orange', 'Daily');
}

function showNetwork(network) {
  if(!API_READY) return alert('System offline');
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderBundles(network, 'Daily');
}

function showCategory(cat) {
  if(!API_READY) return alert('System offline');
  const activeNetwork = document.querySelector('.tab.active').innerText;
  document.querySelectorAll('.cat-btn').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderBundles(activeNetwork, cat);
}

function renderBundles(network, category) {
  const grid = document.getElementById('bundles');
  const filtered = bundles[network].filter(b => b.category === category);
  grid.innerHTML = filtered.map(b => `
    <div class="card">
      <h3>${b.name}</h3>
      <p>Validity: ${b.validity}</p>
      <p class="price">Le ${b.selling_price.toLocaleString()}</p>
      <button class="btn-buy" onclick='buy(${JSON.stringify(b)})'>Buy Now</button>
    </div>
  `).join('');
}

function buy(bundle) {
  selectedBundle = bundle;
  document.getElementById('buyModal').style.display = 'flex';
}

async function submitOrder() {
  const phone = document.getElementById('phone').value;
  const payment = document.getElementById('payment').value;

  const res = await fetch('/api/hubtel', {
    method: 'POST',
    body: JSON.stringify({ bundle: selectedBundle, phone, payment })
  });

  const data = await res.json();
  alert(data.message || data.error);
  document.getElementById('buyModal').style.display = 'none';
}

init();
