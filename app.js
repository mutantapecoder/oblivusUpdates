require('dotenv').config();
const axios = require('axios');
const nodemailer = require('nodemailer');

const apiKey = process.env.API_KEY;
const apiToken = process.env.API_TOKEN;

const listVMsURL = `https://api.oblivus.com/cloud/virtualserver/list/?apiKey=${apiKey}&apiToken=${apiToken}`;

function sendEmailNotification(message) {
  console.log(`Sending email notification: ${message}`);

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'oblivusmachineupdates@gmail.com',
      pass: 'okdk kgzh mqff yziw',
    },
  });

  let mailOptions = {
    from: '"Sender Name" oblivusmachineupdates@gmail.com',
    to: 'oblivusmachineupdates@gmail.com, jasel.chauhan@gmail.com',
    subject: `Oblivus Machine Update`,
    text: `${message}`,
    html: `${message}`,
  };

  // Send the email
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
      // console.log(response.data);
      const machineData = response.data.data;
      // console.log(machineData);

      //check through all machines and if the status is not equal to running, then alert user with the status and the machine with the non running status

      machineData.map((machine) => {
        if (machine.status !== 'Running') {
          console.log(
            `Alert: Machine ${machine.name} with ID ${machine.ID} has a status of '${machine.status}'`
          );

          // Replace this with your actual email sending logic
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

setInterval(getMachineData, 5 * 60 * 1000);
