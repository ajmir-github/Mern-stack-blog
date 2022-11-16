module.exports = {
  OK: 200, // All fine
  CREATED: 201, // succeeded and has led to the creation of a resource
  ACCEPTED: 202, // the request has been accepted for processing, but the processing has not been completed
  NO_CONTENT: 204, // if the whole collection is empty

  BAD_REQUEST: 400, // the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing)

  NOT_AUTHORIZED: 401, //  the client provides no credentials or invalid credentials
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403, // a client has valid credentials but not enough privileges

  NOT_FOUND: 404, // is the targeted item does not exists
  NOT_ALLOWED: 405, // the server knows the request method, but the target resource doesn't support this method
  NOT_ACCEPTABLE: 406,

  SERVER_ERROR: 500,
};
