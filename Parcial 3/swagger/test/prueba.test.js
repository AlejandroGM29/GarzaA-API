const chai = require("chai");
const chaiHttp = require("chai-http");

let app = "https://localhost:8080";

chai.use(chaiHttp);

describe("GET /prueba", () => {
  it("devuelve estatus 200", (done) => {
    chai
      .request(app)
      .get("/prueba")
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
