const sorteio = require("./sorteio");

test("verify shuffle", () => {
  const arr = [1,2,3,4]
  const model = sorteio({mailgun: {}})
  const result = model.shuffle(arr)

  expect(arr).not.toBe(result); //the output array is not the same input array
  expect(arr).not.toEqual(result); //the array are different item to item

  result.sort((a, b) => a > b); //both array sorted are equal item to item
  expect(arr).toEqual(result);
});

test("verify mailgunData", () => {
  const model = sorteio({ mailgun: {} })
  
  const member = { email: "member@gmail.com", name: "Member" };
  const friend = { email: "friend@gmail.com", name: "Friend" };

  const result = model.mailgunData(member, friend)

  const expectResult = {
    from: "Amigo Secreto <me@samples.mailgun.org>",
    to: "member@gmail.com",
    subject: `Hello ${member.name}, seu amigo secreto é ${friend.name}`,
    text: `Hello ${member.name}, seu amigo secreto é ${friend.name}`
  }

  expect(result).toEqual(expectResult);
});

test("verify sendEmails", () => {
  const mailgun = { sendEmail: jest.fn() };

  const model = sorteio({ mailgun });

  const member1 = { email: "1@gmail.com", name: "Member 1" };
  const member2 = { email: "2@gmail.com", name: "Member 2" };
  const member3 = { email: "3@gmail.com", name: "Member 3" };
  const list = [member1, member2, member3]

  model.sendEmails(list);

  expect(mailgun.sendEmail.mock.calls.length).toBe(3);

  // expect(mailgunData).toBeCalledWith(member1, member2);
  // expect(mailgun.sendEmail).toBeCalledWith(member2, member3);
  // expect(mailgun.sendEmail).toBeCalledWith(member3, member1);
});

test('verify sorteio', () => {
  const mailgun = { sendEmail: jest.fn() };

  const model = sorteio({ mailgun });

  const member1 = { email: "1@gmail.com", name: "Member 1" };
  const member2 = { email: "2@gmail.com", name: "Member 2" };
  const member3 = { email: "3@gmail.com", name: "Member 3" };
  const list = [member1, member2, member3];

  let isTest = true
  model.sorteio(list, isTest);
  expect(mailgun.sendEmail.mock.calls.length).toBe(0);

  isTest = false
  model.sorteio(list, isTest);
  expect(mailgun.sendEmail.mock.calls.length).toBe(3);
});