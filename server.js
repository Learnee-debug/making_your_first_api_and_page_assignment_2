const express = require('express');
const app = express();

// Status code definitions
const STATUS_CODES = {
  200: {
    status: 200,
    message: "OK: The request has succeeded. The meaning of this status depends on the HTTP method used."
  },
  201: {
    status: 201,
    message: "Created: A resource has been successfully created."
  },
  204: {
    status: 204,
    message: "No Content: Request processed successfully, no content returned."
  },
  400: {
    status: 400,
    message: "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax)."
  },
  401: {
    status: 401,
    message: "Unauthorized: Authentication is required to access the resource."
  },
  403: {
    status: 403,
    message: "Forbidden: Server refuses to authorize the request."
  },
  404: {
    status: 404,
    message: "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource."
  },
  405: {
    status: 405,
    message: "Method Not Allowed: HTTP method not supported for this resource."
  },
  429: {
    status: 429,
    message: "Too Many Requests: User has exceeded rate limits."
  },
  500: {
    status: 500,
    message: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
  },
  502: {
    status: 502,
    message: "Bad Gateway: The server received an invalid response from the upstream server."
  },
  503: {
    status: 503,
    message: "Service Unavailable: Server temporarily overloaded or under maintenance."
  },
  504: {
    status: 504,
    message: "Gateway Timeout: The server did not receive a timely response from the upstream server."
  }
};

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Status info endpoint
app.get('/status-info', (req, res) => {
  const code = parseInt(req.query.code);

  // Validate input
  if (!code) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request: 'code' query parameter is required"
    });
  }

  // Check if code exists in our definitions
  if (!STATUS_CODES[code]) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request: Invalid status code provided"
    });
  }

  // Return the status code information
  res.json(STATUS_CODES[code]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Status Code API is running on http://localhost:${PORT}`);
});

// Export for testing
module.exports = app;