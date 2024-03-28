const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const apiToken = process.env.API_TOKEN;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

const listVMsURL = `https://api.oblivus.com/cloud/virtualserver/list/?apiKey=${apiKey}&apiToken=${apiToken}`;

const exceptionList = ['vm16169ddd1d5b0'];

function sendEmailNotification(message) {
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
    subject: `Oblivus Machine Update`,
    text: `${message}`,
    html: `${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
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
            `machine ${machine.name} is on the exception list and therefore email will not be sent`
          );
          return;
        } else if (machine.status !== 'Running') {
          console.log(
            `Alert: Machine ${machine.name} with ID ${machine.ID} has a status of '${machine.status}'`
          );

          sendEmailNotification(
            `Machine: <strong> ${machine.name} </strong> with an ID of: <strong> ${machine.ID} </strong> has a status of ' <strong> ${machine.status} </strong>'. <br><br> Go to <a href="https://console.oblivus.com/dashboard/oblivuscloud/myinstances/">Oblivus Dashboard</a> and reboot to stop your miner from getting rugged. `
          );
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

//runs code every 5 minutes to check for machine udpates
setInterval(getMachineData, 5 * 60 * 1000);

//runs code every 10 seconds instead of every 5 minutes
// setInterval(getMachineData, 10000);
