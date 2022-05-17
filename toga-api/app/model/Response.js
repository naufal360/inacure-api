class Error {
  constructor(error, message) {
    this.error = error;
    this.message = message;
  }
}

class Success {
  constructor(error, message, data) {
    this.error = error;
    this.message = message;
    this.data = data;
  }
}

module.exports = { Error, Success };
