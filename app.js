const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const apiToken = process.env.API_TOKEN;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

const listVMsURL = `https://api.oblivus.com/cloud/virtualserver/list/?apiKey=${apiKey}&apiToken=${apiToken}`;
const userDataURL = `https://api.oblivus.com/account/user/?apiKey=${apiKey}&apiToken=${apiToken}`;

const exceptionList = ['vm16169ddd1d5b0'];

function sendEmailNotification(message, messageSubject) {
  console.log(`Sending email notification: ${message}`);

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  let mailOptions = {
    from: '"Oblivus Update App" oblivusmachineupdates@gmail.com',
    to: 'oblivusmachineupdates@gmail.com, jasel.chauhan@gmail.com',
    subject: messageSubject,
    text: `${message}`,
    html: `${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

function getMachineData() {
  axios
    .get(listVMsURL)
    .then((response) => {
      const machineData = response.data.data;

      machineData.map((machine) => {
        if (exceptionList.includes(machine.ID)) {
          console.log(
            `machine: ${machine.name} is on the exception list and therefore email will not be sent`
          );
          return;
        } else if (machine.status !== 'Running') {
          console.log(
            `Alert: Machine ${machine.name} with ID ${machine.ID} has a status of '${machine.status}'`
          );

          sendEmailNotification(
            `Machine: <strong> ${machine.name} </strong> with an ID of: <strong> ${machine.ID} </strong> has a status of ' <strong> ${machine.status} </strong>'. <br><br> Go to <a href="https://console.oblivus.com/dashboard/oblivuscloud/myinstances/">Oblivus Dashboard</a> and reboot to stop your miner from getting rugged. `,
            `Oblivus Machine Update`
          );
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function getUserData() {
  axios
    .get(userDataURL)
    .then((response) => {
      const userData = response.data.data;
      console.log(userData.balance);

      if (userData.balance < 750) {
        sendEmailNotification(
          `Wallet Balance is running low, currently at: <strong> $${userData.balance} </strong>. <br><br> Go to <a href="https://console.oblivus.com/dashboard/billing/addbalance//">Oblivus Top Up Balance</a> to topup balance and prevent machine downtime. `,
          `User Balance Running Low`
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

setInterval(getUserData, 2 * 60 * 60 * 1000);
// setInterval(getUserData, 10000);
setInterval(getMachineData, 5 * 60 * 1000);
// setInterval(getMachineData, 10000);
