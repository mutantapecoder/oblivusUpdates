# Oblivus Machine Updates:

### Sends email notifications on machine statuses using Oblivus API.

### Steps:

* Create a new Gmail account (used to send emails from)
* Add 2FA to account
* Search for app passwords in google account search bar and create a new app password (used later in code)
* Git clone this repo
* In root of folder add a .env file and populate it with your Oblivus `API_KEY` and `API_TOKEN` and also Gmail `EMAIL_USER` and `EMAIL_PASSWORD`
*  run `node app` in terminal
*  the default code will run every 5 minutes. to test change the setInterval second argument to `10000` which is 10 seconds