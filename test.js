const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./index');

const { expect } = chai;

chai.use(chaiHttp);

describe("API routes", () => {
  // GET route
  it("/"), async () => {
    chai.request(server)
      .get("/api/user-1")
      .end((err, response) => {
        response.data.should.be.a('string');
      })
      .done();
  }
});
