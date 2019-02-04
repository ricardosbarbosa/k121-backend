const mailgunData = (member, friend) => ({
  from: 'Amigo Secreto <me@samples.mailgun.org>',
  to: member.email,
  subject: `Hello ${member.name}, seu amigo secreto é ${friend.name}`,
  text: `Hello ${member.name}, seu amigo secreto é ${friend.name}`
})

const sendEmailWithMailgun = (mailgun) => data => {
  return mailgun.messages().send(data)
}

module.exports = mailgun => ({
  mailgunData,
  sendEmailWithMailgun: sendEmailWithMailgun(mailgun)
})
