// BLOCK IF NOT LOGGED IN
if(localStorage.getItem('admin')!== 'true'){
  window.location = '/login.html';
}

async function checkAPI() {
  const res = await fetch('/api/hubtel');
  const status = document.getElementById('apiStatus');
  if(res.status === 500) {
    status.innerHTML = `<div class="alert">⚠️ API NOT CONNECTED. Add HUBTEL_CLIENT_ID + HUBTEL_CLIENT_SECRET in Netlify</div>`;
  } else {
    status.innerHTML = `<div style="background:#22c55e;padding:10px;border-radius:8px">✅ API Connected</div>`;
  }
}

async function loadEditor() {
  const res = await fetch('/data/bundles.json');
  const bundles = await res.json();
  let html = '';
  for(let network in bundles){
    html += `<h3>${network}</h3>`;
    bundles[network].forEach((b, i) => {
      html += `
      <div class="card">
        <input value="${b.name}" onchange="updateBundle('${network}',${i},'name',this.value)">
        <input type="number" value="${b.selling_price}" onchange="updateBundle('${network}',${i},'selling_price',this.value)">
        <input value="${b.api_code}" placeholder="Hubtel API Code" onchange="updateBundle('${network}',${i},'api_code',this.value)">
      </div>
      `;
    });
  }
  document.getElementById('bundleEditor').innerHTML = html;
  window.tempBundles = bundles;
}

function updateBundle(network, i, key, val) {
  window.tempBundles[network][i][key] = key === 'selling_price'? Number(val) : val;
}

function saveBundles() {
  localStorage.setItem('bundles_temp', JSON.stringify(window.tempBundles));
  alert('Saved to browser. To make it permanent: Copy this and paste in GitHub /data/bundles.json');
  console.log(JSON.stringify(window.tempBundles, null, 2));
}

function changePassword() {
  const pass = document.getElementById('newPass').value;
  if(pass.length < 4) return alert('Password too short');
  localStorage.setItem('admin_pass', pass);
  alert('Password updated in browser. IMPORTANT: Also update login.html line 10 in GitHub');
}

function logout() {
  localStorage.removeItem('admin');
  window.location = '/login.html';
}

checkAPI();
loadEditor();
