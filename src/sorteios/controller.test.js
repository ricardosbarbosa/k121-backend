/* eslint-disable no-undef */
const controller = require('./controller')

describe('testing sorteios controller', () => {
  const req = {
    params: { sorteioId: 1 },
    body: {
      name: 'um sorteio'
    }
  }
  const res = { json: jest.fn() }
  const Sorteio = {
    find: jest.fn(({ sorteio }) => [{ _id: 1 }, { _id: 2 }].filter(i => i.sorteio === sorteio)),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
    findOne: jest.fn(() => ({})),
    create: jest.fn(() => ({}))
  }

  describe('when sorteio id is present,', () => {
    beforeEach(() => {
      res.json.mockReset()
    })

    it('should return all sorteios from one sorteio', async () => {
      await controller.findAll({ Sorteio }, req, res)

      expect(Sorteio.find.mock.calls.length).toBe(1)
      expect(Sorteio.find.mock.calls[0][0]).toEqual({})
      expect(Sorteio.find.mock.results[0].value).not.toEqual()

      expect(res.json.mock.calls.length).toBe(1)
      expect(res.json.mock.calls[0][0]).not.toEqual()
    })

    it('should remove by sorteioId', async () => {
      await controller.destroy({ Sorteio }, req, res)

      expect(Sorteio.deleteOne.mock.calls.length).toBe(1)
      expect(Sorteio.deleteOne.mock.calls[0][0]).toEqual({
        _id: req.params.sorteioId
      })
      expect(res.json.mock.calls.length).toBe(1)
      expect(res.json.mock.calls[0][0]).toEqual()
    })

    it('should update by sorteioId', async () => {
      await controller.update({ Sorteio }, req, res)

      expect(Sorteio.updateOne.mock.calls.length).toBe(1)
      expect(Sorteio.findOne.mock.calls.length).toBe(1)

      expect(Sorteio.updateOne.mock.calls[0][0]).toEqual({
        _id: req.params.sorteioId
      })
      expect(Sorteio.findOne.mock.calls[0][0]).toEqual({
        _id: req.params.sorteioId
      })

      expect(Sorteio.findOne.mock.results[0].value).not.toBe()
    })

    it('should create', async () => {
      await controller.create({ Sorteio }, req, res)

      expect(Sorteio.create.mock.calls.length).toBe(1)
      expect(Sorteio.create.mock.calls[0][0]).not.toBe()
      expect(Sorteio.create.mock.results[0].value).not.toBe()
    })
  })
})
