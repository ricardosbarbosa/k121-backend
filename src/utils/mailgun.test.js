/* eslint-disable no-undef */
const mg = require('./mailgun')(jest.fn())

describe('Testing mailgun', () => {
  test('should create a mailgun object to send email', () => {
    const member = { email: 'member@gmail.com', name: 'Member' }
    const friend = { email: 'friend@gmail.com', name: 'Friend' }

    const result = mg.mailgunData(member, friend)

    const expectResult = {
      from: 'Amigo Secreto <me@samples.mailgun.org>',
      to: 'member@gmail.com',
      subject: `Hello ${member.name}, seu amigo secreto é ${friend.name}`,
      text: `Hello ${member.name}, seu amigo secreto é ${friend.name}`
    }

    expect(result).toEqual(expectResult)
  })
})
