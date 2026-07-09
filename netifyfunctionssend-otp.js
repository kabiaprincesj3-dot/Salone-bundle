exports.handler = async (event) => {
  const CLIENT_ID = process.env.HUBTEL_CLIENT_ID;
  const CLIENT_SECRET = process.env.HUBTEL_CLIENT_SECRET;
  if(!CLIENT_ID ||!CLIENT_SECRET) return { statusCode: 500, body: JSON.stringify({ error: "Hubtel API not configured" }) };
  const { to } = JSON.parse(event.body);
  const otp = Math.floor(100000 + Math.random() * 900000);
  const res = await fetch('https://api-otp.hubtel.com', {
    method: 'POST',
    headers: { 'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'), 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, otp, sender: "SaloneBundle" })
  });
  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data) };
};
