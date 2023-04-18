const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    suite("Functional Tests", function () {
        suite("Routing Tests",() => {
          suite("GET /api/convert => conversion object",() => {
            test("Convert 10L (valid input)", done => {
              chai
                .request(server)
                .get("/api/convert")
                .query({ input: "10L" })
                .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.initNum, 10);
                  assert.equal(res.body.initUnit, "L");
                  assert.approximately(res.body.returnNum, 2.64172, 0.1);
                  assert.equal(res.body.returnUnit, "gal");
                  done();
                });
            });

            test("Convert 32kaygee Invalid Input", done => {
                chai
                .request(server)
                .get("/api/convert")
                .query({ input: "32kaygee"})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initUnit, undefined);
                    done();
                })

            })

            test("4/2.2/0/32km Invalid entry", done => {
                chai
                .request(server)
                .get("/api/convert")
                .query({ input: "4/2.2/0/32km"})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initUnit, undefined);
                    done();
                })
            })
      
            test("4/2.2/0/32kaygee Invalid Number and String", done => {
                chai
                .request(server)
                .get("/api/convert")
                .query({ input: "4/2.2/0/32kaygee"})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initUnit, undefined);
                    assert.equal(res.body.initNum, undefined);
                    done();
                })
            })

            test("kg Invalid No Number", done => {
                chai
                .request(server)
                .get("/api/convert")
                .query({ input: "kg"})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initUnit, "kg");
                    assert.equal(res.body.initNum, 1);
                    assert.equal(res.body.returnUnit, "lbs");
                    assert.approximately(res.body.returnNum, 2.20462, 0.1);
                    done();
                })
            })
          });
        });
      });
});
