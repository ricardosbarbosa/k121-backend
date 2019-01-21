
const shuffle = (list) => {
  const result = new Array(...list);
  result.forEach((_, index, arr) => {
    const j = index + Math.floor(Math.random() * (arr.length - index));
    const temp = arr[index];
    result[index] = arr[j];
    result[j] = temp;
  });
  return result;
}

const mailgunData = (member, friend) => ({
  from: "Amigo Secreto <me@samples.mailgun.org>",
  to: member.email,
  subject: `Hello ${member.name}, seu amigo secreto é ${friend.name}`,
  text: `Hello ${member.name}, seu amigo secreto é ${friend.name}`
});

const sendEmails = async ({ mailgun, mailgunData }, list) => {
  list.forEach((member, i) => {
    let friend = i === list.length - 1 ? list[0] : list[i + 1];
    mailgun.sendEmail(mailgunData(member, friend));
  });
  // return new Promise((resolve, reject) => {
  //   Promise.all(
  //       list.map(async (member, i) => {
  //         try {
  //           let friend = i === list.length - 1 ? list[0] : list[i + 1];
  //           const r = await mailgun.sendEmail(mailgunData(member, friend));
  //           console.log("o que eh: ", r);
  //           return r;
  //         } catch (error) {
  //           console.log(member.email, error);
  //           return error
  //         }
  //       })
  //     )
  //     .then(array => {
  //       console.log(array);
  //       resolve(array);
  //     })
  //     .catch(error => {
  //       reject(error)
  //     });
  // });
};

const sorteio = async ({ mailgun, sendEmails, shuffle, mailgunData }, members, isTest = true) => {
  try {
    const shuffledMembers = shuffle(members);
    if (!isTest) {
      await sendEmails({ mailgun, mailgunData }, shuffledMembers);
    }
    return shuffledMembers;
  } catch (error) {
    return error;
  }
};

module.exports = ({ mailgun }) => ({
  mailgunData,
  shuffle,
  sendEmails: sendEmails.bind(null, { mailgun, mailgunData }),
  sorteio: sorteio.bind(null, { mailgun, mailgunData, shuffle, mailgunData })
});
