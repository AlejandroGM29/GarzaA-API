import chai from 'chai';
import chaiHttp from 'chai-http';
import { suma, multiplicacion } from '../Parcial 3/Moch-Chai/source/modulo.js';
import request from 'supertest'
const expect = chai.expect;


chai.use(chaiHttp);

  describe("prueba de express", () => {
    it("debería responder con un 'hola mundo'", (done) => {
        chai.request("http://localhost:3000")// Usa la instancia de tu aplicación express
            .get("/prueba")
            .then((res) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.eql({ message: "hola mundo" }); // Ajusta esto según la respuesta real de tu servidor
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});
describe("prueba super test", () => {
    it("should return 200 status code", () => {
      request("http://localhost:3000")
      .get("/prueba")
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
      })
    })
  })

describe('Mi Módulo', function () {
    it('debería sumar dos números correctamente', function () {
        const resultado = suma(2, 3);
        expect(resultado).to.equal(5);
    });

    it('debería sumar números negativos correctamente', function () {
        const resultado = suma(-2, 3);
        expect(resultado).to.equal(1);
    });

    it('debería sumar cero correctamente', function () {
        const resultado = suma(0, 3);
        expect(resultado).to.equal(3);
    });

    it('debería multiplicar dos números correctamente', function () {
        const resultado = multiplicacion(2, 3);
        expect(resultado).to.equal(6);
    });

    it('debería multiplicar un número por cero correctamente', function () {
        const resultado = multiplicacion(5, 0);
        expect(resultado).to.equal(0);
    });

    it('debería multiplicar números negativos correctamente', function () {
        const resultado = multiplicacion(-2, 3);
        expect(resultado).to.equal(-6);
    });

    
});
