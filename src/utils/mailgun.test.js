const mailgun = require("./mailgun")(jest.fn());

test("should create a mailgun object to send email", () => {
  const member = { email: "member@gmail.com", name: "Member" };
  const friend = { email: "friend@gmail.com", name: "Friend" };

  const result = mailgun.mailgunData(member, friend);

  const expectResult = {
    from: "Amigo Secreto <me@samples.mailgun.org>",
    to: "member@gmail.com",
    subject: `Hello ${member.name}, seu amigo secreto é ${friend.name}`,
    text: `Hello ${member.name}, seu amigo secreto é ${friend.name}`
  }

  expect(result).toEqual(expectResult);
});

test("should send emails with mailgun", () => {
  const member = { email: "member@gmail.com", name: "Member" };
  const friend = { email: "friend@gmail.com", name: "Friend" };

  const result = mailgun.mailgunData(member, friend);

  const expectResult = {
    from: "Amigo Secreto <me@samples.mailgun.org>",
    to: "member@gmail.com",
    subject: `Hello ${member.name}, seu amigo secreto é ${friend.name}`,
    text: `Hello ${member.name}, seu amigo secreto é ${friend.name}`
  };

  expect(result).toEqual(expectResult);
});