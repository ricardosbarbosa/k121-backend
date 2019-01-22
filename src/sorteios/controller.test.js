const controller = require('./controller')

describe('testing sorteios controler', () => {
  it('should return all sorteios', () => {
    const res = {
      json: jest.fn()
    };
    const Sorteio = {
      find: jest.fn(() => [])
    }

    controller.findAll({ Sorteio }, {}, res);

    expect(Sorteio.find.mock.calls.length).toBe(1)
    expect(Sorteio.find.mock.calls[0][0]).toEqual({});

    // // The mock function is called once
    expect(res.json.mock.calls.length).toBe(1);

    // The first argument of the first call to the function was 0
    expect(res.json.mock.calls[0][0]).toBe(200);

    // The return value of the first call to the function was 42
    expect(res.json.mock.results[0].value).toBe([]);
  });
});