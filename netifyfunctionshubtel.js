exports.handler = async (event) => {
  const CLIENT_ID = process.env.HUBTEL_CLIENT_ID;
  const CLIENT_SECRET = process.env.HUBTEL_CLIENT_SECRET;

  if(!CLIENT_ID ||!CLIENT_SECRET) {
    return { statusCode: 500, body: JSON.stringify({ error: "Hubtel API not configured. Add env vars in Netlify." }) };
  }

  if(event.httpMethod === 'POST') {
    const { bundle, phone, payment } = JSON.parse(event.body);
    // TODO: CALL REAL HUBTEL DATA/AIRTIME PURCHASE API HERE USING bundle.api_code
    return { statusCode: 400, body: JSON.stringify({ error: "Payment API endpoint not connected yet. Update hubtel.js" }) };
  }
  return { statusCode: 200, body: JSON.stringify({ status: "API Connected" }) };
};
