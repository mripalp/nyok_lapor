// functions/proxy.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const apiUrl = `http://203.194.114.148:4001${event.path}`;
    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    });

    console.log(`Context: ${context}`);
    return {
      statusCode: response.status,
      body: await response.text(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
