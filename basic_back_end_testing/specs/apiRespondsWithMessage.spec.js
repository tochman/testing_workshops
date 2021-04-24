const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/server')

let server, request, response

before(done => {
  server = app.listen(done)
  request = supertest.agent(server)
});

after(done => {
  server.close(done)
});

describe('GET "/"', () => {

  beforeEach(async () => {
    response = await request.get('/')
  });

  it('is expected to resond with status 200', () => {
    expect(response.status).to.equal(200)
  });

  it('is expected to respond with a message', () => {
    const expectedResponseBody = { message: 'Our API is working' }
    expect(response.body).to.eql(expectedResponseBody)
  });

});


