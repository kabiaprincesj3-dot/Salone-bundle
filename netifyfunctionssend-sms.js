exports.handler = async (event) => {
  const CLIENT_ID = process.env.HUBTEL_CLIENT_ID;
  const CLIENT_SECRET = process.env.HUBTEL_CLIENT_SECRET;
  if(!CLIENT_ID ||!CLIENT_SECRET) return { statusCode: 500, body: JSON.stringify({ error: "Hubtel API not configured" }) };
  const { to, content } = JSON.parse(event.body);
  const url = `https://devp-sms03726-api.hubtel.com/v1/messages/send?clientid=${CLIENT_ID}&clientsecret=${CLIENT_SECRET}&from=SaloneBundle&to=${to}&content=${encodeURIComponent(content)}`;
  const res = await fetch(url);
  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data) };
};
