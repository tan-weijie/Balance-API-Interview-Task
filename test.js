const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./index')

chai.should(); 
chai.use(chaiHttp);

describe("API routes", () => {
  // GET route
  it("/api/:user should display balance of user", async () => {
    const res = await chai.request(server).get('/api/user-1');
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('balance');
  });
});
