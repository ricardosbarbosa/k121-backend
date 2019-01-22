const request = require("supertest");
const app = require("../app");
const mongoDB = require("../database");

const Sorteio = require("../sorteios/model");
jest.setTimeout(10000);
describe("Testing RestApi", () => {
  
  beforeAll(() => {
    mongoDB.connect();
  });

  afterAll(done => {
    Sorteio.deleteMany({}, () => {
      mongoDB.disconnect(done);
    });
  });

  test("should return empty array when nothing is on database", (done) => {
    Sorteio.deleteMany({}, () => {
      request(app)
        .get("/sorteios")
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.type).toBe("application/json");
          expect(response.body).toEqual([]);
          done()
        })
    })
  });

  test("should return array with all sorteios", (done) => {
    Sorteio.deleteMany({}, () => {
      Sorteio
        .create({ name: "primeiro sorteio" })
        .then((values) => {
          request(app)
            .get("/sorteios")
            .then(response => {
              expect(response.statusCode).toBe(200);
              expect(response.type).toBe("application/json");
              expect(response.body.length).toEqual(1);
              done()
            })
        })
      

      
    })
  });

  test("should delete the sorteio by its id", (done) => {
    Sorteio.deleteMany({}, () => {
      Sorteio
        .create({ name: "primeiro sorteio" })
        .then(sorteio => {
          request(app)
            .delete(`/sorteios/${sorteio._id}`)
            .then((response) => {
              expect(response.statusCode).toBe(200);
              expect(response.type).toBe("application/json");
              expect(response.body).toBe("");
              done()
            })
        })
    });
  });

});
