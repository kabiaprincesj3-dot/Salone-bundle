const bundles = {
  "Orange": ["1GB - Le 10,000", "3GB - Le 25,000", "5GB - Le 40,000"],
  "Airtel": ["1GB - Le 9,000", "3GB - Le 22,000", "5GB - Le 35,000"],
  "Africell": ["1GB - Le 8,000", "3GB - Le 20,000", "5GB - Le 32,000"],
  "Qcell": ["1GB - Le 7,000", "3GB - Le 18,000", "5GB - Le 30,000"]
};

function showNetwork(network) {
  const list = bundles[network].map(b => `<p>📶 ${b}</p>`).join("");
  document.getElementById("bundles").innerHTML = `<h2>${network} Bundles</h2>` + list;
}

showNetwork("Orange");
