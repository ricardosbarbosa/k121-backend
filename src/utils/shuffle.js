const shuffleArray = list => {
  const result = new Array(...list);
  result.forEach((_, index, arr) => {
    const j = index + Math.floor(Math.random() * (arr.length - index));
    const temp = arr[index];
    result[index] = arr[j];
    result[j] = temp;
  });
  return result;
};

const mailgunData = (member, friend) => ({
  from: "Amigo Secreto <me@samples.mailgun.org>",
  to: member.email,
  subject: `Hello ${member.name}, seu amigo secreto é ${friend.name}`,
  text: `Hello ${member.name}, seu amigo secreto é ${friend.name}`
});

const sendEmailWithMailgun = (mailgun) => async data => {
  return mailgun.messages().send(data);
};

module.exports = {
  shuffleArray,
  mailgunData,
  sendEmailWithMailgun
};