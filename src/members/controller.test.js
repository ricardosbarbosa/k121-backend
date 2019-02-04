/* eslint-disable no-undef */
const controller = require('./controller')

describe('testing members controller', () => {
  const req = { params: { sorteioId: 1, memberId: 2 } }
  const res = { json: jest.fn() }
  const Member = {
    find: jest.fn(({ sorteio }) => [{ sorteio: 1 }, { sorteio: 2 }].filter(i => i.sorteio === sorteio)),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
    findOne: jest.fn(() => ({})),
    create: jest.fn(() => ({}))
  }

  describe('when sorteio id is present,', () => {
    beforeEach(() => {
      res.json.mockReset()
    })

    it('should return all members from one sorteio', async () => {
      await controller.findAll({ Member }, req, res)

      expect(Member.find.mock.calls.length).toBe(1)
      expect(Member.find.mock.calls[0][0]).toEqual({ sorteio: req.params.sorteioId })
      expect(Member.find.mock.results[0].value).toEqual([{ sorteio: req.params.sorteioId }])

      expect(res.json.mock.calls.length).toBe(1)
      expect(res.json.mock.calls[0][0]).toEqual([{ sorteio: 1 }])
    })

    it('should destroy by memberId', async () => {
      await controller.destroy({ Member }, req, res)

      expect(Member.deleteOne.mock.calls.length).toBe(1)
      expect(Member.deleteOne.mock.calls[0][0]).toEqual({
        _id: req.params.memberId
      })
      expect(res.json.mock.calls.length).toBe(1)
      expect(res.json.mock.calls[0][0]).toEqual()
    })

    it('should update by memberId', async () => {
      await controller.update({ Member }, req, res)

      expect(Member.updateOne.mock.calls.length).toBe(1)
      expect(Member.findOne.mock.calls.length).toBe(1)

      expect(Member.updateOne.mock.calls[0][0]).toEqual({
        _id: req.params.memberId
      })
      expect(Member.findOne.mock.calls[0][0]).toEqual({
        _id: req.params.memberId
      })

      expect(Member.findOne.mock.results[0].value).not.toBe()
    })

    it('should create', async () => {
      await controller.create({ Member }, req, res)

      expect(Member.create.mock.calls.length).toBe(1)
      expect(Member.create.mock.calls[0][0]).not.toBe()
      expect(Member.create.mock.results[0].value).not.toBe()
    })
  })
})
